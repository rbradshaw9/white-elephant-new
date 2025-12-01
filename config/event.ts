export const eventConfig = {
  partyDateTime: process.env.PARTY_DATETIME || '2025-12-13T18:00:00-07:00',
  title: 'White Elephant Party 2025',
  address: '123 Holiday Lane, North Pole, CO 80501',
  dressCode: 'Ugly Christmas Sweaters Encouraged! 🎄',
  giftPriceRange: '$20 - $30',
  description: 'Join us for an evening of laughter, gift stealing, and holiday chaos!',
  rules: {
    classic: [
      'Each person brings one wrapped gift',
      'Draw numbers to determine the order',
      'First person picks and unwraps a gift',
      'Next person can steal an unwrapped gift or pick a new one',
      'A gift can only be stolen 3 times total',
      'After your gift is stolen, you can steal or pick new (but not steal back immediately)',
      'Game ends when all gifts are unwrapped'
    ],
    house: [
      'Gifts must be between $20-$30',
      'No gag gifts (unless they\'re REALLY funny)',
      'Bring your gift wrapped - the more elaborate the better!',
      'We\'ll have hot cocoa and cookies available',
      'Arrive by 7:00 PM - game starts at 7:30 PM sharp!'
    ],
    chaos: [
      '🎲 Dice Roll: Roll a die before each turn - odd = steal only, even = pick only',
      '⏰ Speed Round: Each person has 30 seconds to decide',
      '🎭 Mystery Round: One gift is "cursed" - holder must perform a holiday song',
      '🎁 Gift Swap: Every 5 turns, all unwrapped gifts are randomly redistributed',
      '❄️ Freeze: Anyone who says "Christmas" must skip their next turn'
    ]
  }
};
