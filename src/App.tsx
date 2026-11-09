/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Compass,
  MapPin,
  Scroll,
  Crown,
  BookOpen,
  Sparkles,
  Gamepad2,
  Search,
  MessageSquare,
  Music,
  Volume2,
  VolumeX,
  Bookmark,
  Award,
  Shield,
  Landmark,
  Feather,
  History,
  Radio,
  HelpCircle,
  Layers,
  Heart,
  X,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Play,
  Pause,
  Sun,
  Moon,
  Send,
  ExternalLink,
  Flame,
  CheckCircle2,
  XCircle,
  Download,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { 
  HorusEyeIcon, 
  WingedSunIcon, 
  AnkhIcon, 
  CharacterIcon, 
  SiteIcon, 
  ReportIcon 
} from './components/EgyptianIcons.tsx';

// ==========================================
// DATA DEFINITIONS & CONSTANTS
// ==========================================

interface Episode {
  id: number;
  title: string;
  category: string;
  duration: string;
  description: string;
  badge: string;
}

const EPISODES: Episode[] = [
  { id: 1, title: 'ملك الشمس الصغير', category: 'ملوك الفراعنة', duration: '12:30', description: 'حدوتة تاريخية متخيَّلة عن الملك الصغير توت عنخ آمون، ورحلة مقبرته الأسطورية التي اكتُشفت عام 1922.', badge: 'الأسرة 18' },
  { id: 2, title: 'الملكة التي حكمت كملك', category: 'ملكات مصر', duration: '14:10', description: 'حكاية حتشبسوت العظيمة وبعثتها التجارية الخالدة إلى بلاد بونت ومعبدها الصخري بالدير البحري.', badge: 'الدولة الحديثة' },
  { id: 3, title: 'الحكيم صاحب الهرم', category: 'علماء ومهندسون', duration: '10:45', description: 'عن إمحوتب العبقري، وزير الملك زوسر وأول مهندس معماري في التاريخ صاحب هرم سقارة المدرّج.', badge: 'الدولة القديمة' },
  { id: 4, title: 'آخر ملكات البطالمة', category: 'ملكات مصر', duration: '16:20', description: 'حكاية كليوباترا السابعة وأيام الإسكندرية الزاهرة في أواخر عهد الأسرة البطلمية.', badge: 'العصر البطلمي' },
  { id: 5, title: 'لغز الهرم الأكبر', category: 'عجائب الهندسة', duration: '13:05', description: 'كيف نظّم المصريون بناء هرم خوفو الأكبر، وماذا كشفت بردية وادي الجرف وبعثات الآثار الحديثة؟', badge: 'عجائب الدنيا' },
];

interface Site {
  id: string;
  name: string;
  lat: number;
  lon: number;
  region: string;
  period: string;
  type: string;
  description: string;
}

const SITES: Site[] = [
  { id: 'giza', name: 'أهرامات الجيزة', lat: 29.9792, lon: 31.1342, region: 'القاهرة والجيزة', period: 'الدولة القديمة', type: 'أهرامات', description: 'أهرامات خوفو وخفرع ومنقرع الشامخة، شُيدت قبل نحو 4500 عام، وتجاور تمثال أبو الهول العظيم حارس الهضبة.' },
  { id: 'saqqara', name: 'سقارة وهرم زوسر', lat: 29.8713, lon: 31.2165, region: 'القاهرة والجيزة', period: 'الدولة القديمة', type: 'أهرامات', description: 'مقبرة منف العريقة، وفيها هرم زوسر المدرّج أول صرح حجري متكامل شيده العبقري إمحوتب.' },
  { id: 'museum', name: 'المتحف المصري بالتحرير', lat: 30.0478, lon: 31.2336, region: 'القاهرة والجيزة', period: 'العصر الحديث', type: 'متاحف', description: 'مبنى أثري افتتح عام 1902، يضم أكبر وأندر مجموعة أثرية وتاريخية للحضارة المصرية القديمة.' },
  { id: 'luxor', name: 'معبد الأقصر', lat: 25.6995, lon: 32.639, region: 'الأقصر', period: 'الدولة الحديثة', type: 'معابد', description: 'معبد مهيب أسسه الملك أمنحتب الثالث ووسعه رمسيس الثاني، يربطه بمعبد الكرنك طريق الكباش التاريخي.' },
  { id: 'karnak', name: 'مجمع معابد الكرنك', lat: 25.7188, lon: 32.6573, region: 'الأقصر', period: 'الدولة الحديثة', type: 'معابد', description: 'أكبر مجمع معابد ديني في العالم القديم استمر بناؤه قروناً، ويحتوي على صالة الأعمدة الكبرى ذات الـ 134 عموداً.' },
  { id: 'kings', name: 'وادي الملوك', lat: 25.7402, lon: 32.6014, region: 'الأقصر', period: 'الدولة الحديثة', type: 'مقابر', description: 'المقابر الملكية الصخرية المنحوتة في جبال طيبة الغربية، وفيها عُثر على مقبرة توت عنخ آمون الذهبية كاملة.' },
  { id: 'abusimbel', name: 'معبدا أبو سمبل', lat: 22.3372, lon: 31.6258, region: 'أسوان والنوبة', period: 'الدولة الحديثة', type: 'معابد', description: 'معبدان منحوتان في الصخر نحتهما رمسيس الثاني لنفسه ولزوجته نفرتاري، وتشهد قدس أقداسه ظاهرة تعامد الشمس الفريدة.' },
  { id: 'philae', name: 'معبد فيلة (جزيرة إيزيس)', lat: 24.025, lon: 32.8844, region: 'أسوان والنوبة', period: 'العصر البطلمي', type: 'معابد', description: 'معبد إيزيس الأسطوري الذي أُنقذ بعناية ونُقل إلى جزيرة أجيلكيا في سبعينيات القرن الماضي لحمايته من الغرق.' },
  { id: 'pharos', name: 'قلعة قايتباي (موقع فنار الإسكندرية)', lat: 31.2139, lon: 29.8856, region: 'الإسكندرية', period: 'العصر البطلمي والإسلامي', type: 'معالم', description: 'شُيدت عام 1477م على موقع فنار الإسكندرية التاريخي القديم الذي اعتُبر إحدى عجائب العالم السبع.' },
  { id: 'catacombs', name: 'مقابر كوم الشقافة', lat: 31.1769, lon: 29.8928, region: 'الإسكندرية', period: 'العصر الروماني', type: 'مقابر', description: 'مقابر أثرية فريدة محفورة في الصخر تدمج الفنون والطقوس المصرية القديمة مع الطرازين اليوناني والروماني.' },
];

const SITE_COLORS: Record<string, string> = {
  'أهرامات': '#E98735',
  'معابد': '#1976B9',
  'مقابر': '#D7472F',
  'متاحف': '#25845D',
  'معالم': '#E5AC16',
};

interface Character {
  id: string;
  name: string;
  title: string;
  clues: string[];
  quote: string;
  fact: string;
  period: string;
}

const CHARACTERS: Character[] = [
  {
    id: 'tut',
    name: 'توت عنخ آمون',
    title: 'الفرعون الذهبي الشاب',
    clues: [
      'اعتليتُ عرش مصر وأنا طفل في التاسعة من عمري',
      'مقبرتي بوادي الملوك اكتُشفت شبه سليمة عام 1922',
      'قناعي الذهبي المصقول هو الرمز الأكثر شهرة في تاريخ الآثار'
    ],
    quote: 'أنا الملك الصغير.. رحلتُ مبكرًا لكن كنوز مقبرتي الذهبية أدهشت العالم بأسره!',
    fact: 'حكم نحو 1332–1323 ق.م، واكتشف عالم الآثار هوارد كارتر مقبرته رقم KV62 في وادي الملوك.',
    period: 'الدولة الحديثة'
  },
  {
    id: 'ramses',
    name: 'رمسيس الثاني',
    title: 'الفرعون البنّاء العظيم',
    clues: [
      'حكمتُ مصر لما يقارب 66 عاماً وعشت أكثر من 90 عاماً',
      'شيدتُ معبدي أبو سمبل ووسّعتُ معبدي الأقصر والكرنك',
      'خضتُ معركة قادش الشهيرة ووقعت أول معاهدة سلام مكتوبة'
    ],
    quote: 'نقشتُ بطولاتي على صخور الجبال من الدلتا إلى النوبة، وحكمتُ مصر في أزهى عصور قوتها!',
    fact: 'حكم نحو 1279–1213 ق.م، ويُعد من أبرز فراعنة الأسرة التاسعة عشرة وأكثرهم تشييداً للصروح والتماثيل الضخمة.',
    period: 'الدولة الحديثة'
  },
  {
    id: 'cleopatra',
    name: 'كليوباترا السابعة',
    title: 'آخر ملكات البطالمة',
    clues: [
      'آخر حاكمة فعلية لمصر قبل أن تصبح ولاية رومانية',
      'عشتُ في الإسكندرية وكنت الملكة الوحيدة التي أتقنت لغة الشعب المصرية',
      'ارتبط اسمي بالدهاء السياسي والعلاقة مع يوليوس قيصر ومارك أنطونيو'
    ],
    quote: 'جمعتُ بين حكمة العلم والدهاء السياسي.. وجعلتُ الإسكندرية منارة للحضارة في البحر المتوسط!',
    fact: 'توفيت عام 30 ق.م في الإسكندرية، وبوفاتها انتهى عصر الدولة البطلمية وبدأ الحكم الروماني لمصر.',
    period: 'العصر البطلمي'
  },
  {
    id: 'hatshepsut',
    name: 'حتشبسوت',
    title: 'الملكة التي حكمت كفرعون',
    clues: [
      'امرأة عظيمة اعتلت عرش مصر وحكمت باللباس والشارات الملكية الكاملة',
      'شيدتُ معبدي المدرج الخالد في الدير البحري بالأقصر',
      'أرسلتُ أضخم بعثة تجارية بحرية تاريخية إلى بلاد بونت'
    ],
    quote: 'حكمتُ البلاد في سلام ورخاء، وجلبتُ البخور والذهب والأشجار النادرة من أعماق بونت!',
    fact: 'حكمت نحو 1479–1458 ق.م في الأسرة 18، وازدهرت في عهدها الفنون والعمارة والتجارة الخارجية.',
    period: 'الدولة الحديثة'
  },
  {
    id: 'nefertiti',
    name: 'نفرتيتي',
    title: 'سيدة الجمال والشمس',
    clues: [
      'زوجة الملك أخناتون وشاركته قيادة الثورة الدينية والفكرية',
      'عشتُ في تل العمارنة وعبدتُ إله الشمس آتون',
      'تمثالي النصفي المصنوع من الحجر الجيري يعد آية في التناسق والجمال'
    ],
    quote: 'اسمي يعني الجمال الذي أشرق.. وكنت شريكة في تأسيس مدينة الشمس وعصر التغيير!',
    fact: 'عاشت في القرن 14 ق.م وتمثالها النصفي الملون محفوظ الآن في متحف برلين ويعد من أشهر الأعمال الفنية في التاريخ.',
    period: 'عصر العمارنة'
  },
  {
    id: 'imhotep',
    name: 'إمحوتب',
    title: 'أول مهندس وطبيب في التاريخ',
    clues: [
      'وزير ومهندس الملك زوسر في عصر بناة الأهرام',
      'صممتُ أول هرم حجري في تاريخ البشرية بسقارة',
      'نُسبت إليّ بدايات علم الطب ورُفعت إلى مرتبة الآلهة لاحقاً للحكمة'
    ],
    quote: 'لم أكن ملكاً متوجاً، لكن عقلي صمّم أول صرح حجري يصعد إلى السماء في تاريخ الإنسانية!',
    fact: 'عاش نحو القرن 27 ق.م ويُعتبر أول عبقري متعدد المواهب (مهندس، طبيب، فلكي، وزير) معروف بالاسم تاريخياً.',
    period: 'الدولة القديمة'
  }
];

