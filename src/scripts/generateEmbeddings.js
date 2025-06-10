import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import openai from '../utils/openaiClient.js';

// Read portfolio data
const portfolioPath = path.resolve('src/data/portfolioData.json');
const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf-8'));

// Helper to get embedding for a text
async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  });
  return response.data[0].embedding;
}

async function generate() {
  const result = {
    bio: null,
    skills: null,
    education: {},
    projects: {},
    experience: {}
  };

  // Bio
  result.bio = await getEmbedding(portfolioData.bio);

  // Skills
  result.skills = await getEmbedding(portfolioData.skills);

  // Education
  for (const edu of portfolioData.education) {
    const key = `${edu.college}-${edu.major}`;
    const content = `${edu.degree} in ${edu.major} from ${edu.college}`;
    result.education[key] = await getEmbedding(content);
  }

  // Projects
  for (const proj of portfolioData.projects) {
    const key = proj.name;
    const content = `
      Project: ${proj.name}
      Type: ${proj["project type"]}
      Period: ${proj.period}
      Topic: ${proj.topic}
      Description: ${proj.description}
      Details: ${proj.details}
    `;
    result.projects[key] = await getEmbedding(content);
  }

  // Experience
  for (const exp of portfolioData.experience) {
    const key = `${exp.company}-${exp.role}`;
    const content = `
      Company: ${exp.company}
      Role: ${exp.role}
      Location: ${exp.location}
      Period: ${exp.period}
      Responsibilities: ${exp.work}
    `;
    result.experience[key] = await getEmbedding(content);
  }

  // Save to file
  const outputPath = path.resolve('src/data/embeddings.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log('Embeddings saved to src/data/embeddings.json');
}

generate().catch(console.error);