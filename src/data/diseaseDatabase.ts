export interface DiseaseEntry {
  plant: string;
  scientificPlantName: string;
  disease: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Physiological' | 'None';
  isHealthy: boolean;
  symptoms: string[];
  visualMarkers: string[];
  explanation: string;
  typicalSeverityScore: number;
  severityLevel: 'Healthy' | 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  baseHealthScore: number;
  immediateActions: string[];
  longTermPrevention: string[];
  organicTreatment: string[];
  chemicalGuidance: string[];
  preventionTips: string[];
  weatherRiskTriggers: {
    minTemp: number;
    maxTemp: number;
    minHumidity: number;
    favorableRainfall: boolean;
    factors: string[];
  };
}

export const DISEASE_DATABASE: Record<string, DiseaseEntry> = {
  'Tomato_Early_Blight': {
    plant: 'Tomato',
    scientificPlantName: 'Solanum lycopersicum',
    disease: 'Early Blight',
    pathogenType: 'Fungal',
    isHealthy: false,
    symptoms: [
      'Dark brown to black concentric rings ("target-board" spots)',
      'Yellow chlorotic halos surrounding necrotic leaf spots',
      'Premature defoliation starting from lower foliage',
      'Stem cankers with sunken circular brown margins'
    ],
    visualMarkers: [
      'Concentric target-like rings on mature leaves',
      'Extensive yellowing (chlorosis) along leaf margins',
      'Irregular leaf spots coalescing into large dead patches',
      'Tissue necrosis along vascular leaf veins'
    ],
    explanation: 'AI detected distinct dark-brown concentric lesions surrounded by chlorotic yellow halos. These concentric "bullseye" rings on the lower leaf canopy are pathognomonic visual markers of Alternaria solani (Early Blight).',
    typicalSeverityScore: 58,
    severityLevel: 'Moderate',
    baseHealthScore: 62,
    immediateActions: [
      'Prune and safely destroy lower leaves exhibiting over 25% necrotic spotting.',
      'Disinfect pruning shears with 70% isopropyl alcohol between plants.',
      'Transition immediately from overhead sprinklers to drip or base furrow irrigation.',
      'Inspect adjacent nightshade family crops (potatoes, eggplants) for early lesion development.'
    ],
    longTermPrevention: [
      'Enforce a 3-year crop rotation cycle avoiding Solanaceous species.',
      'Apply 2-3 inches of clean organic straw mulch to create a rain-splash barrier from soil spores.',
      'Space plants at least 60 cm apart with sturdy trellising to foster continuous airflow.',
      'Select certified resistant cultivars (such as Mountain Supreme or Defiant) for subsequent plantings.'
    ],
    organicTreatment: [
      'Foliar spray of cold-pressed Neem oil (0.5% concentration) or Bacillus subtilis bio-fungicide every 7-10 days.',
      'Potassium bicarbonate or dilute copper soap spray applied early morning.'
    ],
    chemicalGuidance: [
      'Protectant fungicides (e.g. Chlorothalonil or Mancozeb formulations) applied as preventive covers according to state agricultural extension schedules.',
      'Always observe pre-harvest intervals (PHI) and rotate FRAC fungicide classes to delay resistance.'
    ],
    preventionTips: [
      'Keep foliage completely dry through targeted drip irrigation.',
      'Stakes and cages must be sanitized at the conclusion of each growing season.',
      'Avoid entering or harvesting the tomato patch when foliage is wet from morning dew.',
      'Ensure balanced potassium nutrition to reinforce cell wall thickness.'
    ],
    weatherRiskTriggers: {
      minTemp: 22,
      maxTemp: 32,
      minHumidity: 75,
      favorableRainfall: true,
      factors: [
        'Prolonged leaf wetness exceeding 8 hours',
        'Warm ambient temperatures between 24°C - 29°C',
        'High atmospheric humidity facilitating spore germination'
      ]
    }
  },

  'Tomato_Late_Blight': {
    plant: 'Tomato',
    scientificPlantName: 'Solanum lycopersicum',
    disease: 'Late Blight',
    pathogenType: 'Fungal',
    isHealthy: false,
    symptoms: [
      'Water-soaked pale green or dark brown rapidly expanding lesions',
      'White cottony fungal sporulation on leaf undersides during damp mornings',
      'Rapid wilting and collapse of entire leaf stems',
      'Firm brown greasy rot on developing green and ripe fruit'
    ],
    visualMarkers: [
      'Expansive water-soaked grayish lesions',
      'Pale fungal mycelium visible on abaxial leaf surface',
      'Rapid whole-stem petiole collapse',
      'Dark brown vascular streaking'
    ],
    explanation: 'AI detected large, water-soaked, irregular grayish-brown lesions rapidly destroying leaf tissue, consistent with Phytophthora infestans (Late Blight). Immediate quarantine action is critical.',
    typicalSeverityScore: 78,
    severityLevel: 'Severe',
    baseHealthScore: 38,
    immediateActions: [
      'Bag infected foliage immediately on a dry afternoon and dispose away from compost piles.',
      'Eliminate any volunteer tomato or cull potato piles within a 500-meter perimeter.',
      'Suspend all overhead watering to halt catastrophic downwind zoospore dispersal.',
      'Notify regional agricultural extension network if Late Blight is confirmed in the watershed.'
    ],
    longTermPrevention: [
      'Plant only certified disease-free transplants.',
      'Employ wide row spacing (90 cm minimum) orienting rows parallel to prevailing winds.',
      'Plant late blight-resistant cultivars possessing Ph-2 and Ph-3 gene resistance.'
    ],
    organicTreatment: [
      'Fixed copper hydroxide or copper octanoate applied strictly as a preventative shield prior to infection periods.'
    ],
    chemicalGuidance: [
      'Specialized systemic oomycete fungicides (e.g. cymoxanil or mandipropamid mixes) per regional agricultural department alerts.',
      'Adhere strictly to personal protective equipment (PPE) requirements and environmental buffer zones.'
    ],
    preventionTips: [
      'Monitor national and local late blight tracking maps.',
      'Scout fields daily during overcast, cool, humid weather spells.',
      'Ensure rapid surface drainage across the entire field bed.'
    ],
    weatherRiskTriggers: {
      minTemp: 14,
      maxTemp: 23,
      minHumidity: 85,
      favorableRainfall: true,
      factors: [
        'Cool, wet, overcast conditions (< 22°C with persistent drizzle)',
        'Relative humidity continuously above 85%',
        'Heavy night dew lasting through midday'
      ]
    }
  },

  'Tomato_Healthy': {
    plant: 'Tomato',
    scientificPlantName: 'Solanum lycopersicum',
    disease: 'Healthy Leaf',
    pathogenType: 'None',
    isHealthy: true,
    symptoms: [
      'Vibrant deep green foliage with uniform chlorophyll pigmentation',
      'Intact serrated leaf margins without necrotic blotches or curling',
      'Turgid petioles exhibiting vigorous vascular pressure',
      'Absence of fungal sporulation, powdery growth, or chlorotic halos'
    ],
    visualMarkers: [
      'Uniform emerald green coloration',
      'Intact cuticle and trichome structures',
      'No lesions, discoloration, or insect gnaw marks'
    ],
    explanation: 'AI analysis verified uniform chlorophyll distribution, intact cellular margin integrity, and zero detectable pathogen lesions or viral mosaic patterns. Plant exhibits optimal photosynthetic vigor.',
    typicalSeverityScore: 0,
    severityLevel: 'Healthy',
    baseHealthScore: 98,
    immediateActions: [
      'Continue regular soil moisture monitoring; irrigate deeply when top 3 cm of soil is dry.',
      'Maintain balanced organic mulching to preserve subterranean mycorrhizal health.'
    ],
    longTermPrevention: [
      'Maintain consistent bi-weekly inspection schedule.',
      'Perform regular seasonal soil testing to sustain 6.2 - 6.8 pH range.'
    ],
    organicTreatment: [
      'Routine compost tea or seaweed kelp extract foliar spray to boost systemic acquired resistance.'
    ],
    chemicalGuidance: [
      'No synthetic chemicals needed. Preventative scouting is recommended.'
    ],
    preventionTips: [
      'Prune lowest leaves to prevent soil splash during heavy showers.',
      'Support heavy fruiting branches with bamboo canes or trellis netting.'
    ],
    weatherRiskTriggers: {
      minTemp: 18,
      maxTemp: 28,
      minHumidity: 55,
      favorableRainfall: false,
      factors: ['Optimal growth weather', 'Low disease pressure']
    }
  },

  'Potato_Late_Blight': {
    plant: 'Potato',
    scientificPlantName: 'Solanum tuberosum',
    disease: 'Late Blight',
    pathogenType: 'Fungal',
    isHealthy: false,
    symptoms: [
      'Dark water-soaked necrotic patches with pale greenish-yellow borders',
      'Fine white downy mildew underneath leaves during moist mornings',
      'Rapid stem rotting causing vine collapse within 48 to 72 hours',
      'Brown granular dry rot extending into harvested tubers'
    ],
    visualMarkers: [
      'Large blotchy necrotic lesions across leaf tips and margins',
      'Downy white fungal growth visible on leaf undersides',
      'Stem petiole blackened necrosis'
    ],
    explanation: 'Visual signature matches Phytophthora infestans on Solanum tuberosum. Rapidly spreading water-soaked necrosis poses an existential threat to foliage and subterranean tuber storage.',
    typicalSeverityScore: 72,
    severityLevel: 'Severe',
    baseHealthScore: 42,
    immediateActions: [
      'Cut and destroy infected potato vines immediately to prevent tuber inoculation via washdown.',
      'Delay tuber harvest by at least 14 days after vine desiccation to allow skins to harden.'
    ],
    longTermPrevention: [
      'Utilize only certified disease-indexed seed tubers.',
      'Hill soil generously over developing tuber rows to prevent spores washing into the soil bed.'
    ],
    organicTreatment: [
      'Copper sulfate / lime Bordeaux mixture applied prior to forecasted rain events.'
    ],
    chemicalGuidance: [
      'Approved systemic fungicides with curative and anti-sporulant action per local university guidelines.'
    ],
    preventionTips: [
      'Never allow cull potato heaps near production fields.',
      'Rotate with non-solanaceous crops such as maize, legumes, or brassicas.'
    ],
    weatherRiskTriggers: {
      minTemp: 13,
      maxTemp: 22,
      minHumidity: 88,
      favorableRainfall: true,
      factors: [
        'Persistent foggy or rainy mornings',
        'Cool temperatures below 20°C',
        'Leaf wetness > 10 hours'
      ]
    }
  },

  'Potato_Healthy': {
    plant: 'Potato',
    scientificPlantName: 'Solanum tuberosum',
    disease: 'Healthy Leaf',
    pathogenType: 'None',
    isHealthy: true,
    symptoms: [
      'Robust, glossy green compound leaves',
      'Pest-free epidermis with clear vein patterns',
      'Active apical shoot elongation'
    ],
    visualMarkers: [
      'Deep emerald compound leaflets',
      'Healthy trichome coverage',
      'Unbroken leaf margins'
    ],
    explanation: 'No visual evidence of blight, mosaic virus, or leafhopper curling. Foliar density and chlorophyll reflectance are excellent.',
    typicalSeverityScore: 0,
    severityLevel: 'Healthy',
    baseHealthScore: 96,
    immediateActions: [
      'Maintain steady soil moisture to support uniform tuber bulking.'
    ],
    longTermPrevention: [
      'Maintain adequate hilling to protect developing tubers from sun and spores.'
    ],
    organicTreatment: ['Neem-based preventative foliar drench biweekly.'],
    chemicalGuidance: ['No treatment required.'],
    preventionTips: ['Ensure soil drainage prevents standing puddles.'],
    weatherRiskTriggers: {
      minTemp: 16,
      maxTemp: 24,
      minHumidity: 50,
      favorableRainfall: false,
      factors: ['Optimal conditions']
    }
  },

  'Apple_Scab': {
    plant: 'Apple',
    scientificPlantName: 'Malus domestica',
    disease: 'Apple Scab',
    pathogenType: 'Fungal',
    isHealthy: false,
    symptoms: [
      'Olive-green to velvety dark brown lesions on upper leaf surfaces',
      'Distorted, puckered leaves with yellowing edges',
      'Cracked corky scab lesions on apple fruit skins',
      'Premature defoliation weakening tree energy reserves'
    ],
    visualMarkers: [
      'Velvety olive-black discrete spots',
      'Leaf curling and puckering around lesion zones',
      'Chlorotic leaf drop'
    ],
    explanation: 'Fungal pathogen Venturia inaequalis identified through diagnostic olive-brown velvety circular spots and crinkled leaf margins.',
    typicalSeverityScore: 48,
    severityLevel: 'Moderate',
    baseHealthScore: 68,
    immediateActions: [
      'Rake and shred or compost fallen apple leaves to reduce overwintering ascospore inoculum.',
      'Prune canopy during dormant season to promote sunlight penetration and leaf drying.'
    ],
    longTermPrevention: [
      'Select scab-resistant apple cultivars such as Liberty, Enterprise, or Freedom.',
      'Apply agricultural lime or 5% urea spray in late autumn to speed up leaf decomposition.'
    ],
    organicTreatment: [
      'Sulfur dust or liquid lime-sulfur applied at tight cluster through petal fall stages.'
    ],
    chemicalGuidance: [
      'Sterol inhibitors or strobilurin fungicides timed with Mills infection periods.'
    ],
    preventionTips: [
      'Maintain open center canopy structure.',
      'Monitor spring wetting periods via local orchard weather station data.'
    ],
    weatherRiskTriggers: {
      minTemp: 15,
      maxTemp: 24,
      minHumidity: 80,
      favorableRainfall: true,
      factors: [
        'Prolonged spring rains during bud break',
        'Humid orchard microclimate',
        'Wet leaf surfaces for 9+ consecutive hours'
      ]
    }
  },

  'Apple_Healthy': {
    plant: 'Apple',
    scientificPlantName: 'Malus domestica',
    disease: 'Healthy Leaf',
    pathogenType: 'None',
    isHealthy: true,
    symptoms: [
      'Glossy, thick deep green leaves with crisp serration',
      'Clean underside veins free of powdery coating or velvety crusts',
      'Active shoot spur growth'
    ],
    visualMarkers: [
      'Strong chlorophyll reflectance',
      'Uniform leaf blade without blemishes',
      'Firm petiole attachment'
    ],
    explanation: 'Leaf exhibits pristine morphological vigor with zero necrotic lesions, cedar-apple rust spots, or powdery mildew.',
    typicalSeverityScore: 0,
    severityLevel: 'Healthy',
    baseHealthScore: 97,
    immediateActions: ['Continue standard orchard scouting routine.'],
    longTermPrevention: ['Maintain dormant tree pruning and balanced soil fertility.'],
    organicTreatment: ['Preventative dormant horticultural oil application.'],
    chemicalGuidance: ['None needed.'],
    preventionTips: ['Ensure good ground cover management under tree drip lines.'],
    weatherRiskTriggers: {
      minTemp: 18,
      maxTemp: 26,
      minHumidity: 50,
      favorableRainfall: false,
      factors: ['Optimal vegetative growth']
    }
  },

  'Corn_Northern_Leaf_Blight': {
    plant: 'Corn (Maize)',
    scientificPlantName: 'Zea mays',
    disease: 'Northern Leaf Blight',
    pathogenType: 'Fungal',
    isHealthy: false,
    symptoms: [
      'Long elliptical grayish-green or tan lesions ("cigar-shaped")',
      'Lesions measure 2.5 to 15 cm long with rounded margins',
      'Dark fungal sporulation within lesions during damp mornings',
      'Severe premature blighting of upper canopy during grain fill'
    ],
    visualMarkers: [
      'Elongated cigar-shaped tan lesions parallel to leaf veins',
      'Extensive necrosis across middle and upper leaves',
      'Vein-delimited borders'
    ],
    explanation: 'Characteristic cigar-shaped elliptical lesions parallel to leaf veins are textbook indications of Exserohilum turcicum (Northern Corn Leaf Blight).',
    typicalSeverityScore: 64,
    severityLevel: 'Moderate',
    baseHealthScore: 56,
    immediateActions: [
      'Assess infection stage relative to silking; if lesions are on the ear leaf before tassel, chemical rescue may be warranted for high-yield hybrids.',
      'Check lower and upper canopy leaves across five random sample clusters in the field.'
    ],
    longTermPrevention: [
      'Plant hybrids with multigenic or Ht-gene specific resistance.',
      'Till crop residue into soil where erosion permits to facilitate fungal breakdown.',
      'Rotate fields out of corn for at least 1-2 seasons.'
    ],
    organicTreatment: [
      'Trichoderma harzianum soil inoculation and foliar bio-fungicides.'
    ],
    chemicalGuidance: [
      'Triazole and strobilurin dual-mode fungicides applied between VT and R1 growth stages.'
    ],
    preventionTips: [
      'Avoid high-density planting that restricts wind movement in the lower canopy.',
      'Balance nitrogen with potassium fertility.'
    ],
    weatherRiskTriggers: {
      minTemp: 18,
      maxTemp: 27,
      minHumidity: 85,
      favorableRainfall: true,
      factors: [
        'Moderate temperatures with heavy dew',
        'Overcast humid weather',
        'Rain-splashed residue from previous crop cycle'
      ]
    }
  },

  'Corn_Healthy': {
    plant: 'Corn (Maize)',
    scientificPlantName: 'Zea mays',
    disease: 'Healthy Leaf',
    pathogenType: 'None',
    isHealthy: true,
    symptoms: [
      'Broad, deep green leaves with crisp parallel venation',
      'No striping, mottling, or elliptical tan spots',
      'Strong central midrib structural integrity'
    ],
    visualMarkers: [
      'Uniform dark green photosynthetic blade',
      'Intact leaf margins and collar',
      'High chlorophyll density'
    ],
    explanation: 'AI detected no symptoms of blights, rusts, or nutrient chlorosis. Foliar health is optimal for maximum grain filling potential.',
    typicalSeverityScore: 0,
    severityLevel: 'Healthy',
    baseHealthScore: 98,
    immediateActions: ['Continue standard side-dressing and irrigation.'],
    longTermPrevention: ['Ensure balanced N-P-K-Zn nutrient availability.'],
    organicTreatment: ['Beneficial soil microbes drench.'],
    chemicalGuidance: ['None required.'],
    preventionTips: ['Maintain weed-free rows to conserve soil moisture.'],
    weatherRiskTriggers: {
      minTemp: 20,
      maxTemp: 30,
      minHumidity: 60,
      favorableRainfall: false,
      factors: ['Optimal crop development']
    }
  },

  'Grape_Black_Rot': {
    plant: 'Grape',
    scientificPlantName: 'Vitis vinifera',
    disease: 'Black Rot',
    pathogenType: 'Fungal',
    isHealthy: false,
    symptoms: [
      'Small circular reddish-brown leaf spots with dark margins',
      'Tiny black pycnidia (pimples) arranged in concentric rings inside spots',
      'Sunken purple-black cankers on young shoots',
      'Grapes shriveling into hard, wrinkled black mummies'
    ],
    visualMarkers: [
      'Reddish-brown circular spots with dark borders',
      'Microscopic black spore dots (pycnidia) inside spots',
      'Interveinal necrotic tissue'
    ],
    explanation: 'Detected circular reddish-brown spots with dark borders and internal concentric pycnidia characteristic of Guignardia bidwellii (Grape Black Rot).',
    typicalSeverityScore: 52,
    severityLevel: 'Moderate',
    baseHealthScore: 66,
    immediateActions: [
      'Hand-prune infected shoots and remove any clinging mummified fruit clusters.',
      'Tuck shoots into trellis wires to increase air circulation.'
    ],
    longTermPrevention: [
      'Sanitize all mummies from vines and vineyard floor during winter pruning.',
      'Maintain an open canopy with shoot thinning and leaf pulling around fruit zones.'
    ],
    organicTreatment: [
      'Copper and sulfur combination sprays applied from early shoot growth through bloom.'
    ],
    chemicalGuidance: [
      'Myclobutanil, kresoxim-methyl, or tebuconazole timed before spring rain events.'
    ],
    preventionTips: [
      'Mow vineyard floor vegetation to reduce humidity under the vine canopy.',
      'Avoid overhead irrigation.'
    ],
    weatherRiskTriggers: {
      minTemp: 20,
      maxTemp: 30,
      minHumidity: 80,
      favorableRainfall: true,
      factors: [
        'Warm temperatures paired with frequent rain',
        'Leaf wetness > 7 hours',
        'Dense shaded vine canopy'
      ]
    }
  },

  'Grape_Healthy': {
    plant: 'Grape',
    scientificPlantName: 'Vitis vinifera',
    disease: 'Healthy Leaf',
    pathogenType: 'None',
    isHealthy: true,
    symptoms: [
      'Vibrant palmate leaves with sharp lobe edges',
      'Clean underside surfaces without downy or powdery coatings',
      'Supple vine tendrils and healthy berry cluster attachment'
    ],
    visualMarkers: [
      'Lush green canopy foliage',
      'Intact epidermal cell structure',
      'Zero black rot or mildew lesions'
    ],
    explanation: 'Grape leaf shows pristine palmate morphology with even green color saturation and complete absence of fungal spotting.',
    typicalSeverityScore: 0,
    severityLevel: 'Healthy',
    baseHealthScore: 99,
    immediateActions: ['Continue canopy management and selective leaf pulling.'],
    longTermPrevention: ['Maintain balanced drip irrigation during fruit set.'],
    organicTreatment: ['Silica foliar spray to strengthen leaf cuticle.'],
    chemicalGuidance: ['None required.'],
    preventionTips: ['Ensure proper vineyard trellis tension.'],
    weatherRiskTriggers: {
      minTemp: 22,
      maxTemp: 28,
      minHumidity: 45,
      favorableRainfall: false,
      factors: ['Optimal vegetative balance']
    }
  },

  'Rice_Blast': {
    plant: 'Rice',
    scientificPlantName: 'Oryza sativa',
    disease: 'Rice Blast',
    pathogenType: 'Fungal',
    isHealthy: false,
    symptoms: [
      'Spindle or diamond-shaped lesions with gray or whitish centers',
      'Brown to reddish-brown borders surrounding necrotic lesions',
      'Lesions coalesce causing entire leaf blades to wither',
      'Neck blast causing panicle rotting and whitehead sterility'
    ],
    visualMarkers: [
      'Spindle-shaped diamond spots with pointed ends',
      'Ash-gray necrotic centers with dark brown halos',
      'Leaf tip desiccated necrosis'
    ],
    explanation: 'Identified classic spindle-shaped (diamond-shaped) eye spots with gray centers and reddish-brown borders caused by Magnaporthe oryzae (Rice Blast). High risk for panicle infection.',
    typicalSeverityScore: 75,
    severityLevel: 'Severe',
    baseHealthScore: 39,
    immediateActions: [
      'Avoid top-dressing with excessive nitrogen fertilizers immediately.',
      'Maintain continuous water depth in the paddy field to lower canopy stress.',
      'Scout lower leaves and flag leaves in susceptible varieties.'
    ],
    longTermPrevention: [
      'Use certified blast-resistant varieties (e.g. resistant Basmati/IRRI lines).',
      'Treat seed with approved bio-fungicide or hot water soak before nursery sowing.',
      'Avoid excessive plant density during transplanting.'
    ],
    organicTreatment: [
      'Pseudomonas fluorescens (10g/L) foliar spray at tillering and boot leaf stages.'
    ],
    chemicalGuidance: [
      'Tricyclazole 75 WP or Isoprothiolane 40 EC applied at early symptom onset per agricultural department guidelines.'
    ],
    preventionTips: [
      'Apply split doses of nitrogen combined with adequate potassium and silicon.',
      'Destroy stubbles from infected previous seasons.'
    ],
    weatherRiskTriggers: {
      minTemp: 19,
      maxTemp: 28,
      minHumidity: 90,
      favorableRainfall: true,
      factors: [
        'Night temperatures 19°C-24°C with high relative humidity > 90%',
        'Extended dew periods > 10 hours',
        'Excessive nitrogen application'
      ]
    }
  },

  'Rice_Healthy': {
    plant: 'Rice',
    scientificPlantName: 'Oryza sativa',
    disease: 'Healthy Leaf',
    pathogenType: 'None',
    isHealthy: true,
    symptoms: [
      'Upright, bright green linear blade leaves',
      'Clean sheath and collar free of brown spots or diamond lesions',
      'Vigorous tillering and healthy fibrous root system'
    ],
    visualMarkers: [
      'Smooth blade with uniform chlorophyll distribution',
      'No blast lesions, brown spot, or bacterial blight streaks',
      'Strong erect plant architecture'
    ],
    explanation: 'Rice foliage exhibits outstanding vigor with erect leaf angle, excellent chlorophyll density, and zero signs of blast or sheath blight.',
    typicalSeverityScore: 0,
    severityLevel: 'Healthy',
    baseHealthScore: 98,
    immediateActions: ['Maintain regulated water level according to growth stage.'],
    longTermPrevention: ['Ensure split application of potassium and micronutrients.'],
    organicTreatment: ['Beneficial mycorrhizal root inoculation.'],
    chemicalGuidance: ['None required.'],
    preventionTips: ['Maintain good weed control along paddy bunds.'],
    weatherRiskTriggers: {
      minTemp: 24,
      maxTemp: 32,
      minHumidity: 65,
      favorableRainfall: false,
      factors: ['Optimal vegetative growth']
    }
  },

  'Pepper_Bacterial_Spot': {
    plant: 'Bell Pepper',
    scientificPlantName: 'Capsicum annuum',
    disease: 'Bacterial Leaf Spot',
    pathogenType: 'Bacterial',
    isHealthy: false,
    symptoms: [
      'Small water-soaked yellowish-green lesions turning dark brown',
      'Irregular spots often concentrated near leaf margins and tips',
      'Leaf drop leaving fruit exposed to sunscald',
      'Rough, raised warty scabs on pepper fruit'
    ],
    visualMarkers: [
      'Water-soaked dark brown spots with translucent margins',
      'Chlorotic yellow ring around mature necrotic dots',
      'Leaf margin burn and defoliation'
    ],
    explanation: 'Bacterial pathogen Xanthomonas euvesicatoria identified. Water-soaked angular lesions with necrotic centers on Capsicum foliage indicate bacterial leaf spot.',
    typicalSeverityScore: 54,
    severityLevel: 'Moderate',
    baseHealthScore: 64,
    immediateActions: [
      'Do not work in the pepper patch when plants are damp with rain or dew.',
      'Reroute sprinkler heads away from pepper foliage immediately.'
    ],
    longTermPrevention: [
      'Purchase hot-water treated or certified disease-free pepper seeds.',
      'Implement 2-year rotation with non-solanaceous crops.',
      'Plant resistant cultivars with known Bs2 resistance genes.'
    ],
    organicTreatment: [
      'Fixed copper combined with Bacillus amyloliquefaciens biopesticide applied preventative every 7 days.'
    ],
    chemicalGuidance: [
      'Copper hydroxide paired with Mancozeb to counter copper-tolerant bacterial strains, following regional extension rules.'
    ],
    preventionTips: [
      'Sterilize seed trays and greenhouse benches with 10% bleach.',
      'Control weed hosts (black nightshade) around field borders.'
    ],
    weatherRiskTriggers: {
      minTemp: 24,
      maxTemp: 34,
      minHumidity: 80,
      favorableRainfall: true,
      factors: [
        'Warm, humid weather with frequent afternoon storms',
        'Wind-driven rain splashing bacteria between leaves',
        'Leaf wetness > 6 hours'
      ]
    }
  },

  'Pepper_Healthy': {
    plant: 'Bell Pepper',
    scientificPlantName: 'Capsicum annuum',
    disease: 'Healthy Leaf',
    pathogenType: 'None',
    isHealthy: true,
    symptoms: [
      'Smooth, glossy dark green ovate leaves',
      'No necrotic pitting or leaf curling',
      'Sturdy branching nodes with active flower buds'
    ],
    visualMarkers: [
      'Glossy cuticle with uniform green pigmentation',
      'Intact leaf borders and smooth surface',
      'Strong vegetative vigor'
    ],
    explanation: 'Pepper foliage displays pristine green leaf blade with healthy cuticle development and zero visual evidence of bacterial or viral pathology.',
    typicalSeverityScore: 0,
    severityLevel: 'Healthy',
    baseHealthScore: 97,
    immediateActions: ['Maintain consistent soil moisture to prevent blossom end rot.'],
    longTermPrevention: ['Ensure adequate calcium and magnesium in root zone.'],
    organicTreatment: ['Seaweed extract drench for stress tolerance.'],
    chemicalGuidance: ['None required.'],
    preventionTips: ['Ensure stake support as fruit begins to set.'],
    weatherRiskTriggers: {
      minTemp: 20,
      maxTemp: 28,
      minHumidity: 55,
      favorableRainfall: false,
      factors: ['Optimal growing conditions']
    }
  }
};

