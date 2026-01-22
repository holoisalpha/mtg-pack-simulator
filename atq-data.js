// Antiquities Card Data (March 1994)
// 100 cards total - expansion set, no basic lands
// Rarity based on Scryfall data

const ATQ_CARDS = {
  commons: [
    { name: "Amulet of Kroog", color: "colorless" },
    { name: "Argivian Blacksmith", color: "white" },
    { name: "Argothian Pixies", color: "green" },
    { name: "Argothian Treefolk", color: "green" },
    { name: "Artifact Blast", color: "red" },
    { name: "Artifact Possession", color: "black" },
    { name: "Artifact Ward", color: "white" },
    { name: "Atog", color: "red" },
    { name: "Battering Ram", color: "colorless" },
    { name: "Clay Statue", color: "colorless" },
    { name: "Crumble", color: "green" },
    { name: "Drafna's Restoration", color: "blue" },
    { name: "Dragon Engine", color: "colorless" },
    { name: "Grapeshot Catapult", color: "colorless" },
    { name: "Orcish Mechanics", color: "red" },
    { name: "Ornithopter", color: "colorless" },
    { name: "Phyrexian Gremlins", color: "black" },
    { name: "Priest of Yawgmoth", color: "black" },
    { name: "Reconstruction", color: "blue" },
    { name: "Reverse Polarity", color: "white" },
    { name: "Sage of Lat-Nam", color: "blue" },
    { name: "Staff of Zegon", color: "colorless" },
    { name: "Tablet of Epityr", color: "colorless" },
    { name: "Urza's Chalice", color: "colorless" },
    { name: "Urza's Mine", color: "land" },
    { name: "Urza's Power Plant", color: "land" },
    { name: "Urza's Tower", color: "land" },
    { name: "Wall of Spears", color: "colorless" }
  ],
  uncommons: [
    { name: "Armageddon Clock", color: "colorless" },
    { name: "Ashnod's Altar", color: "colorless" },
    { name: "Ashnod's Battle Gear", color: "colorless" },
    { name: "Ashnod's Transmogrant", color: "colorless" },
    { name: "Circle of Protection: Artifacts", color: "white" },
    { name: "Citanul Druid", color: "green" },
    { name: "Cursed Rack", color: "colorless" },
    { name: "Damping Field", color: "white" },
    { name: "Detonate", color: "red" },
    { name: "Dwarven Weaponsmith", color: "red" },
    { name: "Energy Flux", color: "blue" },
    { name: "Feldon's Cane", color: "colorless" },
    { name: "Gate to Phyrexia", color: "black" },
    { name: "Goblin Artisans", color: "red" },
    { name: "Haunting Wind", color: "black" },
    { name: "Ivory Tower", color: "colorless" },
    { name: "Jalum Tome", color: "colorless" },
    { name: "Martyrs of Korlis", color: "white" },
    { name: "Mightstone", color: "colorless" },
    { name: "Millstone", color: "colorless" },
    { name: "Mishra's Factory", color: "land" },
    { name: "Onulet", color: "colorless" },
    { name: "Power Artifact", color: "blue" },
    { name: "Powerleech", color: "green" },
    { name: "Primal Clay", color: "colorless" },
    { name: "Rocket Launcher", color: "colorless" },
    { name: "Rukh Egg", color: "red" },
    { name: "Strip Mine", color: "land" },
    { name: "Su-Chi", color: "colorless" },
    { name: "Tawnos's Wand", color: "colorless" },
    { name: "Tawnos's Weaponry", color: "colorless" },
    { name: "The Rack", color: "colorless" },
    { name: "Titania's Song", color: "green" },
    { name: "Transmute Artifact", color: "blue" },
    { name: "Weakstone", color: "colorless" },
    { name: "Xenic Poltergeist", color: "black" },
    { name: "Yotian Soldier", color: "colorless" }
  ],
  rares: [
    { name: "Argivian Archaeologist", color: "white" },
    { name: "Bronze Tablet", color: "colorless" },
    { name: "Candelabra of Tawnos", color: "colorless" },
    { name: "Clockwork Avian", color: "colorless" },
    { name: "Colossus of Sardia", color: "colorless" },
    { name: "Coral Helm", color: "colorless" },
    { name: "Gaea's Avenger", color: "green" },
    { name: "Golgothian Sylex", color: "colorless" },
    { name: "Hurkyl's Recall", color: "blue" },
    { name: "Mishra's War Machine", color: "colorless" },
    { name: "Mishra's Workshop", color: "land" },
    { name: "Obelisk of Undoing", color: "colorless" },
    { name: "Shapeshifter", color: "colorless" },
    { name: "Shatterstorm", color: "red" },
    { name: "Tawnos's Coffin", color: "colorless" },
    { name: "Tetravus", color: "colorless" },
    { name: "Triskelion", color: "colorless" },
    { name: "Urza's Avenger", color: "colorless" },
    { name: "Urza's Miter", color: "colorless" },
    { name: "Yawgmoth Demon", color: "black" }
  ],
  lands: [] // Antiquities has no basic lands - it's an expansion
};

// Assign rarity to cards
ATQ_CARDS.commons.forEach(c => c.rarity = "common");
ATQ_CARDS.uncommons.forEach(c => c.rarity = "uncommon");
ATQ_CARDS.rares.forEach(c => c.rarity = "rare");

// Add to SETS_CONFIG
SETS_CONFIG['atq'] = {
  fullName: "Antiquities",
  releaseDate: "March 1994",
  cardCount: 100,
  hasStarter: false,
  packSize: 8
};

// Add pack image for Antiquities
PACK_IMAGES['atq'] = 'booster-pack-atq.webp';
