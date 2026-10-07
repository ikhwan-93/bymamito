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

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const lora = Lora({ subsets: ["latin"], variable: "--font-display" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], variable: "--font-display", weight: "400" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-display" });
const baskervville = Baskervville({ subsets: ["latin"], variable: "--font-display", weight: "400" });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], variable: "--font-display", weight: "400" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-body" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-body" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600"] });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-body" });
const karla = Karla({ subsets: ["latin"], variable: "--font-body" });
const crimsonPro = Crimson_Pro({ subsets: ["latin"], variable: "--font-display" });
const mulish = Mulish({ subsets: ["latin"], variable: "--font-body" });

export type FontPack = {
  id: string;
  label: string;
  description: string;
  displayClass: string;
  bodyClass: string;
};

export const FONT_PACKS: FontPack[] = [
  {
    id: "fraunces-inter",
    label: "Fraunces + Inter",
    description: "The original — warm wonky serif with a clean sans.",
    displayClass: fraunces.variable,
    bodyClass: inter.variable,
  },
  {
    id: "playfair-inter",
    label: "Playfair Display + Inter",
    description: "Elegant high-contrast serif with a modern sans.",
    displayClass: playfair.variable,
    bodyClass: inter.variable,
  },
  {
    id: "lora-inter",
    label: "Lora + Inter",
    description: "Friendly readable serif paired with Inter.",
    displayClass: lora.variable,
    bodyClass: inter.variable,
  },
  {
    id: "cormorant-inter",
    label: "Cormorant + Inter",
    description: "Refined, airy serif with a neutral sans.",
    displayClass: cormorant.variable,
    bodyClass: inter.variable,
  },
  {
    id: "dm-serif-inter",
    label: "DM Serif Display + Inter",
    description: "Bold editorial serif with a crisp sans.",
    displayClass: dmSerif.variable,
    bodyClass: inter.variable,
  },
  {
    id: "source-serif-inter",
    label: "Source Serif + Inter",
    description: "Newsroom serif with a contemporary sans.",
    displayClass: sourceSerif.variable,
    bodyClass: inter.variable,
  },
  {
    id: "baskervville-inter",
    label: "Baskervville + Inter",
    description: "Classic bookish serif with a clean sans.",
    displayClass: baskervville.variable,
    bodyClass: inter.variable,
  },
  {
    id: "libre-baskerville-inter",
    label: "Libre Baskerville + Inter",
    description: "Timeless Baskerville serif with Inter.",
    displayClass: libreBaskerville.variable,
    bodyClass: inter.variable,
  },
  {
    id: "crimson-inter",
    label: "Crimson Pro + Inter",
    description: "Garamond-style serif with a modern sans.",
    displayClass: crimsonPro.variable,
    bodyClass: inter.variable,
  },
  {
    id: "fraunces-nunito",
    label: "Fraunces + Nunito",
    description: "Warm serif with a rounded, friendly sans.",
    displayClass: fraunces.variable,
    bodyClass: nunito.variable,
  },
  {
    id: "fraunces-quicksand",
    label: "Fraunces + Quicksand",
    description: "Warm serif with a geometric rounded sans.",
    displayClass: fraunces.variable,
    bodyClass: quicksand.variable,
  },
  {
    id: "fraunces-poppins",
    label: "Fraunces + Poppins",
    description: "Warm serif with a geometric sans.",
    displayClass: fraunces.variable,
    bodyClass: poppins.variable,
  },
  {
    id: "fraunces-work-sans",
    label: "Fraunces + Work Sans",
    description: "Warm serif with a grotesque sans.",
    displayClass: fraunces.variable,
    bodyClass: workSans.variable,
  },
  {
    id: "fraunces-karla",
    label: "Fraunces + Karla",
    description: "Warm serif with a quirky grotesque sans.",
    displayClass: fraunces.variable,
    bodyClass: karla.variable,
  },
  {
    id: "fraunces-mulish",
    label: "Fraunces + Mulish",
    description: "Warm serif with a soft sans.",
    displayClass: fraunces.variable,
    bodyClass: mulish.variable,
  },
];

export const DEFAULT_FONT_PACK = "fraunces-inter";

export function getFontPack(id: string | undefined | null): FontPack {
  return FONT_PACKS.find((p) => p.id === id) ?? FONT_PACKS[0];
}
