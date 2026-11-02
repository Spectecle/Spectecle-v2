// robots.txt is a route handler (not robots.ts) because Next's Robots type can't
// emit Content-Signal lines.
//
// AI policy (owner decision, Nov 2026): appear in search and AI answers, but no
// model training. Training-only crawlers are blocked outright; search and
// user-triggered crawlers (Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot,
// PerplexityBot, Applebot) fall through to the * group and stay allowed.
// Google-Extended controls Gemini/Vertex training only, not Google Search or AI Overviews.
const ROBOTS = `# Spectecle: search and AI answers yes, AI model training no.

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Bytespider
User-agent: cohere-ai
User-agent: cohere-training-data-crawler
User-agent: meta-externalagent
Content-Signal: search=yes, ai-input=yes, ai-train=no
Disallow: /

User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

Sitemap: https://spectecle.com/sitemap.xml
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(ROBOTS, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
