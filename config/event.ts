export const eventConfig = {
  partyDateTime: process.env.PARTY_DATETIME || '2025-12-13T18:00:00-04:00',
  title: 'The White Elephant Bash',
  address: '8853 S University Blvd, Highlands Ranch, CO 80126',
  addressLink: 'https://maps.app.goo.gl/FgTo19iLXhYYijcV9',
  dressCode: 'Ugly Christmas Sweaters Encouraged! 🎄',
  giftPriceRange: '$20 - $40',
  description: 'A fast-paced, slightly chaotic holiday game where stealing is encouraged and alliances never last.',
  emailFromName: 'The White Elephant Bash',
  emailFromAddress: 'party@thewhiteelephantbash.com',
  emailReplyTo: 'jenny.bradshaw@gmail.com',
  rules: {
    classic: [
      'Bring a wrapped gift ($20–$40). Funny, weird, useful, or classy — but keep it real (no trash, no broken stuff!). Try to stay close to the limit so gifts feel fair.',
      'Everyone participating must bring a gift. Place your gift in the center pile. No guarding, no booby traps.',
      'Everyone draws a number for turn order. (And Player #1 gets a special final turn, so don\'t feel bad for them.)',
      'Player #1 opens the first gift. Show it to the group — dramatic reactions required.',
      'Players 2+ may STEAL an opened gift or open a new one. Choose wisely, young padawan.',
      'If your gift is stolen: You must immediately steal a different gift or open a new one. No crying allowed.',
      'You cannot steal back the gift that was just taken from you. No instant revenge. Save it for the finale.',
      'Each gift can only be stolen 3 times. After the 3rd steal, it becomes frozen = locked to that player permanently.'
    ],
    finalRound: [
      '🎄 After all gifts are opened, Player #1 gets ONE FINAL TURN. Patience pays off!',
      'Player #1 may steal ANY unfrozen gift they want. (Revenge is a dish best served cold.)',
      'Player #1 cannot steal gifts that are already frozen.',
      'If Player #1 steals: The victim gets Player #1\'s old gift. That\'s it — game over.',
      'No further swaps, steals, bargains, debates, or tantrums allowed.'
    ],
    tips: [
      '🎁 Wrap creatively — duct tape is encouraged.',
      '🎭 Play up the drama — beg, plead, threaten (lightly).',
      '🔥 The best gifts get stolen the most — embrace it.',
      '😈 Stealing is strategic — form alliances, betray alliances, repeat.',
      '🎉 Keep the game moving quickly — no long debates over rules.',
      '🍷 Gifts pair well with wine and questionable decisions.',
      '🎟️ Friendships are temporary. Your new gift is forever. (Or until next year.)'
    ]
  }
};