interface SecretReport {
  id: string;
  title: string;
  category: string;
  summary: string;
  points: string[];
  timeline: [string, string][];
  sources: string[];
}

const REPORTS: SecretReport[] = [
  {
    id: 'pyr',
    title: 'كيف شُيدت أهرامات الجيزة؟',
    category: 'الهندسة والعمارة',
    summary: 'هرم خوفو الأكبر بالجيزة شُيد في عصر الأسرة الرابعة، ويكشف علماء الآثار اليوم عن تنظيم إداري وهندسي فائق الدقة وراء هذا الإنجاز الخالد.',
    points: [
      'شُيد هرم خوفو نحو عام 2550 ق.م واستغرق نحو عشرين عاماً من العمل المنظم.',
      'بناة الأهرام كانوا مصريين أحراراً يسكنون مدينة عمالية متكاملة وتلقوا رعاية طبية وغذائية كاملة.',
      'بردية وادي الجرف (المكتشفة عام 2013) توثق تفاصيل نقل كتل الحجر الجيري الملكي عبر قنوات النيل.'
    ],
    timeline: [
      ['نحو 2670 ق.م', 'بناء هرم زوسر المدرج في سقارة'],
      ['نحو 2600 ق.م', 'أهرامات الملك سنفرو المائلة والحمراء بدهشور'],
      ['نحو 2550 ق.م', 'تشييد هرم خوفو الأكبر في الجيزة']
    ],
    sources: [
      'Lehner, M. «The Complete Pyramids» (1997)',
      'Tallet & Lehner «The Red Sea Scrolls» (2022)',
      'Encyclopaedia Britannica: Pyramids of Giza'
    ]
  },
  {
    id: 'tut',
    title: 'أسرار مقبرة توت عنخ آمون',
    category: 'الاكتشافات الملكية',
    summary: 'الفرعون الشاب الذي أذهل العالم بعد أن بقيت مقبرته الذهبية محصنة ضد اللصوص لآلاف السنين حتى كشفها هوارد كارتر عام 1922.',
    points: [
      'تولى الحكم صغيراً وتوفي في سن التاسعة عشرة بعد حكم دام قرابة عقد كامل.',
      'اكتشف هوارد كارتر المقبرة بوادي الملوك في نوفمبر 1922 سالمة من النهب المنظم.',
      'ضمت المقبرة أكثر من 5000 قطعة أثرية فريدة من الذهب الخالص والأثاث الملكي والمركبات الحربية.'
    ],
    timeline: [
      ['1332 ق.م', 'توت عنخ آمون يعتلي العرش ويعيد العاصمة لطيبة'],
      ['1323 ق.م', 'وفاة الملك الشاب ودفنه في المقبرة KV62'],
      ['1922 م', 'اكتشاف المقبرة الأسطورية وكنوزها الذهبية']
    ],
    sources: [
      'Reeves, N. «The Complete Tutankhamun» (1990)',
      'Metropolitan Museum of Art: Tutankhamun Archives'
    ]
  },
  {
    id: 'mum',
    title: 'أسرار فن التحنيط والخلود',
    category: 'العلوم والخلود',
    summary: 'طريقة علمية وطقسية بالغة الإتقان لحفظ الجسد انطلاقاً من إيمان المصريين القدماء بالبعث والخلود في العالم الآخر.',
    points: [
      'استخدم المحنطون ملح النطرون الطبيعي لسحب السوائل وتجفيف الجسد على مدى أربعين يوماً.',
      'حُفظت الأعضاء الحيوية بعناية في أربع أوانٍ كانوبية تحت حماية أبناء حورس الأربعة.',
      'استغرقت طقوس وإجراءات التحنيط سبعين يوماً كاملة ترافقتها تلاوات ونقوش وتمائم واقية.'
    ],
    timeline: [
      ['نحو 3000 ق.م', 'بدايات التحنيط التجريبي في عصر الأسرات المبكرة'],
      ['الدولة الحديثة', 'الوصول للذروة العلمية والفنية في تقنيات التحنيط']
    ],
    sources: [
      'Ikram & Dodson «The Mummy in Ancient Egypt» (1998)',
      'British Museum: Egyptian Mummification'
    ]
  },
  {
    id: 'hier',
    title: 'حل لغز الكتابة الهيروغليفية',
    category: 'اللغة والأدب',
    summary: 'نظام كتابة عبقري جمع بين العلامات الصوتية والأبجدية والرموز المعبرة، حتى فك شامبليون شفرة حجر رشيد عام 1822.',
    points: [
      'ظهرت أولى النقوش الهيروغليفية قبل أكثر من خمسة آلاف عام.',
      'عُثر على حجر رشيد عام 1799 وكان يحمل مرسوماً بثلاثة نصوص (هيروغليفي وديموطيقي ويوناني).',
      'أدرك شامبليون أن الخراطيش الملكية (مثل بطليموس وكليوباترا) تمثل أحرفاً صوتية واضحة.'
    ],
    timeline: [
      ['3200 ق.م', 'أقدم نقوش هيروغليفية مسجلة في مصر العليا'],
      ['1799 م', 'اكتشاف حجر رشيد في الدلتا'],
      ['1822 م', 'شامبليون يعلن رسمياً فك شفرة الكتابة الهيروغليفية']
    ],
    sources: [
      'Parkinson, R. «Cracking Codes: The Rosetta Stone» (1999)',
      'British Museum: The Rosetta Stone Collection'
    ]
  }
];

interface Comic {
  id: number;
  title: string;
  subtitle: string;
  panels: [string, string, string][];
}

const COMICS: Comic[] = [
  {
    id: 1,
    title: 'طيبة والجعران الذهبي',
    subtitle: 'مغامرة استكشافية قصيرة لمعرفة دلالة الجعران الفرعوني ورمزية التجدد',
    panels: [
      ['𓆣', 'طيبة تتفقد حقيبتها الاستكشافية وتلاحظ اختفاء تميمة الجعران الذهبية!', 'يا نهار فيروزي! الجعران بتاعي راح فين؟!'],
      ['𓇳', 'آثار خطوات صغيرة على رمال الصحراء تقودها نحو ظل الهرم الأكبر.', 'الآثار دي واضحة جداً.. وبتودّي ناحية الهرم!'],
      ['𓉐', 'جعران حقيقي صغير يدحرج كرة رملية باجتهاد متواصل تحت أشعة الشمس.', 'بيدحرجها بكل عزم.. زي ما أجدادنا شبّهوه برحلة شروق الشمس اليومية!'],
      ['☥', 'طيبة تبتسم وتدرك أن الجعران رمز فرعوني خالد للتجدد والأمل.', 'هسيب التميمة هنا.. وهاحكي القصة الملهمة دي لكل أصحابي!']
    ]
  },
  {
    id: 2,
    title: 'سر المعبد الغامض',
    subtitle: 'طيبة تتعلم قراءة العلامات الهيروغليفية المنقوشة على صروح المعابد',
    panels: [
      ['𓉗', 'طيبة تدخل بهو الأعمدة بمعبد الكرنك العظيم وتتأمل الجدران المهيبة.', 'بص على الجمال ده! الجدران كلها رسومات وحكايات أثرية خالدة!'],
      ['𓅃', 'رموز الصقر حورس وعين الودجات منقوشة بألوان ثابتة لم تنطفئ.', 'دي هيروغليفية مقدسة.. كل رمز وله صوت ومعنى عميق!'],
      ['𓂀', 'تتذكر حجر رشيد وكيف ساعد العلماء على استعادة صوت الحضارة.', 'حجر رشيد كان المفتاح الذهبي اللي فتح أسرار الأجداد للعالم!'],
      ['𓏞', 'طيبة ترسم اسمها داخل خرطوشة ملكية بيضاوية أنيقة.', 'أنا كتبت اسمي زي ما كان الكتبة يخلدون أسماء الملوك العظام!']
    ]
  }
];

const HISTORICAL_FACTS = [
  'الأهرامات كانت مغطاة في الأصل بكتل من الحجر الجيري الأبيض المصقول التي كانت تلمع تحت أشعة الشمس كالذهب الأبيض!',
  'المصري القديم ابتكر أول تقويم شمسي سنوي مكون من 365 يوماً و12 شهراً قبل آلاف السنين.',
  'الكتبة والمهندسون في مصر القديمة حظوا بأعلى مكانة اجتماعية في المجتمع وكانوا يُعفون من الضرائب والجهد البدني.',
  'لعبة "سنت" اللوحية الفرعونية يعود تاريخها لأكثر من 5000 سنة، ومثلت رحلة الروح إلى العالم الآخر.',
  'أول معاهدة سلام موثقة ومحفورة في التاريخ البشري وقعها رمسيس الثاني مع ملك الحيثيين عام 1259 ق.م.',
  'المصريون القدماء اخترعوا ورق البردي من نباتات النيل، وكان أعظم وسيلة لتدوين العلوم والأدب في العالم القديم.'
];

// Coordinate helper for Egypt schematic map
const px = (la: number, lo: number): [number, number] => [(lo - 24.5) * 50, (31.9 - la) * 50];
const EG_BORDER: [number, number][] = [
  [25.15, 31.65], [25, 22], [36.9, 22], [35.5, 23.9],
  [34, 26.5], [32.6, 29.9], [34.25, 27.75], [34.9, 29.5],
  [34.27, 31.3], [31, 31.6]
];
const NILE_POINTS: [number, number][] = [
  [31.6, 22.3], [32.9, 24.1], [32.65, 25.7], [32.7, 26.2],
  [31.2, 27.2], [31.1, 29.1], [31.25, 30.05], [30.95, 31.45]
];
const pts = (arr: [number, number][]) => arr.map(([lo, la]) => px(la, lo).join(',')).join(' ');

// ==========================================
// SEPARATE COMPONENT: WHO IS THIS? / WHO AM I?
// (Fixes Hook rules permanently by having its own lifecycle)
// ==========================================

