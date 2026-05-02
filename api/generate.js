// Vercel Serverless Function — generates a unique TikTok script via Gemini Flash.
// Endpoint: POST /api/generate
// Env var required: GEMINI_API_KEY (set in Vercel Settings → Environment Variables)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'AI is not configured.' });
    }

    const { topic, niche, tone, duration, hookStyle } = req.body || {};

    if (!topic || !niche || !tone || !duration || !hookStyle) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const durationNum = parseInt(duration, 10);
    if (!Number.isFinite(durationNum) || durationNum < 5 || durationNum > 300) {
        return res.status(400).json({ error: 'Invalid duration' });
    }

    const safeTopic = String(topic).slice(0, 200);
    const hookEnd = 3;
    const ctaStart = Math.max(durationNum - 5, hookEnd + 5);

    const prompt = `You are an expert TikTok content strategist who writes viral, scroll-stopping scripts. Generate a complete TikTok script based on the inputs below.

Return ONLY valid JSON matching this exact structure (no markdown fences, no commentary):
{
  "hook": "string",
  "body": "string",
  "cta": "string",
  "hashtags": "string",
  "sound": "string",
  "visual": "string"
}

INPUTS
- Topic: ${safeTopic}
- Niche: ${niche}
- Tone: ${tone}
- Duration: ${durationNum} seconds
- Hook style: ${hookStyle}

GUIDELINES
- hook (0-${hookEnd}s): A scroll-stopping opening in the "${hookStyle}" pattern. Punchy, specific, max 1-2 sentences.
- body (${hookEnd}-${ctaStart}s): The main content in a ${tone} tone, fleshed out for a ${durationNum}-second video. Specific, vivid, concrete. Use the topic directly.
- cta (${ctaStart}-${durationNum}s): A call to action that drives comments, follows, saves, or shares. Casual and direct.
- hashtags: Exactly 7 trending and niche-relevant TikTok hashtags. Lowercase. Space-separated. Each starts with #.
- sound: Recommend ONE specific real-world TikTok sound or song that matches the tone.
- visual: 2-3 sentences of concrete shot list and editing direction.

Return ONLY the JSON object.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        const aiResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: 'application/json',
                    temperature: 0.95,
                    topP: 0.95,
                    maxOutputTokens: 1024
                }
            })
        });

        if (!aiResponse.ok) {
            const errText = await aiResponse.text();
            console.error('Gemini API error:', aiResponse.status, errText);
            return res.status(502).json({ error: 'AI service is unavailable. Please try again in a moment.' });
        }

        const data = await aiResponse.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return res.status(502).json({ error: 'AI did not return a result. Please try again.' });
        }

        let script;
        try {
            script = JSON.parse(text);
        } catch (e) {
            return res.status(502).json({ error: 'AI returned malformed output. Please try again.' });
        }

        const required = ['hook', 'body', 'cta', 'hashtags', 'sound', 'visual'];
        for (const key of required) {
            if (typeof script[key] !== 'string' || !script[key].trim()) {
                return res.status(502).json({ error: 'AI response was incomplete. Please try again.' });
            }
        }

        return res.status(200).json({
            ...script,
            bodyTime: `${hookEnd}-${ctaStart}s`,
            ctaTime: `${ctaStart}-${durationNum}s`
        });
    } catch (err) {
        console.error('Generation error:', err);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}
