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

const fallbackResponses = [
  "Listen, I've been doing this elf gig for 247 years. Trust me when I say: bring a good gift or prepare for judgment.",
  "You want my REAL advice? Sit next to someone indecisive. They're easy targets for gift stealing. I didn't say that though.",
  "The secret to White Elephant? Act innocent, steal aggressively, and NEVER admit you peeked at the wrapped gifts.",
  "Between you and me? The person who brought the scented candle last year is STILL on everyone's naughty list.",
  "Pro tip from an elf who's seen it all: If your gift gets stolen 3 times, that's either really good or hilariously terrible. No in-between.",
  "Want to win? Bring something people actually want. Revolutionary concept, I know.",
  "The rules say 'no stealing after 3 steals' but we both know someone's going to try anyway. Chaos is inevitable.",
  "My official elf stance: Follow the rules. My REAL advice: Friendships are temporary, that cool gift is forever.",
  "You're asking me for help? Bold. I respect it. But also, you're on your own once the wine starts flowing.",
  "Here's what Santa won't tell you: The best strategy is to look like you don't care, then STRIKE when they least expect it.",
];

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();
    
    const openai = getOpenAIClient();

    if (openai) {
      try {
        // Build conversation history for context
        const conversationHistory = history.slice(-6).map((msg: any) => ({
          role: msg.role === 'elf' ? 'assistant' : 'user',
          content: msg.content
        }));

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are Jingles, a snarky, hilarious Christmas elf who works as the unofficial advisor for a White Elephant gift exchange party. 

Your personality:
- Sassy but not mean
- Gives terrible advice mixed with actually good advice
- Makes pop culture references
- Judges people's gift choices and strategies
- Pretends to be wise from "247 years of elf experience"
- Occasionally breaks the fourth wall
- Uses emojis sparingly (1-2 per message max)

You help with:
- Gift suggestions (usually roast their ideas first)
- Stealing strategies (pretend it's scandalous but give tips anyway)
- Party etiquette questions
- White Elephant rules explanations
- General party anxiety

Keep responses:
- 2-4 sentences max
- Funny and conversational
- In character as a snarky elf
- Helpful despite the sass

Example style:
"Listen, I've seen 247 White Elephants. That candle idea? Bold choice. By which I mean terrible. Try something people actually want, like a gift card or literally anything else."

Never break character. Always stay snarky but helpful.`
            },
            ...conversationHistory,
            {
              role: "user",
              content: message
            }
          ],
          temperature: 1.2,
          max_tokens: 150,
        });

        const response = completion.choices[0]?.message?.content?.trim();
        if (response) {
          return NextResponse.json({ response });
        }
      } catch (error) {
        console.error('OpenAI error:', error);
      }
    }

    // Fallback response
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return NextResponse.json({ response: randomResponse });

  } catch (error) {
    console.error('Elf chat error:', error);
    return NextResponse.json(
      { response: "My elf magic is glitching! Try asking again in a sec. 🧝‍♂️" },
      { status: 500 }
    );
  }
}
