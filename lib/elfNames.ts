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
 * @param guestNames - Array of real guest names
 * @returns Array of generated elf names (same length as input)
 */
export function generateElfNames(guestNames: string[]): string[] {
  const usedNames = new Set<string>();
  const elfNames: string[] = [];

  for (let i = 0; i < guestNames.length; i++) {
    let elfName: string;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      elfName = `${adjective} ${noun}`;
      attempts++;
    } while (usedNames.has(elfName) && attempts < maxAttempts);

    // If we somehow can't find a unique name, add a number
    if (usedNames.has(elfName)) {
      elfName = `${elfName} ${i + 1}`;
    }

    usedNames.add(elfName);
    elfNames.push(elfName);
  }

  return elfNames;
}
