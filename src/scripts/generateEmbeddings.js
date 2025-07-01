import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
config({ path: '.env.local' });

import openai from '../utils/openaiClient.js';

// ────────────────────────────────────────────
// helpers
// ────────────────────────────────────────────
const portfolioPath = path.resolve('src/data/portfolioData.json');
const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf-8'));

async function getEmbedding(text) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  });
  return res.data[0].embedding;
}

// utility to trim whitespace nicely
const clean = (s) => s.replace(/\s+/g, ' ').trim();

// ────────────────────────────────────────────
// build chunk list
// ────────────────────────────────────────────
async function generate() {
  const chunks = [];

  // 1) Bio  ──────────────────────────────────
  chunks.push({
    id: 'bio',
    type: 'bio_summary',
    text: clean(portfolioData.bio),
    embedding: await getEmbedding(portfolioData.bio)
  });

  // 2) Skills  ───────────────────────────────
  chunks.push({
    id: 'skills',
    type: 'skills_summary',
    text: clean(portfolioData.skills),
    embedding: await getEmbedding(portfolioData.skills)
  });

  // 3) Education  ────────────────────────────
  for (const edu of portfolioData.education) {
    const summary = `${edu.degree} in ${edu.major} at ${edu.college} (${edu.period})`;
    chunks.push({
      id: `edu:${edu.college}-${edu.major}`,
      type: 'edu_summary',
      title: edu.college,
      text: clean(summary),
      embedding: await getEmbedding(summary)
    });
  }

  // 4) Projects  ─────────────────────────────
  for (const proj of portfolioData.projects) {
    const summary = `${proj.name} – ${proj.description}`;
    const tags = proj.tech || [];

    // summary chunk
    chunks.push({
      id: `proj:${proj.name}:summary`,
      type: 'proj_summary',
      title: proj.name,
      tags,
      text: clean(summary),
      embedding: await getEmbedding(summary)
    });

    // details chunk (optional but useful for deep questions)
    const detailText = `
      ${proj.details}
      Tech stack: ${tags.join(', ')}
      Period: ${proj.period}
      Type: ${proj["project type"]}
    `;
    chunks.push({
      id: `proj:${proj.name}:details`,
      type: 'proj_details',
      title: proj.name,
      tags,
      text: clean(detailText),
      embedding: await getEmbedding(detailText)
    });
  }

  // 5) Experience  ───────────────────────────
  for (const exp of portfolioData.experience) {
    const summary = `${exp.role} at ${exp.company} (${exp.period})`;
    chunks.push({
      id: `exp:${exp.company}-${exp.role}:summary`,
      type: 'exp_summary',
      title: exp.company,
      text: clean(summary),
      embedding: await getEmbedding(summary)
    });

    const detailText = `${exp.work}\nLocation: ${exp.location}`;
    chunks.push({
      id: `exp:${exp.company}-${exp.role}:details`,
      type: 'exp_details',
      title: exp.company,
      text: clean(detailText),
      embedding: await getEmbedding(detailText)
    });
  }

  // ────────────────────────────────────────────
  // write to file
  // ────────────────────────────────────────────
  const outPath = path.resolve('src/data/embeddings_chunks.json');
  fs.writeFileSync(outPath, JSON.stringify(chunks, null, 2));
  console.log(`✅  Saved ${chunks.length} chunks → ${outPath}`);
}

generate().catch(console.error);