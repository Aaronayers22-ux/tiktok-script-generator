// ForgeScript — frontend logic
// Calls the /api/generate serverless function which talks to Gemini.

const generateBtn = document.getElementById('generateBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const topicInput = document.getElementById('topic');

async function generateScript() {
    const topic = topicInput.value.trim() || "this topic";
    const niche = document.getElementById('niche').value;
    const tone = document.getElementById('tone').value;
    const duration = parseInt(document.getElementById('duration').value, 10);
    const hookStyle = document.getElementById('hookStyle').value;

    setLoading(true);

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, niche, tone, duration, hookStyle })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Generation failed');
        }

        renderScript(data);
    } catch (err) {
        console.error(err);
        showError(err.message || 'Sorry, something went wrong. Please try again.');
    } finally {
        setLoading(false);
    }
}

function renderScript(script) {
    document.getElementById('hookText').textContent = script.hook;
    document.getElementById('bodyText').textContent = script.body;
    document.getElementById('ctaText').textContent = script.cta;
    document.getElementById('hashtagsText').textContent = script.hashtags;
    document.getElementById('soundText').textContent = script.sound;
    document.getElementById('visualText').textContent = script.visual;
    document.getElementById('bodyBadge').textContent = script.bodyTime;
    document.getElementById('ctaBadge').textContent = script.ctaTime;

    const outputSection = document.getElementById('outputSection');
    outputSection.classList.add('visible');

    setTimeout(() => {
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function setLoading(isLoading) {
    [generateBtn, regenerateBtn].forEach(btn => {
        if (!btn) return;
        if (isLoading) {
            btn.dataset.originalText = btn.textContent;
            btn.textContent = 'Generating...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.style.cursor = 'wait';
        } else {
            btn.textContent = btn.dataset.originalText || btn.textContent;
            btn.disabled = false;
            btn.style.opacity = '';
            btn.style.cursor = '';
        }
    });
}

function showError(message) {
    let banner = document.getElementById('errorBanner');
    if (!banner) {
        banner = document.createElement('div');
        banner.id = 'errorBanner';
        banner.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff0050, #c200ff);
            color: white;
            padding: 14px 22px;
            border-radius: 12px;
            font-weight: 600;
            box-shadow: 0 12px 40px rgba(255, 0, 80, 0.5);
            z-index: 1000;
            max-width: 90%;
            text-align: center;
            animation: slideUpError 0.3s ease;
        `;
        document.body.appendChild(banner);

        const style = document.createElement('style');
        style.textContent = `@keyframes slideUpError { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }`;
        document.head.appendChild(style);
    }
    banner.textContent = message;
    banner.style.display = 'block';
    setTimeout(() => {
        if (banner) banner.style.display = 'none';
    }, 5000);
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

    return `FORGESCRIPT — VIRAL TIKTOK SCRIPT
=================================

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

— Generated at forgescript.app
`;
}

function copyScript() {
    const text = getFullScriptText();
    navigator.clipboard.writeText(text).then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.textContent = original;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        showError("Couldn't copy to clipboard. Please copy manually.");
    });
}

function downloadScript() {
    const text = getFullScriptText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forgescript-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

generateBtn.addEventListener('click', generateScript);
regenerateBtn.addEventListener('click', generateScript);
copyBtn.addEventListener('click', copyScript);
downloadBtn.addEventListener('click', downloadScript);

topicInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateScript();
    }
});
