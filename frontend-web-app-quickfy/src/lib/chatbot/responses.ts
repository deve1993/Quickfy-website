import { ChatMessage } from "@/store/useChatbotStore";

/**
 * Context-aware AI responses based on current page and user input
 */

interface ResponseContext {
  page: string;
  messages: ChatMessage[];
}

/** Welcome messages based on page context */
const welcomeMessages: Record<string, string> = {
  dashboard: "👋 Ciao! Sono il tuo assistente marketing AI. Vedo che stai guardando le tue metriche. Posso aiutarti a interpretarle o suggerirti strategie per migliorarle!",
  tickets: "👋 Benvenuto! Noto che sei nella sezione ticketing. Posso aiutarti a ottimizzare la gestione del supporto clienti e suggerire risposte efficaci.",
  goals: "👋 Ciao! Vedo che stai lavorando sugli obiettivi. Posso suggerirti KPI da tracciare o strategie per raggiungerli più velocemente!",
  campaigns: "👋 Hey! Sei nella sezione campagne Google Ads. Posso aiutarti a ottimizzare budget, targeting e copy pubblicitari.",
  reviews: "👋 Benvenuto! Vedo che stai gestendo le recensioni. Posso suggerirti come rispondere efficacemente e migliorare il sentiment.",
  social: "👋 Ciao! Sei nella sezione social media. Posso aiutarti a generare contenuti coinvolgenti e pianificare la tua strategia.",
  default: "👋 Ciao! Sono il tuo assistente marketing AI. Come posso aiutarti a far crescere il tuo business oggi?",
};

/** Context-aware suggestions based on page */
const contextualSuggestions: Record<string, string[]> = {
  dashboard: [
    "📊 Le tue sessioni sono in crescita del 12%. Vuoi sapere come mantenere questo trend?",
    "💡 Il tuo bounce rate è alto. Posso suggerirti 3 tattiche per ridurlo immediatamente.",
    "🎯 Ho notato che le conversioni sono stabili. Vuoi scoprire come raddoppiarle?",
    "📈 Le tue metriche mostrano opportunità di growth. Parliamone?",
  ],
  tickets: [
    "⚡ Consiglio: automatizza le risposte alle domande frequenti per ridurre i tempi.",
    "💬 I ticket aperti stanno aumentando. Vuoi sapere come gestirli più efficacemente?",
    "🎯 Tip: categorizza i ticket per priorità per migliorare i tempi di risposta del 40%.",
    "📊 Analizza i pattern nei ticket per prevenire problemi ricorrenti.",
  ],
  goals: [
    "🎯 Stai tracciando gli obiettivi giusti? Posso suggerirti KPI più efficaci.",
    "📈 Per accelerare il raggiungimento degli obiettivi, prova la tecnica OKR.",
    "💡 Tip: suddividi obiettivi grandi in milestone settimanali per risultati migliori.",
    "🚀 Gli obiettivi 'at risk' possono essere salvati con queste 3 strategie...",
  ],
  campaigns: [
    "💰 Il tuo ROAS medio è buono! Vuoi sapere come ottimizzare il budget?",
    "🎯 Suggerimento: testa A/B le tue creatività per aumentare il CTR del 25%.",
    "📊 Le campagne con basso CTR possono essere migliorate cambiando il copy.",
    "🚀 Consiglio: focalizza il budget sulle campagne con ROAS > 3x per massimizzare ROI.",
  ],
  reviews: [
    "⭐ Rispondere alle recensioni negative aumenta la fiducia del 70%. Vuoi un template?",
    "💬 Il sentiment sta migliorando! Ecco come capitalizzare sulle recensioni positive.",
    "🎯 Tip: richiedi recensioni ai clienti soddisfatti entro 24h dall'acquisto.",
    "📈 Le parole chiave nelle recensioni possono guidare il tuo content marketing.",
  ],
  social: [
    "📱 Vuoi aumentare l'engagement? Prova questi 5 formati di post ad alto coinvolgimento.",
    "🎨 Suggerimento: pubblica contenuti video per 3x più engagement rispetto alle immagini.",
    "📊 Gli orari migliori per postare nel tuo settore sono: 9-11 AM e 7-9 PM.",
    "🚀 Strategia: combina educational content (70%) e promotional (30%) per risultati ottimali.",
  ],
};

