// src/utils/settingsKey.ts

/**
 * Generuje "nečitelný" settingsKey token z konfigurace wizardu
 *
 * Formát: Vlastní obfuskovaný Base64 (max 24 znaků)
 * Obsah: CustId, URL, vybrané země, výchozí země, jazyk
 *
 * POZOR: Toto je jen příklad pro demo účely!
 * Pro produkční použití implementujte skutečné šifrování na backendu.
 */
export interface SettingsKeyData {
  custId: string;
  shopUrl: string;
  countries: string[];
  defaultCountry: string;
  language: string;
}

/**
 * Jednoduchý XOR obfuskace (NENÍ bezpečné šifrování!)
 */
function simpleObfuscate(text: string): string {
  const key = 0x5a; // Jednoduchý XOR klíč
  return text
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
    .join('');
}

/**
 * Generuje settingsKey token
 */
export function generateSettingsKey(data: SettingsKeyData): string {
  try {
    // Vytvoříme kompaktní string
    // Formát: CustId|URL|Countries|DefaultCountry|Lang
    const cleanUrl = data.shopUrl
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '');
    const countriesStr = data.countries.join(',');

    const payload = `${data.custId}|${cleanUrl}|${countriesStr}|${data.defaultCountry}|${data.language}`;

    // Obfuskace + Base64
    const obfuscated = simpleObfuscate(payload);
    const base64 = btoa(obfuscated);

    // Oříznutí na max 24 znaků (nebo použití hash)
    const shortened = base64.substring(0, 24);

    return shortened;
  } catch (error) {
    console.error('Error generating settingsKey:', error);
    return 'ERROR_GENERATING_KEY';
  }
}

/**
 * Dekóduje settingsKey token (pro demo účely)
 */
export function decodeSettingsKey(token: string): SettingsKeyData | null {
  try {
    // Pro demo - v produkci by toto bylo na backendu
    const base64Padded = token.padEnd(Math.ceil(token.length / 4) * 4, '=');
    const obfuscated = atob(base64Padded);
    const payload = simpleObfuscate(obfuscated);

    const [custId, shopUrl, countriesStr, defaultCountry, language] =
      payload.split('|');
    const countries = countriesStr.split(',');

    return {
      custId,
      shopUrl,
      countries,
      defaultCountry,
      language,
    };
  } catch (error) {
    console.error('Error decoding settingsKey:', error);
    return null;
  }
}
