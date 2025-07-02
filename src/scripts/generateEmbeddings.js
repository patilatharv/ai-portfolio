import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
config({ path: '.env.local' });

import openai from '../utils/openaiClient.js';

// helpers
const portfolioPath = path.resolve('src/data/portfolioData.json');
const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf-8'));

async function getEmbedding(text) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  });
  return res.data[0].embedding;
}

const clean = (s) => s.replace(/\s+/g, ' ').trim();

/** Extract YYYYMM integer (e.g. "Summer 2023" → 202306) */
function parseYearMonth(periodStr = '') {
  const yr = periodStr.match(/\b(19|20)\d{2}\b/);
  if (!yr) return 0;
  const year = Number(yr[0]);

  const monthLookup = {
    jan:1,feb:2,mar:3,apr:4,may:5,jun:6,
    jul:7,aug:8,sep:9,oct:10,nov:11,dec:12
  };
  const mon = periodStr.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*/i);
  const month = mon ? monthLookup[mon[0].slice(0,3).toLowerCase()] : 6; // default June (mid-year)

  return year * 100 + month;  // e.g. 202306
}

// build chunks
async function generate() {
  const chunks = [];

  // Bio
  chunks.push({
    id: 'bio',
    type: 'bio_summary',
    text: clean(portfolioData.bio),
    embedding: await getEmbedding(portfolioData.bio)
  });

  // Skills
  chunks.push({
    id: 'skills',
    type: 'skills_summary',
    text: clean(portfolioData.skills),
    embedding: await getEmbedding(portfolioData.skills)
  });

  // Education
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

  // Projects
  for (const proj of portfolioData.projects) {
    const tags = proj.tech || [];
    const yearMonth = parseYearMonth(proj.period);

    /** summary chunk */
    const summaryText = `${proj.name} – ${proj.description}`;
    chunks.push({
      id: `proj:${proj.name}:summary`,
      type: 'proj_summary',
      title: proj.name,
      tags,
      yearMonth,
      text: clean(summaryText),
      embedding: await getEmbedding(summaryText)
    });

    /** details chunk */
    const detailText = `
${proj.details}
Tech stack: ${tags.join(', ')}
Period: ${proj.period}
Type: ${proj['project type']}
    `;
    chunks.push({
      id: `proj:${proj.name}:details`,
      type: 'proj_details',
      title: proj.name,
      tags,
      yearMonth,
      text: clean(detailText),
      embedding: await getEmbedding(detailText)
    });
  }

  // Experience
  for (const exp of portfolioData.experience) {
    const yearMonth = parseYearMonth(exp.period);

    /** summary */
    const summary = `${exp.role} at ${exp.company} (${exp.period})`;
    chunks.push({
      id: `exp:${exp.company}-${exp.role}:summary`,
      type: 'exp_summary',
      title: exp.company,
      yearMonth,
      text: clean(summary),
      embedding: await getEmbedding(summary)
    });

    /** details */
    const detailText = `${exp.work}\nLocation: ${exp.location}`;
    chunks.push({
      id: `exp:${exp.company}-${exp.role}:details`,
      type: 'exp_details',
      title: exp.company,
      yearMonth,
      text: clean(detailText),
      embedding: await getEmbedding(detailText)
    });
  }

  // write file
  const outPath = path.resolve('src/data/embeddings_chunks.json');
  fs.writeFileSync(outPath, JSON.stringify(chunks, null, 2));
  console.log(`Saved ${chunks.length} chunks → ${outPath}`);
}

generate().catch(console.error);