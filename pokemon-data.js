// Pokemon Base Set 1st Edition Data
// Separate file to avoid bloating game.js

const POKEMON_BASE_SET = {
  code: 'base1',
  name: '1st Edition Base Set',
  releaseDate: 'January 1999',
  totalCards: 102,

  // Chase cards (most valuable holos)
  chaseCards: ['Charizard', 'Blastoise', 'Venusaur', 'Mewtwo'],

  // Holo Rares (16 cards)
  holoRares: [
    { name: 'Alakazam', number: '1/102', type: 'Psychic', hp: 80 },
    { name: 'Blastoise', number: '2/102', type: 'Water', hp: 100 },
    { name: 'Chansey', number: '3/102', type: 'Colorless', hp: 120 },
    { name: 'Charizard', number: '4/102', type: 'Fire', hp: 120 },
    { name: 'Clefairy', number: '5/102', type: 'Colorless', hp: 40 },
    { name: 'Gyarados', number: '6/102', type: 'Water', hp: 100 },
    { name: 'Hitmonchan', number: '7/102', type: 'Fighting', hp: 70 },
    { name: 'Machamp', number: '8/102', type: 'Fighting', hp: 100 },
    { name: 'Magneton', number: '9/102', type: 'Lightning', hp: 60 },
    { name: 'Mewtwo', number: '10/102', type: 'Psychic', hp: 60 },
    { name: 'Nidoking', number: '11/102', type: 'Grass', hp: 90 },
    { name: 'Ninetales', number: '12/102', type: 'Fire', hp: 80 },
    { name: 'Poliwrath', number: '13/102', type: 'Water', hp: 90 },
    { name: 'Raichu', number: '14/102', type: 'Lightning', hp: 80 },
    { name: 'Venusaur', number: '15/102', type: 'Grass', hp: 100 },
    { name: 'Zapdos', number: '16/102', type: 'Lightning', hp: 90 }
  ],

  // Non-Holo Rares (16 cards)
  rares: [
    { name: 'Beedrill', number: '17/102', type: 'Grass', hp: 80 },
    { name: 'Dragonair', number: '18/102', type: 'Colorless', hp: 60 },
    { name: 'Dugtrio', number: '19/102', type: 'Fighting', hp: 70 },
    { name: 'Electabuzz', number: '20/102', type: 'Lightning', hp: 70 },
    { name: 'Electrode', number: '21/102', type: 'Lightning', hp: 80 },
    { name: 'Pidgeotto', number: '22/102', type: 'Colorless', hp: 60 },
    { name: 'Arcanine', number: '23/102', type: 'Fire', hp: 100 },
    { name: 'Charmeleon', number: '24/102', type: 'Fire', hp: 80 },
    { name: 'Dewgong', number: '25/102', type: 'Water', hp: 80 },
    { name: 'Dratini', number: '26/102', type: 'Colorless', hp: 40 },
    { name: 'Farfetchd', number: '27/102', type: 'Colorless', hp: 50 },
    { name: 'Growlithe', number: '28/102', type: 'Fire', hp: 60 },
    { name: 'Haunter', number: '29/102', type: 'Psychic', hp: 60 },
    { name: 'Ivysaur', number: '30/102', type: 'Grass', hp: 60 },
    { name: 'Jynx', number: '31/102', type: 'Psychic', hp: 70 },
    { name: 'Kadabra', number: '32/102', type: 'Psychic', hp: 60 }
  ],

  // Uncommons (32 cards)
  uncommons: [
    { name: 'Charmeleon', number: '24/102', type: 'Fire', hp: 80 },
    { name: 'Dewgong', number: '25/102', type: 'Water', hp: 80 },
    { name: 'Dratini', number: '26/102', type: 'Colorless', hp: 40 },
    { name: 'Farfetchd', number: '27/102', type: 'Colorless', hp: 50 },
    { name: 'Growlithe', number: '28/102', type: 'Fire', hp: 60 },
    { name: 'Haunter', number: '29/102', type: 'Psychic', hp: 60 },
    { name: 'Ivysaur', number: '30/102', type: 'Grass', hp: 60 },
    { name: 'Jynx', number: '31/102', type: 'Psychic', hp: 70 },
    { name: 'Kadabra', number: '32/102', type: 'Psychic', hp: 60 },
    { name: 'Kakuna', number: '33/102', type: 'Grass', hp: 80 },
    { name: 'Machoke', number: '34/102', type: 'Fighting', hp: 80 },
    { name: 'Magikarp', number: '35/102', type: 'Water', hp: 30 },
    { name: 'Magmar', number: '36/102', type: 'Fire', hp: 50 },
    { name: 'Nidorino', number: '37/102', type: 'Grass', hp: 60 },
    { name: 'Poliwhirl', number: '38/102', type: 'Water', hp: 60 },
    { name: 'Porygon', number: '39/102', type: 'Colorless', hp: 30 },
    { name: 'Raticate', number: '40/102', type: 'Colorless', hp: 60 },
    { name: 'Seel', number: '41/102', type: 'Water', hp: 60 },
    { name: 'Wartortle', number: '42/102', type: 'Water', hp: 70 },
    { name: 'Metapod', number: '54/102', type: 'Grass', hp: 70 },
    { name: 'Nidoran M', number: '55/102', type: 'Grass', hp: 46 },
    { name: 'Pikachu', number: '58/102', type: 'Lightning', hp: 40 },
    { name: 'Poliwag', number: '59/102', type: 'Water', hp: 40 },
    { name: 'Abra', number: '43/102', type: 'Psychic', hp: 30 },
    { name: 'Bulbasaur', number: '44/102', type: 'Grass', hp: 40 },
    { name: 'Caterpie', number: '45/102', type: 'Grass', hp: 40 },
    { name: 'Charmander', number: '46/102', type: 'Fire', hp: 50 },
    { name: 'Squirtle', number: '63/102', type: 'Water', hp: 40 },
    { name: 'Starmie', number: '64/102', type: 'Water', hp: 60 },
    { name: 'Staryu', number: '65/102', type: 'Water', hp: 40 },
    { name: 'Tangela', number: '66/102', type: 'Grass', hp: 50 },
    { name: 'Voltorb', number: '67/102', type: 'Lightning', hp: 40 }
  ],

  // Commons (32 cards)
  commons: [
    { name: 'Abra', number: '43/102', type: 'Psychic', hp: 30 },
    { name: 'Bulbasaur', number: '44/102', type: 'Grass', hp: 40 },
    { name: 'Caterpie', number: '45/102', type: 'Grass', hp: 40 },
    { name: 'Charmander', number: '46/102', type: 'Fire', hp: 50 },
    { name: 'Diglett', number: '47/102', type: 'Fighting', hp: 30 },
    { name: 'Doduo', number: '48/102', type: 'Colorless', hp: 50 },
    { name: 'Drowzee', number: '49/102', type: 'Psychic', hp: 50 },
    { name: 'Gastly', number: '50/102', type: 'Psychic', hp: 30 },
    { name: 'Koffing', number: '51/102', type: 'Grass', hp: 50 },
    { name: 'Machop', number: '52/102', type: 'Fighting', hp: 50 },
    { name: 'Magnemite', number: '53/102', type: 'Lightning', hp: 40 },
    { name: 'Metapod', number: '54/102', type: 'Grass', hp: 70 },
    { name: 'Nidoran M', number: '55/102', type: 'Grass', hp: 46 },
    { name: 'Onix', number: '56/102', type: 'Fighting', hp: 90 },
    { name: 'Pidgey', number: '57/102', type: 'Colorless', hp: 40 },
    { name: 'Pikachu', number: '58/102', type: 'Lightning', hp: 40 },
    { name: 'Poliwag', number: '59/102', type: 'Water', hp: 40 },
    { name: 'Ponyta', number: '60/102', type: 'Fire', hp: 40 },
    { name: 'Rattata', number: '61/102', type: 'Colorless', hp: 30 },
    { name: 'Sandshrew', number: '62/102', type: 'Fighting', hp: 40 },
    { name: 'Squirtle', number: '63/102', type: 'Water', hp: 40 },
    { name: 'Starmie', number: '64/102', type: 'Water', hp: 60 },
    { name: 'Staryu', number: '65/102', type: 'Water', hp: 40 },
    { name: 'Tangela', number: '66/102', type: 'Grass', hp: 50 },
    { name: 'Voltorb', number: '67/102', type: 'Lightning', hp: 40 },
    { name: 'Vulpix', number: '68/102', type: 'Fire', hp: 50 },
    { name: 'Weedle', number: '69/102', type: 'Grass', hp: 40 },
    { name: 'Nidoran F', number: '56/102', type: 'Grass', hp: 60 },
    { name: 'Seel', number: '41/102', type: 'Water', hp: 60 },
    { name: 'Shellder', number: '72/102', type: 'Water', hp: 30 },
    { name: 'Slowpoke', number: '73/102', type: 'Psychic', hp: 50 },
    { name: 'Spearow', number: '74/102', type: 'Colorless', hp: 50 }
  ],

  // Trainer cards (26 cards - mix of rarities)
  trainers: [
    { name: 'Clefairy Doll', number: '70/102', rarity: 'rare' },
    { name: 'Computer Search', number: '71/102', rarity: 'rare' },
    { name: 'Devolution Spray', number: '72/102', rarity: 'rare' },
    { name: 'Impostor Professor Oak', number: '73/102', rarity: 'rare' },
    { name: 'Item Finder', number: '74/102', rarity: 'rare' },
    { name: 'Lass', number: '75/102', rarity: 'rare' },
    { name: 'Pokemon Breeder', number: '76/102', rarity: 'rare' },
    { name: 'Pokemon Trader', number: '77/102', rarity: 'rare' },
    { name: 'Scoop Up', number: '78/102', rarity: 'rare' },
    { name: 'Super Energy Removal', number: '79/102', rarity: 'rare' },
    { name: 'Defender', number: '80/102', rarity: 'uncommon' },
    { name: 'Energy Retrieval', number: '81/102', rarity: 'uncommon' },
    { name: 'Full Heal', number: '82/102', rarity: 'uncommon' },
    { name: 'Maintenance', number: '83/102', rarity: 'uncommon' },
    { name: 'PlusPower', number: '84/102', rarity: 'uncommon' },
    { name: 'Pokemon Center', number: '85/102', rarity: 'uncommon' },
    { name: 'Pokemon Flute', number: '86/102', rarity: 'uncommon' },
    { name: 'Pokedex', number: '87/102', rarity: 'uncommon' },
    { name: 'Professor Oak', number: '88/102', rarity: 'uncommon' },
    { name: 'Revive', number: '89/102', rarity: 'uncommon' },
    { name: 'Super Potion', number: '90/102', rarity: 'uncommon' },
    { name: 'Bill', number: '91/102', rarity: 'common' },
    { name: 'Energy Removal', number: '92/102', rarity: 'common' },
    { name: 'Gust of Wind', number: '93/102', rarity: 'common' },
    { name: 'Potion', number: '94/102', rarity: 'common' },
    { name: 'Switch', number: '95/102', rarity: 'common' }
  ],

  // Energy cards (7 basic types - not in packs usually, but included)
  energies: [
    { name: 'Grass Energy', number: '96/102', type: 'Grass' },
    { name: 'Fire Energy', number: '97/102', type: 'Fire' },
    { name: 'Water Energy', number: '98/102', type: 'Water' },
    { name: 'Lightning Energy', number: '99/102', type: 'Lightning' },
    { name: 'Psychic Energy', number: '100/102', type: 'Psychic' },
    { name: 'Fighting Energy', number: '101/102', type: 'Fighting' },
    { name: 'Double Colorless Energy', number: '102/102', type: 'Colorless' }
  ]
};

