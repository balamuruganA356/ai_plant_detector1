import { AgriShop } from '../types';

export const SAMPLE_AGRI_SHOPS: AgriShop[] = [
  // ==========================================
  // KARUR DISTRICT (கரூர் மாவட்டம்)
  // ==========================================
  {
    id: 'karur-1',
    name: 'ICAR - Krishi Vigyan Kendra (KVK) Puliyur',
    tamilName: 'ICAR - வேளாண் அறிவியல் மையம் (KVK) புலியூர்',
    district: 'Karur',
    tamilDistrict: 'கரூர்',
    type: 'Government Krishi Kendra / Agri Office',
    address: 'Puliyur CF Post, Karur District - 639114',
    tamilAddress: 'புலியூர் சி.எஃப் அஞ்சல், கரூர் மாவட்டம் - 639114',
    phone: '+91 4324 251325',
    distanceKm: 4.2,
    rating: 4.9,
    openHours: '09:30 AM - 05:00 PM (Mon-Fri)',
    services: [
      'Plant Pathology Lab & Leaf Diagnostics',
      'Bio-fertilizers (Rhizobium, Azospirillum, Phosphobacteria)',
      'Soil Health Card testing (N-P-K, Micronutrients)',
      'Pheromone traps & Bio-control agents'
    ]
  },
  {
    id: 'karur-2',
    name: 'Joint Director of Agriculture (JDA Office), Karur',
    tamilName: 'வேளாண்மை இணை இயக்குநர் அலுவலகம், கரூர்',
    district: 'Karur',
    tamilDistrict: 'கரூர்',
    type: 'Government Krishi Kendra / Agri Office',
    address: 'District Collectorate Complex, Thanthonimalai, Karur - 639007',
    tamilAddress: 'மாவட்ட ஆட்சியர் அலுவலக வளாகம், தாந்தோணிமலை, கரூர் - 639007',
    phone: '+91 4324 255272',
    distanceKm: 3.8,
    rating: 4.8,
    openHours: '10:00 AM - 05:45 PM (Mon-Fri)',
    services: [
      'Subsidized certified paddy & pulse seeds',
      'Govt. Micro-irrigation (Drip/Sprinkler) subsidy',
      'Plant protection chemical & spray advisories',
      'Crop insurance & Kisan Credit Card guidance'
    ]
  },
  {
    id: 'karur-3',
    name: 'Sri Murugan Agro Agencies & Fertilizer Depot',
    tamilName: 'ஸ்ரீ முருகன் அக்ரோ ஏஜென்சீஸ் & உர விற்பனை நிலையம்',
    district: 'Karur',
    tamilDistrict: 'கரூர்',
    type: 'Fertilizer & Pesticide',
    address: '14/2 Kovai Road, Near Uzhavar Sandhai, Karur - 639002',
    tamilAddress: '14/2 கோவை ரோடு, உழவர் சந்தை அருகில், கரூர் - 639002',
    phone: '+91 98424 67890',
    distanceKm: 1.8,
    rating: 4.7,
    openHours: '08:00 AM - 08:30 PM (Mon-Sat)',
    services: [
      'TNAU-approved bio-fungicides (Pseudomonas & Trichoderma)',
      'Water-soluble NPK foliar fertilizers (19:19:19, 0:52:34)',
      'Battery-powered knapsack crop sprayers',
      'Organic cold-pressed Neem oil formulations'
    ]
  },
  {
    id: 'karur-4',
    name: 'Karur District Farmers Agro Clinic & Soil Testing Lab',
    tamilName: 'கரூர் மாவட்ட விவசாயிகள் அக்ரோ கிளினிக் & மண் பரிசோதனை கூடம்',
    district: 'Karur',
    tamilDistrict: 'கரூர்',
    type: 'Soil Testing Center',
    address: '88 Jawahar Bazaar, Near Old Bus Stand, Karur - 639001',
    tamilAddress: '88 ஜவஹர் பஜார், பழைய பேருந்து நிலையம் அருகில், கரூர் - 639001',
    phone: '+91 94862 33140',
    distanceKm: 2.1,
    rating: 4.8,
    openHours: '08:30 AM - 07:00 PM (Mon-Sat)',
    services: [
      'Rapid 24-hr Soil N-P-K & Organic Carbon analysis',
      'Irrigation water salinity (pH, Electrical Conductivity)',
      'Foliar tissue nutrient deficiency testing',
      'Zinc and Boron deficiency correction planning'
    ]
  },
  {
    id: 'karur-5',
    name: 'Green Garden Certified Horticultural Nursery, Karur',
    tamilName: 'கிரீன் கார்டன் தோட்டக்கலை நாற்றங்கால், கரூர்',
    district: 'Karur',
    tamilDistrict: 'கரூர்',
    type: 'Plant Nursery',
    address: 'Velur Main Road, Vengamedu, Karur - 639006',
    tamilAddress: 'வேலூர் மெயின் ரோடு, வெங்கமேடு, கரூர் - 639006',
    phone: '+91 97871 44550',
    distanceKm: 4.5,
    rating: 4.6,
    openHours: '07:30 AM - 06:30 PM (All 7 Days)',
    services: [
      'Grafted disease-resistant vegetable seedlings (Tomato, Chilly, Brinjal)',
      'High-yielding ODC-3 Drumstick saplings',
      'Trichoderma-enriched organic vermicompost',
      'Micro-drip irrigation pipes & drippers'
    ]
  },

  // ==========================================
  // TRICHY DISTRICT (திருச்சிராப்பள்ளி மாவட்டம்)
  // ==========================================
  {
    id: 'trichy-1',
    name: 'Agricultural College & Research Institute (AC&RI - TNAU), Trichy',
    tamilName: 'வேளாண்மைக் கல்லூரி மற்றும் ஆராய்ச்சி நிலையம் (TNAU), திருச்சி',
    district: 'Trichy',
    tamilDistrict: 'திருச்சிராப்பள்ளி',
    type: 'Government Krishi Kendra / Agri Office',
    address: 'Navalur Kottapattu, Dindigul Highway, Tiruchirappalli - 620027',
    tamilAddress: 'நாவலூர் கொட்டப்பட்டு, திண்டுக்கல் சாலை, திருச்சிராப்பள்ளி - 620027',
    phone: '+91 431 2690161',
    distanceKm: 5.2,
    rating: 4.9,
    openHours: '09:00 AM - 05:00 PM (Mon-Fri)',
    services: [
      'Advanced Plant Pathology Diagnostic Clinic',
      'Soil & Water testing for sodic and alkaline soils',
      'Certified Foundation seeds counter (Paddy, Pulses)',
      'University extension scientist diagnostic visits'
    ]
  },
  {
    id: 'trichy-2',
    name: 'ICAR - National Research Centre for Banana (NRCB), Trichy',
    tamilName: 'ICAR - தேசிய வாழை ஆராய்ச்சி மையம், திருச்சி',
    district: 'Trichy',
    tamilDistrict: 'திருச்சிராப்பள்ளி',
    type: 'Government Krishi Kendra / Agri Office',
    address: 'Thogamalai Main Road, Podavur, Tiruchirappalli - 639103',
    tamilAddress: 'தோகைமலை மெயின் ரோடு, போதாவூர், திருச்சிராப்பள்ளி - 639103',
    phone: '+91 431 2618106',
    distanceKm: 8.5,
    rating: 4.9,
    openHours: '09:30 AM - 05:00 PM (Mon-Fri)',
    services: [
      'Banana bunchy top & Panama wilt molecular diagnosis',
      'Disease-free tissue culture plantlets supply',
      'NRCB Bio-agent (Trichoderma asperellum) formulations',
      'Post-harvest pathology & storage disease advisory'
    ]
  },
  {
    id: 'trichy-3',
    name: 'ICAR - Krishi Vigyan Kendra (KVK) Sirugamani',
    tamilName: 'ICAR - வேளாண் அறிவியல் மையம் (KVK) சிறுகமணி',
    district: 'Trichy',
    tamilDistrict: 'திருச்சிராப்பள்ளி',
    type: 'Government Krishi Kendra / Agri Office',
    address: 'Sugarcane Research Station Campus, Sirugamani, Tiruchirappalli - 639115',
    tamilAddress: 'கரும்பு ஆராய்ச்சி நிலைய வளாகம், சிறுகமணி, திருச்சிராப்பள்ளி - 639115',
    phone: '+91 431 2614217',
    distanceKm: 12.0,
    rating: 4.8,
    openHours: '09:30 AM - 05:00 PM (Mon-Fri)',
    services: [
      'Delta belt Paddy blast & sheath blight advisory',
      'Sugarcane red rot & borer pest management',
      'Bio-control parasitoids & nuclear polyhedrosis virus',
      'Organic farmer cluster certification'
    ]
  },
  {
    id: 'trichy-4',
    name: 'Cauvery Agro Inputs & Bio-Tech Centre',
    tamilName: 'காவிரி அக்ரோ இன்புட்ஸ் & பயோ-டெக் சென்டர்',
    district: 'Trichy',
    tamilDistrict: 'திருச்சிராப்பள்ளி',
    type: 'Fertilizer & Pesticide',
    address: '45 Gandhi Market Road, Palakkarai, Tiruchirappalli - 620008',
    tamilAddress: '45 காந்தி மார்க்கெட் ரோடு, பாலக்கரை, திருச்சிராப்பள்ளி - 620008',
    phone: '+91 94431 52890',
    distanceKm: 2.8,
    rating: 4.7,
    openHours: '08:00 AM - 08:30 PM (Mon-Sat)',
    services: [
      'Systemic & protectant fungicides (Mancozeb, Copper Hydroxide)',
      '100% water-soluble fertigation grades',
      'Yellow & blue sticky insect traps',
      'Motorized knapsack and tractor-mounted sprayers'
    ]
  },
  {
    id: 'trichy-5',
    name: 'Rockfort Agri Clinic & Soil Diagnostic Laboratory',
    tamilName: 'ராக்போர்ட் அக்ரோ கிளினிக் & மண் பரிசோதனை ஆய்வகம்',
    district: 'Trichy',
    tamilDistrict: 'திருச்சிராப்பள்ளி',
    type: 'Soil Testing Center',
    address: '12 Salai Road, Thillai Nagar, Tiruchirappalli - 620018',
    tamilAddress: '12 சாலை ரோடு, தில்லை நகர், திருச்சிராப்பள்ளி - 620018',
    phone: '+91 431 2765432',
    distanceKm: 2.2,
    rating: 4.8,
    openHours: '08:30 AM - 07:00 PM (Mon-Sat)',
    services: [
      'Digital Soil Health Card reporting with dosage guidance',
      'Irrigation borewell water quality testing (RSC, SAR, pH)',
      'Plant parasitic nematode identification',
      'Gypsum & lime requirement calculation for saline soil'
    ]
  },
  {
    id: 'trichy-6',
    name: 'Sri Renga Hi-Tech Horticultural Nursery',
    tamilName: 'ஸ்ரீ ரங்கா ஹைடெக் தோட்டக்கலை நாற்றங்கால்',
    district: 'Trichy',
    tamilDistrict: 'திருச்சிராப்பள்ளி',
    type: 'Plant Nursery',
    address: 'Kallanai Road, Near Melur, Srirangam, Tiruchirappalli - 620006',
    tamilAddress: 'கல்லணை ரோடு, மேலூர் அருகில், ஸ்ரீரங்கம், திருச்சிராப்பள்ளி - 620006',
    phone: '+91 98424 11234',
    distanceKm: 6.0,
    rating: 4.7,
    openHours: '07:00 AM - 06:30 PM (All 7 Days)',
    services: [
      'Virus-indexed pro-tray vegetable seedlings',
      'Grafted guava (Lucknow 49) & Mango (Alphonso, Banganapalli)',
      'Sterilized coco-peat blocks & seedling trays',
      'Greenhouse shading nets & micro-foggers'
    ]
  },

  // ==========================================
  // COIMBATORE DISTRICT (கோயம்புத்தூர் மாவட்டம்)
  // ==========================================
  {
    id: 'cbe-1',
    name: 'Tamil Nadu Agricultural University (TNAU) - Plant Clinic Centre',
    tamilName: 'தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழகம் - தாவர கிளினிக் மையம்',
    district: 'Coimbatore',
    tamilDistrict: 'கோயம்புத்தூர்',
    type: 'Government Krishi Kendra / Agri Office',
    address: 'Marudhamalai Road, TNAU Main Campus, Coimbatore - 641003',
    tamilAddress: 'மருதமலை ரோடு, TNAU முதன்மை வளாகம், கோயம்புத்தூர் - 641003',
    phone: '+91 422 6611200',
    distanceKm: 3.5,
    rating: 4.9,
    openHours: '09:00 AM - 05:00 PM (Mon-Fri)',
    services: [
      'Comprehensive botanical leaf pathology diagnosis',
      'Soil fertility testing & micronutrient recommendations',
      'TNAU certified seed sales counter',
      'Bio-pesticide and insect parasitoid culture supply'
    ]
  },
  {
    id: 'cbe-2',
    name: 'Coimbatore Kisan Agro Chemicals & Fertilisers',
    tamilName: 'கோயம்புத்தூர் கிசான் அக்ரோ கெமிக்கல்ஸ் & உரங்கள்',
    district: 'Coimbatore',
    tamilDistrict: 'கோயம்புத்தூர்',
    type: 'Fertilizer & Pesticide',
    address: '104 Mettupalayam Road, R.S. Puram, Coimbatore - 641002',
    tamilAddress: '104 மேட்டுப்பாளையம் ரோடு, ஆர்.எஸ். புரம், கோயம்புத்தூர் - 641002',
    phone: '+91 98422 34567',
    distanceKm: 2.4,
    rating: 4.7,
    openHours: '08:30 AM - 08:00 PM (Mon-Sat)',
    services: [
      'Bio-fungicides & organic copper octanoate sprays',
      'TNAU micro-nutrient mixtures for vegetable crops',
      'Battery-operated knapsack sprayers & nozzles',
      'Drip irrigation filters and pressure regulators'
    ]
  },

  // ==========================================
  // MADURAI DISTRICT (மதுரை மாவட்டம்)
  // ==========================================
  {
    id: 'madurai-1',
    name: 'Agricultural College & Research Institute (AC&RI), Othakadai, Madurai',
    tamilName: 'வேளாண்மைக் கல்லூரி மற்றும் ஆராய்ச்சி நிலையம், ஒத்தக்கடை, மதுரை',
    district: 'Madurai',
    tamilDistrict: 'மதுரை',
    type: 'Government Krishi Kendra / Agri Office',
    address: 'Melur Road, Othakadai, Madurai - 625104',
    tamilAddress: 'மேலூர் ரோடு, ஒத்தக்கடை, மதுரை - 625104',
    phone: '+91 452 2422956',
    distanceKm: 6.8,
    rating: 4.9,
    openHours: '09:30 AM - 05:00 PM (Mon-Fri)',
    services: [
      'Paddy & Jasmine crop disease diagnostic clinic',
      'Soil nutrient profiling and organic carbon mapping',
      'TNAU seed counter & bio-inoculant distribution',
      'Farmer training on integrated pest management (IPM)'
    ]
  },
  {
    id: 'madurai-2',
    name: 'Meenakshi Agro Agencies, Simmakkal, Madurai',
    tamilName: 'மீனாட்சி அக்ரோ ஏஜென்சீஸ், சிம்மக்கல், மதுரை',
    district: 'Madurai',
    tamilDistrict: 'மதுரை',
    type: 'Fertilizer & Pesticide',
    address: '28 North Veli Street, Simmakkal, Madurai - 625001',
    tamilAddress: '28 வடக்கு வெளி வீதி, சிம்மக்கல், மதுரை - 625001',
    phone: '+91 94433 87654',
    distanceKm: 1.5,
    rating: 4.6,
    openHours: '08:30 AM - 08:30 PM (Mon-Sat)',
    services: [
      'Registered botanical & microbial pesticides',
      'Foliar calcium and magnesium micronutrient sprays',
      'Power weeders and battery sprayers',
      'Crop protection safety kits (PPE)'
    ]
  },

  // ==========================================
  // THANJAVUR DISTRICT (தஞ்சாவூர் மாவட்டம்)
  // ==========================================
  {
    id: 'thanjavur-1',
    name: 'Soil and Water Management Research Institute (SWMRI), Thanjavur',
    tamilName: 'மண் மற்றும் நீர் மேலாண்மை ஆராய்ச்சி நிலையம், தஞ்சாவூர்',
    district: 'Thanjavur',
    tamilDistrict: 'தஞ்சாவூர்',
    type: 'Soil Testing Center',
    address: 'Kattuthottam, Vallam Road, Thanjavur - 613005',
    tamilAddress: 'காட்டுத்தோட்டம், வல்லம் ரோடு, தஞ்சாவூர் - 613005',
    phone: '+91 4362 267680',
    distanceKm: 4.2,
    rating: 4.8,
    openHours: '09:30 AM - 05:00 PM (Mon-Fri)',
    services: [
      'Delta alluvium soil testing & nutrient mapping',
      'Irrigation canal & borewell water quality index',
      'Rice blast, brown spot & sheath blight advisory',
      'Alternate wetting and drying (AWD) water sensors'
    ]
  },
  {
    id: 'thanjavur-2',
    name: 'Cauvery Delta Farmers Service Society & Agro Depot',
    tamilName: 'காவிரி டெல்டா விவசாயிகள் சேவை சங்கம் & அக்ரோ டிப்போ',
    district: 'Thanjavur',
    tamilDistrict: 'தஞ்சாவூர்',
    type: 'Fertilizer & Pesticide',
    address: '19 Old Bus Stand Road, Thanjavur - 613001',
    tamilAddress: '19 பழைய பேருந்து நிலைய சாலை, தஞ்சாவூர் - 613001',
    phone: '+91 94437 22119',
    distanceKm: 1.2,
    rating: 4.7,
    openHours: '08:00 AM - 08:00 PM (Mon-Sat)',
    services: [
      'Certified paddy hybrid seeds (CR 1009, ADT 53, TKM 13)',
      'Neem-coated urea & organic potassium fertilizers',
      'Tricyclazole & Azoxystrobin blast protectants',
      'Agricultural spray pumps and spare nozzles'
    ]
  },

  // ==========================================
  // SALEM DISTRICT (சேலம் மாவட்டம்)
  // ==========================================
  {
    id: 'salem-1',
    name: 'Krishi Vigyan Kendra (KVK), Sandhiyur, Salem',
    tamilName: 'வேளாண் அறிவியல் மையம் (KVK), சந்தியூர், சேலம்',
    district: 'Salem',
    tamilDistrict: 'சேலம்',
    type: 'Government Krishi Kendra / Agri Office',
    address: 'Mallur Via, Sandhiyur, Salem - 636203',
    tamilAddress: 'மல்லூர் வழி, சந்தியூர், சேலம் - 636203',
    phone: '+91 427 2422550',
    distanceKm: 7.5,
    rating: 4.8,
    openHours: '09:30 AM - 05:00 PM (Mon-Fri)',
    services: [
      'Tapioca & Mango pathology diagnostic clinic',
      'Mealybug biological control parasitoids',
      'Soil organic matter and fertility testing',
      'Bio-enriched farmyard manure guidance'
    ]
  },
  {
    id: 'salem-2',
    name: 'Salem Green Agro Inputs, Meyyanur',
    tamilName: 'சேலம் கிரீன் அக்ரோ இன்புட்ஸ், மெய்யனூர்',
    district: 'Salem',
    tamilDistrict: 'சேலம்',
    type: 'Fertilizer & Pesticide',
    address: '52 Junction Main Road, Meyyanur, Salem - 636004',
    tamilAddress: '52 ஜங்ஷன் மெயின் ரோடு, மெய்யனூர், சேலம் - 636004',
    phone: '+91 98941 78901',
    distanceKm: 2.0,
    rating: 4.6,
    openHours: '08:30 AM - 08:00 PM (Mon-Sat)',
    services: [
      'Sulfur dust and copper bactericides',
      'Organic vermicompost and Humic acid soil conditioning',
      'Electrostatic knapsack crop sprayers',
      'Soil moisture testing probes'
    ]
  },

  // ==========================================
  // DINDIGUL DISTRICT (திண்டுக்கல் மாவட்டம்)
  // ==========================================
  {
    id: 'dindigul-1',
    name: 'Horticultural College & Research Institute (HC&RI - TNAU), Periyakulam / Dindigul Regional Centre',
    tamilName: 'தோட்டக்கலைக் கல்லூரி மற்றும் ஆராய்ச்சி நிலையம், திண்டுக்கல் மண்டலம்',
    district: 'Dindigul',
    tamilDistrict: 'திண்டுக்கல்',
    type: 'Government Krishi Kendra / Agri Office',
    address: 'Dindigul-Theni Highway, Reddiarchatram, Dindigul - 624622',
    tamilAddress: 'திண்டுக்கல்-தேனி நெடுஞ்சாலை, ரெட்டியார்சத்திரம், திண்டுக்கல் - 624622',
    phone: '+91 451 2556200',
    distanceKm: 8.0,
    rating: 4.9,
    openHours: '09:00 AM - 05:00 PM (Mon-Fri)',
    services: [
      'Vegetable & fruit tree viral & fungal pathology clinic',
      'Drip fertigation water quality assessment',
      'TNAU vegetable seed kits & grafted saplings',
      'Biocontrol agents for root rot diseases'
    ]
  },
  {
    id: 'dindigul-2',
    name: 'Dindigul Farmer Care Agro Centre',
    tamilName: 'திண்டுக்கல் பார்மர் கேர் அக்ரோ சென்டர்',
    district: 'Dindigul',
    tamilDistrict: 'திண்டுக்கல்',
    type: 'Fertilizer & Pesticide',
    address: '15 Palani Road, Near Bus Stand, Dindigul - 624001',
    tamilAddress: '15 பழனி ரோடு, பேருந்து நிலையம் அருகில், திண்டுக்கல் - 624001',
    phone: '+91 98421 88765',
    distanceKm: 1.6,
    rating: 4.7,
    openHours: '08:30 AM - 08:30 PM (Mon-Sat)',
    services: [
      'Protected cultivation inputs for polyhouse growers',
      'Specialty water-soluble N-P-K nutrients',
      'Bacillus subtilis bio-fungicide formulations',
      'Battery sprayers and safety gear'
    ]
  }
];
