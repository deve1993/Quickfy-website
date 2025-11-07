/**
 * AI Services API Client
 * Handles text generation and image generation with AI
 */

import type { AITextOptions, AIImageOptions, SocialPlatform, PostType } from '@/types/social';

// Mock AI responses for development
const MOCK_TEXTS = {
  professional: {
    short: "Trasforma la tua presenza online con soluzioni innovative. Scopri come possiamo aiutarti a raggiungere i tuoi obiettivi di business. #Innovation #Business",
    medium: "Nel mondo digitale di oggi, distinguersi è fondamentale. Le nostre soluzioni personalizzate ti aiutano a costruire una presenza online forte e autentica. Collaboriamo con te per creare strategie efficaci che portano risultati concreti. Contattaci per una consulenza gratuita! 🚀 #DigitalMarketing #Success",
    long: "Stai cercando di portare il tuo business al livello successivo? Siamo qui per aiutarti. Con oltre 10 anni di esperienza nel settore, offriamo soluzioni complete di digital marketing che combinano creatività e strategia basata sui dati. Il nostro team di esperti lavora fianco a fianco con te per comprendere le tue esigenze uniche e sviluppare campagne che generano engagement reale. Dalle strategie social media alla creazione di contenuti, dalla SEO all'advertising, copriamo ogni aspetto del tuo successo digitale. Unisciti alle centinaia di aziende che hanno già trasformato la loro presenza online con noi. Prenota oggi la tua consulenza gratuita! 💼✨ #DigitalTransformation #Marketing #GrowthStrategy",
  },
  friendly: {
    short: "Hey! 👋 Vuoi far crescere il tuo brand online? Siamo qui per te! Scopri le nostre soluzioni personalizzate 🚀 #Marketing #Community",
    medium: "Ciao amici! 😊 Sappiamo quanto sia importante costruire una community forte e autentica. Per questo siamo qui per supportarti in ogni passo del tuo percorso digitale! Dalle idee creative alle strategie vincenti, lavoriamo insieme per far brillare il tuo brand. Vuoi saperne di più? Scrivici! 💬✨ #Community #SocialMedia #Together",
    long: "Ciao a tutti! 🎉 Siamo super entusiasti di condividere con voi le nostre ultime novità! Da quando abbiamo iniziato questo viaggio, il nostro obiettivo è sempre stato uno: aiutare piccole e grandi aziende a brillare nel mondo digitale. E wow, quante storie incredibili abbiamo vissuto insieme! 🌟 Ogni giorno lavoriamo con passione per creare contenuti che ispir ano, coinvolgono e convertono. Il nostro team è formato da persone creative, appassionate e sempre pronte ad ascoltare le vostre esigenze. Perché per noi non siete solo clienti, siete parte della nostra famiglia! 💙 Volete raccontarci la vostra storia? Ci piacerebbe ascoltarvi! Scriveteci nei commenti o mandate un messaggio. Siamo qui per voi! 🙌 #FamilyFirst #CreativityMatters #DigitalLove",
  },
  playful: {
    short: "🎨 Pronti a fare splash online? Noi sì! 💦 Creatività + strategia = magia digitale ✨ #FunMarketing #Creative",
    medium: "🚀 Allarme creatività in arrivo! 📢 Chi ha detto che il marketing deve essere noioso? Noi lo rendiamo SUPER divertente (e super efficace)! 🎯 Dal brainstorming pazzo alle campagne che fanno boom 💥, ogni progetto è un'avventura. Sali a bordo? 🎢 #MarketingFun #CreativeAgency #LetsGo",
    long: "🎪 ATTENZIONE ATTENZIONE! 📣 Qui si fa sul serio... nel modo più divertente possibile! 😄 Immagina questo: un team di creativi pazzi (nel senso buono!) che trasformano le tue idee in contenuti spettacolari. ✨ Non crediamo nel \"sempre fatto così\". Crediamo negli esperimenti, nelle idee folli che funzionano, nei rischi calcolati e nei risultati wow! 🎯 Ogni giorno è una nuova avventura: oggi creiamo un video virale, domani lanciamo una campagna che spopola, dopodomani... beh, chi lo sa! 🤷 L'unica certezza? Con noi non ti annoi MAI! 🎉 Hai un'idea pazza? Perfetto, ci piace! Un progetto che sembra impossibile? Challenge accepted! 💪 Scriv ici e scopri come possiamo trasformare il tuo brand in qualcosa di epico! 🌟💥🔥 #CrazyCreative #NoBoringMarketing #LetsBreakTheInternet",
  },
  formal: {
    short: "Soluzioni professionali di digital marketing. Esperienza comprovata, risultati misurabili. Richieda una consulenza. #Professional #Excellence",
    medium: "La nostra azienda offre servizi completi di consulenza digitale per imprese che cercano risultati tangibili. Con metodologie comprovate e un approccio basato sui dati, garantiamo soluzioni personalizzate che rispettano gli standard più elevati del settore. Contatti il nostro team per discutere le opportunità di collaborazione. #BusinessSolutions #DigitalConsulting #Excellence",
    long: "Gentili Signori, presentiamo la nostra offerta di servizi professionali nel settore del marketing digitale e della consulenza strategica. La nostra società, attiva dal 2010, vanta un portafoglio clienti di oltre 500 aziende nazionali e internazionali, operanti in settori diversificati. I nostri servizi comprendono: analisi di mercato approfondite, sviluppo di strategie digitali integrate, gestione professionale dei canali social media, ottimizzazione SEO/SEM, creazione di contenuti di alta qualità, e reportistica dettagliata con KPI misurabili. Il nostro team è costituito da professionisti certificati con esperienza pluriennale in ambito marketing, comunicazione e analisi dati. Ogni progetto viene gestito secondo metodologie agili, garantendo trasparenza, comunicazione costante e risultati verificabili. Per richiedere un incontro conoscitivo o ricevere un preventivo personalizzato, La invitiamo a contattare il nostro ufficio commerciale. Rimaniamo a disposizione per ogni chiarimento. Cordiali saluti. #CorporateExcellence #ProfessionalServices #DigitalStrategy",
  },
};

