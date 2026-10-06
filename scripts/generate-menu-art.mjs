// Generates cohesive flat-illustration SVGs for every menu product family.
// Style tokens follow design.md: paper/cocoa/caramel/rose/butter/cream-line.
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "menu-illustrations");
mkdirSync(OUT, { recursive: true });

const C = {
  paper: "#FBF7F2",
  cocoa: "#2E2016",
  cocoaSoft: "#4A3221",
  crumb: "#5C4028",
  caramel: "#C4874B",
  caramelDeep: "#A9713C",
  rose: "#E7C4B4",
  butter: "#F6E7C8",
  creamLine: "#E9DDCC",
  white: "#FFFFFF",
  berry: "#C0392B",
  leaf: "#7A8B4C",
  amber: "#D9A441",
};

function frame(inner, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${label}">
<defs>
  <pattern id="dots" width="46" height="46" patternUnits="userSpaceOnUse">
    <circle cx="8" cy="8" r="2.2" fill="${C.creamLine}"/>
  </pattern>
</defs>
<rect width="800" height="600" fill="${C.butter}"/>
<rect width="800" height="600" fill="url(#dots)"/>
<ellipse cx="400" cy="452" rx="235" ry="26" fill="${C.creamLine}" opacity="0.75"/>
<ellipse cx="400" cy="440" rx="230" ry="42" fill="${C.white}"/>
<ellipse cx="400" cy="432" rx="230" ry="42" fill="${C.paper}"/>
<ellipse cx="400" cy="432" rx="230" ry="42" fill="none" stroke="${C.creamLine}" stroke-width="3"/>
${inner}
</svg>
`;
}

function crumbs(list) {
  return list
    .map(
      ([x, y, r, f]) =>
        `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" opacity="0.85"/>`,
    )
    .join("\n");
}

function drizzle(points, color, w) {
  const d = points
    .map(
      ([x, y, dx], i) =>
        `${i === 0 ? "M" : "L"}${x} ${y} q ${dx} 26 0 52`,
    )
    .join(" ");
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
}

function brownie({ glaze, deco }) {
  return `
<rect x="228" y="342" width="344" height="86" rx="10" fill="${C.crumb}"/>
<rect x="228" y="306" width="344" height="58" rx="8" fill="${C.cocoaSoft}"/>
<rect x="228" y="284" width="344" height="44" rx="14" fill="${glaze}"/>
<ellipse cx="330" cy="298" rx="52" ry="9" fill="${C.white}" opacity="0.22"/>
${deco}
${crumbs([
  [214, 430, 5, C.crumb],
  [596, 438, 4, C.crumb],
  [560, 446, 3, C.cocoaSoft],
])}`;
}