/** Keyword-based responses */
const keywordResponses: Record<string, string[]> = {
  conversioni: [
    "Per aumentare le conversioni, concentrati su: 1) CTA chiare e visibili, 2) Prova sociale (recensioni), 3) Urgency/scarcity, 4) Semplifica il checkout",
    "Le conversioni dipendono da trust + valore + facilità. Quale di questi elementi vuoi ottimizzare?",
  ],
  marketing: [
    "Il marketing efficace oggi richiede: contenuti di valore, personalizzazione, e dati. Su quale vuoi focus?",
    "Ti consiglio la regola 80/20: 80% contenuti utili, 20% promozionali. Funziona sempre!",
  ],
  strategia: [
    "Una strategia marketing vincente ha 3 pilastri: 1) Conoscenza del target, 2) Posizionamento unico, 3) Misurazione costante",
    "Parti sempre dal cliente: chi è, cosa vuole, dove lo trovi. Poi costruisci la strategia.",
  ],
  budget: [
    "Per ottimizzare il budget: testa piccolo, scala ciò che funziona, taglia ciò che non performa.",
    "Regola pratica: alloca il 70% su canali testati, 20% su scale-up, 10% su sperimentazione.",
  ],
  social: [
    "Social media efficaci richiedono: consistenza (3-5 post/settimana), engagement (rispondi sempre), valore (educa e intrattieni).",
    "Focus su 2-3 piattaforme dove è il tuo target, piuttosto che essere ovunque ma male.",
  ],
  recensioni: [
    "Le recensioni sono oro! Rispondi sempre entro 24h. Positive: ringrazia. Negative: scusati, offri soluzione, porta offline.",
    "Per aumentare le recensioni: chiedi al momento giusto, rendi facile (link diretto), incentiva (sconto prossimo acquisto).",
  ],
  contenuti: [
    "Contenuti efficaci seguono la formula: problema + soluzione + prova sociale + CTA. Vuoi un esempio?",
    "Tipi di contenuto ad alto engagement: how-to, case study, behind-the-scenes, user-generated content.",
  ],
  obiettivi: [
    "Gli obiettivi SMART funzionano: Specifici, Misurabili, Raggiungibili, Rilevanti, Temporizzati.",
    "Suggerimento: rivedi gli obiettivi ogni settimana, non solo a fine mese. Permette di correggere il tiro rapidamente.",
  ],
};

/**
 * Generate welcome message based on page context
 */
export function getWelcomeMessage(context: string): string {
  return welcomeMessages[context] || welcomeMessages.default;
}

/**
 * Get contextual suggestions based on current page
 */
export function getContextualSuggestions(context: string): string[] {
  return contextualSuggestions[context] || [];
}

/**
 * Generate AI response based on user message and context
 */
export function generateResponse(
  userMessage: string,
  context: ResponseContext
): string {
  const messageLower = userMessage.toLowerCase();

  // Check for greetings
  if (
    messageLower.match(/^(ciao|salve|buongiorno|hey|hi|hello)/i)
  ) {
    return getWelcomeMessage(context.page);
  }

  // Check for thanks
  if (messageLower.match(/grazie|thank/i)) {
    return "Figurati! Sono qui per aiutarti a crescere. C'è altro che posso fare per te? 😊";
  }

  // Check for help requests
  if (messageLower.match(/aiut|help|cosa puoi/i)) {
    return `Posso aiutarti con:\n\n📊 Analisi metriche e suggerimenti di ottimizzazione\n💡 Strategie di marketing e growth hacking\n🎯 Definizione obiettivi e KPI\n💬 Gestione recensioni e customer care\n📱 Content strategy per social media\n💰 Ottimizzazione budget e ROAS\n\nCosa ti interessa approfondire?`;
  }

  // Keyword-based responses
  for (const [keyword, responses] of Object.entries(keywordResponses)) {
    if (messageLower.includes(keyword)) {
      // Return random response for variety
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Context-specific responses
  switch (context.page) {
    case "dashboard":
      return "Ottima domanda! Analizzando le tue metriche, ti consiglio di: 1) Identificare i canali con miglior performance, 2) Allocare più budget lì, 3) Testare nuove strategie sui canali sottoperformanti. Vuoi che approfondisca uno di questi punti?";

    case "campaigns":
      return "Per le campagne Google Ads, il successo sta in: targeting preciso, copy persuasivo, landing page ottimizzate. Quale di questi vuoi migliorare?";

    case "goals":
      return "Per raggiungere i tuoi obiettivi più velocemente: 1) Focalizzati su 3-5 obiettivi max, 2) Monitora settimanalmente, 3) Celebra i piccoli win. Su quale obiettivo vuoi lavorare?";

    case "tickets":
      return "Il supporto clienti eccellente si basa su: velocità di risposta, empatia, risoluzione al primo contatto. Ti serve aiuto con uno di questi aspetti?";

    case "reviews":
      return "Le recensioni sono potentissime! Usale nel marketing: mostra quelle positive sul sito, citale sui social, rispondi sempre pubblicamente. Vuoi strategie per aumentarle?";

    case "social":
      return "Per social media vincenti: pubblica con costanza, interagisci con la community, usa visual accattivanti, racconta storie. Su quale aspetto lavoriamo?";

    default:
      return "Interessante! Basandomi sulla mia esperienza in marketing, ti consiglio di: testare, misurare, ottimizzare. Ripeti. È il mantra del growth hacking. Vuoi che ti mostri come applicarlo al tuo caso?";
  }
}

/**
 * Simulate typing delay for more natural UX
 */
export function getTypingDelay(messageLength: number): number {
  // Simulate ~50 characters per second typing
  const baseDelay = Math.min(messageLength * 20, 2000);
  return baseDelay + Math.random() * 500;
}