interface GenerateTextParams {
  platform: SocialPlatform;
  type: PostType;
  topic?: string;
  keywords?: string;
  targetAudience?: string;
  options: AITextOptions;
}

interface GenerateImageParams {
  options: AIImageOptions;
}

/**
 * Simulates AI text generation
 * In production, this would call a real AI API (OpenAI, Anthropic, etc.)
 */
export async function generateText(params: GenerateTextParams): Promise<string> {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));

  const { options, topic, keywords } = params;
  const { tone, length, includeEmojis } = options;

  // Get base text from mock data
  let text = MOCK_TEXTS[tone][length];

  // Customize based on inputs
  if (topic) {
    text = text.replace(/business|brand|presenza/gi, topic);
  }

  if (keywords) {
    const keywordArray = keywords.split(',').map(k => k.trim());
    keywordArray.forEach((keyword) => {
      if (Math.random() > 0.5) {
        text += ` #${keyword.replace(/\s+/g, '')}`;
      }
    });
  }

  // Remove emojis if not requested
  if (!includeEmojis) {
    text = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
  }

  return text;
}

/**
 * Simulates AI image generation
 * In production, this would call DALL-E, Midjourney, Stable Diffusion, etc.
 */
export async function generateImage(params: GenerateImageParams): Promise<string> {
  const { options } = params;

  // Simulate longer generation time for images
  await new Promise((resolve) => setTimeout(resolve, 3000 + Math.random() * 2000));

  // Generate placeholder image URL based on dimensions
  const dimensionMap = {
    '1:1': { width: 1024, height: 1024 },
    '16:9': { width: 1920, height: 1080 },
    '9:16': { width: 1080, height: 1920 },
    '4:5': { width: 1080, height: 1350 },
  };

  const { width, height } = dimensionMap[options.dimensions];

  // Use placeholder service with style-specific colors
  const styleColors = {
    realistic: 'nature,photo',
    artistic: 'art,painting',
    cartoon: 'cartoon,colorful',
    minimalist: 'minimal,clean',
    '3d': '3d,render',
  };

  const keywords = styleColors[options.style] || 'abstract';

  // Return Unsplash placeholder (in production, this would be the AI-generated image URL)
  return `https://source.unsplash.com/featured/${width}x${height}/?${keywords},${encodeURIComponent(options.prompt)}`;
}

/**
 * Validates uploaded media file
 */
export function validateMediaFile(file: File): { valid: boolean; error?: string } {
  const imageFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const videoFormats = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];

  const isImage = imageFormats.includes(file.type);
  const isVideo = videoFormats.includes(file.type);

  if (!isImage && !isVideo) {
    return {
      valid: false,
      error: 'Formato file non supportato. Usa JPG, PNG, GIF, MP4 o MOV.',
    };
  }

  const maxSize = isImage ? 10 * 1024 * 1024 : 50 * 1024 * 1024; // 10MB for images, 50MB for videos

  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      valid: false,
      error: `File troppo grande. Dimensione massima: ${maxSizeMB}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Creates a preview URL for uploaded media
 */
export function createMediaPreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
