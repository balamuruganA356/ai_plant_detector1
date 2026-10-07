export interface SampleLeaf {
  id: string;
  key: string;
  plantName: string;
  diseaseName: string;
  isHealthy: boolean;
  thumbnail: string;
  description: string;
}

// Generate realistic SVG leaves as base64 Data URLs so users can test immediately with a single click!
const createSvgLeaf = (svgContent: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
};

const tomatoEarlyBlightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="leafGrad" cx="40%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#4d8834" />
      <stop offset="70%" stop-color="#315c1e" />
      <stop offset="100%" stop-color="#1f3d13" />
    </radialGradient>
    <radialGradient id="lesionGrad1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a1708" />
      <stop offset="40%" stop-color="#542e0d" />
      <stop offset="70%" stop-color="#93621c" />
      <stop offset="100%" stop-color="#c9b037" />
    </radialGradient>
    <radialGradient id="lesionGrad2" cx="45%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#1f1105" />
      <stop offset="50%" stop-color="#4a2c11" />
      <stop offset="85%" stop-color="#b88f28" />
      <stop offset="100%" stop-color="#55752b" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="5" stdDeviation="4" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f4f6f0"/>
  <!-- Stem -->
  <path d="M 200,380 Q 200,280 200,180" stroke="#486927" stroke-width="10" stroke-linecap="round" fill="none"/>
  <!-- Leaf Blade -->
  <path d="M 200,50 Q 280,120 310,210 Q 320,290 200,340 Q 80,290 90,210 Q 120,120 200,50 Z" 
        fill="url(#leafGrad)" filter="url(#shadow)" stroke="#224212" stroke-width="3"/>
  <!-- Veins -->
  <path d="M 200,60 L 200,335" stroke="#689e47" stroke-width="4" stroke-linecap="round"/>
  <path d="M 200,110 Q 240,120 275,135 M 200,160 Q 260,180 295,200 M 200,220 Q 255,245 280,270" stroke="#5d8f3e" stroke-width="2.5" fill="none"/>
  <path d="M 200,110 Q 160,120 125,135 M 200,160 Q 140,180 105,200 M 200,220 Q 145,245 120,270" stroke="#5d8f3e" stroke-width="2.5" fill="none"/>
  <!-- Early Blight Concentric Rings Lesions -->
  <!-- Lesion 1 (Lower Left) -->
  <circle cx="150" cy="240" r="38" fill="#d4c843" opacity="0.85" />
  <circle cx="150" cy="240" r="32" fill="url(#lesionGrad1)" />
  <circle cx="150" cy="240" r="24" fill="none" stroke="#2b1406" stroke-width="2.5" stroke-dasharray="8 4"/>
  <circle cx="150" cy="240" r="16" fill="none" stroke="#2b1406" stroke-width="2.5"/>
  <circle cx="150" cy="240" r="8" fill="#1b0c03"/>
  <!-- Lesion 2 (Mid Right) -->
  <circle cx="250" cy="180" r="42" fill="#d9ce45" opacity="0.8" />
  <circle cx="250" cy="180" r="35" fill="url(#lesionGrad2)" />
  <circle cx="250" cy="180" r="26" fill="none" stroke="#221105" stroke-width="2.5" stroke-dasharray="10 3"/>
  <circle cx="250" cy="180" r="15" fill="none" stroke="#221105" stroke-width="2"/>
  <circle cx="250" cy="180" r="7" fill="#140802"/>
  <!-- Smaller satellite lesions -->
  <circle cx="180" cy="130" r="14" fill="#cfb832" opacity="0.9"/>
  <circle cx="180" cy="130" r="10" fill="#3a1e09"/>
  <circle cx="230" cy="265" r="16" fill="#cfb832" opacity="0.9"/>
  <circle cx="230" cy="265" r="11" fill="#3a1e09"/>
