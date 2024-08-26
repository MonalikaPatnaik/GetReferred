import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      colors: {
        'background': '#181c23',  //black
        'secondary': '#2f3339',  //grey
        'primary': '#FFD369',  //yellow
        'text': '#EEEEEE',  //white
        //'button-primary': '#ffffff',
      }
    },
  },
};
export default config;