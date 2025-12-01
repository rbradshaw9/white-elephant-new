export const eventConfig = {
  partyDateTime: process.env.PARTY_DATETIME || '2025-12-13T18:00:00-07:00',
  title: 'The White Elephant Bash 2025',
  address: '123 Holiday Lane, North Pole, CO 80501',
  dressCode: 'Ugly Christmas Sweaters Encouraged! 🎄',
  giftPriceRange: '$20 - $30',
  description: 'Join us for an evening of laughter, gift stealing, and holiday chaos!',
  rules: {
    classic: [
      'Bring a wrapped gift ($20-$40 range) — funny, weird, useful, or classy all welcome! (Yes, a toaster AND a rubber chicken both qualify)',
      'Place your gift in the center pile when you arrive (resist the urge to guard it)',
      'Everyone draws a number to determine turn order (Player #1 gets a special bonus at the end — stay tuned!)',
      'Player #1 picks any gift, opens it, and shows the group (dramatic gasps encouraged)',
      'Players 2+ can STEAL an opened gift OR open a new one (choose wisely, young padawan)',
      'If your gift is stolen, you must immediately steal a different gift or open a new one (no crying allowed)',
      'You CANNOT steal back the gift that was just taken from you (no instant revenge — that\'s what the final round is for)',
      'Each gift can only be stolen 3 times before it becomes "frozen" (three strikes and you\'re out!)'
    ],
    finalRound: [
      '🎄 After all gifts are opened, Player #1 gets ONE FINAL TURN (patience pays off!)',
      'Player #1 can steal ANY unfrozen gift they want (revenge is a dish best served cold)',
      'If they steal, that person gets Player #1\'s gift (no backsies)',
      'Game officially ends — no further swaps, tears, or tantrums allowed!'
    ],
    tips: [
      '🎁 Wrap creatively to build mystery and excitement (duct tape is your friend)',
      '🎭 Play up the drama — beg, plead, and defend your gift like your life depends on it!',
      '🔥 The best gifts get stolen the most — make yours the belle of the ball',
      '😈 Strategic stealing is encouraged — backstab your friends, form alliances, create chaos',
      '🍷 Pro tip: Gifts pair well with wine and bad decisions',
      '🎉 Remember: friendships are temporary, but that awesome gift is forever (or at least until next year)'
    ]
  }
};