function WhoQuiz({ onBackHome }: { onBackHome: () => void }) {
  const [mode, setMode] = useState<0 | 1>(0); // 0: مين ده؟, 1: مين أنا؟
  const [level, setLevel] = useState<'سهل' | 'متوسط' | 'صعب'>('متوسط');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  // Generate shuffled options whenever question index or mode changes
  useEffect(() => {
    if (currentIndex < CHARACTERS.length) {
      const current = CHARACTERS[currentIndex];
      const others = CHARACTERS.filter(c => c.name !== current.name).map(c => c.name);
      const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
      const merged = [current.name, ...shuffledOthers].sort(() => Math.random() - 0.5);
      setCurrentOptions(merged);
      setIsAnswered(false);
      setSelectedOption(null);
      setHintUsed(false);
    }
  }, [currentIndex, mode]);

  const handleSelect = (idx: number, optName: string) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(idx);
    const isCorrect = optName === CHARACTERS[currentIndex].name;
    if (isCorrect) {
      setScore(s => s + (hintUsed ? 5 : 10));
    }
  };

  const handleNext = () => {
    setCurrentIndex(i => i + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setHintUsed(false);
  };

  if (currentIndex >= CHARACTERS.length) {
    return (
      <div className="py-12 max-w-xl mx-auto text-center px-4">
        <div className="bg-amber-50 dark:bg-[#1f3a66] border-4 border-amber-400 p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-400 text-slate-900 flex items-center justify-center mb-4 shadow-lg">
            <Award className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-[#172D55] dark:text-amber-200 mb-2">
            رائع يا بطل الحضارة!
          </h2>
          <p className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-6">
            أنهيت المسابقة بنجاح بنتيجة: <span className="text-2xl font-black text-red-600 dark:text-amber-300">{score}</span> من {CHARACTERS.length * 10} نقطة
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={handleReset} className="cta-btn text-base py-2.5 px-6">
              <RotateCcw className="w-5 h-5 ml-1" />
              العب مرة أخرى
            </button>
            <button onClick={onBackHome} className="bg-slate-200 dark:bg-slate-700 font-bold px-6 py-2.5 rounded-full text-slate-800 dark:text-slate-200 hover:bg-slate-300">
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCh = CHARACTERS[currentIndex];

  return (
    <div className="py-8 max-w-2xl mx-auto text-center px-4">
      {/* Return Button */}
      <button 
        onClick={onBackHome}
        className="inline-flex items-center gap-2 mb-4 text-sm font-bold bg-[#172D55] text-amber-300 px-5 py-2 rounded-full border border-amber-400 hover:bg-amber-400 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
        العودة للرئيسية
      </button>

      {/* Header */}
      <div className="flex justify-center items-center gap-2 mb-2">
        <Crown className="w-10 h-10 text-amber-500" />
      </div>
      <h1 className="text-3xl md:text-4xl font-black text-[#172D55] dark:text-amber-300 mb-2">
        مين ده؟ مين أنا؟
      </h1>
      <p className="text-base font-bold text-slate-600 dark:text-slate-300 mb-6">
        اقرأ التلميحات والأقوال التاريخية وخمّن شخصية الفرعون أو الملكة
      </p>

      {/* Mode Tabs */}
      <div className="flex items-center justify-center gap-2.5 mb-5">
        <button
          onClick={() => { setMode(0); handleReset(); }}
          className={`px-5 py-2 rounded-full font-black text-sm transition-all cursor-pointer ${
            mode === 0 ? 'bg-amber-400 text-slate-950 shadow-md scale-105' : 'bg-white/40 dark:bg-slate-800 text-slate-700 dark:text-white border border-amber-400'
          }`}
        >
          مين ده؟ (تلميحات الإنجازات)
        </button>
        <button
          onClick={() => { setMode(1); handleReset(); }}
          className={`px-5 py-2 rounded-full font-black text-sm transition-all cursor-pointer ${
            mode === 1 ? 'bg-amber-400 text-slate-950 shadow-md scale-105' : 'bg-white/40 dark:bg-slate-800 text-slate-700 dark:text-white border border-amber-400'
          }`}
        >
          مين أنا؟ (أقوال متخيلة)
        </button>
      </div>

      {/* Level Selector */}
      <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold">
        <span>مستوى الصعوبة:</span>
        {(['سهل', 'متوسط', 'صعب'] as const).map(lvl => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
              level === lvl ? 'bg-red-600 text-white font-black' : 'bg-amber-200 dark:bg-slate-700 text-slate-900 dark:text-white'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-amber-50 dark:bg-[#1f3a66] border-4 border-amber-400 p-6 md:p-8 rounded-3xl shadow-2xl text-center">
        
        {/* Character Icon Badge */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-slate-950 flex items-center justify-center mb-4 shadow-lg border-2 border-amber-300 p-3">
          <CharacterIcon characterId={currentCh.id} className="w-14 h-14 text-slate-950" />
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-300 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-4">
          <div 
            className="bg-gradient-to-r from-amber-400 to-red-500 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / CHARACTERS.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-amber-200 mb-4">
          <span>سؤال {currentIndex + 1} من {CHARACTERS.length}</span>
          <span>النقاط: {score}</span>
        </div>

        {/* Clues or Quote */}
        {mode === 0 ? (
          <div className="mb-6">
            <h3 className="font-black text-xl text-[#172D55] dark:text-amber-200 mb-3 text-center">
              خمّن الشخصية من الإنجازات التاريخية:
            </h3>
            <ul className="space-y-2.5 max-w-lg mx-auto text-sm md:text-base font-bold bg-white/80 dark:bg-black/20 p-4 rounded-2xl border border-amber-400/40 text-center">
              {currentCh.clues.map((clue, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  <Scroll className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="font-black text-xl text-[#172D55] dark:text-amber-200 mb-3 text-center">
              خمّن صاحب المقولة التاريخية:
            </h3>
            <blockquote className="italic text-base md:text-lg font-extrabold text-[#172D55] dark:text-amber-100 bg-white/80 dark:bg-black/20 p-5 rounded-2xl border border-amber-400/40 text-center leading-relaxed">
              "{currentCh.quote}"
            </blockquote>
          </div>
        )}

        {/* Hint */}
        {!isAnswered && !hintUsed && level !== 'صعب' && (
          <button
            onClick={() => setHintUsed(true)}
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-200/90 dark:bg-amber-950/60 px-4 py-1.5 rounded-full border border-amber-400 cursor-pointer hover:bg-amber-300"
          >
            <Sparkles className="w-3.5 h-3.5" />
            طلب تلميح: {currentCh.period}
          </button>
        )}

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentOptions.map((opt, i) => {
            const isCorrect = opt === currentCh.name;
            let style = 'bg-white dark:bg-slate-800 border-2 border-amber-400 text-[#172D55] dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-slate-700';
            if (isAnswered) {
              if (isCorrect) {
                style = 'bg-emerald-600 text-white border-2 border-emerald-400 font-black shadow-lg';
              } else if (selectedOption === i) {
                style = 'bg-red-600 text-white border-2 border-red-400 font-bold';
              }
            }
            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleSelect(i, opt)}
                className={`p-3.5 rounded-xl font-bold text-base transition-all cursor-pointer shadow text-center flex items-center justify-center gap-2 ${style}`}
              >
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                {isAnswered && selectedOption === i && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Answer Feedback */}
        {isAnswered && (
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border-2 border-amber-400 animate-fadeIn text-center">
            <p className="font-black text-base mb-1">
              {currentOptions[selectedOption!] === currentCh.name ? (
                <span className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" />
                  إجابة دقيقة وصحيحة! أحسنت!
                </span>
              ) : (
                <span className="text-red-500 inline-flex items-center gap-1.5">
                  <XCircle className="w-5 h-5" />
                  الإجابة الصحيحة هي: {currentCh.name}
                </span>
              )}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold mb-3 max-w-md mx-auto">
              {currentCh.fact}
            </p>
            <button
              onClick={handleNext}
              className="cta-btn text-sm py-2 px-6"
            >
              {currentIndex + 1 < CHARACTERS.length ? 'السؤال التالي ←' : 'مشاهدة النتيجة النهائية'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedComicId, setSelectedComicId] = useState<number | null>(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(null);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sa-theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Authentic Ancient Egyptian WebAudio Synthesizer
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Search & Dialog states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isAiGuideOpen, setIsAiGuideOpen] = useState<boolean>(false);
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; link?: string }>>([
    { role: 'assistant', text: 'أهلاً بك! أنا طيبة، مرشدتك التاريخية في سر الأثر. اسألني أي سؤال عن الحضارة المصرية القديمة، الفراعنة، الأهرامات أو المعابد وسأجيبك فوراً.' }
  ]);
  const [aiInput, setAiInput] = useState<string>('');
  const [aiIsTyping, setAiIsTyping] = useState<boolean>(false);

  // Floating Kamoon helper
  const [kamoonFact, setKamoonFact] = useState<string | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sa-favs') || '[]');
    } catch {
      return [];
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Map controls
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [mapCenter, setMapCenter] = useState<{ x: number; y: number }>({ x: 312, y: 250 });
  const [mapRegionFilter, setMapRegionFilter] = useState<string>('الكل');
  const [mapTypeFilter, setMapTypeFilter] = useState<string>('الكل');

  // Memory Game
  const [memoryCards, setMemoryCards] = useState<Array<{ id: number; symbol: string; flipped: boolean; matched: boolean }>>([]);
  const [memoryFlippedIndices, setMemoryFlippedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState<number>(0);

  // Audio Podcast Player simulation
  const [podcastPlaying, setPodcastPlaying] = useState<boolean>(false);
  const [podcastProgress, setPodcastProgress] = useState<number>(0);
  const podcastDuration = 750;
  const [podcastSpeed, setPodcastSpeed] = useState<number>(1);

  // Sync theme
  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('sa-theme', isDarkMode ? 'dark' : 'light');
    } catch {}
  }, [isDarkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('sa-favs', JSON.stringify(updated));
      } catch {}
      showToast(exists ? 'تمت الإزالة من المفضلة' : 'أُضيفت إلى المفضلة بنجاح!');
      return updated;
    });
  };

  // Keyboard shortcut '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsAiGuideOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ==========================================
  // SERENE ANCIENT EGYPTIAN AMBIENT SYNTHESIZER
  // (Calm Nile Drone, Arched Temple Harp, Breathing Reed Ney, Delicate Hathor Sistrum)
  // ==========================================
  const droneNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const toggleEgyptianMusic = async () => {
    if (isMusicPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.suspend();
      }
      setIsMusicPlaying(false);
      showToast('تم إيقاف الموسيقى');
    } else {
      try {
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioContextRef.current = ctx;
        }
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        startSereneEgyptianMelody();
        setIsMusicPlaying(true);
        showToast('موسيقى مصرية فرعونية هادئة تعزف الآن');
      } catch {
        showToast('تعذر تشغيل الصوت في المتصفح');
      }
    }
  };

  const startSereneEgyptianMelody = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    // Stop any existing drone
    if (droneNodesRef.current) {
      try {
        droneNodesRef.current.osc1.stop();
        droneNodesRef.current.osc2.stop();
      } catch {}
      droneNodesRef.current = null;
    }

    // 1. Continuous Serene Nile Drone (Warm root D2 at 73.4Hz + Fifth A2 at 110Hz through 180Hz filter)
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.025, ctx.currentTime);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(170, ctx.currentTime);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(73.42, ctx.currentTime); // D2

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110.00, ctx.currentTime); // A2

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    droneNodesRef.current = { osc1, osc2, gain: droneGain };

    // 2. Sacred Pharaonic Melodic Phrases (Bayati / Hijaz in D)
    const MELODIC_PHRASES = [
      [293.66, 369.99, 392.00, 440.00, 369.99, 293.66],       // D4 - F#4 - G4 - A4 - F#4 - D4
      [220.00, 293.66, 311.13, 369.99, 311.13, 293.66],       // A3 - D4 - Eb4 - F#4 - Eb4 - D4
      [392.00, 440.00, 466.16, 440.00, 392.00, 369.99, 293.66], // G4 - A4 - Bb4 - A4 - G4 - F#4 - D4
      [146.83, 220.00, 293.66, 369.99, 440.00, 369.99]        // D3 - A3 - D4 - F#4 - A4 - F#4
    ];

    let phraseIdx = 0;
    let noteIdx = 0;
    let tick = 0;

    const step = () => {
      if (!audioContextRef.current || audioContextRef.current.state !== 'running') return;
      const t = ctx.currentTime;
      const currentPhrase = MELODIC_PHRASES[phraseIdx % MELODIC_PHRASES.length];
      const freq = currentPhrase[noteIdx % currentPhrase.length];

      // A. Arched Egyptian Harp (قيثارة الآلهة المقوسة — نغمات أوتار خشبية هادئة)
      const harpOsc = ctx.createOscillator();
      const harpGain = ctx.createGain();
      const harpFilter = ctx.createBiquadFilter();
      
      harpOsc.type = 'triangle';
      harpOsc.frequency.setValueAtTime(freq, t);

      harpFilter.type = 'bandpass';
      harpFilter.frequency.setValueAtTime(freq * 1.5, t);
      harpFilter.Q.setValueAtTime(1.2, t);

      // Very soft, relaxing attack & long soothing decay
      harpGain.gain.setValueAtTime(0, t);
      harpGain.gain.linearRampToValueAtTime(0.065, t + 0.04);
      harpGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);

      harpOsc.connect(harpFilter);
      harpFilter.connect(harpGain);
      harpGain.connect(ctx.destination);
      harpOsc.start(t);
      harpOsc.stop(t + 2.7);

      // B. Serene Reed Ney (ناي القصب الفرعوني الهادئ — يعزف نغمة ممتدة كل بضع حركات)
      if (noteIdx === 0 || (tick % 6 === 0 && Math.random() < 0.6)) {
        const neyOsc = ctx.createOscillator();
        const neyGain = ctx.createGain();
        neyOsc.type = 'sine';
        neyOsc.frequency.setValueAtTime(freq, t);
        // Gentle breath vibrato
        neyOsc.frequency.linearRampToValueAtTime(freq * 1.008, t + 0.8);
        neyOsc.frequency.linearRampToValueAtTime(freq, t + 1.8);

        neyGain.gain.setValueAtTime(0, t);
        neyGain.gain.linearRampToValueAtTime(0.035, t + 0.6);
        neyGain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);

        neyOsc.connect(neyGain);
        neyGain.connect(ctx.destination);
        neyOsc.start(t);
        neyOsc.stop(t + 3.3);
      }

      // C. Hathor Sistrum (سستروم حتحور الهادئ — شخشيخة خفيفة جداً كالنسيم)
      if (tick % 8 === 0) {
        const bufferSize = ctx.sampleRate * 0.06;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const sistrumFilter = ctx.createBiquadFilter();
        sistrumFilter.type = 'highpass';
        sistrumFilter.frequency.value = 8500;
        const sistrumGain = ctx.createGain();
        sistrumGain.gain.setValueAtTime(0.008, t);
        sistrumGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

        noise.connect(sistrumFilter);
        sistrumFilter.connect(sistrumGain);
        sistrumGain.connect(ctx.destination);
        noise.start(t);
      }

      noteIdx++;
      if (noteIdx >= currentPhrase.length) {
        noteIdx = 0;
        phraseIdx++;
      }
      tick++;

      // Calm tempo: each note breathes every 1.1 to 1.3 seconds
      synthTimerRef.current = window.setTimeout(step, 1150);
    };

    step();
  };

  useEffect(() => {
    return () => {
      if (synthTimerRef.current) clearTimeout(synthTimerRef.current);
      if (droneNodesRef.current) {
        try {
          droneNodesRef.current.osc1.stop();
          droneNodesRef.current.osc2.stop();
        } catch {}
      }
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Memory game (Authentic sacred Egyptian glyphs)
  const startMemoryGame = () => {
    const symbols = ['☥', '𓆣', '𓇳', '𓆓', '𓂀', '𓅃'];
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((s, idx) => ({ id: idx, symbol: s, flipped: false, matched: false }));
    setMemoryCards(deck);
    setMemoryFlippedIndices([]);
    setMemoryMoves(0);
  };

  useEffect(() => {
    if (currentView === 'games') {
      startMemoryGame();
    }
  }, [currentView]);

  const handleCardClick = (idx: number) => {
    if (memoryCards[idx].flipped || memoryCards[idx].matched || memoryFlippedIndices.length === 2) return;

    const newDeck = [...memoryCards];
    newDeck[idx].flipped = true;
    setMemoryCards(newDeck);

    const newFlipped = [...memoryFlippedIndices, idx];
    setMemoryFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (newDeck[first].symbol === newDeck[second].symbol) {
        newDeck[first].matched = true;
        newDeck[second].matched = true;
        setMemoryCards(newDeck);
        setMemoryFlippedIndices([]);
      } else {
        setTimeout(() => {
          newDeck[first].flipped = false;
          newDeck[second].flipped = false;
          setMemoryCards([...newDeck]);
          setMemoryFlippedIndices([]);
        }, 750);
      }
    }
  };

  // AI Guide query
  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const query = aiInput.trim();
    setAiChatMessages(prev => [...prev, { role: 'user', text: query }]);
    setAiInput('');
    setAiIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let response = '';
      let link: string | undefined = undefined;

      if (q.includes('هرم') || q.includes('اهرام') || q.includes('خوفو')) {
        response = 'الأهرامات شُيدت كصروح مقدسة للخلود في عصر الدولة القديمة. هرم خوفو الأكبر بالجيزة بُني من قرابة 2.3 مليون كتلة حجرية، وعمال البناء كانوا مصريين أحراراً يسكنون مدينة مجهزة برعاية غذائية وطبية متكاملة.';
        link = 'pyr';
      } else if (q.includes('توت') || q.includes('قناع') || q.includes('كارتر')) {
        response = 'توت عنخ آمون فرعون شاب تولى الحكم في سن التاسعة، ومقبرته رقم KV62 في وادي الملوك اكتشفها هوارد كارتر عام 1922 محتفظة بأكثر من 5000 قطعة ذهبية وأشهر قناع مصقول في التاريخ!';
        link = 'tut';
      } else if (q.includes('حتشبسوت') || q.includes('ملكة')) {
        response = 'الملكة حتشبسوت حكمت مصر كفرعون كامل السلطة، وبنت معبد الدير البحري الفريد بالأقصر، وسيرت أسطولاً تجارياً ضخماً إلى بلاد بونت لجلب أشجار المر والبخور والذهب.';
      } else if (q.includes('تحنيط') || q.includes('مومياء')) {
        response = 'التحنيط الفرعوني كان يستغرق سبعين يوماً باستخدام ملح النطرون الطبيعي لتجفيف الجسد بالكامل، وحفظ الأحشاء في 4 أوانٍ كانوبية مقدسة لضمان البعث الأبدي في العالم الآخر.';
        link = 'mum';
      } else if (q.includes('هيروغليف') || q.includes('رشيد') || q.includes('كتابة')) {
        response = 'الهيروغليفية تعني "الكتابة المقدسة"، وجمعت بين الدلالات الصوتية والرموز المعبرة. وفك رموزها الفرنسي فرانسوا شامبليون عام 1822 بفضل نصوص حجر رشيد الثلاثية.';
        link = 'hier';
      } else {
        response = 'سؤال رائع عن تاريخ وحضارة مصر القديمة! يمكنك استكشاف تفاصيل تاريخية موثقة في أقسام خريطة الأسرار والبودكاست والتقارير الموثقة هنا في سر الأثر.';
      }

      setAiChatMessages(prev => [...prev, { role: 'assistant', text: response, link }]);
      setAiIsTyping(false);
    }, 650);
  };

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const results: Array<{ title: string; category: string; action: () => void }> = [];

    EPISODES.forEach(e => {
      if (e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)) {
        results.push({
          title: e.title,
          category: `بودكاست · ${e.category}`,
          action: () => {
            setSelectedEpisodeId(e.id);
            setCurrentView('episode');
            setIsSearchModalOpen(false);
          }
        });
      }
    });

    SITES.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.region.toLowerCase().includes(q)) {
        results.push({
          title: s.name,
          category: `موقع أثري · ${s.region}`,
          action: () => {
            setSelectedSiteId(s.id);
            setCurrentView('site');
            setIsSearchModalOpen(false);
          }
        });
      }
    });

    REPORTS.forEach(r => {
      if (r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)) {
        results.push({
          title: r.title,
          category: `تقرير موثق · ${r.category}`,
          action: () => {
            setSelectedReportId(r.id);
            setCurrentView('report');
            setIsSearchModalOpen(false);
          }
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery]);

  // Tab items definition (Compact, crisp labels that fit statically on screen)
  const NAV_TABS = [
    { id: 'home', label: 'الرئيسية', icon: Landmark },
    { id: 'tales', label: 'حواديت', icon: Radio },
    { id: 'map', label: 'الخريطة', icon: Compass },
    { id: 'who', label: 'مين ده؟', icon: Crown },
    { id: 'secrets', label: 'أسرار', icon: Layers },
    { id: 'talk', label: 'قصص', icon: BookOpen },
    { id: 'games', label: 'ألعاب', icon: Gamepad2 },
  ];

  return (
    <div className="min-h-screen flex flex-col text-center selection:bg-amber-400 selection:text-slate-900" dir="rtl">
      
      {/* ================= COMPLETELY STATIC TOP NAVIGATION BAR (NO SCROLLBAR) ================= */}
      <nav className="sticky top-0 z-50 bg-[#0c182f]/95 dark:bg-[#070e1d]/95 backdrop-blur-md border-b border-amber-500/30 shadow-2xl">
        {/* Golden hairline top border */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

        <div className="wrap max-w-7xl mx-auto flex items-center justify-between h-14 md:h-16 px-2 md:px-6 gap-2">
          
          {/* Logo with Royal Eye of Horus */}
          <button 
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 font-black text-slate-100 hover:text-amber-300 transition-colors cursor-pointer group flex-shrink-0"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg border border-amber-300 group-hover:scale-105 transition-transform p-1.5">
              <HorusEyeIcon className="w-full h-full text-slate-950" />
            </div>
            <div className="text-right flex flex-col items-start leading-tight">
              <span className="text-base md:text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 drop-shadow">
                سر الأثر
              </span>
              <span className="text-[9px] text-amber-300/80 font-bold hidden lg:block">
                بوابة الحضارة المصرية
              </span>
            </div>
          </button>

          {/* ICON TABS (Visible on Desktop, Hidden on Mobile Phones as requested) */}
          <div className="hidden md:flex items-center justify-center gap-1 md:gap-1.5 py-1 px-1.5 md:px-2 bg-slate-950/60 rounded-2xl border border-amber-400/25 flex-shrink">
            {NAV_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = currentView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentView(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black shadow-md ring-1 ring-amber-300'
                      : 'text-amber-100/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'text-slate-950' : 'text-amber-300'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Functional Actions (Standard uniform buttons) */}
          <div className="flex items-center gap-1 md:gap-1.5 flex-shrink-0">
            
            {/* Music Button (Small & Compact Standard Icon Button) */}
            <button
              onClick={toggleEgyptianMusic}
              title={isMusicPlaying ? 'إيقاف الموسيقى الفرعونية الهادئة' : 'تشغيل موسيقى فرعونية هادئة'}
              className={`w-8 h-8 md:w-9 md:h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isMusicPlaying 
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)] animate-pulse' 
                  : 'border-amber-400/40 bg-white/10 text-amber-200 hover:bg-amber-400/20'
              }`}
            >
              {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Saved Favorites */}
            <button
              onClick={() => { setCurrentView('favs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              title="المفضلة"
              className="w-8 h-8 md:w-9 md:h-9 rounded-xl border border-amber-400/40 bg-white/10 text-amber-200 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer relative"
            >
              <Bookmark className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              title="بحث في كل الموقع (/)"
              className="w-8 h-8 md:w-9 md:h-9 rounded-xl border border-amber-400/40 bg-white/10 text-amber-200 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              title="تبديل المظهر"
              className="w-8 h-8 md:w-9 md:h-9 rounded-xl border border-amber-400/40 bg-white/10 text-amber-200 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Direct HTML File Download */}
            <a
              href="/sar-al-athar-standalone.html"
              download="سر_الأثر_الموقع_الكامل.html"
              title="تحميل الموقع كملف HTML مستقل كامل"
              className="w-8 h-8 md:w-9 md:h-9 rounded-xl border border-amber-400 bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>

        </div>
      </nav>

      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#172D55] text-amber-300 border-2 border-amber-400 px-6 py-2 rounded-full font-bold shadow-2xl animate-bounce text-sm">
          {toastMessage}
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 pb-16">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div>
            
            {/* HERO SECTION - FULLY CENTERED WITH BALANCED PROPORTIONAL TAYBA */}
            <section className="relative pt-10 pb-6 overflow-hidden text-center">
              
              <div className="wrap max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10 px-4">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 px-5 py-1.5 rounded-full font-black text-xs md:text-sm shadow-md border-2 border-[#172D55] mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>منصة تعليمية وترفيهية لاستكشاف عبقرية الحضارة المصرية القديمة</span>
                  <Sparkles className="w-4 h-4" />
                </div>

                {/* Main Headline - Centered */}
                <h1 className="hero-title font-black mb-3 text-center">
                  سر الحضارة المصرية
                </h1>

                {/* Subtitle - Centered */}
                <p className="text-lg md:text-xl font-bold max-w-2xl mx-auto mb-6 text-[#172D55] dark:text-amber-200 leading-relaxed text-center">
                  تعال نكتشف أسرار وتاريخ الفراعنة معًا في رحلة تفاعلية ممتعة مع المرشدة طيبة!
                </p>

                {/* COMPACT & BALANCED TAYBA (Scaled down so she doesn't dominate the screen) */}
                <div className="relative my-3 flex flex-col items-center">
                  
                  {/* Speech bubble */}
                  <div className="bg-amber-100 text-[#172D55] dark:bg-[#1f3a66] dark:text-amber-200 border-2 border-amber-400 px-5 py-2 rounded-2xl shadow-lg font-bold text-sm md:text-base mb-2 animate-bounce">
                    <span>أهلاً بك! أنا طيبة، جاهز للمغامرة الاستكشافية؟</span>
                  </div>

                  {/* Scaled-down Mascot */}
                  <div 
                    onClick={() => setIsAiGuideOpen(true)}
                    className="relative w-36 md:w-44 h-auto cursor-pointer group"
                    title="اضغط للتحدث مع طيبة"
                  >
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full filter blur-lg group-hover:blur-xl transition-all" />
                    <img 
                      src="/assets/tayba_clean.webp" 
                      alt="طيبة مرشدة سر الأثر" 
                      className="relative z-10 w-full h-auto drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="mt-1.5 inline-block bg-[#172D55] text-amber-300 text-[11px] font-black px-3 py-0.5 rounded-full border border-amber-400 shadow">
                      طيبة — المرشدة الذكية
                    </span>
                  </div>
                </div>

                {/* Centered CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                  <a href="#categories" className="cta-btn text-base py-2.5 px-7">
                    <span>ابدأ الاستكشاف</span>
                    <Compass className="w-5 h-5 mr-1" />
                  </a>
                  <button 
                    onClick={() => { setCurrentView('tales'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-2.5 rounded-full font-bold text-base bg-[#17669B] text-white border-2 border-amber-400 hover:bg-amber-400 hover:text-slate-900 transition-all shadow cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Radio className="w-4 h-4" />
                    <span>البودكاست</span>
                  </button>
                  <button 
                    onClick={() => setIsAiGuideOpen(true)}
                    className="px-5 py-2.5 rounded-full font-bold text-base bg-emerald-600 text-white border-2 border-amber-400 hover:bg-emerald-500 transition-all shadow cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>اسأل طيبة</span>
                  </button>
                </div>

                {/* Centered Search Bar */}
                <div className="w-full max-w-lg mx-auto mt-6 relative">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="search"
                      placeholder="ابحث عن أهرامات، ملوك، مقابر، ألغاز، ألعاب..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => { if (searchQuery.trim()) setIsSearchModalOpen(true); }}
                      className="w-full text-center font-bold text-sm md:text-base px-10 py-3 rounded-full border-3 border-amber-400 bg-amber-50 text-[#172D55] dark:bg-[#1f3a66] dark:text-amber-100 shadow-md outline-none focus:border-red-500 transition-all placeholder:text-slate-500"
                    />
                    <Search className="w-4 h-4 absolute right-4 text-amber-600 dark:text-amber-300 pointer-events-none" />
                  </div>

                  {/* Instant Dropdown */}
                  {searchQuery.trim().length > 0 && searchResults.length > 0 && (
                    <div className="absolute top-full inset-x-0 mt-2 bg-[#172D55] border-3 border-amber-400 rounded-2xl overflow-hidden shadow-2xl z-30 text-center">
                      {searchResults.map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={item.action}
                          className="px-4 py-2.5 border-b border-amber-400/20 hover:bg-amber-400 hover:text-slate-900 text-white cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <span className="font-bold text-sm">{item.title}</span>
                          <span className="text-xs text-amber-300 font-semibold">{item.category}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </section>

            {/* SCENIC DESERT DIVIDER */}
            <div className="w-full overflow-hidden">
              <svg className="w-full h-auto min-h-[75px] block" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
                <circle cx="980" cy="55" r="40" fill="#FFD84D" opacity="0.8" />
                <path d="M0 160V125q300-30 600 0t600-10v45z" fill="#F4D77C" />
                <path d="M170 140L300 35l130 105z" fill="#E5AC16" />
                <path d="M300 35l130 105H300z" fill="#c98f0c" />
                <path d="M360 145L520 18l160 127z" fill="#E98735" />
                <path d="M520 18l160 127H520z" fill="#c26e22" />
                <path d="M650 148L750 70l100 78z" fill="#E5AC16" />
                <path d="M750 70l100 78H750z" fill="#c98f0c" />
                <path d="M0 160V140q200-14 400 6t400-4 400 8v10z" fill="#e8c35c" />
              </svg>
            </div>

            {/* WELCOME PANEL - COMPACT & CENTERED */}
            <section className="py-6">
              <div className="wrap max-w-3xl mx-auto px-4">
                <div className="bg-gradient-to-r from-[#17669B] via-[#172D55] to-[#17669B] text-white border-3 border-amber-400 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-center text-center gap-5">
                  
                  {/* Tayba Round Avatar */}
                  <div 
                    onClick={() => setIsAiGuideOpen(true)}
                    className="relative w-24 h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-xl flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    title="تحدث مع طيبة"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-amber-300">
                      <img 
                        src="/assets/tayba_avatar.webp" 
                        alt="طيبة" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Centered Welcome Copy */}
                  <div className="text-center md:text-right flex-1">
                    <h2 className="text-xl md:text-2xl font-black text-amber-300 mb-1.5 text-center md:text-right">
                      أهلاً بك! أنا طيبة
                    </h2>
                    <p className="text-xs md:text-sm text-amber-50 font-semibold leading-relaxed mb-3 text-center md:text-right">
                      مرشدتك لاكتشاف عجائب الفراعنة. هنا ستجد بودكاست صوتياً، وخريطة آثار تفاعلية، ومسابقات وألعاباً تاريخية ذكية!
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                      <button 
                        onClick={() => setIsAiGuideOpen(true)}
                        className="bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full font-black text-xs border border-slate-950 hover:bg-white transition-colors cursor-pointer inline-flex items-center gap-1 shadow"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>اسأل طيبة أي سؤال</span>
                      </button>
                      <button 
                        onClick={() => { setCurrentView('who'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="bg-white/10 text-amber-200 px-3.5 py-1.5 rounded-full font-bold text-xs border border-amber-400 hover:bg-white/20 transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Crown className="w-3.5 h-3.5" />
                        <span>مسابقة مين ده ومين أنا</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SIX CATEGORIES WITH MATURE LUCIDE ICONS - STRICTLY CENTERED */}
            <section id="categories" className="py-8 text-center">
              <div className="wrap max-w-5xl mx-auto px-4">
                
                <h2 className="sec-title-badge">
                  اختار مغامرتك
                </h2>
                <p className="text-sm md:text-base text-slate-700 dark:text-amber-200 font-bold mb-6 text-center">
                  أبواب ستة لاكتشاف أسرار وحكايات الحضارة المصرية
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  {[
                    { id: 'tales', title: 'حواديت طيبة', icon: Radio, desc: 'حكايات صوتية عن ملوك وملكات مصر', color: '#20A99D' },
                    { id: 'map', title: 'خريطة الأسرار', icon: Compass, desc: 'استكشاف تفاعلي لمعالم النيل', color: '#1976B9' },
                    { id: 'who', title: 'مين ده؟ مين أنا؟', icon: Crown, desc: 'خمّن شخصية الفرعون من الألغاز', color: '#D7472F' },
                    { id: 'secrets', title: 'نكشف السر', icon: Layers, desc: 'تقارير أثرية موثقة بمصادرها', color: '#E98735' },
                    { id: 'talk', title: 'تعالوا نحكي', icon: BookOpen, desc: 'قصص كوميكس ورسومات مسلية', color: '#25845D' },
                    { id: 'games', title: 'ألعاب', icon: Gamepad2, desc: 'ألعاب ذاكرة وتحديات معرفية', color: '#E5AC16' },
                  ].map(cat => {
                    const IconComponent = cat.icon;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          setCurrentView(cat.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{ '--ac': cat.color } as React.CSSProperties}
                        className="cat-card group text-center"
                      >
                        <div className="icon-bubble">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-black text-sm md:text-base text-[#172D55] dark:text-amber-200 mb-1">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold line-clamp-2">
                          {cat.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* HIGHLIGHTED ROWS - ALL HEADINGS AND CARDS STRICTLY CENTERED */}
            <section className="py-6">
              <div className="wrap max-w-5xl mx-auto space-y-10 px-4">
                
                {/* 1. Podcasts */}
                <div>
                  <div className="text-center mb-5">
                    <h3 className="sec-title-badge">حلقات البودكاست المميزة</h3>
                    <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-amber-100">سرد مشوق لأعظم أحداث وبطولات مصر القديمة</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {EPISODES.slice(0, 3).map(ep => (
                      <div 
                        key={ep.id}
                        onClick={() => { setSelectedEpisodeId(ep.id); setCurrentView('episode'); }}
                        className="bg-amber-50 dark:bg-[#1f3a66] border-2 border-amber-400 rounded-2xl overflow-hidden shadow hover:-translate-y-1 transition-transform cursor-pointer relative group flex flex-col text-center"
                      >
                        <button 
                          onClick={(e) => toggleFavorite(`ep-${ep.id}`, e)}
                          className="absolute top-2.5 left-2.5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 border border-amber-400 flex items-center justify-center shadow text-xs hover:scale-110 transition-transform"
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(`ep-${ep.id}`) ? 'text-red-600 fill-current' : 'text-slate-400'}`} />
                        </button>
                        <div className="h-24 flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-300 dark:from-slate-800 dark:to-slate-700">
                          <Radio className="w-10 h-10 text-amber-800 dark:text-amber-300" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between items-center text-center">
                          <div>
                            <span className="inline-block bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full mb-1">
                              {ep.category}
                            </span>
                            <h4 className="font-black text-base text-[#172D55] dark:text-amber-200 mb-1">
                              {ep.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold line-clamp-2">
                              {ep.description}
                            </p>
                          </div>
                          <div className="mt-2 text-xs font-bold text-amber-700 dark:text-amber-300">
                            ⏱️ {ep.duration} دقيقة
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Archaeological Sites */}
                <div>
                  <div className="text-center mb-5">
                    <h3 className="sec-title-badge">معالم وصروح أثرية بارزة</h3>
                    <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-amber-100">جولة في أقدس المعابد وأشهر الأهرامات الخالدة</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {SITES.slice(0, 3).map(site => (
                      <div 
                        key={site.id}
                        onClick={() => { setSelectedSiteId(site.id); setCurrentView('map'); }}
                        className="bg-amber-50 dark:bg-[#1f3a66] border-2 border-amber-400 rounded-2xl overflow-hidden shadow hover:-translate-y-1 transition-transform cursor-pointer relative group flex flex-col text-center"
                      >
                        <button 
                          onClick={(e) => toggleFavorite(`site-${site.id}`, e)}
                          className="absolute top-2.5 left-2.5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 border border-amber-400 flex items-center justify-center shadow text-xs hover:scale-110 transition-transform"
                        >
                          <Bookmark className={`w-4 h-4 ${favorites.includes(`site-${site.id}`) ? 'text-amber-500 fill-current' : 'text-slate-400'}`} />
                        </button>
                        <div className="h-28 flex items-center justify-center bg-gradient-to-br from-amber-100/70 via-amber-50 to-amber-200/50 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-700 p-2">
                          <SiteIcon siteId={site.id} className="w-14 h-14 text-amber-600 dark:text-amber-300 drop-shadow-md" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between items-center text-center">
                          <div>
                            <span className="inline-block bg-sky-700 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full mb-1">
                              {site.type} · {site.region}
                            </span>
                            <h4 className="font-black text-base text-[#172D55] dark:text-amber-200 mb-1">
                              {site.name}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold line-clamp-2">
                              {site.description}
                            </p>
                          </div>
                          <div className="mt-2 text-xs font-bold text-slate-500 dark:text-amber-300">
                            {site.period}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Characters */}
                <div>
                  <div className="text-center mb-5">
                    <h3 className="sec-title-badge">شخصيات فرعونية صنعت التاريخ</h3>
                    <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-amber-100">تعرّف على سير الفراعنة والملكات والعلماء</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {CHARACTERS.slice(0, 3).map(ch => (
                      <div 
                        key={ch.id}
                        onClick={() => { setCurrentView('who'); }}
                        className="bg-amber-50 dark:bg-[#1f3a66] border-2 border-amber-400 rounded-2xl overflow-hidden shadow hover:-translate-y-1 transition-transform cursor-pointer relative group flex flex-col text-center p-5"
                      >
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-slate-950 flex items-center justify-center mb-3 shadow-lg border-2 border-amber-300 p-3">
                          <CharacterIcon characterId={ch.id} className="w-14 h-14 text-slate-950" />
                        </div>
                        <h4 className="font-black text-lg text-[#172D55] dark:text-amber-200 mb-0.5">
                          {ch.name}
                        </h4>
                        <span className="text-xs text-amber-700 dark:text-amber-400 font-bold mb-2">
                          {ch.title}
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold italic line-clamp-2 mb-3">
                          "{ch.quote}"
                        </p>
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          العب المسابقة وخمّن الشخصية ←
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: PODCAST LIST ("حواديت طيبة") */}
        {currentView === 'tales' && (
          <div className="py-8 max-w-4xl mx-auto text-center px-4">
            <button 
              onClick={() => setCurrentView('home')} 
              className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold bg-[#172D55] text-amber-300 px-4 py-1.5 rounded-full border border-amber-400"
            >
              <ChevronRight className="w-4 h-4" />
              العودة للرئيسية
            </button>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 shadow-lg">
              <Radio className="w-9 h-9" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#172D55] dark:text-amber-300 mb-2">
              حواديت طيبة
            </h1>
            <p className="text-base font-bold text-slate-600 dark:text-slate-300 mb-8">
              حكايات صوتية مشوقة ترويها المرشدة طيبة عن بطولات وحياة الفراعنة
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EPISODES.map(ep => (
                <div 
                  key={ep.id}
                  onClick={() => { setSelectedEpisodeId(ep.id); setCurrentView('episode'); }}
                  className="bg-amber-50 dark:bg-[#1f3a66] border-2 border-amber-400 rounded-2xl p-5 shadow text-center cursor-pointer hover:scale-[1.02] transition-transform flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-200 dark:bg-slate-700 flex items-center justify-center mb-2">
                    <Radio className="w-6 h-6 text-amber-800 dark:text-amber-300" />
                  </div>
                  <span className="text-[11px] bg-red-600 text-white font-black px-2.5 py-0.5 rounded-full mb-1">
                    {ep.category} · {ep.badge}
                  </span>
                  <h3 className="text-lg font-black text-[#172D55] dark:text-amber-200 mb-1">
                    {ep.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold line-clamp-2 mb-3">
                    {ep.description}
                  </p>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                    ⏱️ المدة: {ep.duration} دقيقة
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: PODCAST PLAYER */}
        {currentView === 'episode' && selectedEpisodeId && (
          <div className="py-8 max-w-2xl mx-auto text-center px-4">
            {(() => {
              const ep = EPISODES.find(x => x.id === selectedEpisodeId) || EPISODES[0];
              return (
                <div>
                  <button 
                    onClick={() => setCurrentView('tales')} 
                    className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold bg-[#172D55] text-amber-300 px-4 py-1.5 rounded-full border border-amber-400"
                  >
                    <ChevronRight className="w-4 h-4" />
                    كل الحلقات
                  </button>

                  <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 shadow">
                    <Radio className="w-10 h-10" />
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-black text-[#172D55] dark:text-amber-300 mb-1">
                    {ep.title}
                  </h1>
                  <p className="text-xs font-bold text-slate-600 dark:text-amber-100 mb-6">
                    {ep.category} · {ep.duration} دقيقة
                  </p>

                  {/* Audio Controls Container */}
                  <div className="bg-[#172D55] text-white border-3 border-amber-400 rounded-3xl p-6 shadow-2xl mb-6">
                    <div className="space-y-1 mb-4">
                      <input 
                        type="range"
                        min="0"
                        max={podcastDuration}
                        value={podcastProgress}
                        onChange={(e) => setPodcastProgress(+e.target.value)}
                        className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                      />
                      <div className="flex justify-between text-xs text-amber-300 font-mono">
                        <span>{Math.floor(podcastProgress / 60)}:{String(podcastProgress % 60).padStart(2, '0')}</span>
                        <span>{ep.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                      <button 
                        onClick={() => setPodcastProgress(p => Math.max(0, p - 15))}
                        className="text-xs font-bold text-amber-300 hover:text-white"
                      >
                        ⏪ 15 ثانية
                      </button>
                      <button 
                        onClick={() => setPodcastPlaying(p => !p)}
                        className="w-12 h-12 rounded-full bg-amber-400 text-slate-900 font-black flex items-center justify-center shadow hover:scale-105"
                      >
                        {podcastPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                      </button>
                      <button 
                        onClick={() => setPodcastProgress(p => Math.min(podcastDuration, p + 15))}
                        className="text-xs font-bold text-amber-300 hover:text-white"
                      >
                        15 ثانية ⏩
                      </button>
                      <button 
                        onClick={() => setPodcastSpeed(s => (s === 2 ? 0.75 : s + 0.25))}
                        className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold border border-amber-400"
                      >
                        {podcastSpeed}×
                      </button>
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div className="bg-amber-50 dark:bg-[#1f3a66] p-5 rounded-2xl border-2 border-amber-400 text-center">
                    <h3 className="font-black text-lg text-[#172D55] dark:text-amber-200 mb-2">نبذة عن الحلقة:</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                      {ep.description}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW 4: MAP */}
        {currentView === 'map' && (
          <div className="py-8 max-w-4xl mx-auto text-center px-4">
            <button 
              onClick={() => setCurrentView('home')} 
              className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold bg-[#172D55] text-amber-300 px-4 py-1.5 rounded-full border border-amber-400"
            >
              <ChevronRight className="w-4 h-4" />
              العودة للرئيسية
            </button>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 shadow">
              <Compass className="w-9 h-9" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#172D55] dark:text-amber-300 mb-2">
              خريطة الأسرار
            </h1>
            <p className="text-base font-bold text-slate-600 dark:text-slate-300 mb-6">
              مواقع وصروح مصر القديمة — انقر على أي موقع لمعرفة تاريخه وعصره
            </p>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">المنطقة:</span>
                <select 
                  value={mapRegionFilter}
                  onChange={(e) => setMapRegionFilter(e.target.value)}
                  className="font-bold text-xs bg-amber-50 dark:bg-[#1f3a66] border border-amber-400 rounded-full px-3 py-1 text-[#172D55] dark:text-amber-200"
                >
                  {['الكل', 'القاهرة والجيزة', 'الأقصر', 'أسوان والنوبة', 'الإسكندرية'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">النوع:</span>
                <select 
                  value={mapTypeFilter}
                  onChange={(e) => setMapTypeFilter(e.target.value)}
                  className="font-bold text-xs bg-amber-50 dark:bg-[#1f3a66] border border-amber-400 rounded-full px-3 py-1 text-[#172D55] dark:text-amber-200"
                >
                  {['الكل', 'أهرامات', 'معابد', 'مقابر', 'متاحف', 'معالم'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setMapZoom(z => Math.min(3, z + 0.5))} 
                  className="bg-amber-400 text-slate-900 font-bold px-2.5 py-1 rounded-full text-xs"
                >
                  ＋
                </button>
                <button 
                  onClick={() => setMapZoom(z => Math.max(1, z - 0.5))} 
                  className="bg-amber-400 text-slate-900 font-bold px-2.5 py-1 rounded-full text-xs"
                >
                  －
                </button>
                <button 
                  onClick={() => { setMapZoom(1); setMapCenter({ x: 312, y: 250 }); }} 
                  className="bg-slate-700 text-white font-bold px-2.5 py-1 rounded-full text-xs"
                >
                  ⟲
                </button>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="relative overflow-hidden rounded-3xl border-4 border-amber-400 shadow-xl max-w-2xl mx-auto bg-[#9fd8e6]">
              <svg 
                className="w-full h-auto block" 
                viewBox={`${mapCenter.x - (312.5 / mapZoom)} ${mapCenter.y - (250 / mapZoom)} ${625 / mapZoom} ${500 / mapZoom}`}
              >
                <polygon points={pts(EG_BORDER)} fill="#F4D77C" stroke="#E5AC16" strokeWidth="3" />
                <polyline points={pts(NILE_POINTS)} fill="none" stroke="#1976B9" strokeWidth="6" strokeLinecap="round" />
                <polyline points={pts([[31.25, 30.05], [31.8, 31.45]])} fill="none" stroke="#1976B9" strokeWidth="4" />
                
                {SITES
                  .filter(s => (mapRegionFilter === 'الكل' || s.region === mapRegionFilter) && (mapTypeFilter === 'الكل' || s.type === mapTypeFilter))
                  .map(s => {
                    const [x, y] = px(s.lat, s.lon);
                    const isSelected = selectedSiteId === s.id;
                    return (
                      <g key={s.id} onClick={() => setSelectedSiteId(s.id)} className="cursor-pointer">
                        <circle 
                          cx={x} 
                          cy={y} 
                          r={isSelected ? 13 : 8} 
                          fill={SITE_COLORS[s.type] || '#E5AC16'} 
                          stroke="#fff" 
                          strokeWidth={isSelected ? 3 : 2}
                        />
                        <text 
                          x={x} 
                          y={y - 10} 
                          textAnchor="middle" 
                          fontSize={isSelected ? "12" : "9"} 
                          fontWeight="bold" 
                          fill="#172D55"
                          className="pointer-events-none select-none drop-shadow"
                        >
                          {s.name}
                        </text>
                      </g>
                    );
                  })}
              </svg>
            </div>

            {/* Selected site modal */}
            {selectedSiteId && (
              <div className="mt-5 max-w-lg mx-auto bg-amber-50 dark:bg-[#1f3a66] border-2 border-amber-400 p-5 rounded-2xl shadow-lg text-center animate-fadeIn">
                {(() => {
                  const s = SITES.find(x => x.id === selectedSiteId);
                  if (!s) return null;
                  return (
                    <div>
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mb-3 shadow">
                        <SiteIcon siteId={s.id} className="w-12 h-12 text-amber-600 dark:text-amber-300" />
                      </div>
                      <h3 className="text-xl font-black text-[#172D55] dark:text-amber-200 mb-1">{s.name}</h3>
                      <p className="text-xs text-amber-700 dark:text-amber-300 font-bold mb-2">
                        {s.region} · {s.period} · {s.type}
                      </p>
                      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 font-semibold mb-4 leading-relaxed">
                        {s.description}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={(e) => toggleFavorite(`site-${s.id}`, e)} 
                          className="text-xs font-black bg-amber-400 text-slate-900 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 cursor-pointer shadow hover:bg-amber-300"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${favorites.includes(`site-${s.id}`) ? 'fill-current text-slate-950' : ''}`} />
                          <span>{favorites.includes(`site-${s.id}`) ? 'في المفضلة' : 'أضف للمفضلة'}</span>
                        </button>
                        <button 
                          onClick={() => setSelectedSiteId(null)}
                          className="text-xs font-bold bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-1.5 rounded-full cursor-pointer hover:bg-slate-400"
                        >
                          إغلاق
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: WHO IS THIS? WHO AM I? (Rendered via WhoQuiz standalone component) */}
        {currentView === 'who' && (
          <WhoQuiz onBackHome={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        )}

        {/* VIEW 6: SECRETS UNCOVERED (REPORTS) */}
        {currentView === 'secrets' && (
          <div className="py-8 max-w-4xl mx-auto text-center px-4">
            <button 
              onClick={() => setCurrentView('home')} 
              className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold bg-[#172D55] text-amber-300 px-4 py-1.5 rounded-full border border-amber-400"
            >
              <ChevronRight className="w-4 h-4" />
              العودة للرئيسية
            </button>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 shadow">
              <Layers className="w-9 h-9" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#172D55] dark:text-amber-300 mb-2">
              نكشف السر
            </h1>
            <p className="text-base font-bold text-slate-600 dark:text-slate-300 mb-8">
              تقارير أثرية موثقة بمصادرها التاريخية والمكتشفات الميدانية
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REPORTS.map(rep => (
                <div 
                  key={rep.id}
                  onClick={() => { setSelectedReportId(rep.id); setCurrentView('report'); }}
                  className="bg-amber-50 dark:bg-[#1f3a66] border-2 border-amber-400 rounded-2xl p-5 shadow text-center cursor-pointer hover:scale-[1.02] transition-transform flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mb-3 shadow">
                      <ReportIcon reportId={rep.id} className="w-9 h-9 text-amber-600 dark:text-amber-300" />
                    </div>
                    <span className="text-[11px] bg-amber-500 text-slate-900 font-black px-3 py-0.5 rounded-full mb-2 inline-block">
                      {rep.category}
                    </span>
                    <h3 className="text-lg font-black text-[#172D55] dark:text-amber-200 mb-2">
                      {rep.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed mb-4">
                      {rep.summary}
                    </p>
                  </div>
                  <span className="text-xs font-black text-amber-700 dark:text-amber-300">
                    اقرأ التقرير والخط الزمني ←
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 7: REPORT DETAIL */}
        {currentView === 'report' && selectedReportId && (
          <div className="py-8 max-w-3xl mx-auto text-center px-4">
            {(() => {
              const rep = REPORTS.find(r => r.id === selectedReportId) || REPORTS[0];
              return (
                <div>
                  <button 
                    onClick={() => setCurrentView('secrets')} 
                    className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold bg-[#172D55] text-amber-300 px-4 py-1.5 rounded-full border border-amber-400"
                  >
                    <ChevronRight className="w-4 h-4" />
                    كل التقارير
                  </button>
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mb-4 shadow-lg">
                    <ReportIcon reportId={rep.id} className="w-12 h-12 text-amber-600 dark:text-amber-300" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-[#172D55] dark:text-amber-200 mb-2">
                    {rep.title}
                  </h1>
                  <span className="bg-amber-500 text-slate-900 text-xs font-black px-3 py-1 rounded-full mb-6 inline-block">
                    {rep.category}
                  </span>

                  <div className="bg-amber-50 dark:bg-[#1f3a66] border-2 border-amber-400 p-5 rounded-2xl shadow mb-6 text-center">
                    <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                      {rep.summary}
                    </p>
                  </div>

                  {/* Key facts */}
                  <div className="mb-6">
                    <h3 className="sec-title-badge mb-3 text-lg md:text-xl">أهم الحقائق الأثرية</h3>
                    <div className="space-y-2.5">
                      {rep.points.map((pt, i) => (
                        <div key={i} className="flex items-center justify-center gap-2.5 bg-white/80 dark:bg-slate-800 p-3.5 rounded-xl border border-amber-400/40 text-center">
                          <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-black flex items-center justify-center text-xs flex-shrink-0">
                            {i + 1}
                          </span>
                          <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">{pt}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-6">
                    <h3 className="sec-title-badge mb-3 text-lg md:text-xl">الخط الزمني التاريخي</h3>
                    <div className="space-y-3">
                      {rep.timeline.map(([date, event], i) => (
                        <div key={i} className="bg-amber-100/60 dark:bg-slate-800/60 p-3 rounded-xl border border-amber-400/30 text-center">
                          <b className="text-red-600 dark:text-amber-400 font-black block text-xs">{date}</b>
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{event}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sources */}
                  <div className="bg-black/10 dark:bg-black/30 p-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 text-center">
                    <b className="text-amber-700 dark:text-amber-300 block mb-1">المصادر العلمية الموثقة:</b>
                    <div className="space-y-0.5">
                      {rep.sources.map((src, i) => (
                        <div key={i}>{src}</div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW 8: COMICS ("تعالوا نحكي") */}
        {currentView === 'talk' && (
          <div className="py-8 max-w-4xl mx-auto text-center px-4">
            <button 
              onClick={() => setCurrentView('home')} 
              className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold bg-[#172D55] text-amber-300 px-4 py-1.5 rounded-full border border-amber-400"
            >
              <ChevronRight className="w-4 h-4" />
              العودة للرئيسية
            </button>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 shadow">
              <BookOpen className="w-9 h-9" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#172D55] dark:text-amber-300 mb-2">
              تعالوا نحكي
            </h1>
            <p className="text-base font-bold text-slate-600 dark:text-slate-300 mb-8">
              قصص مصورة ومغامرات كوميكس تفاعلية مستوحاة من مصر القديمة
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {COMICS.map(c => (
                <div 
                  key={c.id}
                  onClick={() => { setSelectedComicId(c.id); setCurrentView('comic'); }}
                  className="bg-amber-50 dark:bg-[#1f3a66] border-2 border-amber-400 rounded-3xl p-6 shadow-xl text-center cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <h3 className="text-xl font-black text-[#172D55] dark:text-amber-200 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-semibold mb-4 leading-relaxed">
                    {c.subtitle}
                  </p>
                  <button className="cta-btn text-xs py-2 px-6">
                    اقرأ القصة الكاملة ({c.panels.length} لوحات) ←
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 9: COMIC VIEWER */}
        {currentView === 'comic' && selectedComicId && (
          <div className="py-8 max-w-2xl mx-auto text-center px-4">
            {(() => {
              const comic = COMICS.find(c => c.id === selectedComicId) || COMICS[0];
              return (
                <div>
                  <button 
                    onClick={() => setCurrentView('talk')} 
                    className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold bg-[#172D55] text-amber-300 px-4 py-1.5 rounded-full border border-amber-400"
                  >
                    <ChevronRight className="w-4 h-4" />
                    كل القصص
                  </button>
                  <h1 className="text-2xl md:text-3xl font-black text-[#172D55] dark:text-amber-200 mb-1">
                    {comic.title}
                  </h1>
                  <p className="text-xs font-bold text-slate-600 dark:text-amber-200 mb-6">
                    {comic.subtitle}
                  </p>

                  <div className="space-y-5">
                    {comic.panels.map(([icon, caption, bubble], idx) => (
                      <div 
                        key={idx}
                        className="bg-gradient-to-br from-amber-100 to-yellow-200 dark:from-slate-800 dark:to-slate-900 border-3 border-[#172D55] dark:border-amber-400 rounded-3xl p-5 shadow-lg text-center"
                      >
                        <div className="text-4xl mb-2">{icon}</div>
                        <p className="text-sm font-extrabold text-[#172D55] dark:text-white mb-2">
                          {caption}
                        </p>
                        <div className="inline-block bg-white dark:bg-[#1f3a66] text-[#172D55] dark:text-amber-200 border border-[#172D55] px-5 py-2 rounded-xl font-black text-base shadow">
                          "{bubble}"
                        </div>
                        <div className="mt-2 text-[10px] font-bold text-slate-500">
                          لوحة {idx + 1} من {comic.panels.length}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button onClick={() => setCurrentView('talk')} className="cta-btn text-xs py-2 px-6">
                      العودة للقصص ←
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW 10: GAMES */}
        {currentView === 'games' && (
          <div className="py-8 max-w-4xl mx-auto text-center px-4">
            <button 
              onClick={() => setCurrentView('home')} 
              className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold bg-[#172D55] text-amber-300 px-4 py-1.5 rounded-full border border-amber-400"
            >
              <ChevronRight className="w-4 h-4" />
              العودة للرئيسية
            </button>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 shadow">
              <Gamepad2 className="w-9 h-9" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#172D55] dark:text-amber-300 mb-2">
              ألعاب واكتشافات
            </h1>
            <p className="text-base font-bold text-slate-600 dark:text-slate-300 mb-6">
              لعبة الذاكرة الفرعونية — طابق أزواج الرموز المتشابهة!
            </p>

            <div className="max-w-md mx-auto bg-amber-50 dark:bg-[#1f3a66] border-3 border-amber-400 p-5 rounded-3xl shadow-xl">
              <div className="flex justify-between items-center text-xs font-black mb-3">
                <span>الحركات: {memoryMoves}</span>
                <button 
                  onClick={startMemoryGame}
                  className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full font-black text-xs hover:bg-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة اللعب</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {memoryCards.map((card, i) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(i)}
                    className={`aspect-square rounded-xl text-2xl font-black flex items-center justify-center transition-all border-2 cursor-pointer shadow ${
                      card.flipped || card.matched 
                        ? 'bg-amber-300 text-slate-900 border-amber-500 scale-105' 
                        : 'bg-[#17669B] text-amber-300 border-amber-400 hover:scale-105'
                    } ${card.matched ? 'bg-emerald-500 text-white border-emerald-300' : ''}`}
                  >
                    {card.flipped || card.matched ? card.symbol : '☥'}
                  </button>
                ))}
              </div>

              {memoryCards.length > 0 && memoryCards.every(c => c.matched) && (
                <div className="mt-4 p-3 bg-emerald-600 text-white rounded-xl shadow animate-bounce text-center flex items-center justify-center gap-2">
                  <Award className="w-5 h-5 text-amber-300" />
                  <h3 className="text-base font-black">أحسنت! أنهيت اللعبة بنجاح في {memoryMoves} حركة!</h3>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 11: FAVORITES */}
        {currentView === 'favs' && (
          <div className="py-8 max-w-3xl mx-auto text-center px-4">
            <button 
              onClick={() => setCurrentView('home')} 
              className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold bg-[#172D55] text-amber-300 px-4 py-1.5 rounded-full border border-amber-400"
            >
              <ChevronRight className="w-4 h-4" />
              العودة للرئيسية
            </button>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 shadow">
              <Heart className="w-9 h-9 fill-current" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#172D55] dark:text-amber-300 mb-2">
              مفضلتي
            </h1>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-6">
              المحتوى الذي قمت بحفظه على جهازك للرجوع إليه في أي وقت
            </p>

            {favorites.length === 0 ? (
              <div className="bg-amber-50 dark:bg-[#1f3a66] border-2 border-amber-400 p-8 rounded-3xl max-w-md mx-auto shadow text-center">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4">
                  لم تحفظ أي عنصر في المفضلة حتى الآن. انقر على رمز القلب في أي بطاقة لحفظها هنا.
                </p>
                <button onClick={() => setCurrentView('home')} className="cta-btn text-xs py-2 px-6">
                  استكشف المحتوى الآن ←
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-w-xl mx-auto text-center">
                {favorites.map(favId => {
                  if (favId.startsWith('ep-')) {
                    const id = +favId.slice(3);
                    const ep = EPISODES.find(e => e.id === id);
                    if (!ep) return null;
                    return (
                      <div key={favId} className="bg-amber-50 dark:bg-[#1f3a66] border border-amber-400 p-3.5 rounded-xl flex items-center justify-between text-center shadow">
                        <div className="flex items-center gap-2.5">
                          <Radio className="w-5 h-5 text-amber-600" />
                          <h4 className="font-black text-sm">{ep.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => { setSelectedEpisodeId(ep.id); setCurrentView('episode'); }}
                            className="text-xs bg-[#172D55] text-amber-300 px-3 py-1 rounded-full font-bold"
                          >
                            تشغيل
                          </button>
                          <button 
                            onClick={() => toggleFavorite(favId)}
                            className="text-xs bg-red-600 text-white px-2.5 py-1 rounded-full font-bold"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    );
                  }
                  if (favId.startsWith('site-')) {
                    const id = favId.slice(5);
                    const s = SITES.find(x => x.id === id);
                    if (!s) return null;
                    return (
                      <div key={favId} className="bg-amber-50 dark:bg-[#1f3a66] border border-amber-400 p-3.5 rounded-xl flex items-center justify-between text-center shadow">
                        <div className="flex items-center gap-2.5">
                          <Landmark className="w-5 h-5 text-teal-600" />
                          <h4 className="font-black text-sm">{s.name}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => { setSelectedSiteId(s.id); setCurrentView('site'); }}
                            className="text-xs bg-[#172D55] text-amber-300 px-3 py-1 rounded-full font-bold"
                          >
                            عرض
                          </button>
                          <button 
                            onClick={() => toggleFavorite(favId)}
                            className="text-xs bg-red-600 text-white px-2.5 py-1 rounded-full font-bold"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}

                <div className="pt-3">
                  <button 
                    onClick={() => {
                      setFavorites([]);
                      localStorage.removeItem('sa-favs');
                      showToast('تم مسح كل المحفوظات');
                    }}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    مسح المفضلة بالكامل
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ================= FIXED MINI TAYBA COMPANION (SCALED DOWN & SUBTLE) ================= */}
      <div 
        id="tay-companion" 
        className="group"
        onClick={() => setIsAiGuideOpen(true)}
      >
        <div className="interactive-body relative">
          
          {/* Subtle compact speech bubble */}
          <div className="hidden group-hover:flex absolute -top-8 right-0 bg-amber-400 text-slate-900 font-black text-[10px] px-2.5 py-1 rounded-lg border border-[#172D55] shadow whitespace-nowrap animate-bounce items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            <span>اسألني سؤالاً!</span>
          </div>

          <img 
            src="/assets/tayba_clean.webp" 
            alt="طيبة" 
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* ================= FIXED MINI KAMOON (REFINED BLUE SCARAB) ================= */}
      <div className="fixed right-3 bottom-3 z-40">
        <button
          id="kamoon-floater"
          onClick={() => {
            const randomFact = HISTORICAL_FACTS[Math.floor(Math.random() * HISTORICAL_FACTS.length)];
            setKamoonFact(randomFact);
          }}
          className="w-16 h-20 md:w-20 md:h-24 cursor-pointer animate-float relative block focus:outline-none"
          title="كمّون الجعران الأزرق — انقر لمعلومة تاريخية أثرية سريعة!"
        >
          <img 
            src="/assets/kamoon.webp" 
            alt="كمّون الجعران الأزرق" 
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(6,182,212,0.45)]"
          />
        </button>

        {kamoonFact && (
          <div className="fixed right-4 bottom-28 z-50 max-w-xs bg-amber-50 text-[#172D55] dark:bg-slate-900 dark:text-amber-200 border-2 border-amber-400 p-4 rounded-3xl shadow-2xl text-center animate-fadeIn">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-400/30">
              <span className="text-cyan-700 dark:text-cyan-400 font-black text-xs inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                معلومة من كمّون:
              </span>
              <button 
                onClick={() => setKamoonFact(null)} 
                className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-red-500 flex items-center justify-center cursor-pointer text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs font-semibold leading-relaxed text-center mb-2.5">{kamoonFact}</p>
            <button
              onClick={() => {
                const randomFact = HISTORICAL_FACTS[Math.floor(Math.random() * HISTORICAL_FACTS.length)];
                setKamoonFact(randomFact);
              }}
              className="text-[11px] font-black text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              معلومة أخرى من كمّون ←
            </button>
          </div>
        )}
      </div>

      {/* ================= AI CHAT GUIDE MODAL ("طيبة") ================= */}
      {isAiGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-amber-50 dark:bg-[#1f3a66] border-3 border-amber-400 rounded-3xl w-full max-w-md h-[500px] flex flex-col shadow-2xl overflow-hidden text-center">
            
            {/* Header */}
            <div className="bg-[#172D55] text-white p-3.5 flex items-center justify-between border-b-2 border-amber-400">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-amber-400 overflow-hidden bg-slate-900">
                  <img src="/assets/tayba_avatar.webp" alt="طيبة" className="w-full h-full object-cover" />
                </div>
                <div className="text-right">
                  <h3 className="font-black text-sm text-amber-300">طيبة — المرشدة الذكية</h3>
                  <span className="text-[10px] text-emerald-300 font-bold">● متصلة للإجابة فوراً</span>
                </div>
              </div>
              <button 
                onClick={() => setIsAiGuideOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            {/* Quick chips */}
            <div className="p-2 bg-amber-200/50 dark:bg-black/20 flex gap-1.5 overflow-x-auto text-xs whitespace-nowrap justify-center">
              {['مين اللي بنى الأهرامات؟', 'احكيلي عن حتشبسوت', 'سر التحنيط'].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setAiInput(chip)}
                  className="bg-white dark:bg-slate-800 text-[#172D55] dark:text-amber-200 px-2.5 py-1 rounded-full border border-amber-400 text-[11px] font-bold hover:bg-amber-400 hover:text-slate-900 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat list */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-center">
              {aiChatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-start' : 'items-end'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-xs md:text-sm font-bold leading-relaxed text-right ${
                      msg.role === 'user' 
                        ? 'bg-[#17669B] text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-800 text-[#172D55] dark:text-amber-100 border border-amber-400/50 rounded-tl-none shadow'
                    }`}
                  >
                    {msg.text}
                    {msg.link && (
                      <div className="mt-2 pt-1.5 border-t border-amber-400/30 text-center">
                        <button
                          onClick={() => {
                            setIsAiGuideOpen(false);
                            setSelectedReportId(msg.link!);
                            setCurrentView('report');
                          }}
                          className="text-xs text-red-600 dark:text-amber-300 font-black hover:underline inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          قراءة التقرير الكامل
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {aiIsTyping && (
                <div className="flex items-end">
                  <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-amber-400 text-xs font-bold animate-pulse">
                    طيبة تبحث في أسرار الفراعنة... ⏳
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-2.5 border-t border-amber-400 bg-white/50 dark:bg-slate-900/50 flex gap-2">
              <input 
                type="text"
                placeholder="اكتب سؤالك لطيبة هنا..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendAiMessage(); }}
                className="flex-1 bg-white dark:bg-slate-800 border-2 border-amber-400 rounded-full px-4 py-1.5 text-xs md:text-sm font-bold text-[#172D55] dark:text-amber-100 outline-none"
              />
              <button
                onClick={handleSendAiMessage}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-1.5 rounded-full font-black text-xs shadow cursor-pointer flex items-center gap-1"
              >
                <span>إرسال</span>
                <Send className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= SEARCH MODAL ================= */}
      {isSearchModalOpen && (
        <div 
          onClick={() => setIsSearchModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-amber-50 dark:bg-[#1f3a66] border-4 border-amber-400 rounded-3xl w-full max-w-lg p-5 shadow-2xl text-center animate-fadeIn"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-base text-[#172D55] dark:text-amber-300">بحث شامل في سر الأثر</h3>
              <button 
                onClick={() => setIsSearchModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-red-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input 
              type="search"
              autoFocus
              placeholder="اكتب اسم ملك، هرم، معبد، بودكاست..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-center font-bold text-base px-5 py-2.5 rounded-full border-2 border-amber-400 bg-white dark:bg-slate-800 text-[#172D55] dark:text-amber-100 outline-none mb-3"
            />

            <div className="max-h-72 overflow-y-auto space-y-2">
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={item.action}
                    className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-amber-400/40 hover:bg-amber-400 hover:text-slate-900 cursor-pointer transition-colors flex items-center justify-between text-center"
                  >
                    <span className="font-bold text-sm">{item.title}</span>
                    <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">{item.category}</span>
                  </div>
                ))
              ) : searchQuery.trim() ? (
                <p className="text-xs font-bold text-slate-500 py-4">
                  لا توجد نتائج مطابقة، جرب كلمة أخرى
                </p>
              ) : (
                <p className="text-xs font-semibold text-slate-400 py-3">
                  اكتب اسم المعلم أو الفرعون للوصول فوراً
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER - CENTERED ================= */}
      <footer className="bg-gradient-to-b from-[#172D55] to-[#0c1a33] text-white border-t-4 border-amber-400 rounded-t-[34px] pt-10 pb-6 mt-14 text-center">
        <div className="wrap max-w-4xl mx-auto space-y-6 px-4">
          
          <div>
            <div className="text-3xl text-amber-400 font-black mb-1.5">𓂀 سر الأثر 𓂀</div>
            <p className="max-w-md mx-auto text-xs md:text-sm font-bold text-amber-100 leading-relaxed text-center">
              موقع عربي تعليمي وترفيهي عن الحضارة المصرية القديمة، يُقرب تاريخ الأجداد بطريقة ممتعة وتفاعلية.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-bold text-amber-200">
            {NAV_TABS.map(tab => (
              <button 
                key={tab.id}
                onClick={() => { setCurrentView(tab.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 cursor-pointer"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Download Standalone HTML Card */}
          <div className="bg-amber-400/10 border-2 border-amber-400/40 p-4 rounded-2xl max-w-md mx-auto my-3 text-center">
            <h4 className="font-black text-amber-300 text-sm mb-1 inline-flex items-center gap-1.5">
              <Download className="w-4 h-4 text-amber-400" />
              <span>تحميل نسخة الموقع كملف HTML مستقل</span>
            </h4>
            <p className="text-xs text-amber-100/80 mb-3 font-semibold">
              يعمل الملف بشكل كامل أوفلاين على أي جهاز (كمبيوتر أو هاتف) بدون إنترنت
            </p>
            <a 
              href="/sar-al-athar-standalone.html" 
              download="سر_الأثر_الموقع_الكامل.html"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs md:text-sm px-6 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4" />
              <span>تحميل ملف HTML الآن (2.7 MB)</span>
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-amber-200/70 font-semibold text-center">
            © 2026 سر الأثر — جميع الحقوق محفوظة · صُنع بحب وتوثيق للحضارة المصرية القديمة
          </div>

        </div>
      </footer>

    </div>
  );
}
