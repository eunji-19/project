/**
 * Make Video
 */
export interface MakeVideo {
    succeed?: boolean;
    success?: boolean;
    errorCode?: number;
    error?: string;
    description?: string;
    detail?: string;
    data?: Data;
}

export interface Data {
    key: string;
}

/**
 * find Project
 */
export interface FindProjectType {
    succeed?: boolean;
    success?: boolean;
    errorCode?: number;
    error?: string;
    description?: string;
    detail?: string;
    data?: FindProjectData;
}

export interface FindProjectData {
    type: string;
    model: string;
    clothes: string;
    duration: any;
    language: string;
    locale: string;
    progress: number;
    video?: string;
}