</svg>
`;

const tomatoHealthySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="healthyGrad" cx="35%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#58a838" />
      <stop offset="60%" stop-color="#3c7a25" />
      <stop offset="100%" stop-color="#245214" />
    </radialGradient>
    <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadowHealthy" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="5" stdDeviation="4" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f4f6f0"/>
  <!-- Stem -->
  <path d="M 200,380 Q 200,280 200,180" stroke="#486927" stroke-width="9" stroke-linecap="round" fill="none"/>
  <!-- Healthy Leaf Blade -->
  <path d="M 200,45 Q 285,115 315,210 Q 325,290 200,345 Q 75,290 85,210 Q 115,115 200,45 Z" 
        fill="url(#healthyGrad)" filter="url(#shadowHealthy)" stroke="#225013" stroke-width="2.5"/>
  <path d="M 200,55 Q 260,115 285,190 Q 240,240 200,200 Z" fill="url(#shineGrad)"/>
  <!-- Clean Crisp Veins -->
  <path d="M 200,55 L 200,340" stroke="#77be4e" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M 200,105 Q 245,115 280,135 M 200,155 Q 265,175 300,195 M 200,215 Q 260,240 285,265" stroke="#66aa3f" stroke-width="2.5" fill="none"/>
  <path d="M 200,105 Q 155,115 120,135 M 200,155 Q 135,175 100,195 M 200,215 Q 140,240 115,265" stroke="#66aa3f" stroke-width="2.5" fill="none"/>
</svg>
`;

const potatoLateBlightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="potatoLeafGrad" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#467c29" />
      <stop offset="65%" stop-color="#2d5518" />
      <stop offset="100%" stop-color="#19330c" />
    </radialGradient>
    <radialGradient id="lateBlightBurn" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#141414" />
      <stop offset="50%" stop-color="#2b2319" />
      <stop offset="85%" stop-color="#5c4e36" />
      <stop offset="100%" stop-color="#807b55" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#f4f6f0"/>
  <path d="M 200,380 L 200,180" stroke="#3b571b" stroke-width="10" stroke-linecap="round"/>
  <!-- Leaf Blade -->
  <path d="M 200,60 C 270,90 320,180 300,280 C 270,330 230,340 200,345 C 170,340 130,330 100,280 C 80,180 130,90 200,60 Z" 
        fill="url(#potatoLeafGrad)" stroke="#1a350e" stroke-width="3"/>
  <path d="M 200,70 L 200,340" stroke="#6ca843" stroke-width="4"/>
  <!-- Water-soaked necrotic rot patch on upper right edge -->
  <path d="M 200,80 Q 260,90 290,140 Q 300,210 250,220 Q 210,200 200,160 Z" 
        fill="url(#lateBlightBurn)" opacity="0.95" stroke="#121212" stroke-width="2"/>
  <!-- Pale grayish-white sporulation fringe -->
  <path d="M 205,160 Q 230,195 255,215" stroke="#e0e8dc" stroke-width="3" stroke-dasharray="4 3" fill="none" opacity="0.8"/>
  <!-- Lower left blight lesion -->
  <path d="M 120,230 Q 160,240 180,280 Q 150,310 115,290 Z" 
        fill="url(#lateBlightBurn)" opacity="0.95" stroke="#14110e" stroke-width="2"/>
</svg>
`;

const appleScabSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="appleLeaf" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#55993a" />
      <stop offset="70%" stop-color="#366b22" />
      <stop offset="100%" stop-color="#214214" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#f4f6f0"/>
  <path d="M 200,380 Q 195,290 200,180" stroke="#4a6324" stroke-width="8" stroke-linecap="round"/>
  <!-- Broad Oval Apple Leaf -->
  <path d="M 200,50 C 280,70 330,160 310,260 C 290,320 240,345 200,350 C 160,345 110,320 90,260 C 70,160 120,70 200,50 Z" 
        fill="url(#appleLeaf)" stroke="#1a3b10" stroke-width="3"/>
  <path d="M 200,60 L 200,345" stroke="#71b54a" stroke-width="3.5"/>
  <!-- Olive-black velvety scab spots -->
  <ellipse cx="160" cy="170" rx="22" ry="18" fill="#2d3319" stroke="#4a5223" stroke-width="2"/>
  <ellipse cx="240" cy="210" rx="28" ry="24" fill="#242914" stroke="#454c20" stroke-width="2.5"/>
  <ellipse cx="170" cy="270" rx="19" ry="16" fill="#282e16" stroke="#485022" stroke-width="2"/>
  <circle cx="230" cy="130" r="14" fill="#2c3318"/>
  <circle cx="140" cy="220" r="10" fill="#2f381a"/>
</svg>
`;

const cornBlightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="cornLeaf" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#386b1f" />
      <stop offset="48%" stop-color="#559933" />
      <stop offset="50%" stop-color="#80c458" />
      <stop offset="52%" stop-color="#559933" />
      <stop offset="100%" stop-color="#2c5716" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#f4f6f0"/>
  <!-- Long Arching Corn Leaf Blade -->
  <path d="M 60,380 C 110,280 160,180 200,100 C 230,40 250,30 260,30 C 255,50 250,110 240,190 C 220,300 200,380 180,380 Z" 
        fill="url(#cornLeaf)" stroke="#224510" stroke-width="3"/>
  <!-- Central Midrib -->
  <path d="M 120,380 Q 200,180 255,35" stroke="#9ee874" stroke-width="4" fill="none"/>
  <!-- Cigar-shaped tan Northern Corn Leaf Blight lesions -->
  <path d="M 140,240 C 145,210 155,200 165,225 C 175,250 170,280 160,290 C 150,295 140,270 140,240 Z" 
        fill="#9c8758" stroke="#423518" stroke-width="2"/>
  <path d="M 175,170 C 180,140 188,135 198,155 C 208,175 204,200 195,210 C 185,215 175,195 175,170 Z" 
        fill="#a38e5d" stroke="#3b2f14" stroke-width="2"/>
</svg>
`;

const riceBlastSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="riceLeaf" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#468726"/>
      <stop offset="50%" stop-color="#67b83d"/>
      <stop offset="100%" stop-color="#3b7320"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#f4f6f0"/>
  <!-- Slender Rice Blade -->
  <path d="M 170,380 Q 185,200 200,40 Q 215,200 230,380 Z" fill="url(#riceLeaf)" stroke="#254d14" stroke-width="2.5"/>
  <path d="M 200,50 L 200,380" stroke="#8ce35d" stroke-width="2.5"/>
  <!-- Spindle / Diamond Shaped Blast Lesions -->
  <!-- Diamond 1 -->
  <polygon points="200,140 215,165 200,190 185,165" fill="#4d2411" stroke="#260f04" stroke-width="1.5"/>
  <polygon points="200,148 209,165 200,182 191,165" fill="#c4c9bf"/>
  <!-- Diamond 2 -->
  <polygon points="198,230 212,250 198,270 184,250" fill="#522712" stroke="#291105" stroke-width="1.5"/>
  <polygon points="198,237 207,250 198,263 189,250" fill="#cbd1c7"/>
</svg>
`;

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'sample-tomato-early-blight',
    key: 'Tomato_Early_Blight',
    plantName: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    thumbnail: createSvgLeaf(tomatoEarlyBlightSvg),
    description: 'Target-like concentric brown rings with yellow chlorotic margin on tomato leaf.',
  },
  {
    id: 'sample-tomato-healthy',
    key: 'Tomato_Healthy',
    plantName: 'Tomato',
    diseaseName: 'Healthy Tomato Leaf',
    isHealthy: true,
    thumbnail: createSvgLeaf(tomatoHealthySvg),
    description: 'Vibrant emerald green leaf with intact margins and zero lesions.',
  },
  {
    id: 'sample-potato-late-blight',
    key: 'Potato_Late_Blight',
    plantName: 'Potato',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    isHealthy: false,
    thumbnail: createSvgLeaf(potatoLateBlightSvg),
    description: 'Water-soaked expanding dark lesions with white fungal downy fringe.',
  },
  {
    id: 'sample-apple-scab',
    key: 'Apple_Scab',
    plantName: 'Apple',
    diseaseName: 'Apple Scab (Venturia inaequalis)',
    isHealthy: false,
    thumbnail: createSvgLeaf(appleScabSvg),
    description: 'Velvety olive-brown circular patches on upper leaf surface.',
  },
  {
    id: 'sample-corn-blight',
    key: 'Corn_Northern_Leaf_Blight',
    plantName: 'Corn (Maize)',
    diseaseName: 'Northern Corn Leaf Blight',
    isHealthy: false,
    thumbnail: createSvgLeaf(cornBlightSvg),
    description: 'Distinctive elongated cigar-shaped tan lesions along leaf blade veins.',
  },
  {
    id: 'sample-rice-blast',
    key: 'Rice_Blast',
    plantName: 'Rice',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    isHealthy: false,
    thumbnail: createSvgLeaf(riceBlastSvg),
    description: 'Diamond spindle-shaped spots with gray ash centers and brown halos.',
  },
];
