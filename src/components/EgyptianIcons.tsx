import React from 'react';

/**
 * Custom Museum-Grade Vector Icons for Egyptian Characters & Monuments
 */

interface IconProps {
  className?: string;
  size?: number;
}

// 𓂀 Eye of Horus (عين حورس / الودجات)
export const HorusEyeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 24C9 14 21 10 28 10C35 10 44 18 44 24C39 30 33 34 26 34C19 34 8 30 4 24Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="26" cy="22" r="6" fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="28" cy="20" r="2" fill="#fff"/>
    <path d="M4 24H12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M26 34V42C26 44 28 46 30 44C32 42 32 38 30 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M20 34C17 38 14 40 10 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M12 14C18 7 30 7 38 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3"/>
  </svg>
);

// ☥ Ankh (مفتاح الحياة)
export const AnkhIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="24" cy="15" rx="9" ry="11" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="24" cy="15" rx="5" ry="7" fill="currentColor" fillOpacity="0.2"/>
    <path d="M8 26H40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M24 26V45" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
);

// ☀️ Winged Sun Disk (قرص الشمس المجنح)
export const WingedSunIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="16" r="7" fill="currentColor"/>
    <circle cx="32" cy="16" r="9" stroke="currentColor" strokeWidth="1.5"/>
    {/* Left Wing */}
    <path d="M23 16C16 11 8 13 2 18C8 17 15 19 23 21Z" fill="currentColor" fillOpacity="0.6"/>
    <path d="M23 13C15 8 7 9 1 14C8 13 16 15 23 18Z" fill="currentColor" fillOpacity="0.85"/>
    <path d="M23 19C17 16 10 18 4 23C11 21 17 22 23 23Z" fill="currentColor" fillOpacity="0.4"/>
    {/* Right Wing */}
    <path d="M41 16C48 11 56 13 62 18C56 17 49 19 41 21Z" fill="currentColor" fillOpacity="0.6"/>
    <path d="M41 13C49 8 57 9 63 14C56 13 48 15 41 18Z" fill="currentColor" fillOpacity="0.85"/>
    <path d="M41 19C47 16 54 18 60 23C53 21 47 22 41 23Z" fill="currentColor" fillOpacity="0.4"/>
  </svg>
);

