/**
 * Mock Social Posts Data
 * 10 diverse example posts across different platforms and types
 */

import type { SocialPost } from '@/types/social';

export const mockSocialPosts: SocialPost[] = [
  // 1. Instagram - Product Showcase
  {
    id: 'post-001',
    platform: 'instagram',
    type: 'product',
    status: 'published',
    content: {
      text: 'Trasforma il tuo marketing con dati in tempo reale! 📊✨\n\nQuickfy ti aiuta a monitorare, analizzare e ottimizzare le tue campagne tutto in un unico posto. Pronto a crescere?',
      hashtags: ['#MarketingAutomation', '#DataDriven', '#Quickfy', '#SaaS', '#MarketingTools', '#Analytics'],
      callToAction: 'Link in bio per iniziare la prova gratuita! 🚀',
      emojis: ['📊', '✨', '🚀', '💡'],
    },
    media: {
      type: 'image',
      placeholder: 'Product dashboard preview with colorful charts',
      alt: 'Quickfy dashboard analytics preview',
    },
    metrics: {
      estimatedReach: 3500,
      estimatedEngagement: 4.2,
      bestTimeToPost: '10:00 AM',
      targetAudience: ['marketing managers', 'small business owners', 'entrepreneurs'],
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: true,
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-11-01T09:00:00'),
    updatedAt: new Date('2024-11-01T09:00:00'),
  },

  // 2. LinkedIn - Thought Leadership
  {
    id: 'post-002',
    platform: 'linkedin',
    type: 'educational',
    status: 'scheduled',
    content: {
      text: 'Il 73% dei marketer considera i dati analytics fondamentali per il successo.\n\nMa solo il 12% usa davvero tutti i dati a disposizione.\n\nEcco 5 metriche che dovresti monitorare OGGI:\n\n1️⃣ Customer Lifetime Value (CLV)\n2️⃣ Cost Per Acquisition (CPA)\n3️⃣ Engagement Rate per canale\n4️⃣ Conversion funnel drop-off points\n5️⃣ ROI per campagna\n\nQual è la tua metrica più importante?',
      hashtags: ['#MarketingAnalytics', '#DataDriven', '#MarketingStrategy', '#B2B', '#SaaS'],
      emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '📊'],
    },
    metrics: {
      estimatedReach: 5200,
      estimatedEngagement: 6.8,
      bestTimeToPost: '8:30 AM',
      targetAudience: ['marketing professionals', 'c-level executives', 'business analysts'],
    },
    scheduling: {
      scheduledFor: new Date('2024-11-06T08:30:00'),
      timezone: 'Europe/Rome',
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: true,
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-11-02T14:00:00'),
    updatedAt: new Date('2024-11-02T14:00:00'),
  },

  // 3. Facebook - Community Engagement
  {
    id: 'post-003',
    platform: 'facebook',
    type: 'engagement',
    status: 'draft',
    content: {
      text: '🎯 Sondaggio della settimana!\n\nQual è la tua più grande sfida nel marketing digitale?\n\nA) Generare lead qualificati\nB) Misurare il ROI\nC) Gestire più canali\nD) Creare contenuti coinvolgenti\n\nCommenta con la tua lettera e ti mostreremo come Quickfy può aiutarti! 👇',
      hashtags: ['#MarketingTips', '#DigitalMarketing', '#Community'],
      emojis: ['🎯', '💡', '👇', '✨'],
    },
    metrics: {
      estimatedReach: 2800,
      estimatedEngagement: 8.5,
      bestTimeToPost: '1:00 PM',
      targetAudience: ['marketing community', 'digital marketers', 'social media managers'],
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: true,
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-11-03T10:00:00'),
    updatedAt: new Date('2024-11-03T15:30:00'),
  },

  // 4. Twitter/X - Quick Tip
  {
    id: 'post-004',
    platform: 'twitter',
    type: 'educational',
    status: 'published',
    content: {
      text: '🚀 Pro tip: Il miglior momento per pubblicare su LinkedIn è Martedì-Giovedì tra le 8-10 AM.\n\nMa sai qual è IL momento migliore per il TUO pubblico?\n\n📊 Quickfy analizza i tuoi dati e ti suggerisce l\'orario perfetto per ogni post.\n\n#MarketingAutomation #SocialMediaTips',
      hashtags: ['#MarketingAutomation', '#SocialMediaTips', '#Quickfy'],
      emojis: ['🚀', '📊', '⏰'],
    },
    metrics: {
      estimatedReach: 1500,
      estimatedEngagement: 3.2,
      bestTimeToPost: '11:30 AM',
      targetAudience: ['social media managers', 'content creators'],
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: true,
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-10-30T11:00:00'),
    updatedAt: new Date('2024-10-30T11:00:00'),
  },

  // 5. Instagram - Storytelling
  {
    id: 'post-005',
    platform: 'instagram',
    type: 'storytelling',
    status: 'published',
    content: {
      text: 'Dietro ogni grafico c\'è una storia 📖\n\nMaria gestiva 5 campagne su 3 piattaforme diverse.\n\nOgni giorno: 4 dashboard aperte, 2 ore perse, 0 chiarezza.\n\nCon Quickfy: 1 dashboard, 5 minuti, 100% controllo.\n\nOra Maria dedica il tempo risparmiato a ciò che conta: strategia e creatività ✨\n\nQual è la TUA storia?',
      hashtags: ['#CustomerStory', '#MarketingLife', '#Productivity', '#Quickfy', '#TimeManagement'],
      callToAction: 'Raccontaci la tua nei commenti! 👇',
      emojis: ['📖', '✨', '⏰', '💪'],
    },
    media: {
      type: 'carousel',
      placeholder: '3-slide carousel showing before/after dashboard comparison',
      alt: 'Customer success story visualization',
    },
    metrics: {
      estimatedReach: 4100,
      estimatedEngagement: 5.7,
      bestTimeToPost: '6:00 PM',
      targetAudience: ['marketing managers', 'busy professionals', 'entrepreneurs'],
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: true,
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-10-28T17:00:00'),
    updatedAt: new Date('2024-10-28T17:00:00'),
  },

  // 6. LinkedIn - Case Study
  {
    id: 'post-006',
    platform: 'linkedin',
    type: 'promo',
    status: 'scheduled',
    content: {
      text: '📈 Case Study: +340% di ROI in 90 giorni\n\nL\'azienda X aveva una sfida:\n• Budget limitato\n• Campagne frammentate\n• Dati dispersi\n\nLa soluzione Quickfy:\n✅ Centralizzazione dati\n✅ Automazione report\n✅ Insights in tempo reale\n\nRisultati in 3 mesi:\n• 340% ROI\n• -60% tempo dedicato ai report\n• +85% decisioni data-driven\n\nVuoi risultati simili? Parliamone nei commenti o DM.',
      hashtags: ['#CaseStudy', '#ROI', '#MarketingSuccess', '#B2B', '#SaaS'],
      emojis: ['📈', '✅', '💡', '🎯'],
    },
    metrics: {
      estimatedReach: 6500,
      estimatedEngagement: 7.2,
      bestTimeToPost: '9:00 AM',
      targetAudience: ['decision makers', 'c-level', 'marketing directors'],
    },
    scheduling: {
      scheduledFor: new Date('2024-11-07T09:00:00'),
      timezone: 'Europe/Rome',
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: true,
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-11-03T16:00:00'),
    updatedAt: new Date('2024-11-03T16:00:00'),
  },

  // 7. Facebook - Event Announcement
  {
    id: 'post-007',
    platform: 'facebook',
    type: 'event',
    status: 'scheduled',
    content: {
      text: '🎉 WEBINAR GRATUITO: Marketing Automation 101\n\n📅 15 Novembre, ore 15:00\n⏱️ Durata: 60 minuti\n\nCosa imparerai:\n• Come scegliere i tool giusti\n• Automazioni che fanno davvero la differenza\n• Errori comuni da evitare\n• Live Q&A con i nostri esperti\n\n🎁 BONUS: Chi partecipa riceve 30 giorni di Quickfy Pro gratis!\n\nPosti limitati - Iscriviti ora! Link nei commenti 👇',
      hashtags: ['#Webinar', '#MarketingAutomation', '#FreeTraining', '#MarketingTips'],
      callToAction: 'Commenta "VOGLIO PARTECIPARE" per ricevere il link!',
      emojis: ['🎉', '📅', '⏱️', '🎁', '✨'],
    },
    media: {
      type: 'image',
      placeholder: 'Webinar event banner with date and time',
      alt: 'Marketing Automation 101 Webinar announcement',
    },
    metrics: {
      estimatedReach: 4800,
      estimatedEngagement: 9.1,
      bestTimeToPost: '10:00 AM',
      targetAudience: ['marketers', 'business owners', 'freelancers'],
    },
    scheduling: {
      scheduledFor: new Date('2024-11-08T10:00:00'),
      timezone: 'Europe/Rome',
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: true,
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-11-04T09:00:00'),
    updatedAt: new Date('2024-11-04T09:00:00'),
  },

  // 8. Twitter/X - Thread Educational
  {
    id: 'post-008',
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    content: {
      text: '🧵 THREAD: 7 metriche di marketing che devi tracciare nel 2024\n\nLe ho imparate gestendo +50 campagne.\n\nSalva questo thread per dopo:\n\n1/ Customer Acquisition Cost (CAC)...\n\n#MarketingMetrics #Thread #DataAnalytics',
      hashtags: ['#MarketingMetrics', '#Thread', '#DataAnalytics', '#MarketingTips'],
      emojis: ['🧵', '📊', '💡', '🎯'],
    },
    metrics: {
      estimatedReach: 2100,
      estimatedEngagement: 4.5,
      bestTimeToPost: '2:00 PM',
      targetAudience: ['marketers', 'data analysts', 'founders'],
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: true,
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-11-04T14:00:00'),
    updatedAt: new Date('2024-11-04T14:30:00'),
  },

  // 9. Instagram - Engagement/Tip
  {
    id: 'post-009',
    platform: 'instagram',
    type: 'engagement',
    status: 'draft',
    content: {
      text: '💡 Mini-guida: Come leggere il tuo dashboard come un pro\n\nSwipe per vedere →\n\n1️⃣ Inizia dai trend generali\n2️⃣ Identifica i picchi anomali\n3️⃣ Confronta settimana vs settimana\n4️⃣ Focalizzati sulle conversioni\n5️⃣ Agisci sui dati, non sulle sensazioni\n\nQuale di questi step salti più spesso? 🤔',
      hashtags: ['#MarketingTips', '#DataAnalysis', '#QuickfyTips', '#MarketingEducation'],
      callToAction: 'Salva per riferimento futuro!',
      emojis: ['💡', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '🤔'],
    },
    media: {
      type: 'carousel',
      placeholder: '5-slide mini-guide carousel with visual tips',
      alt: 'Dashboard reading guide for marketers',
    },
    metrics: {
      estimatedReach: 3200,
      estimatedEngagement: 6.3,
      bestTimeToPost: '7:00 PM',
      targetAudience: ['marketers', 'analysts', 'business owners'],
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: true,
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-11-04T18:00:00'),
    updatedAt: new Date('2024-11-04T18:00:00'),
  },

  // 10. LinkedIn - Promo with Urgency
  {
    id: 'post-010',
    platform: 'linkedin',
    type: 'promo',
    status: 'draft',
    content: {
      text: '⚡ OFFERTA LIMITATA: Black Friday Early Access\n\n50% di sconto su Quickfy Pro\nSolo per i primi 100 iscritti\n\nCosa include:\n✅ Analytics avanzati illimitati\n✅ Report automatici personalizzati\n✅ Integrazioni con 20+ piattaforme\n✅ Supporto prioritario 24/7\n✅ AI Content Generator\n\nPrezzo normale: €99/mese\nOggi: €49/mese (per sempre!)\n\n⏰ L\'offerta scade tra 48 ore.\n\nNon perdere questa occasione: [LINK]',
      hashtags: ['#BlackFriday', '#LimitedOffer', '#MarketingTools', '#SaaS'],
      callToAction: 'Commenta "INTERESTED" per ricevere il link riservato',
      emojis: ['⚡', '✅', '⏰', '🎯'],
    },
    metrics: {
      estimatedReach: 7200,
      estimatedEngagement: 11.5,
      bestTimeToPost: '8:00 AM',
      targetAudience: ['decision makers', 'marketing managers', 'entrepreneurs'],
    },
    brandAlignment: {
      usesToneOfVoice: true,
      reflectsValues: false, // Promo urgency might not always align with brand values
      matchesBrandColors: true,
    },
    createdAt: new Date('2024-11-04T20:00:00'),
    updatedAt: new Date('2024-11-04T20:15:00'),
  },
];

/**
 * Get posts filtered by platform
 */
export function getPostsByPlatform(platform: SocialPost['platform']): SocialPost[] {
  return mockSocialPosts.filter(post => post.platform === platform);
}

/**
 * Get posts filtered by type
 */
export function getPostsByType(type: SocialPost['type']): SocialPost[] {
  return mockSocialPosts.filter(post => post.type === type);
}

/**
 * Get posts filtered by status
 */
export function getPostsByStatus(status: SocialPost['status']): SocialPost[] {
  return mockSocialPosts.filter(post => post.status === status);
}

/**
 * Get post by ID
 */
export function getPostById(id: string): SocialPost | undefined {
  return mockSocialPosts.find(post => post.id === id);
}
