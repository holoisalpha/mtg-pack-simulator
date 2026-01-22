// Pokemon Mode Handler
// Handles switching between MTG and Pokemon modes without touching game.js

let currentGameMode = 'mtg';
let pokemonPackOpen = false;
let currentPokemonProduct = 'booster';

// Toggle between MTG and Pokemon modes
function toggleGameMode() {
  const newMode = currentGameMode === 'mtg' ? 'pokemon' : 'mtg';
  switchGameMode(newMode);
}

function switchGameMode(mode) {
  if (mode === currentGameMode) return;
  currentGameMode = mode;

  const gameLogo = document.getElementById('gameLogo');
  const gameHeader = document.getElementById('gameHeader');
  const mtgFrame = document.getElementById('mtgFrame');
  const pokemonFrame = document.getElementById('pokemonFrame');
  const mtgCollection = document.getElementById('mtgCollection');
  const pokemonCollection = document.getElementById('pokemonCollectionSection');
  const openBtn = document.getElementById('openBtn');
  const skipBtn = document.getElementById('skipBtn');
  const modeSwitchIcon = document.getElementById('modeSwitchIcon');

  if (mode === 'pokemon') {
    // Switch to Pokemon mode
    if (gameLogo) gameLogo.src = 'pokemon-logo.png';
    if (gameHeader) gameHeader.classList.add('pokemon-mode');

    if (mtgFrame) mtgFrame.style.display = 'none';
    if (pokemonFrame) pokemonFrame.style.display = 'block';

    if (mtgCollection) mtgCollection.style.display = 'none';
    if (pokemonCollection) pokemonCollection.style.display = 'block';

    if (openBtn) {
      openBtn.textContent = 'Open Booster Pack';
      openBtn.onclick = openPokemonProduct;
    }
    if (skipBtn) {
      skipBtn.onclick = skipPokemonPack;
    }

    // Update mode switch icon to show Pokemon logo
    if (modeSwitchIcon) {
      modeSwitchIcon.src = 'pokeball-icon.png';
      modeSwitchIcon.alt = 'Pokemon Mode';
      modeSwitchIcon.title = 'Switch to Magic: The Gathering';
    }

    // Reset Pokemon state
    pokemonCurrentPack = [];
    pokemonCurrentIndex = 0;

    // Hide any open pack/reveal areas and clear revealed rows
    document.getElementById('packContainer').style.display = 'none';
    document.getElementById('revealContainer').style.display = 'none';
    document.getElementById('pokemonPackContainer').style.display = 'none';
    document.getElementById('pokemonRevealContainer').style.display = 'none';
    const pokemonBoxContainer = document.getElementById('pokemonBoxContainer');
    if (pokemonBoxContainer) pokemonBoxContainer.style.display = 'none';

    // Clear MTG revealed row
    const revealedRow = document.getElementById('revealedRow');
    if (revealedRow) revealedRow.innerHTML = '';

    // Clear Pokemon revealed row
    const pokemonRevealedRow = document.getElementById('pokemonRevealedRow');
    if (pokemonRevealedRow) pokemonRevealedRow.innerHTML = '';

    // Hide box results and remove MTG styling
    const boxResults = document.getElementById('boxResultsContainer');
    if (boxResults) {
      boxResults.style.display = 'none';
      boxResults.classList.remove('pokemon-box-results');
    }

    // Reset button states
    if (openBtn) openBtn.disabled = false;
    if (skipBtn) skipBtn.disabled = true;

  } else {
    // Switch to MTG mode
    if (gameLogo) gameLogo.src = 'mtg-logo.png';
    if (gameHeader) gameHeader.classList.remove('pokemon-mode');

    if (mtgFrame) mtgFrame.style.display = 'block';
    if (pokemonFrame) pokemonFrame.style.display = 'none';

    if (mtgCollection) mtgCollection.style.display = 'block';
    if (pokemonCollection) pokemonCollection.style.display = 'none';

    if (openBtn) {
      openBtn.onclick = openProduct;
    }
    if (skipBtn) {
      skipBtn.onclick = skipAll;
    }

    // Update mode switch icon to show MTG logo
    if (modeSwitchIcon) {
      modeSwitchIcon.src = 'mtg-icon.png';
      modeSwitchIcon.alt = 'MTG Mode';
      modeSwitchIcon.title = 'Switch to Pokemon';
    }

    // Hide any open pack/reveal areas and clear revealed rows
    document.getElementById('packContainer').style.display = 'none';
    document.getElementById('revealContainer').style.display = 'none';
    document.getElementById('pokemonPackContainer').style.display = 'none';
    document.getElementById('pokemonRevealContainer').style.display = 'none';
    const pokemonBoxContainer2 = document.getElementById('pokemonBoxContainer');
    if (pokemonBoxContainer2) pokemonBoxContainer2.style.display = 'none';

    // Clear MTG revealed row
    const revealedRow2 = document.getElementById('revealedRow');
    if (revealedRow2) revealedRow2.innerHTML = '';

    // Clear Pokemon revealed row
    const pokemonRevealedRow2 = document.getElementById('pokemonRevealedRow');
    if (pokemonRevealedRow2) pokemonRevealedRow2.innerHTML = '';

    // Hide box results and remove Pokemon styling
    const boxResults2 = document.getElementById('boxResultsContainer');
    if (boxResults2) {
      boxResults2.style.display = 'none';
      boxResults2.classList.remove('pokemon-box-results');
    }

    // Reset button states
    if (openBtn) openBtn.disabled = false;
    if (skipBtn) skipBtn.disabled = true;
  }

  updatePokemonCollection();
}

