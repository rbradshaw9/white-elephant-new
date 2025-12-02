import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const fallbackReasons = [
  "You knowingly brought a terrible gift to last year's exchange. The scented candle? Really?",
  "You've been caught peeking at wrapped gifts when you thought no one was watching.",
  "You regifted something you received at last year's White Elephant. We have receipts.",
  "You've been Googling 'how to steal gifts without looking greedy' for the past week.",
  "You brought a gift card with only $12.73 left on it. Santa sees everything.",
  "You wrapped your gift in newspaper. The comics section doesn't make it 'vintage.'",
  "You've been practicing your innocent face in the mirror for stealing gifts.",
  "You told three people you'd bring wine and showed up empty-handed.",
  "You've been stalking the guest list to see who's bringing what.",
  "Your gift is literally something from your closet with the dust wiped off.",
  "You brought a partially used bottle of hot sauce from 2019. It expired.",
  "You've been plotting your steal strategy since September. That's dedication to chaos.",
  "You told your friends you're 'just here for the vibes' but you're READY TO STEAL.",
  "You brought the same gift as last year hoping no one would remember. We remember.",
  "You're planning to steal from your own spouse. Cold-blooded.",
];

export async function POST(request: NextRequest) {
  try {
    const { timestamp } = await request.json();
    const currentHour = new Date(timestamp).getHours();
    const dayOfWeek = new Date(timestamp).getDay();

    const openai = getOpenAIClient();

    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are Santa's snarky AI assistant who checks the Naughty List. Generate ONE funny, specific, and ridiculous reason why someone is on the naughty list. 

The reason should:
- Be 15-30 words
- Be funny and absurd but not mean-spirited
- Reference White Elephant party behavior, gift-giving crimes, or holiday shenanigans
- Be specific and creative (not generic)
- Include details about terrible gifts, stealing strategies, or party etiquette violations

Context: It's ${currentHour >= 0 && currentHour < 6 ? 'late at night/early morning' : currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening'} on a ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]}.

Examples:
- "You've been caught rewrapping last year's fruitcake three times. It's officially a biohazard now."
- "You brought a half-used gift card with $3.47 on it and acted like it was generous."
- "You've been practicing your 'surprised face' for stealing gifts since October. Oscar-worthy, but still naughty."`
            },
            {
              role: "user",
              content: "Why am I on the naughty list?"
            }
          ],
          temperature: 1.2,
          max_tokens: 80,
        });

        const reason = completion.choices[0]?.message?.content?.trim();
        if (reason) {
          return NextResponse.json({ reason });
        }
      } catch (error) {
        console.error('OpenAI error:', error);
      }
    }

    // Fallback to random reason if AI fails or not configured
    const randomReason = fallbackReasons[Math.floor(Math.random() * fallbackReasons.length)];
    return NextResponse.json({ reason: randomReason });

  } catch (error) {
    console.error('Naughty list error:', error);
    return NextResponse.json(
      { reason: "You're on the naughty list for trying to break our naughty list checker. Meta." },
      { status: 500 }
    );
  }
}