// Pokemon TCG API base URL for card images
const POKEMON_TCG_IMAGE_BASE = 'https://images.pokemontcg.io/base1/';

// Get card image URL from Pokemon TCG API
function getPokemonCardImage(cardNumber) {
  // Extract just the number from "4/102" format
  const num = cardNumber.split('/')[0];
  return `${POKEMON_TCG_IMAGE_BASE}${num}_hires.png`;
}

// Pokemon collection (separate from MTG)
let pokemonCollection = {};

// Load Pokemon collection from localStorage
function loadPokemonCollection() {
  try {
    const saved = localStorage.getItem('pokemonCollection');
    if (saved) {
      pokemonCollection = JSON.parse(saved);
      console.log('Pokemon collection loaded:', Object.keys(pokemonCollection).length, 'unique cards');
    }
  } catch (e) {
    console.error('Error loading Pokemon collection:', e);
    pokemonCollection = {};
  }
}

// Save Pokemon collection to localStorage
function savePokemonCollection() {
  try {
    localStorage.setItem('pokemonCollection', JSON.stringify(pokemonCollection));
  } catch (e) {
    console.error('Error saving Pokemon collection:', e);
  }
}

// Clear collection on page load (don't persist between sessions)
localStorage.removeItem('pokemonCollection');
pokemonCollection = {};