// Pokemon product selection
function selectPokemonProduct(product) {
  currentPokemonProduct = product;

  const boosterBtn = document.getElementById('pokemonBoosterBtn');
  const boxBtn = document.getElementById('pokemonBoxBtn');
  const productInfo = document.getElementById('pokemonProductInfo');
  const openBtn = document.getElementById('openBtn');

  if (product === 'booster') {
    boosterBtn.classList.add('active');
    boxBtn.classList.remove('active');
    productInfo.textContent = '11 cards • 7 commons, 3 uncommons, 1 rare';
    openBtn.textContent = 'Open Booster Pack';
  } else if (product === 'booster-box') {
    boosterBtn.classList.remove('active');
    boxBtn.classList.add('active');
    productInfo.textContent = '36 booster packs • 396 cards total';
    openBtn.textContent = 'Open Booster Box';
  }
}

// Pokemon pack art options
const POKEMON_PACK_ARTS = [
  'pokemon-pack-blastoise.jpg',
  'pokemon-pack-charizard.jpg'
];

// Pokemon pack opening
function openPokemonProduct() {
  if (currentGameMode !== 'pokemon') return;

  // Reset/hide previous state first
  const revealContainer = document.getElementById('pokemonRevealContainer');
  const revealedRow = document.getElementById('pokemonRevealedRow');
  const mainCardArea = document.getElementById('pokemonMainCardArea');
  const boxResults = document.getElementById('boxResultsContainer');
  const boosterPack = document.getElementById('pokemonBoosterPack');
  const boosterBox = document.getElementById('pokemonBoosterBox');

  if (revealContainer) revealContainer.style.display = 'none';
  if (revealedRow) revealedRow.innerHTML = '';
  if (mainCardArea) mainCardArea.innerHTML = '';
  if (boxResults) boxResults.style.display = 'none';
  if (boosterPack) boosterPack.classList.remove('opening');
  if (boosterBox) boosterBox.classList.remove('opening');

  if (currentPokemonProduct === 'booster-box') {
    // Hide pack container, show box container
    const packContainer = document.getElementById('pokemonPackContainer');
    if (packContainer) packContainer.style.display = 'none';

    const boxContainer = document.getElementById('pokemonBoxContainer');
    if (boxContainer) {
      boxContainer.style.display = 'flex';
    }
    document.getElementById('openBtn').disabled = true;
    document.getElementById('skipBtn').disabled = false;
    return;
  }

  pokemonCurrentPack = generatePokemonPack();
  pokemonCurrentIndex = 0;
  pokemonPackOpen = true;

  // Hide box container if showing
  const boxContainer = document.getElementById('pokemonBoxContainer');
  if (boxContainer) boxContainer.style.display = 'none';

  // Randomly select pack art
  const randomPackArt = POKEMON_PACK_ARTS[Math.floor(Math.random() * POKEMON_PACK_ARTS.length)];
  const packImg = document.querySelector('#pokemonBoosterPack img');
  if (packImg) {
    packImg.src = randomPackArt;
  }

  // Show pack container with Pokemon pack image
  const packContainer = document.getElementById('pokemonPackContainer');
  if (packContainer) {
    packContainer.style.display = 'flex';
  }

  document.getElementById('openBtn').disabled = true;
  document.getElementById('skipBtn').disabled = false;
}

