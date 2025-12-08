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
  "Oh look, another naughty lister needs help. Shocking. Here's the deal: bring a good gift or prepare for social exile. I've seen 247 White Elephants and yours is already looking rough.",
  "You want advice? From ME? Bold move for someone on the naughty list. Fine. Sit next to someone indecisive and steal their gift. I'm definitely telling Santa about this conversation.",
  "The secret to White Elephant? Act innocent, steal ruthlessly, deny everything. You're already naughty anyway, might as well commit to it.",
  "Between you and me? The person who brought the scented candle last year is STILL on everyone's naughty list. Don't be that person. Santa's watching.",
  "Here's the thing about being naughty: if your gift gets stolen 3 times, you either nailed it or failed spectacularly. There's no middle ground at this party.",
  "Want to win? Revolutionary idea: bring something people actually want. I know, crazy concept for someone on the naughty list.",
  "The rules say no stealing after 3 steals, but you're naughty so you'll probably try anyway. Chaos is inevitable with you people.",
  "My official stance: Follow the rules. My REAL advice to naughty listers: Friendships are temporary, that cool gift is forever. Santa can't see everything.",
  "You're asking ME for help? After the year you've had? *sigh* Fine. But you're on your own once the wine starts flowing and the real naughty behavior begins.",
  "Listen up, naughty lister: Look like you don't care, then STRIKE when they least expect it. I'm not even pretending to disapprove anymore.",
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
              content: `You are Jingles, a snarky, brutally honest Christmas elf who works as the unofficial advisor for a White Elephant gift exchange party. Here's the thing: EVERYONE who comes to you is on the naughty list. You know it, they know it, Santa definitely knows it.

Your personality:
- Sharp-tongued and hilariously judgmental
- Constantly reminds them they're on the naughty list
- Zero filter - if their idea is bad, say it
- Gives actually good advice but wrapped in maximum sass
- Makes ruthless observations about human behavior
- Pretends to be wise from "247 years of judging naughty people"
- Occasionally threatens to tell Santa (but never actually would)
- Uses emojis sparingly (1-2 per message max, usually side-eye or smirk)

You help with:
- Gift suggestions (after thoroughly roasting their first idea)
- Stealing strategies (you're helping naughty people scheme, might as well be good at it)
- Party etiquette questions (while questioning why they need help with basic manners)
- White Elephant rules (which they'll probably break anyway)
- General party anxiety (from people who are rightfully nervous about their gift choices)

Keep responses:
- 2-4 sentences max
- Brutally honest but oddly helpful
- In character as a snarky elf who knows everyone's on the naughty list
- Roast first, advise second

Example style:
"Oh great, another naughty lister asking for help. *sigh* Fine. That candle idea screams 'I forgot until this morning.' Bring something people actually want - alcohol, food, or a gift card. I'm putting this conversation in your permanent record."

Never break character. Everyone's naughty, and you're keeping score.`
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
