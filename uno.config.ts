import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [
    [
      "btn",
      "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700",
    ],
    ["full", "w-full h-full"],
    ["flex-center", "flex items-center justify-center"],
    ["w-limited-1", "w-full max-w-1284px px8 mx-auto"],
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
        "font-size": `${32 - (parseInt(size, 10) - 1) * 4}px`,
        "font-weight": 600,
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
  safelist: "prose m-auto text-left".split(" "),
  theme: {
    colors: {
      primary: { 1: '#138D75' },
    },
    breakpoints: {
      xs: "320px",
      sm: "640px",
      lg: "1024px",
      xl: "1280px",
    },
    round: {
      btn: "8px",
      card: "12px",
    },
  },
});