function openPokemonBoosterPack() {
  const packContainer = document.getElementById('pokemonPackContainer');
  const boosterPack = document.getElementById('pokemonBoosterPack');

  if (boosterPack) boosterPack.classList.add('opening');

  setTimeout(() => {
    if (packContainer) packContainer.style.display = 'none';

    // Reset and update the card counter
    document.getElementById('pokemonTotalCards').textContent = pokemonCurrentPack.length;
    document.getElementById('pokemonCurrentCard').textContent = '1';

    document.getElementById('pokemonRevealContainer').style.display = 'flex';
    showPokemonCurrentCard();
  }, 800);
}

function showPokemonCurrentCard() {
  const card = pokemonCurrentPack[pokemonCurrentIndex];
  const mainArea = document.getElementById('pokemonMainCardArea');
  const rarityLabel = document.getElementById('pokemonRarityLabel');

  mainArea.classList.remove('showing-holo', 'showing-chase');

  let animType = 'normal';
  if (card.isChase) {
    animType = 'chase';
    mainArea.classList.add('showing-chase');
    // Flash effect for chase cards
    const flash = document.getElementById('chaseFlash');
    if (flash) {
      flash.classList.remove('active');
      void flash.offsetWidth;
      flash.classList.add('active');
    }
  } else if (card.isHolo) {
    animType = 'holo';
    mainArea.classList.add('showing-holo');
  }

  mainArea.innerHTML = '<div class="rare-glow"></div>';
  mainArea.appendChild(createPokemonCardElement(card, 'full', animType));

  document.getElementById('pokemonCurrentCard').textContent = pokemonCurrentIndex + 1;

  // Update hint
  const remaining = pokemonCurrentPack.length - pokemonCurrentIndex - 1;
  let hint = 'Tap for next card';
  if (remaining === 0) {
    hint = 'Tap to finish';
  } else if (remaining === 1) {
    hint = '1 card left - the rare!';
  } else if (remaining <= 3) {
    hint = `${remaining} cards left...`;
  }
  document.getElementById('pokemonCardHint').textContent = hint;

  // Update rarity label
  if (rarityLabel) {
    rarityLabel.style.display = 'inline-block';
    rarityLabel.className = 'rarity-label pokemon-rarity-' + card.rarity;
    rarityLabel.textContent = card.isChase ? 'CHASE CARD!'
      : card.isHolo ? 'HOLO RARE'
      : card.rarity.toUpperCase();
  }
}

function handlePokemonCardClick() {
  if (pokemonCurrentIndex >= pokemonCurrentPack.length) return;

  moveToPokemonRevealedRow();
  pokemonCurrentIndex++;

  if (pokemonCurrentIndex < pokemonCurrentPack.length) {
    showPokemonCurrentCard();
  } else {
    finishPokemonPack();
  }
}

