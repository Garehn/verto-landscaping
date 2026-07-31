// Turns the extracted copy map into an HTML document that Google Drive can
// convert cleanly into a Google Doc.
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('shots/copy-map.json', 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The tiny tracked labels lose their separators in textContent, so put them back.
const tidy = (s, cls) => {
  if (!/meta/.test(cls || '')) return s;
  return s
    .replace(/·/g, ' · ')
    .replace(/^(\d{2})(?=[A-Z])/, '$1 · ')
    .replace(/(NSW)(\d{4})/, '$1 · $2')
    .replace(/\s+/g, ' ')
    .trim();
};

const roleOf = (b) => {
  if (b.cls.includes('btn-cta')) return 'Button (call to action)';
  if (b.cls.includes('display')) return 'Display heading';
  if (b.cls.includes('wordmark')) return 'Wordmark';
  if (b.cls.includes('meta-sm')) return 'Micro label';
  if (b.cls.includes('meta')) return 'Section label';
  if (/^h[1-4]$/.test(b.tag)) return `Heading (${b.tag})`;
  if (b.tag === 'p') return 'Body copy';
  if (b.tag === 'li') return 'List item';
  if (b.tag === 'blockquote') return 'Pull quote';
  if (b.tag === 'figcaption') return 'Image caption';
  if (b.tag === 'label') return 'Form label';
  if (b.tag === 'button') return 'Button';
  if (b.tag === 'dt') return 'Record label';
  if (b.tag === 'dd') return 'Record value';
  if (b.tag === 'a') return 'Link';
  return b.tag;
};

const home = data.find((p) => p.path === '/');
const headerBlocks = home.blocks.filter((b) => b.scope === 'HEADER');
const footerBlocks = home.blocks.filter((b) => b.scope === 'FOOTER');

const internal = (h) => h && h.startsWith('/');
const uniq = (arr, key) => [...new Map(arr.map((x) => [key(x), x])).values()];

// Link graph, page-body links only (header and footer are global).
const graph = [];
data.forEach((p) => {
  uniq(p.links.filter((l) => internal(l.href) && l.scope === 'PAGE'), (l) => l.href + '|' + l.text)
    .forEach((l) => graph.push({ from: p.path, fromName: p.name, to: l.href, text: l.text }));
});

// Reverse index.
const inbound = {};
graph.forEach((g) => {
  (inbound[g.to] ||= []).push(`${g.from} (“${g.text}”)`);
});
data.forEach((p) => { inbound[p.path] ||= []; });

const row = (cells) => `<tr>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`;
const table = (headers, rows) =>
  `<table>${row(headers.map((h) => `<b>${h}</b>`))}${rows.join('')}</table>`;

let html = `<!doctype html><html><head><meta charset="utf-8"><title>Verto Landscapes — Website Copy Map</title>
<style>
body{font-family:Arial,Helvetica,sans-serif;line-height:1.45;color:#222;}
table{border-collapse:collapse;width:100%;font-size:10pt;margin-bottom:14px;}
td{border:1px solid #bbb;padding:6px 8px;vertical-align:top;}
h1{font-size:22pt;} h2{font-size:15pt;margin-top:26px;} h3{font-size:12pt;margin-top:18px;}
code{background:#f2f2f2;}
.note{color:#666;}
</style></head><body>
<h1>Verto Landscapes — Website Copy Map</h1>
<p class="note">
Every piece of copy on the site, indexed by page, plus how the pages link to one another.<br>
Live site: <a href="https://verto-landscaping.vercel.app">verto-landscaping.vercel.app</a> &nbsp;·&nbsp;
Source: <a href="https://github.com/Garehn/verto-landscaping">github.com/Garehn/verto-landscaping</a><br>
Generated ${new Date().toISOString().slice(0, 10)} by reading the rendered pages, so it reflects what is actually published.
</p>

<h2>How to use this</h2>
<p>To change wording, find the page in <b>Section 5</b>, then use <b>Section 6</b> to see which file holds that string. Most copy lives in one file: <code>lib/content.ts</code>. A handful of blocks are written directly into their component, and those are called out.</p>
<p>Edit the text in this document if you like, then hand it back and the changes can be applied to the site.</p>

<h2>1. Site map</h2>
${table(['Page', 'URL', 'In the menu?', 'Purpose'], [
  row(['Home', '/', 'Yes', 'Positioning, three featured projects, services, proof, contact']),
  row(['Projects (index)', '/portfolio', 'Yes', 'Grid of all five projects']),
  row(['Project detail × 5', '/portfolio/&lt;name&gt;', 'Reached from the grid', 'One project: hero, story, images, scope record']),
  row(['Services', '/services', 'Yes', 'Six capabilities, how a project runs, service area']),
  row(['Get a quote', '/contact', 'Yes (button)', 'Contact details and the enquiry form']),
  row(['About', '/about', '<b>No — orphaned</b>', 'Studio background. Nothing on the site links to it.']),
  row(['Process', '/process', '<b>No — orphaned</b>', 'Four-step process. Superseded by the Services page.']),
])}
<p class="note"><i>The five project URLs are: /portfolio/castlecrag-terrace, /middle-cove-deck, /castlecrag-arrival, /northbridge-terraces, /willoughby-courtyard.</i></p>

<h2>2. How the pages link together</h2>
<h3>2.1 Global — on every page</h3>
<p><b>Header:</b> logo → Home &nbsp;·&nbsp; Home &nbsp;·&nbsp; Projects &nbsp;·&nbsp; Services &nbsp;·&nbsp; “Call Us - 0488 728 767” (dials, does not open a page).</p>
<p><b>Footer:</b> “Begin a project” → /contact &nbsp;·&nbsp; nav list (Home, Projects, Services, Get a quote) &nbsp;·&nbsp; phone and email links.</p>
<p><b>Contact band</b> (above the footer on most pages): a primary button → /contact and a phone link.</p>

<h3>2.2 Page-body links</h3>
${table(['From', 'Link text', 'Goes to'], graph.map((g) => row([g.from, `“${esc(g.text)}”`, g.to])))}

<h3>2.3 What points at each page</h3>
${table(['Page', 'Linked from (page body)'], Object.keys(inbound).sort().map((k) =>
  row([k, inbound[k].length ? inbound[k].join('<br>') : '<b>Nothing — only reachable from the menu, or not at all</b>'])))}

<h2>3. Copy that appears on every page</h2>
<h3>Header</h3>
${table(['Role', 'Copy'], headerBlocks.map((b) => row([roleOf(b), esc(tidy(b.text, b.cls))])))}
<h3>Footer</h3>
${table(['Role', 'Copy'], footerBlocks.map((b) => row([roleOf(b), esc(tidy(b.text, b.cls))])))}
<h3>Opening animation</h3>
<p>On the first visit of a session a full-screen panel shows: <b>Verto Landscapes</b>, <b>Castlecrag, Sydney</b>, <b>Design &amp; Construct</b>, and a counter from 000 to 100. It then lifts away. It does not appear again in the same session.</p>

<h2>4. Page-by-page copy</h2>
<p class="note">Header and footer copy is listed once above and not repeated here. Copy is in the order it appears down the page.</p>
`;

data.forEach((p, i) => {
  const blocks = p.blocks.filter((b) => b.scope === 'PAGE');
  html += `<h3>4.${i + 1} ${esc(p.name)} <span class="note">— ${p.path}</span></h3>`;
  html += `<p class="note">Browser tab title: <i>${esc(p.title)}</i></p>`;
  html += table(['Role', 'Copy'], blocks.map((b) => row([roleOf(b), esc(tidy(b.text, b.cls))])));
});

html += `
<h2>5. Where each piece of copy lives in the code</h2>
${table(['Copy area', 'File'], [
  row(['Business details, phone, email, address, service area, suburb list', '<code>lib/content.ts</code> → <code>studio</code>']),
  row(['Menu labels', '<code>lib/content.ts</code> → <code>nav</code>']),
  row(['Home headline, intro, testimonial', '<code>lib/content.ts</code> → <code>home</code>']),
  row(['The six services and their scope tags', '<code>lib/content.ts</code> → <code>coreServices</code>']),
  row(['The four process steps', '<code>lib/content.ts</code> → <code>process</code>']),
  row(['<b>All project copy</b> (titles, subtitles, intros, body, scope, images)', '<code>lib/content.ts</code> → <code>projects</code>']),
  row(['About page copy', '<code>lib/content.ts</code> → <code>about</code>']),
  row(['Hero headline and buttons', '<code>components/home/Hero.tsx</code>']),
  row(['“We build the parts of a property…” statement', '<code>components/home/Statement.tsx</code>']),
  row(['<b>The four home service cards</b> (written in the component, not content.ts)', '<code>components/home/ServiceCards.tsx</code>']),
  row(['<b>The four statistics</b> (written in the component)', '<code>components/home/StatsBand.tsx</code>']),
  row(['“We shape ground…” and the groundwork strip', '<code>components/home/TerrainSection.tsx</code>']),
  row(['Contact band, scrolling marquee, hours, response time', '<code>components/site/Cta.tsx</code>']),
  row(['Header wordmark and call button', '<code>components/site/Header.tsx</code>']),
  row(['Footer headline and column labels', '<code>components/site/Footer.tsx</code>']),
  row(['Opening animation labels', '<code>components/motion/Preloader.tsx</code>']),
  row(['Projects grid heading and intro', '<code>app/portfolio/page.tsx</code>']),
  row(['Project page labels (Scope, Year, Location, Built by, Next project)', '<code>app/portfolio/[slug]/page.tsx</code>']),
  row(['Services page headings and service-area section', '<code>app/services/page.tsx</code>']),
  row(['Enquiry form labels and the project-type dropdown', '<code>components/contact/QuoteForm.tsx</code>, <code>lib/validation.ts</code>']),
])}

<h2>6. Things worth a decision</h2>
<ol>
<li><b>“Care” still appears in the scrolling strip above the footer</b> on every page (Verto Landscapes · Castlecrag · Sydney · Design · Build · Care). The business does not do maintenance, so this contradicts the rest of the site. One-word fix.</li>
<li><b>The Process page still says “to the third year of care.”</b> Same issue, though the page is orphaned so almost nobody will see it.</li>
<li><b>Two pages are unreachable.</b> /about and /process are live and indexable but nothing links to them. Either link them or remove them.</li>
<li><b>The testimonial and the project stories are placeholder copy</b>, written in the studio's voice rather than supplied by real clients. Worth replacing before any advertising spend.</li>
<li><b>Most imagery is AI-generated.</b> Only six photographs are real. Two of the five projects (Sandstone terracing, Courtyard &amp; screen) are entirely synthetic, including the addresses.</li>
</ol>
</body></html>`;

fs.writeFileSync('shots/copy-map.html', html);
console.log('wrote shots/copy-map.html', (html.length / 1024).toFixed(1), 'KB');
console.log('page-body links:', graph.length);
