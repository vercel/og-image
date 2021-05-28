module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.tsx'],
  presets: [require('tailwind-preset')],
  theme: {
    boxShadow: {
      sm: '0 1px 4px rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 2px 8px rgba(0, 0, 0, 0.1)',
      lg: '0 4px 16px rgba(0, 0, 0, 0.15)',
      xl: '0 8px 36px rgba(0, 0, 0, 0.2)',
    },
    borderColor: {
      DEFAULT: 'hsl(220, 10%, var(--lighter))',
      strong: 'hsl(220, 10%, var(--strong))',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
    extend: {
      colors: {
        lightest: 'hsl(220, 10%, var(--lightest))',
        lighter: 'hsl(220, 10%, var(--lighter))',
        light: 'hsl(220, 10%, var(--light))',
        strong: 'hsl(220, 10%, var(--strong))',
        stronger: 'hsl(220, 10%, var(--stronger))',
        strongest: 'hsl(220, 10%, var(--strongest))',
      },
    },
  },
};
