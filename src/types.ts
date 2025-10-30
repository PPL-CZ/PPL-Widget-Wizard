// types.ts - TypeScript typy pro celou aplikaci

export interface PickupPoints {
  parcelshop: boolean;
  parcelbox: boolean;
  alzabox: boolean;
}

export interface Countries {
  [key: string]: boolean;
}

export interface Coordinates {
  lat: string;
  lng: string;
}

export interface WizardFormData {
  // NOVÁ POLE pro Step0
  custId: string;
  shopUrl: string;

  pickupPoints: PickupPoints;
  countries: Countries;
  defaultCountry: string;
  widgetLanguage: string;
  mapType: 'default' | 'static' | 'catalog';
  coordinates: Coordinates;
  selectedTemplate: 'none' | 's2box_cz' | 's2box_eu';
}

export interface GeneratedCode {
  headCode: string;
  bodyCode: string;
  scriptCode: string;
}

export interface ValidationErrors {
  step0: string;
  step1: string;
  step2: string;
  step3Country: string;
  step4Coords: string;
}

export interface Translation {
  title: string;
  step0: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step1Title: string;
  step1Description: string;
  parcelshop: string;
  parcelbox: string;
  alzabox: string;
  step2Title: string;
  step2Description: string;
  czechRepublic: string;
  slovakia: string;
  poland: string;
  germany: string;
  netherlands: string;
  romania: string;
  bulgaria: string;
  hungary: string;
  austria: string;
  france: string;
  italy: string;
  spain: string;
  portugal: string;
  slovenia: string;
  croatia: string;
  step3Title: string;
  step3Description: string;
  defaultCountry: string;
  languageTitle: string;
  languageDescription: string;
  czech: string;
  english: string;
  slovak: string;
  polish: string;
  german: string;
  step4Title: string;
  step4Description: string;
  mapDefault: string;
  mapStatic: string;
  mapCatalog: string;
  coordinatesTitle: string;
  coordinatesDescription: string;
  latitude: string;
  longitude: string;
  tooltipDefault: string;
  tooltipStatic: string;
  tooltipCatalog: string;
  step5Title: string;
  step5Description: string;
  headCodeTitle: string;
  bodyCodeTitle: string;
  scriptCodeTitle: string;
  noteSizeTitle: string;
  noteSizeText: string;
  helpButton: string;
  preview: string;
  step6Title: string;
  step6Description: string;
  reloadPreview: string;
  continue: string;
  back: string;
  changeSettings: string;
  download: string;
  copyHead: string;
  copyBody: string;
  copyScript: string;
  copied: string;
  selectAtLeastOnePoint: string;
  selectAtLeastOneCountry: string;
  selectDefaultCountry: string;
  enterCoordinates: string;
  enterValidCoordinates: string;
  headHelpTitle: string;
  headHelpContent: string;
  bodyHelpTitle: string;
  bodyHelpContent: string;
  scriptHelpTitle: string;
  scriptHelpContent: string;
  vmDetailTitle: string;
  vmType: string;
  vmCode: string;
  vmName: string;
  vmAddress: string;
  vmCardPayment: string;
  vmOpeningHours: string;
  templatesTitle: string;
  templateNone: string;
  templateS2Box: string;
  templateS2BoxEurope: string;
  templatesHint: string;
  tooltipS2Box: string;
  tooltipS2BoxEurope: string;
  step0Title: string;
  step0Description: string;
  step0CustIdLabel: string;
  step0CustIdPlaceholder: string;
  step0CustIdHint: string;
  step0UrlLabel: string;
  step0UrlPlaceholder: string;
  step0UrlHint: string;
  step0InfoTitle: string;
  step0Info1: string;
  step0Info2: string;
  step0Info3: string;
  step0Info4: string;
  step0Info5: string;
  step0ValidationCustId: string;
  step0ValidationUrl: string;
}

export interface Translations {
  cs: Translation;
  en: Translation;
}
