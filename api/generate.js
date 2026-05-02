// Vercel Serverless Function — generates a unique TikTok script via Gemini Flash.
// Endpoint: POST /api/generate
// Env var required: GEMINI_API_KEY (set in Vercel Settings → Environment Variables)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'AI is not configured. Please contact the site owner.' });
    }

    const { topic, niche, tone, duration, hookStyle } = req.body || {};

    if (!topic || !niche || !tone || !duration || !hookStyle) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const durationNum = parseInt(duration, 10);
    if (!Number.isFinite(durationNum) || durationNum < 5 || durationNum > 300) {
        return res.status(400).json({ error: 'Invalid duration' });
    }

    // Basic length cap to prevent prompt injection / abuse
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
- hook (0-${hookEnd}s): A scroll-stopping opening in the "${hookStyle}" pattern. Punchy, specific, max 1-2 sentences. Should make the viewer NEED to keep watching.
- body (${hookEnd}-${ctaStart}s): The main content, delivered in a ${tone} tone, fully fleshed out for a ${durationNum}-second video. Be specific, vivid, and concrete. Avoid filler. Use the topic concretely. This should feel like a real creator talking, not generic advice.
- cta (${ctaStart}-${durationNum}s): A call to action that drives comments, follows, saves, or shares. Casual and direct. Reference the topic if natural.
- hashtags: Exactly 7 trending and niche-relevant TikTok hashtags. All lowercase. Each starts with #. Space-separated. Mix broad (#fyp) and niche-specific.
- sound: Recommend ONE specific real-world TikTok sound, song name, or audio vibe that matches the tone. Be concrete (artist + track when applicable).
- visual: A concrete shot list and editing direction — cuts, zooms, lighting, text overlays, B-roll. 2-3 sentences of clear visual instructions.

Make this script feel like it was written by someone who has gone viral before. Specific over generic. Bold over safe.

Return ONLY the JSON object.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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
            console.error('Empty AI response:', JSON.stringify(data).slice(0, 500));
            return res.status(502).json({ error: 'AI did not return a result. Please try again.' });
        }

        let script;
        try {
            // Strip markdown code fences if Gemini wraps the JSON
            let cleaned = text.trim();
            cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '');
            cleaned = cleaned.replace(/\n?\s*```\s*$/i, '');
            // Fallback: extract first {...} block if there's still extra text
            if (!cleaned.startsWith('{')) {
                const match = cleaned.match(/\{[\s\S]*\}/);
                if (match) cleaned = match[0];
            }
            script = JSON.parse(cleaned);
        } catch (e) {
            console.error('Failed to parse AI JSON. Raw text:', text.slice(0, 800));
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
