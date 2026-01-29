export const colors = {
  primary: {
    DEFAULT: '#993399',
    50: '#f5e6f5',
    100: '#e6c2e6',
    200: '#d699d6',
    300: '#c266c2',
    400: '#ad4dad',
    500: '#993399',
    600: '#7a297a',
    700: '#5c1f5c',
    800: '#3d143d',
    900: '#1f0a1f',
  },
  background: '#e0bcdd',
  white: '#ffffff',
  black: '#000000',
  gray: {
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  success: {
    50: '#f0fdf4',
    600: '#16a34a',
  },
  warning: {
    50: '#fefce8',
    600: '#ca8a04',
  },
} as const;

export type ColorKey = keyof typeof colors;