const brownieToppings = {
  plain: brownie({
    glaze: "#4A3221",
    deco: `<ellipse cx="470" cy="294" rx="40" ry="7" fill="${C.white}" opacity="0.16"/>`,
  }),
  "sea-salt": brownie({
    glaze: "#4A3221",
    deco: `<g fill="${C.white}" opacity="0.9">
      <rect x="300" y="292" width="7" height="7" rx="2" transform="rotate(18 303 295)"/>
      <rect x="402" y="300" width="6" height="6" rx="2" transform="rotate(-12 405 303)"/>
      <rect x="492" y="288" width="7" height="7" rx="2" transform="rotate(24 495 291)"/>
    </g>`,
  }),
  hazelnut: brownie({
    glaze: "#7A5230",
    deco: `<g fill="${C.amber}" stroke="${C.cocoa}" stroke-width="2">
      <circle cx="330" cy="300" r="8"/><circle cx="420" cy="292" r="7"/>
      <circle cx="500" cy="302" r="8"/>
    </g>`,
  }),
  "double-choc": brownie({
    glaze: "#3B2412",
    deco: `${drizzle(
      [
        [300, 268, 14],
        [400, 262, -12],
        [500, 270, 16],
      ],
      "#241505",
      7,
    )}
    <g fill="${C.cocoa}"><rect x="340" y="286" width="14" height="10" rx="3"/><rect x="460" y="290" width="12" height="9" rx="3"/></g>`,
  }),
  "dark-couverture": brownie({
    glaze: "#22150A",
    deco: `<path d="M300 292 q 60 -18 130 0 t 140 -4" stroke="${C.white}" stroke-width="5" fill="none" opacity="0.2" stroke-linecap="round"/>`,
  }),
  "salted-caramel": brownie({
    glaze: "#4A3221",
    deco: drizzle(
      [
        [310, 266, 18],
        [420, 260, -16],
        [510, 268, 20],
      ],
      C.caramel,
      8,
    ),
  }),
  biscoff: brownie({
    glaze: "#9C6630",
    deco: `<g fill="${C.caramelDeep}">
      <circle cx="336" cy="298" r="5"/><circle cx="392" cy="290" r="4"/>
      <circle cx="452" cy="300" r="5"/><circle cx="512" cy="292" r="4"/>
    </g>`,
  }),
  ovomaltine: brownie({
    glaze: "#5C4028",
    deco: `<g fill="${C.amber}">
      <circle cx="318" cy="296" r="5"/><circle cx="356" cy="288" r="4"/>
      <circle cx="402" cy="298" r="5"/><circle cx="448" cy="288" r="4"/>
      <circle cx="494" cy="296" r="5"/><circle cx="532" cy="290" r="4"/>
    </g>`,
  }),
  signature: brownie({
    glaze: "#523722",
    deco: `${drizzle(
      [
        [320, 266, 16],
        [430, 262, -14],
        [508, 268, 18],
      ],
      C.caramel,
      7,
    )}
    <g fill="${C.amber}" stroke="${C.cocoa}" stroke-width="1.5"><circle cx="368" cy="294" r="6"/><circle cx="478" cy="290" r="6"/></g>`,
  }),
  mix: brownie({
    glaze: "#4A3221",
    deco: `<g fill="${C.white}" opacity="0.9">
      <rect x="300" y="292" width="6" height="6" rx="2"/>
      <rect x="352" y="300" width="5" height="5" rx="2"/>
    </g>
    ${drizzle(
      [
        [440, 264, 14],
        [510, 268, 16],
      ],
      "#241505",
      6,
    )}`,
  }),
};

function kekBaits(marble) {
  return `
<rect x="240" y="300" width="320" height="132" rx="10" fill="#3A2718"/>
<g stroke="#59402B" stroke-width="7" fill="none" opacity="0.9">
  <path d="M282 424 q 10 -60 -6 -116"/>
  <path d="M352 428 q -8 -64 8 -122"/>
  <path d="M424 426 q 12 -58 -4 -118"/>
  <path d="M494 424 q -10 -62 6 -116"/>
</g>
<rect x="240" y="286" width="320" height="34" rx="12" fill="${C.caramel}"/>
${marble}
${crumbs([
  [228, 438, 5, "#3A2718"],
  [574, 442, 4, "#59402B"],
])}`;
}

const kekBaitsTops = {
  plain: `<path d="M260 300 q 40 -14 80 0 t 80 0 t 80 0" stroke="${C.paper}" stroke-width="6" fill="none" opacity="0.55"/>`,
  ovomaltine: `<g fill="${C.amber}"><circle cx="292" cy="300" r="4"/><circle cx="348" cy="294" r="3.4"/><circle cx="410" cy="302" r="4"/><circle cx="472" cy="294" r="3.4"/><circle cx="528" cy="300" r="4"/></g>`,
  mix: `<path d="M270 300 q 36 -12 72 0 t 72 0" stroke="${C.paper}" stroke-width="6" fill="none" opacity="0.5"/><g fill="${C.amber}"><circle cx="470" cy="296" r="4"/><circle cx="516" cy="302" r="3.6"/></g>`,
};

