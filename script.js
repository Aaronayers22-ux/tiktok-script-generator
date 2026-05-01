// Viral TikTok Script Generator

const hooks = {
    question: [
        "Did you know {topic} can change your life in 30 days?",
        "What if I told you everything you knew about {topic} was wrong?",
        "Why is nobody talking about this {topic} hack?",
        "Have you ever wondered why {topic} actually works?",
        "Wait... you're STILL doing {topic} the old way?"
    ],
    shocking: [
        "I just discovered the wildest {topic} secret and I had to share it.",
        "This {topic} trick literally broke my brain.",
        "Stop scrolling. This {topic} fact is going to blow your mind.",
        "Nobody is ready for what I'm about to tell you about {topic}.",
        "I cannot believe this {topic} hack actually works."
    ],
    pov: [
        "POV: You finally cracked the code on {topic}.",
        "Storytime: How {topic} completely changed my life.",
        "POV: Your friend asks you for the best {topic} advice.",
        "Let me tell you about the day {topic} clicked for me.",
        "POV: It's been 90 days since you started {topic}, and people are starting to notice."
    ],
    listicle: [
        "3 things about {topic} I wish I knew sooner.",
        "5 {topic} mistakes you're probably making right now.",
        "Here are 3 unhinged {topic} tips that actually work.",
        "The only 4 {topic} rules you'll ever need.",
        "7 {topic} hacks the internet doesn't want you to know."
    ],
    controversial: [
        "Hot take: Most advice about {topic} is completely wrong.",
        "I'm going to say something controversial about {topic}.",
        "The {topic} industry doesn't want you to hear this.",
        "Unpopular opinion: {topic} is overrated, here's why.",
        "I'm tired of everyone lying about {topic}, so let me set the record straight."
    ],
    transformation: [
        "30 days ago I started {topic}. Here's what changed.",
        "Before: I was lost. After 60 days of {topic}: completely different person.",
        "From zero to hero with {topic} — and it only took 2 weeks.",
        "Watch what happened when I committed to {topic} for a month.",
        "This is what {topic} did to me in 90 days."
    ]
};

const bodies = {
    energetic: [
        "Okay listen, I need you to LOCK IN. The reason most people fail at {topic} is because they skip the basics. Step one: stop overthinking. Step two: start small but stay consistent. Step three: track everything. I went from zero results to insane progress in just a few weeks doing this. The trick is, you have to actually DO it. Not save the video. Not bookmark it. Actually DO it. Trust me, your future self will thank you.",
        "Hear me out — this is GAME CHANGING. The system that nobody talks about for {topic} is so simple it's stupid. First, you identify the one thing that matters most. Second, you cut out everything that doesn't move the needle. Third, you double down. That's it. That's the whole strategy. People are out here making {topic} 10x harder than it needs to be."
    ],
    storytelling: [
        "So picture this: I was at the lowest point with {topic}. Nothing was working. I was about to quit. And then I met someone who completely flipped the script for me. They told me one thing — just ONE thing — and it changed everything. They said the real secret isn't doing more. It's doing less, but better. That hit me like a truck. I went home that night and rebuilt my entire approach to {topic} from scratch. And within weeks, I was getting results I never thought were possible.",
        "Last year, I was completely stuck on {topic}. Months of effort, zero progress. Then one random Tuesday, I tried something different. Instead of forcing it, I leaned into what actually felt natural. And that tiny shift unlocked everything. Now {topic} is one of the best things in my life."
    ],
    educational: [
        "Here's how {topic} actually works. There are three core principles you need to understand. First, the foundation — without this, nothing else matters. Second, the process — this is where most people quit too early. Third, the refinement — this is what separates beginners from experts. If you apply these three principles consistently for at least 30 days, you will see real, measurable change. The science backs this up, and so does my personal experience.",
        "Let me break {topic} down simply. The reason this works is because of how your brain forms habits. When you repeat an action consistently in the same context, neural pathways strengthen. So the key isn't motivation — it's environment design. Set up your space, schedule, and triggers to make {topic} the path of least resistance."
    ],
    funny: [
        "Okay so I tried {topic} and let me just say... I was NOT prepared. Day one, I was full of confidence. Day two, I was crying. Day three, I almost gave up. But then something weird happened — it actually started working. And now I'm here looking like I have my life together, but secretly? Still chaotic. Still unhinged. Just a slightly more organized version of unhinged.",
        "Real talk, my journey with {topic} has been a complete mess. I've tried every method, watched every video, bought every course, and what finally worked was so embarrassingly simple I almost punched myself. It's giving 'I traveled the world to find myself and the answer was at home' vibes."
    ],
    dramatic: [
        "Everything you know about {topic} is built on a lie. For years, the same recycled advice has kept people stuck — going in circles, never breaking through. But there is a way out. There is a method, hidden in plain sight, that the people who actually succeed never talk about. It's not glamorous. It's not easy. But it works. And once you see it, you can never unsee it.",
        "This is the moment that changed everything. The instant I stopped following the crowd on {topic} and started trusting myself, the entire game shifted. Doors opened. Opportunities appeared. The version of me that I had been trying to become for years finally arrived."
    ],
    aesthetic: [
        "Slow mornings. Soft light. A cup of something warm. This is what {topic} looks like when you stop rushing it. There's no shortcut, no hack, just a quiet commitment to showing up. And in the showing up, something beautiful starts to bloom. You don't have to do it all at once. You just have to do it gently, every day.",
        "The most peaceful version of {topic} I've found is the one where I let go of the outcome. Where I just sit with it. Notice it. Allow it. The pressure dissolves and what's left is something honest, something true, something worth keeping."
    ]
};

