import { NextResponse } from 'next/server';
import openai from '@/utils/openaiClient';
import portfolioData from '@/data/portfolioData';
import embeddings from '@/data/embeddings';

// A helper to compute cosine similarity between two vectors:
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

export async function POST(request) {
  try {
    const { question } = await request.json();
    if (!question?.trim()) {
      return NextResponse.json({ error: 'No question provided' }, { status: 400 });
    }

    // Generate embedding for the user's question
    const embedResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: question
    });
    const questionEmbedding = embedResponse.data[0].embedding;

    let bestMatchSection = null;
    let bestMatchContent = "";
    let highestSim = -Infinity;

    // Check bio
    const simBio = cosineSimilarity(questionEmbedding, embeddings.bio);
    if (simBio > highestSim) {
      highestSim = simBio;
      bestMatchSection = 'bio';
      bestMatchContent = `Bio:\n${portfolioData.bio}`;
    }

    // Check skills
    const simSkills = cosineSimilarity(questionEmbedding, embeddings.skills);
    if (simSkills > highestSim) {
      highestSim = simSkills;
      bestMatchSection = 'skills';
      bestMatchContent = `Skills:\n${portfolioData.skills}`;
    }

    // Check education
    for (const edu of portfolioData.education) {
      const key = `${edu.college}-${edu.major}`;
      const sim = cosineSimilarity(questionEmbedding, embeddings.education[key]);
      if (sim > highestSim) {
        highestSim = sim;
        bestMatchSection = 'education';
        bestMatchContent = `Education:\n${edu.degree} in ${edu.major} from ${edu.college}`;
      }
    }

    // Check projects
    for (const proj of portfolioData.projects) {
      const key = proj.name;
      const sim = cosineSimilarity(questionEmbedding, embeddings.projects[key]);
      if (sim > highestSim) {
        highestSim = sim;
        bestMatchSection = 'project';
        bestMatchContent = `Project: ${proj.name}\nType: ${proj["project type"]}\nPeriod: ${proj.period}\nTopic: ${proj.topic}\nTech: ${proj.tech.join(", ")}\nDescription: ${proj.description}\nDetails: ${proj.details}`;
      }
    }

    // Check experience
    for (const exp of portfolioData.experience) {
      const key = `${exp.company}-${exp.role}`;
      const sim = cosineSimilarity(questionEmbedding, embeddings.experience[key]);
      if (sim > highestSim) {
        highestSim = sim;
        bestMatchSection = 'experience';
        bestMatchContent = `Experience:\n${exp.role} at ${exp.company}\nLocation: ${exp.location}\nPeriod: ${exp.period}\nWork: ${exp.work}`;
      }
    }

    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant for a personal portfolio site created by Atharv. All the knowledge you have about 
        about project and the data is based on Atharv. Use the following information to answer the question about Atharv:\n${bestMatchContent}`
      },
      {
        role: 'user',
        content: question
      }
    ];
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages
    });

    const answer = completion.choices[0]?.message?.content ?? '(No response)';

    return NextResponse.json({ answer });
  } catch (err) {
    console.error('OpenAI error:', err);
    return NextResponse.json(
      { error: 'Failed to get answer from AI' },
      { status: 500 }
    );
  }
}
