export interface ModelList {
  succeed: boolean;
  models: Model[];
  error?: string;
  errorCode?: number;
  description?: string;
}

export interface Model {
  id: string;
  label: Expertise;
  expertise: Expertise;
  imgPath: string;
  clothes: Clothe[];
  language: string[];
  gpuType: string;
}

export interface Clothe {
  id: string;
  label: Expertise;
  imgPath: string;
  intro: string;
}

export interface Expertise {
  en: string;
  ko: string;
  zh: string;
}