function congo() {
  return `
<rect x="236" y="352" width="328" height="76" rx="10" fill="${C.caramelDeep}"/>
<rect x="236" y="316" width="328" height="56" rx="9" fill="${C.caramel}"/>
<g fill="${C.cocoaSoft}">
  <circle cx="300" cy="336" r="7"/><circle cx="368" cy="344" r="6"/>
  <circle cx="436" cy="332" r="7"/><circle cx="500" cy="342" r="6"/>
</g>
<ellipse cx="340" cy="324" rx="44" ry="7" fill="${C.white}" opacity="0.28"/>
${crumbs([
  [222, 436, 4, C.caramelDeep],
  [578, 440, 5, C.caramel],
])}`;
}

function pair(left, right) {
  return `
<rect x="252" y="356" width="150" height="70" rx="8" fill="${left.base}"/>
<rect x="252" y="332" width="150" height="42" rx="9" fill="${left.top}"/>
${left.deco}
<rect x="398" y="356" width="150" height="70" rx="8" fill="${right.base}"/>
<rect x="398" y="332" width="150" height="42" rx="9" fill="${right.top}"/>
${right.deco}`;
}

const swatch = {
  kekPlain: { base: "#3A2718", top: C.caramel, deco: `<path d="M262 334 q 30 -10 60 0 t 60 0" stroke="${C.paper}" stroke-width="4" fill="none" opacity="0.5"/>` },
  kekMix: { base: "#3A2718", top: C.caramel, deco: `<g fill="${C.amber}"><circle cx="300" cy="334" r="3"/><circle cx="350" cy="330" r="3"/></g><path d="M400 334 q 26 -9 52 0" stroke="${C.paper}" stroke-width="4" fill="none" opacity="0.5"/>` },
  kekOvomaltine: { base: "#3A2718", top: C.caramel, deco: `<g fill="${C.amber}"><circle cx="300" cy="332" r="3"/><circle cx="356" cy="336" r="3"/><circle cx="404" cy="330" r="3"/></g>` },
  browniePlain: { base: C.crumb, top: "#4A3221", deco: `<ellipse cx="300" cy="342" rx="30" ry="5" fill="${C.white}" opacity="0.2"/>` },
  brownieMix: { base: C.crumb, top: "#4A3221", deco: `<rect x="290" y="338" width="6" height="6" rx="2" fill="${C.white}"/>${drizzle([[420, 322, 10], [470, 324, 12]], "#241505", 5)}` },
  congoBar: { base: C.caramelDeep, top: C.caramel, deco: `<g fill="${C.cocoaSoft}"><circle cx="300" cy="348" r="5"/><circle cx="360" cy="352" r="5"/><circle cx="420" cy="348" r="5"/><circle cx="480" cy="352" r="5"/></g>` },
};

function puddingWhole() {
  return `
<path d="M280 420 a120 60 0 0 1 240 0 l 0 10 a120 42 0 0 1 -240 0 z" fill="#E8C879"/>
<ellipse cx="400" cy="382" rx="118" ry="34" fill="${C.caramel}"/>
<ellipse cx="400" cy="378" rx="118" ry="30" fill="${C.caramelDeep}"/>
${drizzle(
  [
    [330, 380, 10],
    [400, 374, -10],
    [466, 380, 12],
  ],
  C.caramel,
  9,
)}
<ellipse cx="360" cy="368" rx="30" ry="7" fill="${C.white}" opacity="0.25"/>`;
}

function puddingSlice() {
  return `
<path d="M310 428 L400 292 L490 428 Z" fill="#E8C879"/>
<path d="M400 292 L490 428 L466 428 Q 470 340 400 292 Z" fill="#D9B25F"/>
<path d="M310 428 L400 292 L428 336 L352 428 Z" fill="${C.caramel}" opacity="0.85"/>
<ellipse cx="400" cy="292" rx="26" ry="10" fill="${C.caramelDeep}"/>`;
}

