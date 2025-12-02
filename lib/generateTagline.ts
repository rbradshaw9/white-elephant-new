import OpenAI from 'openai';

/**
 * Lazy-load OpenAI client to avoid initialization during build
 */
function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

/**
 * Generate a funny, personalized tagline for an elf name
 * The tagline should be directly related to the elf name and White Elephant party context
 */
export async function generateElfTagline(elfName: string): Promise<string> {
  try {
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a witty comedy writer creating hilarious taglines for Christmas elf names at a White Elephant gift exchange party. 

The tagline should:
- Be directly related to the elf name itself (use the adjective and noun in the name)
- Reference White Elephant party behavior (stealing gifts, being competitive, drama, chaos)
- Be funny, sarcastic, and a bit edgy
- Be 8-15 words maximum
- NOT use emojis
- Be in the format of a description or prediction

Examples:
- "Tipsy McStabby" → "Three wines deep and eyeing YOUR gift"
- "Passive-Aggressive Giftsnatcher" → "Smiles sweetly while plotting your downfall"
- "Chaotic Dumpsterfire" → "Somehow makes every decision worse than the last"
- "Wine-Drunk Backstabber" → "Your best friend until the third round starts"
- "Sketchy Cheapskate" → "Definitely wrapped something from their garage"`
        },
        {
          role: "user",
          content: `Generate a funny tagline for the elf name: "${elfName}"`
        }
      ],
      temperature: 1.0,
      max_tokens: 50,
    });

    const tagline = completion.choices[0]?.message?.content?.trim() || 
      "Ready to cause some holiday chaos";
    
    // Remove quotes if AI added them
    return tagline.replace(/^["']|["']$/g, '');
  } catch (error) {
    console.error('Error generating tagline:', error);
    // Fallback taglines based on name patterns
    return getFallbackTagline(elfName);
  }
}

/**
 * Fallback taglines if API fails
 */
function getFallbackTagline(elfName: string): string {
  const lowerName = elfName.toLowerCase();
  
  if (lowerName.includes('tipsy') || lowerName.includes('drunk')) {
    return "Probably had one too many already";
  }
  if (lowerName.includes('steal') || lowerName.includes('snatch')) {
    return "Your gift is definitely getting stolen";
  }
  if (lowerName.includes('aggressive') || lowerName.includes('stabby')) {
    return "Playing to win, friendship be damned";
  }
  if (lowerName.includes('chaotic') || lowerName.includes('disaster')) {
    return "Thrives in absolute pandemonium";
  }
  if (lowerName.includes('sketchy') || lowerName.includes('suspicious')) {
    return "Up to no good and proud of it";
  }
  
  return "Here to cause some holiday chaos";
}

/**
 * Generate taglines for multiple elf names efficiently
 */
export async function generateElfTaglines(elfNames: string[]): Promise<string[]> {
  // Generate all taglines in parallel for speed
  const taglinePromises = elfNames.map(name => generateElfTagline(name));
  return await Promise.all(taglinePromises);
}
