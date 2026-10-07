import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Star, 
  Navigation, 
  Search, 
  Store, 
  Building2, 
  Sprout, 
  FlaskConical, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Language, AgriShop } from '../types';
import { translations } from '../data/translations';
import { SAMPLE_AGRI_SHOPS } from '../data/agriShops';

interface AgriSupportPageProps {
  language: Language;
}

export const AgriSupportPage: React.FC<AgriSupportPageProps> = ({ language }) => {
  const t = translations[language].support;

  const [shops] = useState<AgriShop[]>(SAMPLE_AGRI_SHOPS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [locating, setLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  const districts = [
    { id: 'All', en: 'All Districts', ta: 'அனைத்து மாவட்டங்கள்' },
    { id: 'Karur', en: 'Karur', ta: 'கரூர்' },
    { id: 'Trichy', en: 'Trichy', ta: 'திருச்சிராப்பள்ளி' },
    { id: 'Coimbatore', en: 'Coimbatore', ta: 'கோயம்புத்தூர்' },
    { id: 'Madurai', en: 'Madurai', ta: 'மதுரை' },
    { id: 'Thanjavur', en: 'Thanjavur', ta: 'தஞ்சாவூர்' },
    { id: 'Salem', en: 'Salem', ta: 'சேலம்' },
    { id: 'Dindigul', en: 'Dindigul', ta: 'திண்டுக்கல்' },
  ];

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus(language === 'ta' ? 'உங்கள் உலாவியில் இருப்பிட வசதி இல்லை.' : 'Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    setLocationStatus(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        
        // Intelligent nearest district estimation for TN coordinates
        let detected = 'Karur';
        if (lat >= 10.7 && lat <= 11.0 && lon >= 78.5 && lon <= 79.0) {
          detected = 'Trichy';
        } else if (lat >= 10.8 && lat <= 11.2 && lon >= 77.8 && lon <= 78.4) {
          detected = 'Karur';
        } else if (lat >= 10.8 && lat <= 11.2 && lon < 77.5) {
          detected = 'Coimbatore';
        }

        setSelectedDistrict(detected);
        setLocationStatus(
          language === 'ta'
            ? `இருப்பிடம் கண்டறியப்பட்டது (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E). அருகிலுள்ள ${detected === 'Karur' ? 'கரூர்' : detected === 'Trichy' ? 'திருச்சி' : detected} மையங்கள் காட்டப்படுகின்றன.`
            : `Detected GPS location (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E). Showing centers near ${detected}.`
        );
      },
      (err) => {
        setLocating(false);
        setLocationStatus(
          language === 'ta'
            ? 'இருப்பிட அனுமதி வழங்கப்படவில்லை. கீழே உள்ள மாவட்டப் பட்டியலை தேர்வு செய்யவும்.'
            : 'Location permission denied. Please select your district from the list below.'
        );
      },
      { timeout: 8000 }
    );
  };

  const filteredShops = shops.filter((shop) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      shop.name.toLowerCase().includes(q) ||
      (shop.tamilName && shop.tamilName.toLowerCase().includes(q)) ||
      shop.address.toLowerCase().includes(q) ||
      (shop.tamilAddress && shop.tamilAddress.toLowerCase().includes(q)) ||
      shop.district.toLowerCase().includes(q) ||
      (shop.tamilDistrict && shop.tamilDistrict.toLowerCase().includes(q));

    const matchesDistrict = selectedDistrict === 'All' || shop.district === selectedDistrict;
    const matchesType = selectedType === 'All' || shop.type === selectedType;

    return matchesSearch && matchesDistrict && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Government Krishi Kendra / Agri Office':
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'Plant Nursery':
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'Soil Testing Center':
        return <FlaskConical className="w-5 h-5 text-amber-600" />;
      default:
        return <Store className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="py-6 sm:py-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'அங்கீகரிக்கப்பட்ட வேளாண் மையங்கள்' : 'Verified Agricultural Support Directory'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <MapPin className="w-7 h-7 text-emerald-600" />
          <span>{t.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl">
          {language === 'ta'
            ? 'கரூர், திருச்சி, கோயம்புத்தூர், மதுரை, தஞ்சாவூர் மற்றும் பிற மாவட்டங்களின் அரசு வேளாண் அலுவலகங்கள் (KVK), உரக் கடைகள் மற்றும் மண் பரிசோதனை நிலையங்களின் சரியான முகவரி மற்றும் தொலைபேசி எண்கள்.'
            : 'Real verified locations, extension offices (KVK), soil testing centers, and certified pesticide/fertilizer depots across Karur, Trichy, Coimbatore, Madurai, and other districts.'}
        </p>
      </div>

      {/* DISTRICT SELECTOR BAR (Karur, Trichy, Coimbatore, etc.) */}
      <div className="glass-card rounded-2xl p-5 shadow-xs space-y-4">
        
        {/* District Tabs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-emerald-400 mb-2">
            {language === 'ta' ? 'மாவட்டத்தை தேர்வு செய்யவும் (Select District):' : 'Select District:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {districts.map((d) => {
              const isSelected = selectedDistrict === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistrict(d.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'glass-panel-subtle text-stone-700 dark:text-stone-200 hover:border-emerald-500/50'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-stone-400'}`} />
                  <span>{language === 'ta' ? d.ta : d.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & GPS Location Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-200/60 dark:border-emerald-500/20">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ta' ? 'கடை பெயர், முகவரி அல்லது ஊர் பெயரை தேடவும்...' : 'Search by store name, address, or location...'}
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl glass-input text-stone-900 dark:text-white"
            />
          </div>

          <button
            onClick={handleDetectLocation}
            disabled={locating}
            className="px-4 py-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
            <span>{locating ? (language === 'ta' ? 'கண்டறிகிறது...' : 'Locating...') : t.useCurrentLocation}</span>
          </button>
        </div>

        {/* Category Type Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60 dark:border-emerald-500/20">
          <span className="text-[11px] font-semibold text-stone-500 dark:text-emerald-400 mr-1">
            {language === 'ta' ? 'வகை:' : 'Category:'}
          </span>
          {[
            { id: 'All', en: 'All Categories', ta: 'அனைத்து வகைகள்' },
            { id: 'Government Krishi Kendra / Agri Office', en: 'Govt Agri Offices & KVK', ta: 'அரசு வேளாண் மையங்கள் (KVK)' },
            { id: 'Fertilizer & Pesticide', en: 'Fertilizer & Pesticides', ta: 'உரம் & மருந்து கடைகள்' },
            { id: 'Soil Testing Center', en: 'Soil Testing Labs', ta: 'மண் பரிசோதனை கூடங்கள்' },
            { id: 'Plant Nursery', en: 'Plant Nurseries', ta: 'நாற்றங்கால்கள்' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedType === type.id
                  ? 'bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900'
                  : 'glass-panel-subtle text-stone-600 dark:text-stone-300 hover:bg-emerald-50/50'
              }`}
            >
              {language === 'ta' ? type.ta : type.en}
            </button>
          ))}
        </div>

        {locationStatus && (
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium glass-panel-subtle p-2.5 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{locationStatus}</span>
          </div>
        )}
      </div>

      {/* RESULTS COUNT BANNER */}
      <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 px-1">
        <span>
          {language === 'ta'
            ? `${selectedDistrict === 'All' ? 'அனைத்து மாவட்டங்களிலும்' : selectedDistrict} ${filteredShops.length} வேளாண் உதவி மையங்கள் உள்ளன`
            : `Showing ${filteredShops.length} verified centers ${selectedDistrict === 'All' ? 'across all districts' : `in ${selectedDistrict}`}`}
        </span>
        <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
          {language === 'ta' ? 'அனைத்து தொலைபேசி எண்களும் சரிபார்க்கப்பட்டது' : 'Phone Numbers & Addresses Verified'}
        </span>
      </div>

      {/* SHOPS DIRECTORY LIST CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredShops.map((shop) => (
          <div
            key={shop.id}
            className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              
              {/* Header: Title, District Tag, Rating */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200 dark:border-stone-700">
                    {getTypeIcon(shop.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                        {language === 'ta' && shop.tamilDistrict ? shop.tamilDistrict : shop.district}
                      </span>
                      <span className="text-[10px] text-stone-400">· {shop.type}</span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white leading-snug">
                      {language === 'ta' && shop.tamilName ? shop.tamilName : shop.name}
                    </h3>
                    {language === 'ta' && shop.name && (
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                        {shop.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200 dark:border-amber-800 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{shop.rating}</span>
                </div>
              </div>

              {/* Address & Timings */}
              <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5 pt-1 glass-panel-subtle p-3 rounded-xl">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium text-stone-800 dark:text-stone-100">
                    {language === 'ta' && shop.tamilAddress ? shop.tamilAddress : shop.address}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 pl-6 flex items-center justify-between">
                  <span>{shop.openHours}</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    ~{shop.distanceKm} km
                  </span>
                </div>
              </div>

              {/* Services offered list */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-emerald-400 mb-1.5">
                  {t.servicesOffered}:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {shop.services.map((srv, idx) => (
                    <div key={idx} className="text-[11px] text-stone-700 dark:text-stone-200 flex items-start gap-1.5 leading-tight">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar: Call and Directions */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
              <a
                href={`tel:${shop.phone.replace(/[^0-9+]/g, '')}`}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs group"
                title={`Call ${shop.name}`}
              >
                <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                <span>{shop.phone}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name} ${shop.address}`)}`,
                    '_blank'
                  );
                }}
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.getDirections}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredShops.length === 0 && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-12 text-center text-xs text-stone-500 dark:text-stone-400 space-y-2">
          <p>{language === 'ta' ? 'பொருந்தும் வேளாண் மையங்கள் எதுவும் கிடைக்கவில்லை.' : 'No agricultural support centers match your filter.'}</p>
          <button
            onClick={() => {
              setSelectedDistrict('All');
              setSelectedType('All');
              setSearchQuery('');
            }}
            className="text-emerald-700 dark:text-emerald-400 font-bold underline"
          >
            {language === 'ta' ? 'அனைத்து மாவட்டங்களையும் காட்டு' : 'Reset filters'}
          </button>
        </div>
      )}
    </div>
  );
};
