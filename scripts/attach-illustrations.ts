import { prisma } from "../src/lib/prisma";

const KEK: Record<string, string> = {
  Plain: "kek-batik-plain.svg",
  Ovomaltine: "kek-batik-ovomaltine.svg",
  "Mix (plain & ovomaltine)": "kek-batik-mix.svg",
  Mix: "kek-batik-mix.svg",
};

const BROWNIE: Record<string, string> = {
  Plain: "brownies-plain.svg",
  "Sea salt": "brownies-sea-salt.svg",
  Hazelnut: "brownies-hazelnut.svg",
  "Double choc": "brownies-double-choc.svg",
  "Dark couverture choc": "brownies-dark-couverture.svg",
  "Salted caramel": "brownies-salted-caramel.svg",
  Biscoff: "brownies-biscoff.svg",
  Ovomaltine: "brownies-ovomaltine.svg",
  "Signature (salted caramel & hazelnut)": "brownies-signature.svg",
  Signature: "brownies-signature.svg",
  "Mix (sea salt & double choc)": "brownies-mix.svg",
  Mix: "brownies-mix.svg",
};

const COMBO: [RegExp, string][] = [
  [/^Combo: Plain Kek Batik \+ Plain Brownies$/, "combo-plain-kek-plain-brownies.svg"],
  [/^Combo: Mix Kek Batik \+ Mix Brownies$/, "combo-mix-kek-mix-brownies.svg"],
  [/^Combo: Plain Kek Batik \+ Congo Bars$/, "combo-plain-kek-congo.svg"],
  [/^Combo: Ovomaltine Kek Batik \+ Congo Bars$/, "combo-ovomaltine-kek-congo.svg"],
  [/^Combo: Mix Kek Batik \+ Congo Bars$/, "combo-mix-kek-congo.svg"],
  [/^Combo: Plain Brownies \+ Congo Bars$/, "combo-plain-brownies-congo.svg"],
  [/^Combo: Mix Brownies \+ Congo Bars$/, "combo-mix-brownies-congo.svg"],
];

const PUDDING: [RegExp, string][] = [
  [/Caramel Pudding Cake \(7"\)/, "pudding-cake-whole.svg"],
  [/Caramel Pudding Cake \(Quarter slice\)/, "pudding-cake-slice.svg"],
];

const ADDON: [RegExp, string][] = [
  [/^Strawberries topping$/, "addon-strawberries.svg"],
  [/^Assorted choc topping$/, "addon-assorted-choc.svg"],
  [/^Upgrade to tower & ribbon$/, "addon-tower-ribbon.svg"],
  [/^Acrylic topper$/, "addon-acrylic-topper.svg"],
  [/^Wish card/, "addon-wish-card.svg"],
  [/^Fondant writing/, "addon-fondant-writing.svg"],
  [/^Small notes/, "addon-small-notes.svg"],
];

function flavourOf(productName: string): string | null {
  const m = productName.match(/ — (.+?) \(/);
  return m ? m[1] : null;
}

async function main() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  let updated = 0;
  const missing: string[] = [];

  for (const p of products) {
    let file: string | undefined;

    if (p.category.slug === "kek-batik") {
      const f = flavourOf(p.name) ?? "";
      file = KEK[f];
    } else if (p.category.slug === "brownies") {
      const f = flavourOf(p.name) ?? "";
      file = BROWNIE[f];
    } else if (p.category.slug === "congo-bars") {
      file = "congo-bars.svg";
    } else if (p.category.slug === "combos") {
      file = COMBO.find(([re]) => re.test(p.name))?.[1];
    } else if (p.category.slug === "pudding-cake") {
      file = PUDDING.find(([re]) => re.test(p.name))?.[1];
    } else if (p.category.slug === "add-ons-extras") {
      file = ADDON.find(([re]) => re.test(p.name))?.[1];
    }

    if (!file) {
      missing.push(p.name);
      continue;
    }

    await prisma.product.update({
      where: { id: p.id },
      data: { imageUrl: `/menu-illustrations/${file}` },
    });
    updated += 1;
  }

  console.log(`Updated ${updated} products with illustrations`);
  if (missing.length > 0) {
    console.log("MISSING matches for:");
    missing.forEach((n) => console.log(`  - ${n}`));
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