const addons = {
  strawberries: `
<g>
  <path d="M340 360 q -34 -8 -30 -42 q 30 -6 30 42z" fill="${C.berry}"/>
  <path d="M400 340 q 0 -52 44 -58 q 12 44 -44 58z" fill="${C.berry}"/>
  <path d="M452 372 q 40 -2 38 -38 q -34 0 -38 38z" fill="${C.berry}"/>
  <g fill="${C.butter}"><circle cx="392" cy="322" r="2"/><circle cx="410" cy="314" r="2"/><circle cx="404" cy="332" r="2"/><circle cx="352" cy="340" r="2"/><circle cx="444" cy="352" r="2"/></g>
  <path d="M388 282 q 14 -14 30 -6 q -6 16 -30 6z" fill="${C.leaf}"/>
  <path d="M330 314 q 12 -12 26 -6 q -6 14 -26 6z" fill="${C.leaf}"/>
  <path d="M458 328 q 12 -10 24 -4 q -6 12 -24 4z" fill="${C.leaf}"/>
</g>`,
  "assorted-choc": `
<g>
  <rect x="300" y="366" width="60" height="52" rx="8" fill="${C.cocoaSoft}"/>
  <rect x="376" y="352" width="64" height="64" rx="8" fill="${C.cocoa}"/>
  <rect x="452" y="368" width="58" height="50" rx="8" fill="#5C4028"/>
  <rect x="340" y="330" width="50" height="44" rx="8" fill="#7A5230"/>
  <rect x="414" y="322" width="52" height="46" rx="8" fill="${C.caramelDeep}"/>
  <ellipse cx="402" cy="336" rx="16" ry="4" fill="${C.white}" opacity="0.2"/>
</g>`,
  "tower-ribbon": `
<g>
  <rect x="320" y="380" width="160" height="52" rx="8" fill="${C.cocoaSoft}"/>
  <rect x="340" y="336" width="120" height="46" rx="8" fill="${C.crumb}"/>
  <rect x="358" y="298" width="84" height="40" rx="8" fill="#4A3221"/>
  <rect x="320" y="396" width="160" height="16" fill="${C.berry}" opacity="0.9"/>
  <path d="M400 396 l -26 -18 q -12 12 4 20 q 12 4 22 -2z M400 396 l 26 -18 q 12 12 -4 20 q -12 4 -22 -2z" fill="${C.berry}"/>
  <circle cx="400" cy="396" r="6" fill="#A83226"/>
</g>`,
  "acrylic-topper": `
<g>
  <rect x="394" y="300" width="12" height="120" rx="6" fill="${C.cocoaSoft}"/>
  <circle cx="400" cy="258" r="58" fill="${C.cocoa}" opacity="0.92"/>
  <circle cx="400" cy="258" r="46" fill="none" stroke="${C.butter}" stroke-width="3" opacity="0.6"/>
  <path d="M400 282 q -30 -20 -18 -40 q 10 -14 18 -2 q 8 -12 18 2 q 12 20 -18 40z" fill="${C.butter}"/>
</g>`,
  "wish-card": `
<g>
  <rect x="300" y="316" width="200" height="118" rx="12" fill="${C.white}" stroke="${C.creamLine}" stroke-width="3"/>
  <g stroke="${C.creamLine}" stroke-width="5" stroke-linecap="round">
    <path d="M330 350 h 120"/><path d="M330 372 h 96"/><path d="M330 394 h 110"/>
  </g>
  <path d="M470 400 q -12 -8 -8 -18 q 3 -8 10 -4 q 4 2 6 4 q 4 -4 9 -2 q 8 3 3 14 q -4 8 -20 6z" fill="${C.caramel}"/>
</g>`,
  "fondant-writing": `
<g>
  <rect x="296" y="368" width="208" height="56" rx="10" fill="${C.paper}" stroke="${C.creamLine}" stroke-width="3"/>
  <path d="M330 402 q 12 -22 24 0 t 24 0 t 24 0 t 24 0 t 24 0" stroke="${C.caramel}" stroke-width="7" fill="none" stroke-linecap="round"/>
</g>`,
  "small-notes": `
<g>
  <path d="M320 330 h 130 l 36 36 v 74 a 10 10 0 0 1 -10 10 h -156 a 10 10 0 0 1 -10 -10 v -100 a 10 10 0 0 1 10 -10z" fill="${C.white}" stroke="${C.creamLine}" stroke-width="3"/>
  <path d="M450 330 v 36 h 36z" fill="${C.butter}"/>
  <g stroke="${C.creamLine}" stroke-width="5" stroke-linecap="round">
    <path d="M344 372 h 96"/><path d="M344 394 h 76"/><path d="M344 416 h 88"/>
  </g>
  <path d="M366 330 q 34 -28 68 0" stroke="${C.caramel}" stroke-width="4" fill="none"/>
</g>`,
};

