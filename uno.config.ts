import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    [
      'btn',
      'flex gap1 items-center px5 py2 rounded-2 bg-primary-1 text-white border-none cursor-pointer after:content-[\'\'] after:absolute after:inset-0 after:rounded-inherit after:bg-white after:opacity-0 hover:after:opacity-10 items-center justify-center',
    ],
    [
      'btn-outline',
      'flex gap1 items-center px5 py2 rounded-2 bg-transparent text-primary-1 border-solid outline-none border-1 border-primary-1 cursor-pointer after:content-[\'\'] after:absolute after:inset-0 after:rounded-inherit after:bg-white after:opacity-0 hover:after:opacity-10 items-center justify-center',
    ],
    ['full', 'w-full h-full'],
    ['flex-center', 'flex items-center justify-center'],
    ['w-limited-1', 'w-full max-w-1284px px8 mx-auto'],
  ],
  rules: [
    // flex
    [
      /^flex-(\d+)$/,
      ([_, size]) => ({
        flex: size,
      }),
    ],
    [
      /^title-(\d+)$/,
      ([_, size]) => ({
        'font-size': `${32 - (Number.parseInt(size, 10) - 1) * 4}px`,
        'font-weight': 600,
      }),
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      autoInstall: true,
    }),
    presetTypography(),
    presetWebFonts({
      // fonts: {
      //   sans: 'DM Sans',
      //   serif: 'DM Serif Display',
      //   mono: 'DM Mono',
      // },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: 'prose m-auto text-left'.split(' '),
  theme: {
    colors: {
      primary: { 1: '#138D75' },
      cardBg: 'var(--card-bg)',
    },
    breakpoints: {
      xs: '320px',
      sm: '640px',
      lg: '1024px',
      xl: '1280px',
    },
    round: {
      btn: '8px',
      card: '12px',
    },
  },
})
