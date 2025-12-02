import { generateElfTagline } from '@/lib/generateTagline';

async function testTaglineGeneration() {
  console.log('Testing AI tagline generation...\n');
  
  const testNames = [
    'Tipsy McStabby',
    'Passive-Aggressive Giftsnatcher',
    'Wine-Drunk Backstabber',
    'Chaotic Dumpsterfire',
    'Sketchy Cheapskate'
  ];

  for (const name of testNames) {
    console.log(`Elf Name: ${name}`);
    const tagline = await generateElfTagline(name);
    console.log(`Tagline: "${tagline}"`);
    console.log('---');
  }
}

testTaglineGeneration().catch(console.error);
