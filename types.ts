export interface Article {
  id: string;
  title: string;
  thumbnail: string;
  date?: string;
  category?: string;
}

export type UniversityType = 'National' | 'Private' | 'Public';

export interface University {
  name: string;
  type: UniversityType;
  url?: string;
}

export interface UniversityRank {
  tier: string;
  color: string;
  universities: University[];
  description: string;
}

export enum RankColor {
  S = '#d8b4fe', // Purple-ish
  A = '#fca5a5', // Red-ish
  B = '#fed7aa', // Orange-ish
  C = '#86efac', // Green-ish
  D = '#fde047', // Yellow-ish
  E = '#7dd3fc', // Blue-ish
  F = '#d1d5db', // Gray
}