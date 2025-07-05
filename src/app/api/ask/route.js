import { NextResponse } from 'next/server';
import openai from '@/utils/openaiClient';
import chunks from '@/data/embeddings_chunks.json';


// helpers
const cosineSimilarity = (a, b) => {
  const dot = a.reduce((s, ai, i) => s + ai * b[i], 0);
  const nA  = Math.sqrt(a.reduce((s, ai) => s + ai * ai, 0));
  const nB  = Math.sqrt(b.reduce((s, bi) => s + bi * bi, 0));
  return dot / (nA * nB);
};
const findDetailChunk = id =>
  chunks.find(c => c.id === id.replace(':summary', ':details'));

// pull numeric YYYYMM, if present (added in generator)
const getYearMonth = ch => ch.yearMonth ?? 0;

// constants
const DEFAULT_K      = 5;
const SIM_THRESHOLD  = 0.65;
const LOW_FALLBACK   = 0.30;
const DETAIL_THRESH  = 0.80;

// route
export async function POST(request) {
  try {
    /* parse request */
    const { messages } = await request.json();
    if (!messages?.length)
      return NextResponse.json({ error: 'No messages' }, { status: 400 });

    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    const question = lastUser?.content?.trim() || '';
    if (!question)
      return NextResponse.json({ error: 'No user question' }, { status: 400 });

    /* embed question */
    const { data } = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: question
    });
    const qVec = data[0].embedding;

    /* intent flags */
    const wantsRecent    = /recent|latest|newest/i.test(question);
    const wantsAll       = /\b(all|list|every)\b/i.test(question);
    const identityQuery  = /\bwho\b|about atharv|essay/i.test(question);
    const academicQuery  = /\b(academic|college|class)\b/i.test(question);

    /* score all chunks (filter by project type if academic query) */
    let candidateChunks = chunks;
    if (academicQuery) {
      candidateChunks = chunks.filter(
        c => c.type?.startsWith('proj_') &&
             /academic/i.test(c.title || '') || /academic project/i.test(c.text)
      );
      // if filter removed everything, fall back to all chunks
      if (candidateChunks.length === 0) candidateChunks = chunks;
    }

    const scored = candidateChunks.map(ch => ({
      chunk: ch,
      sim: cosineSimilarity(qVec, ch.embedding)
    }));

    /* sort */
    if (wantsRecent) {
      scored.sort((a, b) => getYearMonth(b.chunk) - getYearMonth(a.chunk));
    } else {
      scored.sort((a, b) => b.sim - a.sim);
    }

    const K = wantsAll || /\bprojects?\b/i.test(question) ? 50 : DEFAULT_K;

    /* collect top-k (+details) */
    const top = [];
    for (const { sim, chunk } of scored) {
      if (sim < SIM_THRESHOLD) break;
      top.push(chunk);
      if (sim > DETAIL_THRESH && chunk.id.endsWith(':summary')) {
        const det = findDetailChunk(chunk.id);
        if (det) top.push(det);
      }
      if (top.length >= K) break;
    }

    /* force-include bio on identity query */
    if (identityQuery) {
      const bioChunk = chunks.find(c => c.id === 'bio');
      if (bioChunk && !top.includes(bioChunk)) top.unshift(bioChunk);
    }

    /* low-similarity backup */
    if (top.length === 0) {
      top.push(...scored.filter(s => s.sim >= LOW_FALLBACK).slice(0, 3).map(s => s.chunk));
    }
    if (top.length === 0)
      return NextResponse.json({
        answer:
          "I don’t have enough info to answer that yet — feel free to ask about Atharv’s skills, projects, or experience!"
      });

    /* build prompt */
    const context = top.map(c => c.text.trim()).join('\n\n---\n\n');

    const systemPrompt = `
      # Identity
        You are a helpful portfolio assistant for this portfolio site created by Atharv. Your job is to answer user's questions about 
        Atharv to the best of your ability using a friendly tone

      # Instructions 
        * Speak in a warm, conversational tone. Start with a brief acknowledgement (“Sure,” “Absolutely,” etc.) if applicable and end with a 
          light offer of further help about the current response.
        * Use markdown for readability (headings, lists, bold, horizontal rules, etc.).
        * DO NOT use emojis
        * Answer ONLY using information inside <context>. If context is missing, say you don’t have that info (no guessing).
        * You have to be honest in your responses about Atharv. For example - If a user asks a question about Atharv's fit for a job 
          that he is so clearly underqualified for then you should express your honest opinion saying he is not qualified. 

      <context>
      ${context}
      </context>
      `.trim();

    const devMsg = { role: 'developer', content: systemPrompt };

    /* trim history for cost */
    const history = messages.slice(-10);

    /* call OpenAI */
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [devMsg, ...history],
      temperature: 0.4
    });

    const answer = completion.choices[0]?.message?.content ?? '(No response)';
    return NextResponse.json({ answer });

  } catch (err) {
    console.error(err);

    const status = err?.response?.status;

    const msg =
      status === 400 ? 'Bad request — please try again.' :
      status === 401 ? 'Server misconfiguration: missing or invalid API key.' :
      status === 403 ? 'Access denied. Please contact the site owner.' :
      status === 429 ? 'Too many requests — please try again later.' :
      status === 500 ? 'Server error — please try again shortly.' :
      status === 503 ? 'Service temporarily unavailable — try again later.' :
      'An unexpected error occurred.';

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
