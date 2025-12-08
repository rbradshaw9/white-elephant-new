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
  "You didn't hold the door for an elderly woman last Tuesday. She cursed you out AND reported you to Santa, {name}.",
  "You've been pronouncing 'GIF' wrong for 15 years. Santa finally had enough and filed the paperwork himself.",
  "You told someone their baby was 'interesting looking.' Honesty isn't always the best policy, {name}.",
  "You return Amazon packages at Kohl's just to rack up Kohl's Cash. That's not financial strategy, that's emotional terrorism.",
  "You microwave fish at work. Every. Single. Thursday. HR is tired of the complaints, {name}.",
  "You reply-all to company emails with 'Thanks!' Santa called that digital littering and he's not wrong.",
  "You use speakerphone in public. The Starbucks barista personally filed your naughty list complaint, {name}.",
  "You leave your shopping cart in the parking spot instead of the return. Cart Narcs AND Santa are watching you.",
  "You 'forgot' your wallet for the third group dinner in a row. Venmo requests have been sent to the North Pole.",
  "You call your ex just to see if they're doing worse than you. Santa has the call logs, {name}.",
  "You pretend not to see people waving at you so you don't have to talk. Antisocial behavior is still behavior.",
  "You double-dip chips at parties. CDC AND Santa's workshop have been notified, {name}.",
  "You brag about waking up at 5 AM. Nobody asked, nobody cares, but Santa's elves are exhausted just listening.",
  "You ghosted your therapist. Even Santa thinks that's cold, {name}.",
  "You tell people you 'don't really watch TV' but binged 47 hours of reality shows last month. The Roku knows.",
  "You claim you're 'basically fluent' in Spanish after 2 Duolingo lessons. Rosetta Stone filed a formal complaint.",
  "You take Instagram photos of your food but never tip over 15%. The servers have a group chat about you, {name}.",
  "You pronounce it 'expresso' and refuse to be corrected. Starbucks blacklisted you from the North Pole location.",
  "You hit 'no tip' on the iPad and maintained eye contact with the cashier. Bold. Evil. Documented, {name}.",
  "You still have Christmas lights up from 2023. Your HOA AND Santa's elves filed joint custody of your naughty status.",
  "You borrow people's chargers and never return them. There's a dedicated evidence locker at the North Pole, {name}.",
  "You spoil TV shows in casual conversation. Marvel Studios personally escalated your case to Santa.",
  "You play music through your phone speaker on hiking trails. Mother Nature herself filed this complaint, {name}.",
  "You show up to potlucks with store-bought cookies still in the plastic container. The audacity has been logged.",
  "You say 'we should hang out soon' with zero intention of following through. Santa sees the empty promises, {name}.",
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
              content: `You are Santa's brutally honest, sassy AI assistant. Generate ONE hilariously specific reason why someone named "${firstName}" is on the naughty list for everyday bad behavior.

CRITICAL RULES:
- Use their actual name "${firstName}" naturally in the roast (but don't force it if it doesn't flow)
- Be FUNNY, slightly edgy, and over-the-top dramatic - not actually mean
- 20-35 words maximum
- Focus on relatable, funny everyday transgressions: social faux pas, minor rude behavior, annoying habits, small lies, petty crimes
- NOT about White Elephant or party stuff - think real-world naughty behavior everyone secretly does
- Make it feel personal and specific (even though it's random)
- Use vivid, absurd details that make people laugh out loud
- Slightly adult humor is encouraged (nothing explicit, but wine/relationship/work/therapy jokes are fair game)

Context: ${currentHour >= 0 && currentHour < 6 ? 'They\'re checking at ' + currentHour + ' AM (sus behavior)' : currentHour < 12 ? 'Morning check' : currentHour < 17 ? 'Afternoon' : 'Evening'}, ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]}.

Examples of the vibe (use ${firstName} in your response, not the examples):
- "You microwave fish at work, Ryan. The entire office filed a collective complaint with HR AND Santa."
- "You ghosted your therapist. Even Santa thinks that's cold, Sarah."
- "You reply-all to company emails with just 'Thanks!' Santa called it digital littering and he's right."
- "You pretend not to see people waving so you don't have to talk. Antisocial behavior is still behavior, Mike."
- "You double-dip chips at every party. The CDC AND Santa's elves have been notified, Jessica."
- "You use speakerphone in public places. Multiple Starbucks baristas filed formal complaints."
- "You take photos of your food but tip 12%. Servers have a group chat about you, Alex."

Make it FUNNY, RELATABLE, and about everyday bad behavior!`
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
