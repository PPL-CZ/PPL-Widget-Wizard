// src/config.ts

import type { Translation } from './types';

// Konfigurace pro Step0 (volitelný uvítací krok)
export const ENABLE_STEP0 = false; // Změň na false pro vypnutí

// Definice struktury pro jednu zemi
export interface CountryConfig {
  code: string; // Kód země (cz, sk, ...)
  nameKey: keyof Translation; // Klíč pro překlad názvu
  phase: number; // Fáze, ve které se má země objevit
}

// AKTIVNÍ FÁZE: Zde jednoduše přidáš číslo fáze, kterou chceš aktivovat.
// Např. [1] zobrazí jen první vlnu, [1, 2] zobrazí obě.
export const ACTIVE_PHASES: number[] = [1, 2];

// Seznam všech podporovaných zemí
export const allCountries: CountryConfig[] = [
  // Stávající země
  { code: 'cz', nameKey: 'czechRepublic', phase: 1 },

  // Nové země - První vlna
  { code: 'sk', nameKey: 'slovakia', phase: 1 },
  { code: 'pl', nameKey: 'poland', phase: 1 },
  { code: 'de', nameKey: 'germany', phase: 1 },
  { code: 'nl', nameKey: 'netherlands', phase: 2 },
  { code: 'ro', nameKey: 'romania', phase: 2 },
  { code: 'bg', nameKey: 'bulgaria', phase: 2 },
  { code: 'hu', nameKey: 'hungary', phase: 2 },
  { code: 'at', nameKey: 'austria', phase: 2 },
  { code: 'fr', nameKey: 'france', phase: 3 },

  // Nové země - Druhá vlna
  { code: 'it', nameKey: 'italy', phase: 3 },
  { code: 'es', nameKey: 'spain', phase: 3 },
  { code: 'pt', nameKey: 'portugal', phase: 3 },
  { code: 'si', nameKey: 'slovenia', phase: 3 }, // Kód pro Slovinsko je 'si'
  { code: 'hr', nameKey: 'croatia', phase: 3 },
];

// --- ŠABLONY PRODUKTŮ ---

export interface ProductTemplate {
  id: 'none' | 's2box_cz' | 's2box_eu';
  nameKey: keyof Translation; // Klíč pro název v překladech
  allowedCountries?: string[]; // např. ['de', 'at', 'pl', ...]
  disallowedCountries?: string[]; // např. ['cz']
  enabled?: boolean;
}

export const productTemplates: ProductTemplate[] = [
  // Prázdná šablona pro normální výběr
  { id: 'none', nameKey: 'templateNone' },

  // Šablona pro Smart 2 Box CZ
  {
    id: 's2box_cz',
    nameKey: 'templateS2Box',
    allowedCountries: ['cz'], // Povoluje POUZE 'cz'
  },

  // Šablona pro Smart 2 Box Europe
  {
    id: 's2box_eu',
    nameKey: 'templateS2BoxEurope',
    disallowedCountries: ['cz'], // Zakazuje 'cz'
    enabled: false,
    // Pokud allowedCountries není definováno, povolí všechny ostatní
  },
];

export interface LanguageConfig {
  code: string; // Kód jazyka (cs, en, ...)
  nameKey: keyof Translation; // Klíč pro název v překladech
}

// Seznam jazyků, které PPL widget podporuje a chceme je nabídnout
export const availableWidgetLanguages: LanguageConfig[] = [
  { code: 'cs', nameKey: 'czech' },
  { code: 'sk', nameKey: 'slovak' },
  { code: 'pl', nameKey: 'polish' },
  { code: 'de', nameKey: 'german' },
  { code: 'nl', nameKey: 'english' },
  { code: 'ro', nameKey: 'romania' },
  { code: 'bg', nameKey: 'bulgaria' },
  { code: 'hu', nameKey: 'hungary' },
  { code: 'en', nameKey: 'english' },
];

// Mapování země na výchozí jazyk widgetu
export const countryToLanguage: Record<string, string> = {
  cz: 'cs',
  sk: 'sk',
  pl: 'pl',
  de: 'de',
  nl: 'en', // Nizozemsko → angličtina
  ro: 'ro', // Rumunsko → angličtina
  bg: 'bg', // Bulharsko → angličtina
  hu: 'hu', // Maďarsko → angličtina
  at: 'de', // Rakousko → němčina
  fr: 'en', // Francie → angličtina
  it: 'en', // Itálie → angličtina (pokud PPL nepodporuje IT, změň na 'it')
  es: 'en', // Španělsko → angličtina
  pt: 'en', // Portugalsko → angličtina
  si: 'en', // Slovinsko → angličtina
  hr: 'en', // Chorvatsko → angličtina
};
