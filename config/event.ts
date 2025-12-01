export const eventConfig = {
  partyDateTime: process.env.PARTY_DATETIME || '2025-12-13T18:00:00-07:00',
  title: 'The White Elephant Bash 2025',
  address: '123 Holiday Lane, North Pole, CO 80501',
  dressCode: 'Ugly Christmas Sweaters Encouraged! 🎄',
  giftPriceRange: '$20 - $30',
  description: 'Join us for an evening of laughter, gift stealing, and holiday chaos!',
  rules: {
    classic: [
      'Bring a wrapped gift ($20-$40 range) — funny, weird, useful, or classy all welcome!',
      'Place your gift in the center pile when you arrive',
      'Everyone draws a number to determine turn order (Player #1 gets a special bonus at the end!)',
      'Player #1 picks any gift, opens it, and shows the group',
      'Players 2+ can STEAL an opened gift OR open a new one',
      'If your gift is stolen, you must immediately steal a different gift or open a new one',
      'You CANNOT steal back the gift that was just taken from you',
      'Each gift can only be stolen 2-3 times before it becomes "frozen"'
    ],
    finalRound: [
      '🎄 After all gifts are opened, Player #1 gets ONE FINAL TURN',
      'Player #1 can steal ANY unfrozen gift they want',
      'If they steal, that person gets Player #1\'s gift (no more stealing)',
      'Game officially ends — no further swaps allowed!'
    ],
    tips: [
      '🎁 Wrap creatively to build mystery and excitement',
      '🎭 Play up the drama — beg, plead, and defend your gift!',
      '🔥 The best gifts get stolen the most — make yours irresistible',
      '😈 Strategic stealing is encouraged — create alliances or chaos',
      '🎉 Remember: it\'s all in good fun!'
    ]
  }
};