const ctas = [
    "Follow for part 2 — it gets even better.",
    "Comment 'YES' if you want the full breakdown.",
    "Save this so you don't lose it. Share it with someone who needs it.",
    "Drop a comment with your biggest {topic} struggle and I'll respond.",
    "Like + follow for more {topic} content like this every day.",
    "If this helped you, send it to a friend. Let's grow together.",
    "Comment your favorite {topic} tip below — I'm reading every single one.",
    "Want the free guide? Comment 'GUIDE' and I'll DM it to you."
];

const hashtagsByNiche = {
    lifestyle: ["#lifestyle", "#dailyroutine", "#lifehack", "#selfcare", "#growth", "#mindset", "#fyp", "#viral"],
    fitness: ["#fitness", "#fittok", "#workout", "#gym", "#fitnessmotivation", "#health", "#fyp", "#gymtok"],
    business: ["#business", "#entrepreneur", "#money", "#sidehustle", "#hustle", "#wealth", "#fyp", "#businesstok"],
    beauty: ["#beauty", "#makeup", "#skincare", "#beautytok", "#glowup", "#beautytips", "#fyp", "#viral"],
    food: ["#foodtok", "#recipe", "#cooking", "#foodie", "#easyrecipes", "#yum", "#fyp", "#viral"],
    tech: ["#tech", "#techtok", "#gadgets", "#ai", "#productivity", "#techtips", "#fyp", "#innovation"],
    comedy: ["#comedy", "#funny", "#relatable", "#humor", "#lol", "#comedytok", "#fyp", "#viral"],
    education: ["#learnontiktok", "#education", "#study", "#studytok", "#learning", "#facts", "#fyp", "#knowledge"],
    travel: ["#travel", "#traveltok", "#wanderlust", "#adventure", "#traveltips", "#explore", "#fyp", "#viral"],
    fashion: ["#fashion", "#ootd", "#style", "#fashiontok", "#outfitideas", "#fashiontips", "#fyp", "#trending"]
};

const sounds = {
    energetic: ["High-energy hip-hop beat (e.g., 'Players' by Coi Leray remix)", "Trending hype EDM drop", "Fast-tempo viral pop remix", "Bass-heavy trap instrumental"],
    storytelling: ["Soft piano with subtle reverb", "Lo-fi beat with light melody", "Cinematic ambient pad", "Acoustic guitar fingerpicking"],
    educational: ["Upbeat lo-fi instrumental", "Subtle background beat (low volume)", "Calm jazz piano", "Minimal electronic loop"],
    funny: ["Trending meme sound", "Quirky upbeat instrumental", "Comedic 'oof' or punchline sound", "Recognizable viral audio clip"],
    dramatic: ["Cinematic trailer music with build-up", "Orchestral score with rising tension", "Dark synth pad", "Hans Zimmer-style cinematic drop"],
    aesthetic: ["Soft indie acoustic", "Dreamy synth-pop", "Slowed + reverb pop song", "Vibey lo-fi with vinyl crackle"]
};

