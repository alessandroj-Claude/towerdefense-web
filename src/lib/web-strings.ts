import type { Locale } from "./i18n";

type HomeStrings = {
  tagline: string;
  hero_title: string;
  hero_desc: string;
  play: string;
  news_link: string;
  status_web_client: string;
  status_web_client_desc: string;
  status_backend: string;
  status_backend_desc: string;
  status_next: string;
  status_next_desc: string;
  footer: string;
  features: Array<{ title: string; desc: string }>;
};

type LeaderboardStrings = {
  title: string;
  normal: string;
  hard: string;
  loading: string;
  unavailable: string;
  empty: string;
  col_rank: string;
  col_username: string;
  col_score: string;
  col_wave: string;
};

type NewsStrings = {
  section_label: string;
  page_title: string;
  subtitle: string;
  loading: string;
  error: string;
};

export const STRINGS: Record<Locale, { home: HomeStrings; leaderboard: LeaderboardStrings; news: NewsStrings }> = {
  en: {
    home: {
      tagline: "towerdefense-cj.online",
      hero_title: "Tower Defense CJ",
      hero_desc: "Play directly in the browser, challenge the global leaderboard, unlock achievements and save your progress to the cloud.",
      play: "Play",
      news_link: "News",
      status_web_client: "Web Client",
      status_web_client_desc: "Build v10.3 live on Vercel.",
      status_backend: "Backend",
      status_backend_desc: "FastAPI on Render, Neon PostgreSQL.",
      status_next: "Next Milestone",
      status_next_desc: "Web i18n, play button check, i18n completion.",
      footer: "© 2026 Tower Defense CJ",
      features: [
        { title: "Wave Defense", desc: "Defend your base from growing enemy waves" },
        { title: "Boss Fights", desc: "Every milestone brings a boss with unique abilities" },
        { title: "Daily Challenges", desc: "Daily challenges with dedicated maps and modifiers" },
        { title: "Global Leaderboard", desc: "Compare your score with all players" },
        { title: "25 Achievements", desc: "Unlock milestones during your runs" },
        { title: "Cloud Save", desc: "Progress synced to your account" },
      ],
    },
    leaderboard: {
      title: "Global Leaderboard",
      normal: "Normal",
      hard: "Hard",
      loading: "Loading...",
      unavailable: "Leaderboard unavailable at the moment",
      empty: "No games recorded",
      col_rank: "#",
      col_username: "Username",
      col_score: "Score",
      col_wave: "Wave",
    },
    news: {
      section_label: "News",
      page_title: "Project Updates",
      subtitle: "Development diary for the game and website.",
      loading: "Loading news...",
      error: "Could not load news. Try again later.",
    },
  },
  it: {
    home: {
      tagline: "towerdefense-cj.online",
      hero_title: "Tower Defense CJ",
      hero_desc: "Gioca direttamente nel browser, sfida la classifica globale, sblocca achievement e salva i tuoi progressi nel cloud.",
      play: "Gioca",
      news_link: "News",
      status_web_client: "Web Client",
      status_web_client_desc: "Build v10.3 live su Vercel.",
      status_backend: "Backend",
      status_backend_desc: "FastAPI su Render, Neon PostgreSQL.",
      status_next: "Prossima Milestone",
      status_next_desc: "Web i18n, controllo play button, completamento i18n.",
      footer: "© 2026 Tower Defense CJ",
      features: [
        { title: "Wave Defense", desc: "Difendi la base da ondate crescenti di nemici" },
        { title: "Boss Fights", desc: "Ogni milestone porta un boss con abilità uniche" },
        { title: "Sfide Giornaliere", desc: "Sfide quotidiane con mappe e modificatori dedicati" },
        { title: "Classifica Globale", desc: "Confronta il tuo score con tutti i giocatori" },
        { title: "25 Achievement", desc: "Sblocca traguardi durante le run" },
        { title: "Cloud Save", desc: "Progressi sincronizzati sul tuo account" },
      ],
    },
    leaderboard: {
      title: "Classifica Globale",
      normal: "Normale",
      hard: "Difficile",
      loading: "Caricamento...",
      unavailable: "Classifica non disponibile al momento",
      empty: "Nessuna partita registrata",
      col_rank: "#",
      col_username: "Username",
      col_score: "Punteggio",
      col_wave: "Wave",
    },
    news: {
      section_label: "News",
      page_title: "Aggiornamenti progetto",
      subtitle: "Diario di avanzamento del gioco e del sito.",
      loading: "Caricamento news...",
      error: "Impossibile caricare le news. Riprova più tardi.",
    },
  },
};
