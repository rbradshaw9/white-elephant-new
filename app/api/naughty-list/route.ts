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
  "You wrapped a used candle from your ex's place and called it 'vintage.' The lipstick stain on the label says otherwise, {name}.",
  "Your search history: 'cheap White Elephant gifts,' 'is regifting illegal,' 'how to fake food poisoning.' Subtle.",
  "You brought a half-finished bottle of wine from 2017 and called it 'aged.' It's literally vinegar now, {name}.",
  "You regifted the weighted blanket your therapist gave you. Still has 'For your anxiety' on the tag.",
  "Your gift is a framed photo of yourself shirtless. Confidence is great, but this ain't it, {name}.",
  "You've been practicing your 'I'm so surprised!' face for when your terrible gift gets stolen. We have Ring doorbell footage.",
  "You Googled 'White Elephant stealing loopholes' at 3 AM. Drunk Googling is still planning, {name}.",
  "You wrapped something from HomeGoods clearance and somehow left THREE price stickers on it. Bold move.",
  "You told everyone you'd bring wine. You showed up with a single White Claw from a 12-pack. Math isn't your thing.",
  "Your 'mystery box' is literally just expired coupons and a half-used gift card to Blockbuster. It's 2025, {name}.",
  "You've mapped out who's bringing the best gifts based on their income. Jeff Bezos energy, minus the money.",
  "You brought an 'experience gift' that's just a handwritten coupon for coffee. That expires in 3 days. Cheap AND lazy.",
  "Santa's elves caught you stalking people's Amazon wishlists. That's not 'research,' that's restraining order territory.",
  "You asked if 'sentimental value' counts toward the price limit. Your old gym socks aren't sentimental, {name}.",
  "You wrapped a Bluetooth speaker that only plays static and one Nickelback song. Actual psychological warfare.",
  "Your gift is a half-used scented candle that smells like 'Tuesday morning regret.' Very on-brand for you.",
  "You brought a book you stole from a hotel. It still has the 'Property of Holiday Inn' stamp. Classy.",
  "Your wrapping paper is a CVS receipt from 2019. At least commit to the bit and make it longer.",
  "You practiced your evil laugh for when someone unwraps your gift. Your Alexa reported you for suspicious activity.",
  "You brought a scratch-off lottery ticket as a gift. It's already scratched. And it lost. Bold strategy.",
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
- Use their name "{firstName}" naturally in the roast (but don't force it if it doesn't flow)
- Be FUNNY, slightly edgy, and over-the-top dramatic - not actually mean
- 20-35 words maximum
- Reference White Elephant crimes: terrible gifts, stealing strategies, regifting, cheap behavior, suspicious activity, drunk planning
- Make it feel personal and specific (even though it's random)
- Use vivid, absurd details that make people laugh out loud
- Slightly adult humor is encouraged (nothing explicit, but wine jokes, ex references, therapy jokes are fair game)

Context: ${currentHour >= 0 && currentHour < 6 ? 'They\'re checking at ' + currentHour + ' AM (sus)' : currentHour < 12 ? 'Morning check' : currentHour < 17 ? 'Afternoon' : 'Evening'}, ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]}.

Examples of the vibe:
- "Listen {firstName}, you wrapped a half-finished wine bottle from your ex's place. The lipstick stain on the rim isn't festive."
- "You brought a weighted blanket your therapist gave you. Still has 'For your anxiety' on the tag, {firstName}. Thoughtful."
- "{firstName}, your gift is a framed thirst trap from 2019. Confidence is great but this ain't Tinder."
- "We have Ring footage of you drunk-Googling 'White Elephant stealing loopholes' at 3 AM, {firstName}. Premeditated."
- "You wrapped a Bluetooth speaker that only plays Nickelback. That's not a gift, that's psychological warfare, {firstName}."

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
