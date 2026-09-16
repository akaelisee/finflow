export const COLORS = {
  primary: '#378ADD',
  success: '#0F6E56',
  danger: '#A32D2D',
  warning: '#BA7517',

  bgPrimary: '#E6F1FB',
  bgSuccess: '#E1F5EE',
  bgDanger: '#FCEBEB',
  bgWarning: '#FAEEDA',

  surface1: '#F9F8F4',
  surface2: '#FFFFFF',
  border: '#D5D3CB',
  borderStrong: '#B3B0A5',

  textPrimary: '#1E1E1B',
  textSecondary: '#5F5E5A',
  textMuted: '#888780',
} as const;

/** Palette des couleurs disponibles pour les catégories personnalisées */
export const CATEGORY_COLORS = [
  '#378ADD', '#D85A30', '#1D9E75', '#BA7517', '#7F77DD',
  '#D4537E', '#E24B4A', '#639922', '#5F5E5A',
] as const;

export const SPACING = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32,
} as const;

export const RADIUS = {
  sm: 4, md: 6, base: 8, lg: 12, full: 9999,
} as const;

export type CategoryColor = typeof CATEGORY_COLORS[number];