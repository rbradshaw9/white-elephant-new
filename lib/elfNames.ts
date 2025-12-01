// Elf name generator with festive adjectives and nouns

const adjectives = [
  'Jolly', 'Merry', 'Frosty', 'Sparkly', 'Twinkly', 'Jingle', 'Snowy',
  'Peppermint', 'Gingerbread', 'Tinsel', 'Blizzard', 'Candy', 'Sugar',
  'Glitter', 'Mistletoe', 'Holly', 'Cozy', 'Cocoa', 'Cinnamon', 'Nutmeg',
  'Starry', 'Shimmer', 'Dazzle', 'Bouncy', 'Giggly', 'Cheery', 'Bubbly',
  'Snuggly', 'Festive', 'Magical', 'Whimsical', 'Sprightly', 'Zippy'
];

const nouns = [
  'Snowflake', 'Gumdrop', 'Sprucebolt', 'Twinkletoes', 'McSnowdrift',
  'Sugarplum', 'Jinglebell', 'Snowball', 'Icicle', 'Candycane',
  'Sparklebucket', 'Mittens', 'Eggnog', 'Stocking', 'Ornament',
  'Pinecone', 'Reindeer', 'Elfshoes', 'Gingerbread', 'Winterberry',
  'Frostbite', 'Sleighbell', 'Snowdrift', 'Cocoacup', 'Cookiejar',
  'Tinseltown', 'Northpole', 'Iceberg', 'Marshmallow', 'Peppermint'
];

/**
 * Generates unique elf/christmas nicknames for a list of guest names
 * Ensures uniqueness both within the current session and against existing names
 * @param guestNames - Array of real guest names
 * @param existingElfNames - Set of already used elf names from database (optional)
 * @returns Array of generated elf names (same length as input)
 */
export function generateElfNames(guestNames: string[], existingElfNames: Set<string> = new Set()): string[] {
  const usedNames = new Set([...existingElfNames]);
  const elfNames: string[] = [];

  for (let i = 0; i < guestNames.length; i++) {
    let elfName: string;
    let attempts = 0;
    const maxAttempts = 200; // Increased for global uniqueness

    do {
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      elfName = `${adjective} ${noun}`;
      attempts++;
    } while (usedNames.has(elfName) && attempts < maxAttempts);

    // If we somehow can't find a unique name, add a number
    if (usedNames.has(elfName)) {
      let counter = 1;
      while (usedNames.has(`${elfName} ${counter}`)) {
        counter++;
      }
      elfName = `${elfName} ${counter}`;
    }

    usedNames.add(elfName);
    elfNames.push(elfName);
  }

  return elfNames;
}

/**
 * Get all existing elf names from the database
 */
export async function getExistingElfNames(): Promise<Set<string>> {
  // This will be called from the API route
  return new Set();
}
