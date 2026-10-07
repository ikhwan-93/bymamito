import {
  Fraunces,
  Inter,
  Playfair_Display,
  Lora,
  Cormorant_Garamond,
  DM_Serif_Display,
  Source_Serif_4,
  Baskervville,
  Libre_Baskerville,
  Nunito,
  Quicksand,
  Poppins,
  Work_Sans,
  Karla,
  Crimson_Pro,
  Mulish,
} from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], variable: "--font-dm-serif", weight: "400" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });
const baskervville = Baskervville({ subsets: ["latin"], variable: "--font-baskervville", weight: "400" });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], variable: "--font-libre-baskerville", weight: "400" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400", "500", "600"] });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });
const karla = Karla({ subsets: ["latin"], variable: "--font-karla" });
const crimsonPro = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson-pro" });
const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });

export type FontPack = {
  id: string;
  label: string;
  description: string;
  display: string;
  body: string;
  displayVar: string;
  bodyVar: string;
  variableClass: string;
};

export const FONT_PACKS: FontPack[] = [
  {
    id: "fraunces-inter",
    label: "Fraunces + Inter",
    description: "The original — warm wonky serif with a clean sans.",
    display: "Fraunces",
    body: "Inter",
    displayVar: "var(--font-fraunces)",
    bodyVar: "var(--font-inter)",
    variableClass: `${fraunces.variable} ${inter.variable}`,
  },
  {
    id: "playfair-inter",
    label: "Playfair Display + Inter",
    description: "Elegant high-contrast serif with a modern sans.",
    display: "Playfair Display",
    body: "Inter",
    displayVar: "var(--font-playfair)",
    bodyVar: "var(--font-inter)",
    variableClass: `${playfair.variable} ${inter.variable}`,
  },
  {
    id: "lora-inter",
    label: "Lora + Inter",
    description: "Friendly readable serif paired with Inter.",
    display: "Lora",
    body: "Inter",
    displayVar: "var(--font-lora)",
    bodyVar: "var(--font-inter)",
    variableClass: `${lora.variable} ${inter.variable}`,
  },
  {
    id: "cormorant-inter",
    label: "Cormorant + Inter",
    description: "Refined, airy serif with a neutral sans.",
    display: "Cormorant Garamond",
    body: "Inter",
    displayVar: "var(--font-cormorant)",
    bodyVar: "var(--font-inter)",
    variableClass: `${cormorant.variable} ${inter.variable}`,
  },
  {
    id: "dm-serif-inter",
    label: "DM Serif Display + Inter",
    description: "Bold editorial serif with a crisp sans.",
    display: "DM Serif Display",
    body: "Inter",
    displayVar: "var(--font-dm-serif)",
    bodyVar: "var(--font-inter)",
    variableClass: `${dmSerif.variable} ${inter.variable}`,
  },
  {
    id: "source-serif-inter",
    label: "Source Serif + Inter",
    description: "Newsroom serif with a contemporary sans.",
    display: "Source Serif 4",
    body: "Inter",
    displayVar: "var(--font-source-serif)",
    bodyVar: "var(--font-inter)",
    variableClass: `${sourceSerif.variable} ${inter.variable}`,
  },
  {
    id: "baskervville-inter",
    label: "Baskervville + Inter",
    description: "Classic bookish serif with a clean sans.",
    display: "Baskervville",
    body: "Inter",
    displayVar: "var(--font-baskervville)",
    bodyVar: "var(--font-inter)",
    variableClass: `${baskervville.variable} ${inter.variable}`,
  },
  {
    id: "libre-baskerville-inter",
    label: "Libre Baskerville + Inter",
    description: "Timeless Baskerville serif with Inter.",
    display: "Libre Baskerville",
    body: "Inter",
    displayVar: "var(--font-libre-baskerville)",
    bodyVar: "var(--font-inter)",
    variableClass: `${libreBaskerville.variable} ${inter.variable}`,
  },
  {
    id: "crimson-inter",
    label: "Crimson Pro + Inter",
    description: "Garamond-style serif with a modern sans.",
    display: "Crimson Pro",
    body: "Inter",
    displayVar: "var(--font-crimson-pro)",
    bodyVar: "var(--font-inter)",
    variableClass: `${crimsonPro.variable} ${inter.variable}`,
  },
  {
    id: "fraunces-nunito",
    label: "Fraunces + Nunito",
    description: "Warm serif with a rounded, friendly sans.",
    display: "Fraunces",
    body: "Nunito",
    displayVar: "var(--font-fraunces)",
    bodyVar: "var(--font-nunito)",
    variableClass: `${fraunces.variable} ${nunito.variable}`,
  },
  {
    id: "fraunces-quicksand",
    label: "Fraunces + Quicksand",
    description: "Warm serif with a geometric rounded sans.",
    display: "Fraunces",
    body: "Quicksand",
    displayVar: "var(--font-fraunces)",
    bodyVar: "var(--font-quicksand)",
    variableClass: `${fraunces.variable} ${quicksand.variable}`,
  },
  {
    id: "fraunces-poppins",
    label: "Fraunces + Poppins",
    description: "Warm serif with a geometric sans.",
    display: "Fraunces",
    body: "Poppins",
    displayVar: "var(--font-fraunces)",
    bodyVar: "var(--font-poppins)",
    variableClass: `${fraunces.variable} ${poppins.variable}`,
  },
  {
    id: "fraunces-work-sans",
    label: "Fraunces + Work Sans",
    description: "Warm serif with a grotesque sans.",
    display: "Fraunces",
    body: "Work Sans",
    displayVar: "var(--font-fraunces)",
    bodyVar: "var(--font-work-sans)",
    variableClass: `${fraunces.variable} ${workSans.variable}`,
  },
  {
    id: "fraunces-karla",
    label: "Fraunces + Karla",
    description: "Warm serif with a quirky grotesque sans.",
    display: "Fraunces",
    body: "Karla",
    displayVar: "var(--font-fraunces)",
    bodyVar: "var(--font-karla)",
    variableClass: `${fraunces.variable} ${karla.variable}`,
  },
  {
    id: "fraunces-mulish",
    label: "Fraunces + Mulish",
    description: "Warm serif with a soft sans.",
    display: "Fraunces",
    body: "Mulish",
    displayVar: "var(--font-fraunces)",
    bodyVar: "var(--font-mulish)",
    variableClass: `${fraunces.variable} ${mulish.variable}`,
  },
];

export const DEFAULT_FONT_PACK = "fraunces-inter";

export function getFontPack(id: string | undefined | null): FontPack {
  return FONT_PACKS.find((p) => p.id === id) ?? FONT_PACKS[0];
}

const ALL_FONT_INSTANCES = [
  fraunces,
  inter,
  playfair,
  lora,
  cormorant,
  dmSerif,
  sourceSerif,
  baskervville,
  libreBaskerville,
  nunito,
  quicksand,
  poppins,
  workSans,
  karla,
  crimsonPro,
  mulish,
];

// All font variable class names, so the layout can load every font for previews.
export const ALL_FONT_CLASSES = ALL_FONT_INSTANCES.map((f) => f.variable).join(
  " ",
);