export const SUPPORTED_CROPS = [
  { id: 'tomato', name: 'Tomato', tamilName: 'தக்காளி', icon: '🍅', commonDiseases: ['Early Blight', 'Late Blight', 'Bacterial Spot', 'Leaf Mold'], growingSeason: 'Warm season (Summer/Monsoon)', optimalTemperature: '20°C - 30°C', idealHumidity: '50% - 70%' },
  { id: 'potato', name: 'Potato', tamilName: 'உருளைக்கிழங்கு', icon: '🥔', commonDiseases: ['Early Blight', 'Late Blight', 'Blackleg'], growingSeason: 'Cool season (Winter/Spring)', optimalTemperature: '15°C - 24°C', idealHumidity: '60% - 80%' },
  { id: 'apple', name: 'Apple', tamilName: 'ஆப்பிள்', icon: '🍎', commonDiseases: ['Apple Scab', 'Black Rot', 'Cedar Rust'], growingSeason: 'Temperate / High altitude', optimalTemperature: '18°C - 25°C', idealHumidity: '55% - 75%' },
  { id: 'corn', name: 'Corn (Maize)', tamilName: 'மக்காச்சோளம்', icon: '🌽', commonDiseases: ['Northern Leaf Blight', 'Common Rust', 'Gray Leaf Spot'], growingSeason: 'Kharif / Summer', optimalTemperature: '21°C - 32°C', idealHumidity: '60% - 75%' },
  { id: 'grape', name: 'Grape', tamilName: 'திராட்சை', icon: '🍇', commonDiseases: ['Black Rot', 'Powdery Mildew', 'Downy Mildew'], growingSeason: 'Spring / Summer', optimalTemperature: '20°C - 32°C', idealHumidity: '40% - 65%' },
  { id: 'rice', name: 'Rice', tamilName: 'நெல்', icon: '🌾', commonDiseases: ['Rice Blast', 'Brown Spot', 'Bacterial Blight'], growingSeason: 'Kharif / Rabi wetland', optimalTemperature: '22°C - 34°C', idealHumidity: '70% - 90%' },
  { id: 'pepper', name: 'Bell Pepper', tamilName: 'குடைமிளகாய்', icon: '🫑', commonDiseases: ['Bacterial Leaf Spot', 'Phytophthora Blight', 'Mosaic Virus'], growingSeason: 'Warm season', optimalTemperature: '22°C - 30°C', idealHumidity: '50% - 70%' },
];