// ==========================================
// CHARACTER-SPECIFIC ICONS (الشخصيات)
// ==========================================
export const CharacterIcon: React.FC<{ characterId: string; className?: string }> = ({ characterId, className = 'w-10 h-10' }) => {
  switch (characterId) {
    case 'tut': // توت عنخ آمون — القناع الذهبي الشاب والصل الملكي
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Nemes Headdress */}
          <path d="M10 20C10 11 16 6 24 6C32 6 38 11 38 20V32L32 30V38L24 43L16 38V30L10 32V20Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M16 14C19 12 29 12 32 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Golden Stripes */}
          <path d="M12 22H36M14 27H34M16 32H32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          {/* Uraeus Cobra */}
          <circle cx="24" cy="9" r="2.5" fill="currentColor"/>
          <path d="M24 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Kohl Eyes */}
          <ellipse cx="19" cy="21" rx="2.5" ry="1.2" fill="currentColor"/>
          <ellipse cx="29" cy="21" rx="2.5" ry="1.2" fill="currentColor"/>
          {/* Ceremonial Beard */}
          <rect x="22.5" y="34" width="3" height="7" rx="1.5" fill="currentColor"/>
        </svg>
      );

    case 'ramses': // رمسيس الثاني — التاج الحربي والصرح العظيم
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Khepresh War Crown */}
          <path d="M14 26C12 16 17 8 24 8C31 8 36 16 34 26H14Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="24" cy="17" r="4" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M24 5V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Broad Colossus Shoulders & Torso */}
          <path d="M8 40C8 33 15 30 24 30C33 30 40 33 40 40V43H8V40Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5"/>
          {/* Sun Cartouche on Chest */}
          <rect x="21" y="32" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.4"/>
        </svg>
      );

    case 'cleopatra': // كليوباترا السابعة — إكليل البطالمة ولآلئ الإسكندرية
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Diadem with Isis Horns & Solar Disk */}
          <circle cx="24" cy="12" r="4" fill="currentColor"/>
          <path d="M17 16C19 12 20 8 20 4M31 16C29 12 28 8 28 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Hellenistic Queen Crown */}
          <path d="M12 24L16 18L24 21L32 18L36 24C36 34 24 38 24 38C24 38 12 34 12 24Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Alexandria Pearl Strand */}
          <circle cx="16" cy="27" r="1.5" fill="currentColor"/>
          <circle cx="20" cy="29" r="1.5" fill="currentColor"/>
          <circle cx="24" cy="30" r="1.5" fill="currentColor"/>
          <circle cx="28" cy="29" r="1.5" fill="currentColor"/>
          <circle cx="32" cy="27" r="1.5" fill="currentColor"/>
          {/* Elegance lines */}
          <path d="M21 40L24 44L27 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'hatshepsut': // حتشبسوت — الملكة الفرعون وسفينة بونت والصولجان
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Khat headdress with female pharaoh beard */}
          <path d="M13 18C13 10 18 6 24 6C30 6 35 10 35 18V30L29 33V40L24 43L19 40V33L13 30V18Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.5"/>
          {/* Punt Trading Galleon Mast & Sail */}
          <path d="M24 12V26M18 16L24 12L30 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Scepter Flail & Crook */}
          <path d="M9 36L17 28M39 36L31 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="8" cy="37" r="2" fill="currentColor"/>
          <circle cx="40" cy="37" r="2" fill="currentColor"/>
        </svg>
      );

    case 'nefertiti': // نفرتيتي — التاج الأزرق الأسطوري وسيدة الجمال
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Iconic Tall Flat-Topped Crown */}
          <path d="M14 24L10 8H38L34 24H14Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Crown Golden Ribbon Band */}
          <path d="M12 16H36" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="24" cy="16" r="3" fill="currentColor"/>
          {/* Graceful Nefertiti Profile/Neck */}
          <path d="M17 24C17 28 20 34 22 42H26C28 34 31 28 31 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Broad Collar Necklace */}
          <path d="M16 38C19 42 29 42 32 38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      );

    case 'imhotep': // إمحوتب — مسطرة المهندس ومخطوطة الحكمة وبردية الطب
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Papyrus Scroll Roll */}
          <rect x="8" y="14" width="32" height="18" rx="4" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.5"/>
          {/* Step pyramid sketch inside scroll */}
          <path d="M16 28H32M18 24H30M21 20H27M24 17V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Scribe's Reed Pen & Square */}
          <path d="M38 8L28 18M38 8L41 11L31 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Foundation level base */}
          <path d="M6 38H42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M10 40C10 32 16 28 24 28C32 28 38 32 38 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
  }
};

