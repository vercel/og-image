module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  presets: [require('tailwind-preset')],
  theme: {
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
