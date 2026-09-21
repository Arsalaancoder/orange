import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colleges = [
  { id: 'ocn', name: 'Orange College of Nursing', tag: 'OCN', color1: '#F26A21', color2: '#101820', light: '#FFF8F5' },
  { id: 'acn', name: 'Apple College of Nursing', tag: 'ACN', color1: '#16A34A', color2: '#0F172A', light: '#F0FDF4' },
  { id: 'osn', name: 'Orange School of Nursing', tag: 'OSN', color1: '#EA580C', color2: '#1E293B', light: '#FFF7ED' },
  { id: 'asn', name: 'Apple School of Nursing', tag: 'ASN', color1: '#059669', color2: '#064E3B', light: '#ECFDF5' },
  { id: 'ssn', name: 'Sindoora School of Nursing', tag: 'SSN', color1: '#B91C1C', color2: '#450A0A', light: '#FEF2F2' },
  { id: 'vsn', name: 'Vennela School of Nursing', tag: 'VSN', color1: '#0284C7', color2: '#0C4A6E', light: '#F0F9FF' },
  { id: 'jpc', name: 'Jawan Paramedical College', tag: 'JPC', color1: '#2563EB', color2: '#172554', light: '#EFF6FF' },
  { id: 'spc', name: 'Siddhartha Paramedical Colleges', tag: 'SPC', color1: '#4F46E5', color2: '#1E1B4B', light: '#EEF2FF' }
];

const sections = [
  { key: 'thumb', title: 'Institutional Navigation', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { key: 'hero', title: 'Paramedical Clinical Training Campus', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { key: 'about', title: 'Academic & Learning Environment', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
  { key: 'campus_life', title: 'Clinical Exposure & Practical Care', icon: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' },
  { key: 'admissions', title: 'Admissions & Campus Guidance', icon: 'M12 2v20M2 12h20' },
  { key: 'fac1', title: 'Primary Nursing & Clinical Skills Lab', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { key: 'fac2', title: 'Smart Interactive Classroom', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' },
  { key: 'fac3', title: 'Medical Reference Library & Resource Center', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' },
  { key: 'fac4', title: 'Anatomy & Practical Demonstration Suite', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m16-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { key: 'gal1', title: 'Clinical Skill Simulation Session', icon: 'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2' },
  { key: 'gal2', title: 'Anatomical Model Practical Instruction', icon: 'M12 8v4l3 3' },
  { key: 'gal3', title: 'Community Health Outreach Workshop', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' },
  { key: 'gal4', title: 'Faculty Clinical Mentorship & Ward Rounds', icon: 'M9 12l2 2 4-4' }
];

function createSVG(col, sec) {
  const titleText = sec.title || 'Institutional Facility';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad_${col.id}_${sec.key}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${col.color2}" />
      <stop offset="50%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="${col.color1}" stop-opacity="0.9" />
    </linearGradient>
    <linearGradient id="accentGrad_${col.id}_${sec.key}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${col.color1}" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.8" />
    </linearGradient>
    <pattern id="gridPattern_${col.id}_${sec.key}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="800" fill="url(#bgGrad_${col.id}_${sec.key})" />
  <rect width="1200" height="800" fill="url(#gridPattern_${col.id}_${sec.key})" />

  <!-- Abstract Healthcare Geometry -->
  <circle cx="950" cy="150" r="300" fill="${col.color1}" opacity="0.12" />
  <circle cx="150" cy="650" r="250" fill="#FFFFFF" opacity="0.04" />
  <path d="M-100,500 Q300,300 700,600 T1300,400" fill="none" stroke="${col.color1}" stroke-width="3" opacity="0.25" />
  <path d="M-100,550 Q350,350 750,650 T1300,450" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.15" />

  <!-- Central Visual Container Card -->
  <rect x="100" y="100" width="1000" height="600" rx="24" fill="rgba(15, 23, 42, 0.4)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="2" />

  <!-- Decorative Top Banner -->
  <rect x="100" y="100" width="1000" height="8" fill="url(#accentGrad_${col.id}_${sec.key})" rx="4" />

  <!-- Monogram Logo Watermark -->
  <text x="1040" y="660" font-family="Georgia, serif" font-size="120" font-weight="900" fill="${col.color1}" opacity="0.15" text-anchor="end">${col.tag}</text>

  <!-- Icon Graphic -->
  <g transform="translate(180, 240) scale(4)" fill="none" stroke="${col.color1}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="${sec.icon || 'M12 2L2 7l10 5 10-5-10-5z'}" />
  </g>

  <!-- Content Block -->
  <text x="360" y="290" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="800" fill="${col.color1}" letter-spacing="3">${col.tag.toUpperCase()} • ${col.name.toUpperCase()}</text>
  <text x="360" y="340" font-family="Georgia, serif" font-size="38" font-weight="700" fill="#FFFFFF">${titleText}</text>
  <text x="360" y="385" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" fill="#94A3B8">Authentic Institutional Facility &amp; Clinical Learning Setup</text>

  <!-- Feature Pill Tags -->
  <rect x="360" y="430" width="180" height="38" rx="19" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" />
  <text x="450" y="454" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#E2E8F0" text-anchor="middle">VERIFIED FACILITY</text>

  <rect x="555" y="430" width="200" height="38" rx="19" fill="${col.color1}" opacity="0.9" />
  <text x="655" y="454" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">PRACTICAL TRAINING</text>

  <!-- Bottom Details Bar -->
  <line x1="160" y1="580" x2="1040" y2="580" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
  <text x="160" y="620" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#CBD5E1">Location: <tspan font-weight="700" fill="#FFFFFF">Telangana State</tspan></text>
  <text x="600" y="620" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#CBD5E1">Institution: <tspan font-weight="700" fill="#FFFFFF">${col.name}</tspan></text>
  <text x="1040" y="620" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="${col.color1}" font-weight="800" text-anchor="end">ORANGE GROUP EDUCATION</text>
</svg>`;
  return svg;
}

const dir = path.join(__dirname, '../public/images/generated');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

colleges.forEach(col => {
  sections.forEach((sec) => {
    const filename = `${col.id}_${sec.key}.svg`;
    const filepath = path.join(dir, filename);
    const content = createSVG(col, sec);
    fs.writeFileSync(filepath, content, 'utf8');
  });
});

console.log('Successfully generated all unique section SVG images including thumbs!');