const files = {
  "kek-batik-plain.svg": frame(kekBaits(kekBaitsTops.plain), "Crunchy kek batik, plain"),
  "kek-batik-ovomaltine.svg": frame(kekBaits(kekBaitsTops.ovomaltine), "Crunchy kek batik, ovomaltine"),
  "kek-batik-mix.svg": frame(kekBaits(kekBaitsTops.mix), "Crunchy kek batik, mix"),
  "brownies-plain.svg": frame(brownieToppings.plain, "Chewy fudge brownies, plain"),
  "brownies-sea-salt.svg": frame(brownieToppings["sea-salt"], "Chewy fudge brownies, sea salt"),
  "brownies-hazelnut.svg": frame(brownieToppings.hazelnut, "Chewy fudge brownies, hazelnut"),
  "brownies-double-choc.svg": frame(brownieToppings["double-choc"], "Chewy fudge brownies, double choc"),
  "brownies-dark-couverture.svg": frame(brownieToppings["dark-couverture"], "Chewy fudge brownies, dark couverture"),
  "brownies-salted-caramel.svg": frame(brownieToppings["salted-caramel"], "Chewy fudge brownies, salted caramel"),
  "brownies-biscoff.svg": frame(brownieToppings.biscoff, "Chewy fudge brownies, biscoff"),
  "brownies-ovomaltine.svg": frame(brownieToppings.ovomaltine, "Chewy fudge brownies, ovomaltine"),
  "brownies-signature.svg": frame(brownieToppings.signature, "Chewy fudge brownies, signature"),
  "brownies-mix.svg": frame(brownieToppings.mix, "Chewy fudge brownies, mix"),
  "congo-bars.svg": frame(congo(), "Congo bars"),
  "combo-plain-kek-plain-brownies.svg": frame(pair(swatch.kekPlain, swatch.browniePlain), "Kek batik and brownies combo"),
  "combo-mix-kek-mix-brownies.svg": frame(pair(swatch.kekMix, swatch.brownieMix), "Mix kek batik and mix brownies combo"),
  "combo-plain-kek-congo.svg": frame(pair(swatch.kekPlain, swatch.congoBar), "Kek batik and congo bars combo"),
  "combo-ovomaltine-kek-congo.svg": frame(pair(swatch.kekOvomaltine, swatch.congoBar), "Ovomaltine kek batik and congo bars combo"),
  "combo-mix-kek-congo.svg": frame(pair(swatch.kekMix, swatch.congoBar), "Mix kek batik and congo bars combo"),
  "combo-plain-brownies-congo.svg": frame(pair(swatch.browniePlain, swatch.congoBar), "Brownies and congo bars combo"),
  "combo-mix-brownies-congo.svg": frame(pair(swatch.brownieMix, swatch.congoBar), "Mix brownies and congo bars combo"),
  "pudding-cake-whole.svg": frame(puddingWhole(), "Caramel pudding cake"),
  "pudding-cake-slice.svg": frame(puddingSlice(), "Caramel pudding cake slice"),
  "addon-strawberries.svg": frame(addons.strawberries, "Strawberries topping"),
  "addon-assorted-choc.svg": frame(addons["assorted-choc"], "Assorted chocolate topping"),
  "addon-tower-ribbon.svg": frame(addons["tower-ribbon"], "Brownie tower with ribbon"),
  "addon-acrylic-topper.svg": frame(addons["acrylic-topper"], "Acrylic cake topper"),
  "addon-wish-card.svg": frame(addons["wish-card"], "Wish card"),
  "addon-fondant-writing.svg": frame(addons["fondant-writing"], "Fondant writing"),
  "addon-small-notes.svg": frame(addons["small-notes"], "Small notes"),
};

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(path.join(OUT, name), svg);
}
console.log(`Wrote ${Object.keys(files).length} illustrations to ${OUT}`);
