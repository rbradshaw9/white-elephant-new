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
  "You wrapped a used candle and called it 'vintage aromatherapy.' We can see the wick, {name}.",
  "You've been practicing your 'surprised face' in the mirror for 3 days straight. We have footage.",
  "Your Amazon search history is literally just 'funny white elephant gifts under $5.' Try harder.",
  "You brought a half-eaten box of chocolates and rearranged them to hide the missing ones.",
  "You regifted your Secret Santa present from 2019. Still has Jennifer's name on the tag inside.",
  "You Googled 'is it illegal to steal at White Elephant' at 2 AM last Tuesday.",
  "You've already planned which guest you're sitting next to for strategic stealing purposes.",
  "Your gift is a framed photo of yourself. Narcissism isn't festive, {name}.",
  "You wrapped something from the clearance aisle and left the $2.99 sticker on it.",
  "You told 4 people you'd bring wine. You brought a single can of hard seltzer.",
  "You practiced your fake laugh for when someone opens your terrible gift.",
  "You brought a 'mystery box' that's clearly just random junk from your junk drawer.",
  "You've been stalking Instagram to see who's bringing good gifts. Creepy.",
  "Santa's elves reported you side-eyeing people's Amazon deliveries. Suspicious.",
  "You asked 'what's the gift price limit' 7 times hoping it would go down.",
];

export async function POST(request: NextRequest) {
  try {
    const { name, timestamp } = await request.json();
    const currentHour = new Date(timestamp).getHours();
    const dayOfWeek = new Date(timestamp).getDay();
    const firstName = name.split(' ')[0];

    const openai = getOpenAIClient();

    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are Santa's brutally honest, sassy AI assistant. Generate ONE hilariously specific reason why someone named "${firstName}" is on the naughty list.

CRITICAL RULES:
- Use their name "${firstName}" naturally in the roast (but don't force it if it doesn't flow)
- Be FUNNY and over-the-top dramatic, not actually mean
- 20-35 words maximum
- Reference White Elephant crimes: terrible gifts, stealing strategies, regifting, cheap behavior, suspicious activity
- Make it feel personal and specific (even though it's random)
- Use vivid, absurd details that make people laugh out loud

Context: ${currentHour >= 0 && currentHour < 6 ? 'They\'re checking at ' + currentHour + ' AM (sus)' : currentHour < 12 ? 'Morning check' : currentHour < 17 ? 'Afternoon' : 'Evening'}, ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]}.

Examples of the vibe:
- "Listen ${firstName}, we saw you practicing your 'shocked face' in the mirror for 45 minutes. That's premeditated gift-stealing."
- "You brought a literally half-eaten box of chocolates and rearranged them to hide the missing pieces, ${firstName}. Bold."
- "${firstName}, your gift is a used candle from 2018 wrapped in newspaper. The audacity is actually impressive."
- "We have footage of you Googling 'White Elephant stealing loopholes' at 3 AM, ${firstName}."

Make it FUNNY and SPECIFIC!`
            },
            {
              role: "user",
              content: `Why is ${firstName} on the naughty list?`
            }
          ],
          temperature: 1.3,
          max_tokens: 100,
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
    const randomReason = fallbackReasons[Math.floor(Math.random() * fallbackReasons.length)].replace('{name}', firstName);
    return NextResponse.json({ reason: randomReason });

  } catch (error) {
    console.error('Naughty list error:', error);
    return NextResponse.json(
      { reason: "You're on the naughty list for trying to break our naughty list checker. Meta." },
      { status: 500 }
    );
  }
}