// Current Pokemon pack state
let pokemonCurrentPack = [];
let pokemonCurrentIndex = 0;

// Helper to pick random unique cards from a pool
function pickUniqueCards(pool, count, usedNames = new Set()) {
  const available = pool.filter(c => !usedNames.has(c.name));
  const picked = [];
  const localUsed = new Set();

  for (let i = 0; i < count && available.length > 0; i++) {
    const remaining = available.filter(c => !localUsed.has(c.name));
    if (remaining.length === 0) break;
    const card = remaining[Math.floor(Math.random() * remaining.length)];
    picked.push(card);
    localUsed.add(card.name);
  }
  return picked;
}

// Generate a Pokemon booster pack (11 cards)
// Accurate to real Base Set: 7 commons, 3 uncommons, 1 rare
// Card order matches real packs: Energy first, then commons, uncommons, rare at back
// usedRares is optional - pass a Set to track rares across a box
function generatePokemonPack(usedRares = null) {
  const usedInPack = new Set(); // Track all card names used in this pack
  const energyCards = [];
  const commonCards = [];
  const uncommonCards = [];

  // 7 commons (mix of Pokemon, common trainers, and basic energies) - no repeats in pack
  const basicEnergies = POKEMON_BASE_SET.energies.filter(e => e.name !== 'Double Colorless Energy');
  const commonPool = [...POKEMON_BASE_SET.commons, ...POKEMON_BASE_SET.trainers.filter(t => t.rarity === 'common'), ...basicEnergies];
  const pickedCommons = pickUniqueCards(commonPool, 7, usedInPack);
  pickedCommons.forEach(card => {
    usedInPack.add(card.name);
    const cardObj = {
      ...card,
      rarity: 'common',
      imageUrl: card.number ? getPokemonCardImage(card.number) : null
    };
    // Separate energy cards to put them first
    if (card.name && card.name.includes('Energy')) {
      energyCards.push(cardObj);
    } else {
      commonCards.push(cardObj);
    }
  });

  // 3 uncommons (mix of Pokemon and uncommon trainers) - no repeats in pack
  const uncommonPool = [...POKEMON_BASE_SET.uncommons, ...POKEMON_BASE_SET.trainers.filter(t => t.rarity === 'uncommon')];
  const pickedUncommons = pickUniqueCards(uncommonPool, 3, usedInPack);
  pickedUncommons.forEach(card => {
    usedInPack.add(card.name);
    uncommonCards.push({
      ...card,
      rarity: 'uncommon',
      imageUrl: card.number ? getPokemonCardImage(card.number) : null
    });
  });

  // 1 rare (Pokemon, holo Pokemon, or rare trainer) - ~1/3 chance of holo
  const isHolo = Math.random() < 0.33;
  let rareCard;
  const rareTrainers = POKEMON_BASE_SET.trainers.filter(t => t.rarity === 'rare');

  if (isHolo) {
    // Holo rare Pokemon
    let availableHolos = usedRares ? POKEMON_BASE_SET.holoRares.filter(c => !usedRares.has(c.name)) : POKEMON_BASE_SET.holoRares;
    if (availableHolos.length === 0) availableHolos = POKEMON_BASE_SET.holoRares;
    rareCard = availableHolos[Math.floor(Math.random() * availableHolos.length)];
    rareCard = {
      ...rareCard,
      rarity: 'holo',
      isHolo: true,
      isChase: POKEMON_BASE_SET.chaseCards.includes(rareCard.name),
      imageUrl: getPokemonCardImage(rareCard.number)
    };
    if (usedRares) usedRares.add(rareCard.name);
  } else {
    // Non-holo rare (Pokemon or trainer)
    const nonHoloRarePool = [...POKEMON_BASE_SET.rares, ...rareTrainers];
    let availableRares = usedRares ? nonHoloRarePool.filter(c => !usedRares.has(c.name)) : nonHoloRarePool;
    if (availableRares.length === 0) availableRares = nonHoloRarePool;
    rareCard = availableRares[Math.floor(Math.random() * availableRares.length)];
    rareCard = {
      ...rareCard,
      rarity: 'rare',
      imageUrl: getPokemonCardImage(rareCard.number)
    };
    if (usedRares) usedRares.add(rareCard.name);
  }

  // Build pack in real order: Energy first, then commons, uncommons, rare at back
  return [...energyCards, ...commonCards, ...uncommonCards, rareCard];
}

// Create a Pokemon card element for display
function createPokemonCardElement(card, size = 'full', animType = 'normal') {
  const div = document.createElement('div');
  div.className = `pokemon-card pokemon-card-${size}`;

  if (card.isHolo) div.classList.add('holo-card');
  if (card.isChase) div.classList.add('chase-card');
  if (animType !== 'none') div.classList.add(`anim-${animType}`);

  const img = document.createElement('img');
  img.src = card.imageUrl;
  img.alt = card.name;
  img.loading = 'lazy';

  // Fallback for missing images
  img.onerror = function() {
    this.src = 'pokemon-card-back.png';
  };

  div.appendChild(img);

  // Add holo shimmer overlay for holo cards
  if (card.isHolo) {
    const shimmer = document.createElement('div');
    shimmer.className = 'holo-shimmer';
    div.appendChild(shimmer);
  }

  return div;
}

console.log('Pokemon Base Set loaded:', POKEMON_BASE_SET.name);