// ==========================================
// SITE & MONUMENT SPECIFIC ICONS (المعالم)
// ==========================================
export const SiteIcon: React.FC<{ siteId: string; className?: string }> = ({ siteId, className = 'w-10 h-10' }) => {
  switch (siteId) {
    case 'giza': // أهرامات الجيزة — خوفو وخفرع ومنقرع مع قرص الشمس
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Sun */}
          <circle cx="36" cy="11" r="4" fill="currentColor" fillOpacity="0.6"/>
          {/* Great Pyramid Khufu */}
          <path d="M4 38L22 8L40 38H4Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M22 8V38" stroke="currentColor" strokeWidth="2"/>
          {/* Second Pyramid Khafre shadow */}
          <path d="M22 38L34 18L44 38" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          {/* Sand base */}
          <path d="M2 42H46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'saqqara': // سقارة وهرم زوسر المدرج — 6 طبقات متدرجة
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* 6 Stepped Tiers */}
          <rect x="20" y="10" width="8" height="5" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="17" y="15" width="14" height="5" rx="1" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="14" y="20" width="20" height="5" rx="1" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="11" y="25" width="26" height="5" rx="1" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="8" y="30" width="32" height="5" rx="1" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="5" y="35" width="38" height="6" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 43H46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'museum': // المتحف المصري بالتحرير — واجهة كلاسيكية بأعمدة وقبة
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Triangular Pediment */}
          <path d="M5 16L24 6L43 16H5Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx="24" cy="12" r="2" fill="currentColor"/>
          {/* Architrave */}
          <rect x="4" y="16" width="40" height="4" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
          {/* Classical Columns */}
          <rect x="7" y="20" width="5" height="18" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="16" y="20" width="5" height="18" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="27" y="20" width="5" height="18" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="36" y="20" width="5" height="18" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8"/>
          {/* Base Steps */}
          <rect x="3" y="38" width="42" height="4" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );

    case 'luxor': // معبد الأقصر — صرح بيلون وأعمدة البردي والمسلة
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Obelisk */}
          <path d="M10 38L12 8L14 38H10Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 6L11 8H13L12 6Z" fill="currentColor"/>
          {/* Grand Pylon Tower Left */}
          <path d="M16 38L18 16H23L22 38H16Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2"/>
          {/* Temple Portal Gateway */}
          <rect x="22" y="22" width="6" height="16" fill="currentColor" fillOpacity="0.8"/>
          {/* Grand Pylon Tower Right */}
          <path d="M28 38L27 16H32L34 38H28Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2"/>
          {/* Colossal Papyrus Column on Right */}
          <path d="M37 38V22C37 20 42 20 42 22V38H37Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
          <path d="M4 42H44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'karnak': // مجمع معابد الكرنك — صالة الأعمدة الكبرى (Hypostyle Hall)
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Massive Lotus-Bud Columns */}
          <path d="M6 14C8 10 12 10 14 14V38H6V14Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
          <path d="M18 10C21 6 27 6 30 10V38H18V10Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2"/>
          <path d="M34 14C36 10 40 10 42 14V38H34V14Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
          {/* Sun Architrave above */}
          <rect x="4" y="6" width="40" height="4" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="24" cy="4" r="3" fill="currentColor"/>
          <path d="M2 42H46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'kings': // وادي الملوك — جبل القرنة ومدخل المقبرة الملكية السرية
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Mountain Peak (Al-Qurn natural pyramid) */}
          <path d="M4 36L24 10L44 36H4Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Rock-cut Subterranean Descending Tomb Entrance */}
          <path d="M18 36L20 25H28L30 36H18Z" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="2"/>
          {/* Golden Tomb Vault */}
          <rect x="22" y="27" width="4" height="9" fill="#000"/>
          {/* Royal Sarcophagus symbol */}
          <circle cx="24" cy="18" r="3" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M2 40H46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'abusimbel': // معبدا أبو سمبل — تماثيل رمسيس الأربعة المنحوتة في الجبل
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Mountain Facade Outline */}
          <path d="M3 38L6 12C12 10 36 10 42 12L45 38H3Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
          {/* 4 Seated Colossi */}
          <circle cx="9" cy="20" r="2.5" fill="currentColor"/>
          <rect x="7" y="23" width="4" height="13" rx="1" fill="currentColor" fillOpacity="0.7"/>
          <circle cx="17" cy="20" r="2.5" fill="currentColor"/>
          <rect x="15" y="23" width="4" height="13" rx="1" fill="currentColor" fillOpacity="0.7"/>
          {/* Central Portal */}
          <rect x="22" y="25" width="4" height="13" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
          <circle cx="31" cy="20" r="2.5" fill="currentColor"/>
          <rect x="29" y="23" width="4" height="13" rx="1" fill="currentColor" fillOpacity="0.7"/>
          <circle cx="39" cy="20" r="2.5" fill="currentColor"/>
          <rect x="37" y="23" width="4" height="13" rx="1" fill="currentColor" fillOpacity="0.7"/>
          <path d="M2 42H46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'philae': // معبد فيلة — جزيرة إيزيس وسط مياه النيل
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Kiosk / Temple of Isis Pavilion */}
          <path d="M12 28V16H36V28" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M8 16H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <path d="M16 16V28M24 16V28M32 16V28" stroke="currentColor" strokeWidth="2"/>
          {/* Lotus Capital flourishes */}
          <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
          <circle cx="24" cy="14" r="1.5" fill="currentColor"/>
          <circle cx="32" cy="14" r="1.5" fill="currentColor"/>
          {/* Island Rock Foundation */}
          <path d="M6 32C12 29 36 29 42 32H6Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2"/>
          {/* Nile Water Ripples */}
          <path d="M3 38C8 36 14 40 20 38C26 36 32 40 38 38C41 37 43 38 45 38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M5 43C10 41 16 45 22 43C28 41 34 45 40 43C42 42 44 43 45 43" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );

    case 'pharos': // قلعة قايتباي وموقع فنار الإسكندرية — شعلة البحر والأمواج
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Lighthouse Tier 1: Base */}
          <path d="M16 38L18 26H30L32 38H16Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2"/>
          {/* Tier 2: Octagon shaft */}
          <path d="M19 26L20 16H28L29 26H19Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2"/>
          {/* Tier 3: Lantern & Beacon */}
          <rect x="22" y="11" width="4" height="5" fill="currentColor"/>
          {/* Light Beams Radiating */}
          <path d="M24 8V4M18 10L13 7M30 10L35 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Citadel Battlements & Sea */}
          <path d="M8 38H40" stroke="currentColor" strokeWidth="3"/>
          <path d="M4 42C10 40 18 44 24 42C30 40 38 44 44 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'catacombs': // مقابر كوم الشقافة — سلم دائري حجري منحوت في باطن الأرض
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Ground Level */}
          <path d="M4 12H44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Circular Spiral Staircase Well */}
          <circle cx="24" cy="28" r="14" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15"/>
          <circle cx="24" cy="28" r="9" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
          <circle cx="24" cy="28" r="4" fill="currentColor"/>
          {/* Underground Tomb Portals */}
          <path d="M24 14V24M24 32V42M10 28H20M28 28H38" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M6 38L24 10L42 38H6Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      );
  }
};