const visualCues = {
    energetic: "Quick cuts every 1-2 seconds. Zoom-in transitions. Bright, saturated colors. Text overlays popping in with each beat. Rapid B-roll inserts.",
    storytelling: "Slow zooms and pans. Soft natural lighting. Wide establishing shots cut with close-ups on your face. Subtle text overlays for key quotes.",
    educational: "Clean, well-lit setup. Direct-to-camera shot. On-screen text bullets appearing as you speak. Use of arrows, circles, and highlights to emphasize points.",
    funny: "Reaction zoom-ins. Exaggerated facial expressions. Meme-style text overlays. Sudden cut to a different angle for punchlines.",
    dramatic: "Dim, moody lighting. Slow motion shots. Dark color grading. Text appearing letter by letter. Long pauses for tension.",
    aesthetic: "Natural light, golden hour preferred. Soft pastel color grading. Minimal text in clean serif font. Slow, smooth camera movements. Lots of negative space."
};

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function fillTemplate(template, topic) {
    return template.replace(/\{topic\}/g, topic);
}

function getTimeBadges(duration) {
    const hookEnd = 3;
    const ctaStart = duration - 5;
    return {
        body: `${hookEnd}-${ctaStart}s`,
        cta: `${ctaStart}-${duration}s`
    };
}

function generateScript() {
    const topicInput = document.getElementById('topic').value.trim();
    const topic = topicInput || "this topic";
    const niche = document.getElementById('niche').value;
    const tone = document.getElementById('tone').value;
    const duration = parseInt(document.getElementById('duration').value, 10);
    const hookStyle = document.getElementById('hookStyle').value;

    const hookTemplate = pickRandom(hooks[hookStyle]);
    const bodyTemplate = pickRandom(bodies[tone]);
    const ctaTemplate = pickRandom(ctas);

    const hookText = fillTemplate(hookTemplate, topic);
    const bodyText = fillTemplate(bodyTemplate, topic);
    const ctaText = fillTemplate(ctaTemplate, topic);

    const tagPool = hashtagsByNiche[niche];
    const shuffled = [...tagPool].sort(() => Math.random() - 0.5);
    const hashtagsText = shuffled.slice(0, 7).join(" ");

    const soundText = pickRandom(sounds[tone]);
    const visualText = visualCues[tone];

    const badges = getTimeBadges(duration);

    document.getElementById('hookText').textContent = hookText;
    document.getElementById('bodyText').textContent = bodyText;
    document.getElementById('ctaText').textContent = ctaText;
    document.getElementById('hashtagsText').textContent = hashtagsText;
    document.getElementById('soundText').textContent = soundText;
    document.getElementById('visualText').textContent = visualText;
    document.getElementById('bodyBadge').textContent = badges.body;
    document.getElementById('ctaBadge').textContent = badges.cta;

    const outputSection = document.getElementById('outputSection');
    outputSection.classList.add('visible');

    setTimeout(() => {
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function getFullScriptText() {
    const hook = document.getElementById('hookText').textContent;
    const body = document.getElementById('bodyText').textContent;
    const cta = document.getElementById('ctaText').textContent;
    const hashtags = document.getElementById('hashtagsText').textContent;
    const sound = document.getElementById('soundText').textContent;
    const visual = document.getElementById('visualText').textContent;
    const bodyBadge = document.getElementById('bodyBadge').textContent;
    const ctaBadge = document.getElementById('ctaBadge').textContent;

    return `VIRAL TIKTOK SCRIPT
===================

HOOK (0-3s):
${hook}

BODY (${bodyBadge}):
${body}

CALL TO ACTION (${ctaBadge}):
${cta}

HASHTAGS:
${hashtags}

SOUND / MUSIC VIBE:
${sound}

VISUAL CUES:
${visual}
`;
}

function copyScript() {
    const text = getFullScriptText();
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        alert("Couldn't copy to clipboard. Please copy manually.");
    });
}

function downloadScript() {
    const text = getFullScriptText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tiktok-script-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById('generateBtn').addEventListener('click', generateScript);
document.getElementById('regenerateBtn').addEventListener('click', generateScript);
document.getElementById('copyBtn').addEventListener('click', copyScript);
document.getElementById('downloadBtn').addEventListener('click', downloadScript);

document.getElementById('topic').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateScript();
    }
});