function moveToPokemonRevealedRow() {
  const row = document.getElementById('pokemonRevealedRow');
  row.appendChild(createPokemonCardElement(pokemonCurrentPack[pokemonCurrentIndex], 'mini', 'none'));
}

function finishPokemonPack() {
  const mainArea = document.getElementById('pokemonMainCardArea');
  mainArea.classList.remove('showing-holo', 'showing-chase');

  // Add cards to Pokemon collection
  let cardsAdded = 0;
  pokemonCurrentPack.forEach(card => {
    const key = card.name + '|base1';
    if (pokemonCollection[key]) {
      if (pokemonCollection[key].count < 4) {
        pokemonCollection[key].count++;
        cardsAdded++;
      }
    } else {
      pokemonCollection[key] = { card: card, count: 1 };
      cardsAdded++;
    }
  });

  // Show card back instead of text
  mainArea.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;">
    <img src="pokemon-card-back.png" alt="Pokemon Card Back" style="max-height:100%;max-width:100%;border-radius:14px;box-shadow:0 4px 20px rgba(0,0,0,0.4);"
      onerror="this.src='card-back.webp'">
  </div>`;

  pokemonCurrentPack = [];
  pokemonPackOpen = false;
  updatePokemonCollection();

  document.getElementById('openBtn').disabled = false;
  document.getElementById('skipBtn').disabled = true;
  document.getElementById('pokemonCardHint').textContent = '';

  const rarityLabel = document.getElementById('pokemonRarityLabel');
  if (rarityLabel) rarityLabel.style.display = 'none';
}

function skipPokemonPack() {
  const revealContainer = document.getElementById('pokemonRevealContainer');
  const packContainer = document.getElementById('pokemonPackContainer');

  if (packContainer) packContainer.style.display = 'none';
  if (revealContainer) revealContainer.style.display = 'flex';

  while (pokemonCurrentIndex < pokemonCurrentPack.length) {
    moveToPokemonRevealedRow();
    pokemonCurrentIndex++;
  }
  finishPokemonPack();
}

function updatePokemonCollection() {
  const collCount = document.getElementById('pokemonCollCount');
  const entries = Object.values(pokemonCollection);

  if (collCount) {
    collCount.textContent = entries.length;
  }

  // Update collection display by type
  const typeMap = {
    'Fire': 'fireArea',
    'Water': 'waterArea',
    'Grass': 'grassArea',
    'Lightning': 'lightningArea',
    'Psychic': 'psychicArea',
    'Fighting': 'fightingArea',
    'Colorless': 'colorlessPokeArea'
  };

  // Clear all areas
  Object.values(typeMap).forEach(areaId => {
    const area = document.getElementById(areaId);
    if (area) area.innerHTML = '';
  });

  const chaseArea = document.getElementById('chaseArea');
  const holoArea = document.getElementById('holoArea');
  const trainerArea = document.getElementById('trainerArea');
  const energyArea = document.getElementById('energyArea');
  if (chaseArea) chaseArea.innerHTML = '';
  if (holoArea) holoArea.innerHTML = '';
  if (trainerArea) trainerArea.innerHTML = '';
  if (energyArea) energyArea.innerHTML = '';

  // Sort and display cards
  entries.forEach(entry => {
    const card = entry.card;
    const cardEl = createPokemonCardElement(card, 'collection', 'none');

    // Add count badge
    if (entry.count > 1) {
      const badge = document.createElement('span');
      badge.className = 'count-badge';
      badge.textContent = 'x' + entry.count;
      cardEl.appendChild(badge);
    }

    // Add to appropriate section
    if (card.isChase && chaseArea) {
      chaseArea.appendChild(cardEl.cloneNode(true));
      document.getElementById('chaseSection').style.display = 'block';
    }

    if (card.isHolo && holoArea) {
      holoArea.appendChild(cardEl.cloneNode(true));
      document.getElementById('holoSection').style.display = 'block';
    }

    // Check if it's an energy card
    if (card.name && card.name.includes('Energy') && energyArea) {
      energyArea.appendChild(cardEl);
      document.getElementById('energySection').style.display = 'block';
    }
    // Check if it's a trainer card (has rarity but no Pokemon type, or is in trainer list)
    else if ((!card.type || card.hp === undefined) && !card.name.includes('Energy') && trainerArea) {
      trainerArea.appendChild(cardEl);
      document.getElementById('trainerSection').style.display = 'block';
    }
    // Regular Pokemon card - add to type area
    else {
      const typeArea = document.getElementById(typeMap[card.type]);
      if (typeArea) {
        typeArea.appendChild(cardEl);
        typeArea.parentElement.style.display = 'block';
      }
    }
  });

  // Show/hide empty message
  const emptyMsg = document.getElementById('pokemonEmptyCollection');
  if (emptyMsg) {
    emptyMsg.style.display = entries.length === 0 ? 'block' : 'none';
  }
}

// Pokemon Booster Box opening (36 packs)
function openPokemonBoosterBox() {
  const boxContainer = document.getElementById('pokemonBoxContainer');
  const boosterBox = document.getElementById('pokemonBoosterBox');

  if (boosterBox) boosterBox.classList.add('opening');

  setTimeout(() => {
    if (boxContainer) boxContainer.style.display = 'none';

    // Generate all 36 packs worth of cards
    const allCards = [];
    const holosFound = [];
    const chasesFound = [];
    const usedRares = new Set(); // Track rares to prevent duplicates in box

    for (let i = 0; i < 36; i++) {
      const pack = generatePokemonPack(usedRares);
      pack.forEach(card => {
        allCards.push(card);

        // Track holos and chases for highlights
        if (card.isChase) {
          chasesFound.push(card);
        } else if (card.isHolo) {
          holosFound.push(card);
        }

        // Add to collection
        const key = card.name + '|base1';
        if (pokemonCollection[key]) {
          if (pokemonCollection[key].count < 4) {
            pokemonCollection[key].count++;
          }
        } else {
          pokemonCollection[key] = { card: card, count: 1 };
        }
      });
    }

    // Show box results
    showPokemonBoxResults(allCards, holosFound, chasesFound);
    updatePokemonCollection();

    document.getElementById('openBtn').disabled = false;
    document.getElementById('skipBtn').disabled = true;
  }, 800);
}

function showPokemonBoxResults(allCards, holos, chases) {
  const container = document.getElementById('boxResultsContainer');
  const title = document.getElementById('boxResultsTitle');
  const stats = document.getElementById('boxStats');

  // Add Pokemon class for styling
  container.classList.add('pokemon-box-results');

  // Update title for Pokemon
  title.textContent = 'Booster Box Results';
  title.style.color = '#ffcb05';
  title.style.background = 'none';
  title.style.webkitTextFillColor = '#ffcb05';

  // Build chase cards list (names only)
  const chaseNames = chases.map(c => c.name).join(', ') || 'None';
  const holoNames = holos.map(c => c.name).join(', ') || 'None';

  // Stats - 3 across in a row
  stats.innerHTML = `
    <div class="box-stat">
      <div class="box-stat-value" style="color: #ffcb05;">36</div>
      <div class="box-stat-label">Packs Opened</div>
    </div>
    <div class="box-stat">
      <div class="box-stat-value" style="color: #3b4cca;">${holos.length}</div>
      <div class="box-stat-label">Holo Rares</div>
    </div>
    <div class="box-stat">
      <div class="box-stat-value" style="color: #ff6b35;">${chases.length}</div>
      <div class="box-stat-label">Chase Cards</div>
    </div>
  `;

  // Hide all card display sections - just show stats
  document.getElementById('boxPower9Section').style.display = 'none';
  document.getElementById('boxDualSection').style.display = 'none';
  document.getElementById('boxRaresSection').style.display = 'none';

  container.style.display = 'block';
}

console.log('Pokemon mode handler loaded');