// ==========================================
// SECRET REPORTS SPECIFIC ICONS (الملفات السرية)
// ==========================================
export const ReportIcon: React.FC<{ reportId: string; className?: string }> = ({ reportId, className = 'w-8 h-8' }) => {
  switch (reportId) {
    case 'mummies': // موكب المومياوات الملكية — تابوت ذهبي ملكي
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M12 8C12 4 15 2 18 2C21 2 24 4 24 8L26 20C26 28 22 34 18 34C14 34 10 28 10 20L12 8Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
          <circle cx="18" cy="9" r="3" fill="currentColor"/>
          <path d="M13 16L23 22M23 16L13 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );

    case 'gem': // المتحف المصري الكبير — واجهة الهرم الزجاجية الحديثة
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M4 30L18 6L32 30H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M18 6V30M11 18H25M7 24H29" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );

    case 'gerf': // بردية وادي الجرف — لفافة البردي وميناء البحر الأحمر
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="6" y="8" width="24" height="20" rx="3" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2"/>
          <path d="M11 14H25M11 18H25M11 22H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );

    case 'tut-mask': // قناع توت عنخ آمون الذهبي
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M8 14C8 7 12 3 18 3C24 3 28 7 28 14V24L24 22V28L18 32L12 28V22L8 24V14Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
          <circle cx="18" cy="6" r="2" fill="currentColor"/>
          <path d="M10 16H26M11 20H25" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );

    case 'solar-boat': // مركب الشمس لخوفو
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M4 22C10 28 26 28 32 22C32 22 34 16 34 14C32 16 30 18 28 18H8C6 18 4 16 2 14C2 16 4 22 4 22Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="10" width="8" height="8" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M18 4V10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
  }
};
