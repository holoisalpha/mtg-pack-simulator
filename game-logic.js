FED_CARDS.commons.forEach(c => c.rarity = "common");
FED_CARDS.uncommons.forEach(c => c.rarity = "uncommon");
FED_CARDS.rares.forEach(c => c.rarity = "rare");
FED_CARDS.lands.forEach(c => c.rarity = "land");


// Get cards for current set
function getCardPool() {
  if (gameMode === 'pokemon') {
    switch(currentSetCode) {
      case 'base1': return BASE_SET_CARDS;
      default: return BASE_SET_CARDS;
    }
  }
  switch(currentSetCode) {
    case 'lea': return ALPHA_CARDS;
    case 'leb': return BETA_CARDS;
    case '2ed': return UNLIMITED_CARDS;
    case 'arn': return ARN_CARDS;
    case 'leg': return LEG_CARDS;
    case 'atq': return ATQ_CARDS;
    case '4ed': return FED_CARDS;
    default: return BETA_CARDS;
  }
}

function getCurrentSetConfig() {
  if (gameMode === 'pokemon') {
    return POKEMON_SETS_CONFIG[currentSetCode] || POKEMON_SETS_CONFIG['base1'];
  }
  return SETS_CONFIG[currentSetCode];
}

    // State
    let currentPack = [];
    // Collection: { "cardName|setCode": { card: cardObj, count: n, set: setCode } }
    let collection = {};
    
    // Basic lands to exclude from collection
    const BASIC_LANDS = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
    let packCount = 0;
    let starterCount = 0;
    let currentIndex = 0;
    let productType = 'booster'; // 'booster' or 'starter'
    
    // Cache DOM elements
    const $ = id => document.getElementById(id);
    const dom = {
      openBtn: $('openBtn'),
      skipBtn: $('skipBtn'),
      // keepBtn removed - auto-keep now
      power9Section: $('power9Section'),
      power9Area: $('power9Area'),
      dualSection: $('dualSection'),
      dualArea: $('dualArea'),
      whiteSection: $('whiteSection'),
      whiteArea: $('whiteArea'),
      blueSection: $('blueSection'),
      blueArea: $('blueArea'),
      blackSection: $('blackSection'),
      blackArea: $('blackArea'),
      redSection: $('redSection'),
      redArea: $('redArea'),
      greenSection: $('greenSection'),
      greenArea: $('greenArea'),
      colorlessSection: $('colorlessSection'),
      colorlessArea: $('colorlessArea'),
      emptyCollection: $('emptyCollection'),
      boosterBtn: $('boosterBtn'),
      boosterBoxBtn: $('boosterBoxBtn'),
      starterBtn: $('starterBtn'),
      starterBoxBtn: $('starterBoxBtn'),
      boxResultsContainer: $('boxResultsContainer'),
      boxResultsTitle: $('boxResultsTitle'),
      boxStats: $('boxStats'),
      boxPower9Section: $('boxPower9Section'),
      boxPower9Area: $('boxPower9Area'),
      boxDualSection: $('boxDualSection'),
      boxDualArea: $('boxDualArea'),
      boxRaresSection: $('boxRaresSection'),
      boxRaresArea: $('boxRaresArea'),
      alert: $('alert'),
      totalCards: $('totalCards'),
      currentCard: $('currentCard'),
      cardHint: $('cardHint'),
      rarityLabel: $('rarityLabel'),
      revealedRow: $('revealedRow'),
      packContainer: $('packContainer'),
      starterContainer: $('starterContainer'),
      revealContainer: $('revealContainer'),
      boosterPack: $('boosterPack'),
      starterDeck: $('starterDeck'),
      mainCardArea: $('mainCardArea'),
      power9Flash: $('power9Flash'),
      collCount: $('collCount')
    };
    
    // === DISPLAY MODE ===
    // Set to false for fast preview (no external images), true for full art
    const USE_CARD_ART = new URLSearchParams(window.location.search).get('art') !== 'false';
    
    // Card type icons (for preview mode)
    const TYPE_ICONS = {
      creature: '👤', instant: '⚡', sorcery: '🔮',
      enchant: '✨', artifact: '⚙️', land: '🏔️'
    };
    
    function getIcon(card) {
      const type = (card.type || '').toLowerCase();
      for (const [key, icon] of Object.entries(TYPE_ICONS)) {
        if (type.includes(key)) return icon;
      }
      return '📜';
    }
    
    function createCardElement(card, size = 'full', animationType = 'normal') {
      const div = document.createElement('div');
      const animClass = { rare: 'card-reveal-rare', power9: 'card-reveal-power9', none: '', normal: 'card-reveal' }[animationType];
      
      if (USE_CARD_ART) {
        // Art mode: Use Scryfall images
        const version = 'normal'; // Always use high-res for quality on hover/zoom
        const imgUrl = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(card.name)}&set=${currentSetCode}&format=image&version=${version}`;
        
        div.className = size === 'mini' ? 'mini-card card-img' : `card-img ${animClass}`.trim();
        if (card.isPowerNine) div.classList.add('power-nine');
        if (card.isDual) div.classList.add('dual-land');
        if (card.rarity === 'rare') div.classList.add('rarity-rare');
        
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = card.name;
        img.loading = 'lazy';
        img.draggable = false;
        img.onerror = function() {
          this.style.display = 'none';
          this.parentElement.innerHTML = `<div class="card-fallback">${card.name}</div>`;
        };
        div.appendChild(img);
      } else {
        // Preview mode: Fast text-based cards
        div.className = size === 'mini' ? 'mini-card card card-front' : `card card-front ${animClass}`.trim();
        div.classList.add('card-' + (card.color || 'colorless'));
        if (card.rarity === 'rare') div.classList.add('rarity-rare-border');
        if (card.rarity === 'uncommon') div.classList.add('rarity-uncommon-border');
        if (card.isPowerNine) div.classList.add('power-nine');
        if (card.isDual) div.classList.add('dual-land');
        
        div.innerHTML = `
          <div class="card-header">
            <span class="card-name">${card.name}</span>
            <span class="card-cost">${card.manaCost || ''}</span>
          </div>
          <div class="card-art">${getIcon(card)}</div>
          <div class="card-type">${card.type || ''}</div>
          <div class="card-text">${card.text || ''}</div>
          ${card.power !== undefined ? `<div class="card-pt">${card.power}/${card.toughness}</div>` : ''}
        `;
      }

      // Add click handler for mini cards to show enlarged view
      if (size === 'mini') {
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => showCardEnlarged(card));
      }

      return div;
    }

    function showCardEnlarged(card) {
      dom.mainCardArea.classList.remove('showing-rare', 'showing-power9');

      if (card.isPowerNine) {
        dom.mainCardArea.classList.add('showing-power9');
      } else if (card.rarity === 'rare') {
        dom.mainCardArea.classList.add('showing-rare');
      }

      dom.mainCardArea.innerHTML = '<div class="rare-glow"></div>';
      dom.mainCardArea.appendChild(createCardElement(card, 'full', 'none'));
    }

    function pickRandomCards(arr, count) {
      const picked = [];
      const usedIndices = new Set();
      while (picked.length < count && usedIndices.size < arr.length) {
        const idx = Math.floor(Math.random() * arr.length);
        if (!usedIndices.has(idx)) {
          usedIndices.add(idx);
          picked.push({...arr[idx]});
        }
      }
      return picked;
    }

    // Switch between MTG and Pokemon modes
    function switchGameMode(mode) {
      gameMode = mode;
      document.getElementById('mtgModeBtn')?.classList.toggle('active', mode === 'mtg');
      document.getElementById('pokemonModeBtn')?.classList.toggle('active', mode === 'pokemon');
      document.body.classList.toggle('pokemon-mode', mode === 'pokemon');

      const headerLogo = document.querySelector('.header-logo');
      if (mode === 'pokemon') {
        if (headerLogo) headerLogo.src = 'pokemon-logo.png';
        currentSetCode = 'base1';
        updatePokemonUI();
      } else {
        if (headerLogo) headerLogo.src = 'mtg-logo.png';
        currentSetCode = 'leb';
        updateMTGUI();
      }
      collection = {};
      updateCollection();
      packCount = 0;
      starterCount = 0;
    }

    function updatePokemonUI() {
      const setButtonsContainer = document.querySelector('.set-buttons');
      if (setButtonsContainer) {
        setButtonsContainer.innerHTML = '<button class="pokemon-btn active" data-set="base1" onclick="selectSet(\'base1\')">Base Set 1st Ed</button>';
      }
      const setInfoEl = document.getElementById('setInfo');
      if (setInfoEl) setInfoEl.textContent = '1st Edition Base Set • January 1999 • 102 Cards';
      const productInfoEl = document.getElementById('productInfo');
      if (productInfoEl) productInfoEl.textContent = '11 cards • 7 commons, 3 uncommons, 1 rare (holo chance!)';
      if (dom.starterBtn) dom.starterBtn.style.display = 'none';
      if (dom.starterBoxBtn) dom.starterBoxBtn.style.display = 'none';
      selectProduct('booster');
      dom.openBtn.textContent = 'Open Pack';
    }

    function updateMTGUI() {
      const setButtonsContainer = document.querySelector('.set-buttons');
      if (setButtonsContainer) {
        setButtonsContainer.innerHTML = '<button class="mtg-btn" data-set="lea" onclick="selectSet(\'lea\')">Alpha</button><button class="mtg-btn active" data-set="leb" onclick="selectSet(\'leb\')">Beta</button><button class="mtg-btn" data-set="2ed" onclick="selectSet(\'2ed\')">Unlimited</button><button class="mtg-btn" data-set="arn" onclick="selectSet(\'arn\')"><img src="set-icons/arn.svg" class="set-icon" alt="">Arabian Nights</button><button class="mtg-btn" data-set="leg" onclick="selectSet(\'leg\')"><img src="set-icons/leg.svg" class="set-icon" alt="">Legends</button><button class="mtg-btn" data-set="4ed" onclick="selectSet(\'4ed\')">4th Edition</button>';
      }
      const setConfig = SETS_CONFIG['leb'];
      const setInfoEl = document.getElementById('setInfo');
      if (setInfoEl) setInfoEl.textContent = setConfig.fullName + ' • ' + setConfig.releaseDate + ' • ' + setConfig.cardCount + ' Cards';
      if (dom.starterBtn) dom.starterBtn.style.display = '';
      if (dom.starterBoxBtn) dom.starterBoxBtn.style.display = '';
      updateProductInfo();
    }

    function selectSet(setCode) {
      currentSetCode = setCode;
      const setConfig = getCurrentSetConfig();

      // Update set selector buttons
      document.querySelectorAll('.mtg-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.set === setCode);
      });

      // Update set name display
      const setNameEl = document.getElementById('currentSetName');
      if (setNameEl) setNameEl.textContent = setConfig.name;

      // Update set info subtitle
      const setInfoEl = document.getElementById('setInfo');
      if (setInfoEl) {
        setInfoEl.textContent = `${setConfig.fullName} • ${setConfig.releaseDate} • ${setConfig.cardCount} Cards`;
      }
      // Show/hide starter buttons based on set
      if (dom.starterBtn) {
        dom.starterBtn.style.display = setConfig.hasStarter ? '' : 'none';
      }
      if (dom.starterBoxBtn) {
        dom.starterBoxBtn.style.display = setConfig.hasStarter ? '' : 'none';
      }
      // If current product is starter-related but set doesn't have it, switch to booster
      if (!setConfig.hasStarter && (productType === 'starter' || productType === 'starter-box')) {
        selectProduct('booster');
      }

      // Reset collection when changing sets
      collection = {};
      updateCollection();
      packCount = 0;
      starterCount = 0;

      // Update pack image based on set
      updatePackImage(setCode);

      // Refresh product info for set-specific pack sizes
      selectProduct(productType);
    }

    function updatePackImage(setCode) {
      const packImg = document.querySelector('#boosterPack img');
      if (!packImg) return;

      // Store original Beta image on first call
      if (!betaPackImage) {
        betaPackImage = packImg.src;
      }

      // Use set-specific image if available, otherwise use Beta image
      const packImage = PACK_IMAGES[setCode];
      if (packImage) {
        // Handle array of images (e.g., 4th Edition has 5 pack designs)
        if (Array.isArray(packImage)) {
          const randomIndex = Math.floor(Math.random() * packImage.length);
          packImg.src = packImage[randomIndex];
        } else {
          packImg.src = packImage;
        }
      } else {
        packImg.src = betaPackImage;
      }
    }

    // Expose selectSet globally
    window.selectSet = selectSet;

    function selectProduct(type) {
      productType = type;
      dom.boosterBtn.classList.toggle('active', type === 'booster');
      dom.boosterBoxBtn.classList.toggle('active', type === 'booster-box');
      dom.starterBtn.classList.toggle('active', type === 'starter');
      dom.starterBoxBtn.classList.toggle('active', type === 'starter-box');

      const labels = {
        'booster': 'Open Pack',
        'booster-box': 'Open Box',
        'starter': 'Open Deck',
        'starter-box': 'Open Box'
      };
      dom.openBtn.textContent = labels[type] || 'Open Pack';

      // Update product info text
      const productInfoEl = document.getElementById('productInfo');
      if (productInfoEl) {
        const is8CardSet = (currentSetCode === 'arn' || currentSetCode === 'atq');
        const infoTexts = is8CardSet ? {
          'booster': '8 cards • 5-6 commons, 2 uncommons, 0-1 rare',
          'booster-box': '60 booster packs • ~480 cards total',
          'starter': '60 cards • 23 commons, 13 uncommons, 2 rares, 22 lands',
          'starter-box': '10 starter decks • 600 cards total'
        } : {
          'booster': '15 cards • 11 commons, 3 uncommons, 1 rare',
          'booster-box': '36 booster packs • 540 cards total',
          'starter': '60 cards • 23 commons, 13 uncommons, 2 rares, 22 lands',
          'starter-box': '10 starter decks • 600 cards total'
        };
        productInfoEl.textContent = infoTexts[type] || infoTexts['booster'];
      }
    }

    function openProduct() {
      // Randomize pack image for sets with multiple designs (like 4th Edition)
      updatePackImage(currentSetCode);
      switch (productType) {
        case 'booster':
          openPack();
          break;
        case 'booster-box':
          openBoosterBox();
          break;
        case 'starter':
          openStarterDeckPrepare();
          break;
        case 'starter-box':
          openStarterBox();
          break;
      }
    }

    function openPack() {
      currentIndex = 0;
      const cardPool = getCardPool();
      const setConfig = getCurrentSetConfig();

      // Arabian Nights and Antiquities had 8-card boosters (different composition)
      if (currentSetCode === 'arn' || currentSetCode === 'atq') {
        // ARN/ATQ: 6 commons, 2 uncommons OR 5 commons, 2 uncommons, 1 rare
        const hasRare = Math.random() < 0.4; // ~40% chance of rare
        const numCommons = hasRare ? 5 : 6;
        const commons = pickRandomCards(cardPool.commons, numCommons);
        const uncommons = pickRandomCards(cardPool.uncommons, 2);
        const rare = hasRare ? pickRandomCards(cardPool.rares, 1) : [];
        currentPack = [...commons, ...uncommons, ...rare];
      } else {
        // Standard 15-card booster: 11 commons, 3 uncommons, 1 rare
        const commons = pickRandomCards(cardPool.commons, 11);
        const uncommons = pickRandomCards(cardPool.uncommons, 3);
        const rare = pickRandomCards(cardPool.rares, 1)[0];
        currentPack = [...commons, ...uncommons, rare];
      }

      packCount++;
      dom.openBtn.disabled = true;
      dom.skipBtn.disabled = false;
      
      dom.alert.textContent = '';
      dom.totalCards.textContent = currentPack.length;
      dom.currentCard.textContent = '0';
      dom.revealedRow.innerHTML = '';
      dom.packContainer.style.display = 'flex';
      dom.starterContainer.style.display = 'none';
      dom.revealContainer.style.display = 'none';
      dom.boosterPack.classList.remove('opening');
    }

    function openStarterDeckPrepare() {
      currentIndex = 0;
      const cardPool = getCardPool();

      // Build starter deck: 2 rares, 13 uncommons, ~22 lands, ~23 commons = 60 cards
      const rares = pickRandomCards(cardPool.rares, 2);
      const uncommons = pickRandomCards(cardPool.uncommons, 13);

      // Pick basic lands - roughly even distribution across colors
      const lands = [];
      const landTypes = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
      for (let i = 0; i < 22; i++) {
        const landType = landTypes[i % 5];
        const variant = Math.floor(Math.random() * 3) + 1;
        const land = cardPool.lands.find(l => l.name === landType && l.variant === variant);
        if (land) lands.push({...land});
      }

      // Pick commons to fill to 60 (60 - 2 rares - 13 uncommons - 22 lands = 23 commons)
      const commons = pickRandomCards(cardPool.commons, 23);

      // Shuffle the deck contents (but reveal rares last for drama!)
      const nonRares = [...commons, ...uncommons, ...lands];
      for (let i = nonRares.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nonRares[i], nonRares[j]] = [nonRares[j], nonRares[i]];
      }

      currentPack = [...nonRares, ...rares];

      starterCount++;
      dom.openBtn.disabled = true;
      dom.skipBtn.disabled = false;
      
      dom.alert.textContent = '';
      dom.totalCards.textContent = currentPack.length;
      dom.currentCard.textContent = '0';
      dom.revealedRow.innerHTML = '';
      dom.packContainer.style.display = 'none';
      dom.starterContainer.style.display = 'flex';
      dom.revealContainer.style.display = 'none';
      dom.starterDeck.classList.remove('opening');
    }

    function openStarterDeck() {
      dom.starterDeck.classList.add('opening');
      setTimeout(() => {
        dom.starterContainer.style.display = 'none';
        dom.revealContainer.style.display = 'flex';
        showCurrentCard();
      }, 800);
    }

    function openBoosterPack() {
      dom.boosterPack.classList.add('opening');
      setTimeout(() => {
        dom.packContainer.style.display = 'none';
        dom.revealContainer.style.display = 'flex';
        showCurrentCard();
      }, 800);
    }
    
    function handleCardClick() {
      if (currentIndex >= currentPack.length) return;
      
      moveToRevealedRow();
      currentIndex++;
      currentIndex < currentPack.length ? showCurrentCard() : finishPack();
    }
    
    function showCurrentCard() {
      const card = currentPack[currentIndex];
      
      dom.mainCardArea.classList.remove('showing-rare', 'showing-power9');
      
      let animType = 'normal';
      if (card.isPowerNine) {
        animType = 'power9';
        dom.mainCardArea.classList.add('showing-power9');
        dom.power9Flash.classList.remove('active');
        void dom.power9Flash.offsetWidth; // Force reflow
        dom.power9Flash.classList.add('active');
      } else if (card.rarity === 'rare') {
        animType = 'rare';
        dom.mainCardArea.classList.add('showing-rare');
      }
      
      dom.mainCardArea.innerHTML = '<div class="rare-glow"></div>';
      dom.mainCardArea.appendChild(createCardElement(card, 'full', animType));
      
      dom.currentCard.textContent = currentIndex + 1;
      
      // Update hint based on remaining cards
      const remaining = currentPack.length - currentIndex - 1;
      let hint = 'Tap for next card';
      if (remaining === 0) {
        hint = 'Tap to finish';
      } else if (productType === 'starter' && remaining <= 2) {
        hint = remaining === 1 ? '1 card left - a rare!' : `${remaining} cards left - the rares!`;
      } else if (productType === 'booster' && remaining === 1) {
        hint = '1 card left - the rare!';
      } else if (remaining <= 3) {
        hint = `${remaining} cards left...`;
      }
      dom.cardHint.textContent = hint;
      
      // Update rarity label
      dom.rarityLabel.style.display = 'inline-block';
      dom.rarityLabel.className = 'rarity-label rarity-' + card.rarity;
      dom.rarityLabel.textContent = card.isPowerNine ? '⭐ POWER 9 ⭐' 
        : card.isDual ? '🌈 DUAL LAND' 
        : card.rarity;
      
      checkSpecial(card);
    }
    
    function moveToRevealedRow() {
      dom.revealedRow.appendChild(createCardElement(currentPack[currentIndex], 'mini', 'none'));
    }
    
    function skipAll() {
      dom.packContainer.style.display = 'none';
      dom.starterContainer.style.display = 'none';
      dom.revealContainer.style.display = 'flex';

      while (currentIndex < currentPack.length) {
        dom.revealedRow.appendChild(createCardElement(currentPack[currentIndex], 'mini', 'none'));
        checkSpecial(currentPack[currentIndex]);
        currentIndex++;
      }
      finishPack();
    }
    
    function finishPack() {
      dom.mainCardArea.classList.remove('showing-rare', 'showing-power9');
      
      // Auto-add cards to collection (excluding basic lands, max 4 copies)
      let cardsAdded = 0;
      let cardsSkipped = 0;
      currentPack.forEach(card => {
        // Skip basic lands
        if (BASIC_LANDS.includes(card.name)) {
          cardsSkipped++;
          return;
        }
        
        const key = card.name + '|' + currentSetCode;
        if (collection[key]) {
          // Already have this card - increment if under 4
          if (collection[key].count < 4) {
            collection[key].count++;
            cardsAdded++;
          }
        } else {
          // New card
          collection[key] = { card: card, count: 1, set: currentSetCode };
          cardsAdded++;
        }
      });
      
      dom.mainCardArea.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;">
        <img src="card-back.webp" alt="MTG Card Back" style="max-height:100%;max-width:100%;border-radius:14px;box-shadow:0 4px 20px rgba(0,0,0,0.4);">
      </div>`;

      currentPack = [];
      updateCollection();
      
      dom.openBtn.disabled = false;
      dom.skipBtn.disabled = true;
      dom.cardHint.textContent = '';
      dom.rarityLabel.style.display = 'none';
    }
    
    function checkSpecial(card) {
      if (card.isPowerNine) {
        dom.alert.textContent = '🎉 POWER NINE: ' + card.name + '! 🎉';
      } else if (card.isDual) {
        dom.alert.textContent = '✨ Dual Land: ' + card.name + '!';
      }
    }
    
    // === BOX OPENING FUNCTIONS ===
    
    function openBoosterBox() {
      const cardPool = getCardPool();
      const packsPerBox = (currentSetCode === 'arn' || currentSetCode === 'atq') ? 60 : 36;
      
      const allCards = [];
      const power9Pulled = [];
      const dualsPulled = [];
      const raresPulled = [];
      const usedRareNames = new Set(); // Track pulled rares to avoid duplicates
      
      // Helper to pick a rare that hasn't been pulled yet
      function pickUniqueRare() {
        const availableRares = cardPool.rares.filter(r => !usedRareNames.has(r.name));
        if (availableRares.length === 0) return null;
        const rare = availableRares[Math.floor(Math.random() * availableRares.length)];
        usedRareNames.add(rare.name);
        return {...rare};
      }
      
      // Generate all packs
      for (let p = 0; p < packsPerBox; p++) {
        let packCards;
        if (currentSetCode === 'arn' || currentSetCode === 'atq') {
          // ARN/ATQ: 8-card packs - 6 commons, 2 uncommons OR 5 commons, 2 uncommons, 1 rare
          const hasRare = Math.random() < 0.4;
          const numCommons = hasRare ? 5 : 6;
          const commons = pickRandomCards(cardPool.commons, numCommons);
          const uncommons = pickRandomCards(cardPool.uncommons, 2);
          const rare = hasRare ? [pickUniqueRare()].filter(Boolean) : [];
          packCards = [...commons, ...uncommons, ...rare];
        } else {
          // Standard 15-card booster: 11 commons, 3 uncommons, 1 rare
          const commons = pickRandomCards(cardPool.commons, 11);
          const uncommons = pickRandomCards(cardPool.uncommons, 3);
          const rare = pickUniqueRare();
          packCards = [...commons, ...uncommons];
          if (rare) packCards.push(rare);
        }
        allCards.push(...packCards);
        
        // Track special cards
        packCards.forEach(card => {
          if (card.isPowerNine) power9Pulled.push(card);
          else if (card.isDual) dualsPulled.push(card);
          else if (card.rarity === 'rare') raresPulled.push(card);
        });
      }
      
      // Add to collection (excluding basic lands, max 4)
      let cardsAdded = 0;
      allCards.forEach(card => {
        if (BASIC_LANDS.includes(card.name)) return;
        
        const key = card.name + '|' + currentSetCode;
        if (collection[key]) {
          if (collection[key].count < 4) {
            collection[key].count++;
            cardsAdded++;
          }
        } else {
          collection[key] = { card: card, count: 1, set: currentSetCode };
          cardsAdded++;
        }
      });
      
      // Show results
      showBoxResults('booster', packsPerBox, allCards.length, cardsAdded, power9Pulled, dualsPulled, raresPulled);
      updateCollection();
    }
    
    function openStarterBox() {
      const cardPool = getCardPool();
      const decksPerBox = 10;
      
      const allCards = [];
      const power9Pulled = [];
      const dualsPulled = [];
      const raresPulled = [];
      const usedRareNames = new Set(); // Track pulled rares to avoid duplicates
      
      // Helper to pick rares that haven't been pulled yet
      function pickUniqueRares(count) {
        const picked = [];
        for (let i = 0; i < count; i++) {
          const availableRares = cardPool.rares.filter(r => !usedRareNames.has(r.name));
          if (availableRares.length === 0) break;
          const rare = availableRares[Math.floor(Math.random() * availableRares.length)];
          usedRareNames.add(rare.name);
          picked.push({...rare});
        }
        return picked;
      }
      
      // Generate all starter decks
      for (let d = 0; d < decksPerBox; d++) {
        // Build starter deck: 2 rares, 13 uncommons, ~22 lands, ~23 commons = 60 cards
        const rares = pickUniqueRares(2);
        const uncommons = pickRandomCards(cardPool.uncommons, 13);
        
        // Pick basic lands
        const lands = [];
        const landTypes = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
        for (let i = 0; i < 22; i++) {
          const landType = landTypes[i % 5];
          const variant = Math.floor(Math.random() * 3) + 1;
          const land = cardPool.lands.find(l => l.name === landType && l.variant === variant);
          if (land) lands.push({...land});
        }
        
        // Fill with commons
        const commons = pickRandomCards(cardPool.commons, 23);
        
        const deckCards = [...commons, ...uncommons, ...lands, ...rares];
        allCards.push(...deckCards);
        
        // Track special cards
        deckCards.forEach(card => {
          if (card.isPowerNine) power9Pulled.push(card);
          else if (card.isDual) dualsPulled.push(card);
          else if (card.rarity === 'rare') raresPulled.push(card);
        });
      }
      
      // Add to collection (excluding basic lands, max 4)
      let cardsAdded = 0;
      allCards.forEach(card => {
        if (BASIC_LANDS.includes(card.name)) return;
        
        const key = card.name + '|' + currentSetCode;
        if (collection[key]) {
          if (collection[key].count < 4) {
            collection[key].count++;
            cardsAdded++;
          }
        } else {
          collection[key] = { card: card, count: 1, set: currentSetCode };
          cardsAdded++;
        }
      });
      
      // Show results
      showBoxResults('starter', decksPerBox, allCards.length, cardsAdded, power9Pulled, dualsPulled, raresPulled);
      updateCollection();
    }
    
    function showBoxResults(type, productCount, totalCards, cardsAdded, power9, duals, rares) {
      const isBooster = type === 'booster';
      const productName = isBooster ? 'Booster Box' : 'Starter Box';
      const unitName = isBooster ? 'packs' : 'decks';
      
      dom.boxResultsTitle.textContent = `${productName} Opened!`;
      
      // Stats
      dom.boxStats.innerHTML = `
        <div class="box-stat">
          <div class="box-stat-value">${productCount}</div>
          <div class="box-stat-label">${unitName}</div>
        </div>
        <div class="box-stat">
          <div class="box-stat-value">${totalCards}</div>
          <div class="box-stat-label">total cards</div>
        </div>
        <div class="box-stat">
          <div class="box-stat-value">${cardsAdded}</div>
          <div class="box-stat-label">added to collection</div>
        </div>
        <div class="box-stat">
          <div class="box-stat-value">${rares.length}</div>
          <div class="box-stat-label">rares</div>
        </div>
      `;
      
      // Power 9
      if (power9.length > 0) {
        dom.boxPower9Section.style.display = 'block';
        dom.boxPower9Area.innerHTML = '';
        power9.forEach(card => dom.boxPower9Area.appendChild(createCardElement(card, 'mini', 'none')));
        dom.alert.textContent = '🎉 POWER NINE PULLED! 🎉';
      } else {
        dom.boxPower9Section.style.display = 'none';
      }
      
      // Duals
      if (duals.length > 0) {
        dom.boxDualSection.style.display = 'block';
        dom.boxDualArea.innerHTML = '';
        duals.forEach(card => dom.boxDualArea.appendChild(createCardElement(card, 'mini', 'none')));
      } else {
        dom.boxDualSection.style.display = 'none';
      }
      
      // Rares
      dom.boxRaresArea.innerHTML = '';
      rares.forEach(card => dom.boxRaresArea.appendChild(createCardElement(card, 'mini', 'none')));
      
      // Show container
      dom.boxResultsContainer.style.display = 'block';
      dom.packContainer.style.display = 'none';
      dom.starterContainer.style.display = 'none';
      dom.revealContainer.style.display = 'none';
    }
    
    function closeBoxResults() {
      dom.boxResultsContainer.style.display = 'none';
      dom.alert.textContent = '';
    }
    window.closeBoxResults = closeBoxResults;
    
    // 4th Edition card color mapping
    const FED_COLOR_MAP = {
      'Abomination': 'black',
      'Air Elemental': 'blue',
      'Alabaster Potion': 'white',
      'Aladdin\'s Lamp': 'colorless',
      'Aladdin\'s Ring': 'colorless',
      'Ali Baba': 'red',
      'Amrou Kithkin': 'white',
      'Amulet of Kroog': 'colorless',
      'Angry Mob': 'white',
      'Animate Artifact': 'blue',
      'Animate Dead': 'black',
      'Animate Wall': 'white',
      'Ankh of Mishra': 'colorless',
      'Apprentice Wizard': 'blue',
      'Armageddon': 'white',
      'Armageddon Clock': 'colorless',
      'Ashes to Ashes': 'black',
      'Ashnod\'s Battle Gear': 'colorless',
      'Aspect of Wolf': 'green',
      'Backfire': 'blue',
      'Bad Moon': 'black',
      'Balance': 'white',
      'Ball Lightning': 'red',
      'Battering Ram': 'colorless',
      'Benalish Hero': 'white',
      'Bird Maiden': 'red',
      'Birds of Paradise': 'green',
      'Black Knight': 'black',
      'Black Mana Battery': 'colorless',
      'Black Vise': 'colorless',
      'Black Ward': 'black',
      'Blessing': 'white',
      'Blight': 'black',
      'Blood Lust': 'red',
      'Blue Elemental Blast': 'blue',
      'Blue Mana Battery': 'colorless',
      'Blue Ward': 'blue',
      'Bog Imp': 'black',
      'Bog Wraith': 'black',
      'Boomerang': 'blue',
      'Bottle of Suleiman': 'colorless',
      'Brainwash': 'white',
      'Brass Man': 'colorless',
      'Bronze Tablet': 'colorless',
      'Brothers of Fire': 'red',
      'Burrowing': 'green',
      'Carnivorous Plant': 'green',
      'Carrion Ants': 'black',
      'Castle': 'white',
      'Cave People': 'red',
      'Celestial Prism': 'colorless',
      'Channel': 'green',
      'Chaoslace': 'blue',
      'Circle of Protection: Artifacts': 'white',
      'Circle of Protection: Black': 'white',
      'Circle of Protection: Blue': 'white',
      'Circle of Protection: Green': 'white',
      'Circle of Protection: Red': 'white',
      'Circle of Protection: White': 'white',
      'Clay Statue': 'colorless',
      'Clockwork Avian': 'blue',
      'Clockwork Beast': 'colorless',
      'Cockatrice': 'green',
      'Colossus of Sardia': 'colorless',
      'Conservator': 'colorless',
      'Control Magic': 'blue',
      'Conversion': 'white',
      'Coral Helm': 'blue',
      'Cosmic Horror': 'black',
      'Counterspell': 'blue',
      'Craw Wurm': 'green',
      'Creature Bond': 'blue',
      'Crimson Manticore': 'red',
      'Crumble': 'green',
      'Crusade': 'white',
      'Crystal Rod': 'colorless',
      'Cursed Land': 'black',
      'Cursed Rack': 'colorless',
      'Cyclopean Mummy': 'black',
      'Dancing Scimitar': 'colorless',
      'Dark Ritual': 'black',
      'Death Ward': 'white',
      'Deathgrip': 'black',
      'Deathlace': 'black',
      'Desert Twister': 'green',
      'Detonate': 'red',
      'Diabolic Machine': 'colorless',
      'Dingus Egg': 'colorless',
      'Disenchant': 'white',
      'Disintegrate': 'red',
      'Disrupting Scepter': 'colorless',
      'Divine Transformation': 'white',
      'Dragon Engine': 'colorless',
      'Dragon Whelp': 'red',
      'Drain Life': 'black',
      'Drain Power': 'blue',
      'Drudge Skeletons': 'black',
      'Durkwood Boars': 'green',
      'Dwarven Warriors': 'red',
      'Earth Elemental': 'red',
      'Earthquake': 'red',
      'Ebony Horse': 'colorless',
      'El-Hajjâj': 'black',
      'Elder Land Wurm': 'green',
      'Elven Riders': 'green',
      'Elvish Archers': 'green',
      'Energy Flux': 'blue',
      'Energy Tap': 'blue',
      'Erg Raiders': 'black',
      'Erosion': 'blue',
      'Eternal Warrior': 'red',
      'Evil Presence': 'black',
      'Eye for an Eye': 'white',
      'Fear': 'black',
      'Feedback': 'blue',
      'Fellwar Stone': 'colorless',
      'Fire Elemental': 'red',
      'Fireball': 'red',
      'Firebreathing': 'red',
      'Fissure': 'red',
      'Flashfires': 'red',
      'Flight': 'blue',
      'Flood': 'blue',
      'Flying Carpet': 'colorless',
      'Fog': 'green',
      'Force of Nature': 'green',
      'Forest': 'land',
      'Fortified Area': 'white',
      'Frozen Shade': 'black',
      'Fungusaur': 'green',
      'Gaea\'s Liege': 'green',
      'Gaseous Form': 'blue',
      'Ghost Ship': 'blue',
      'Giant Growth': 'green',
      'Giant Spider': 'green',
      'Giant Strength': 'red',
      'Giant Tortoise': 'blue',
      'Glasses of Urza': 'colorless',
      'Gloom': 'black',
      'Goblin Balloon Brigade': 'red',
      'Goblin King': 'red',
      'Goblin Rock Sled': 'red',
      'Grapeshot Catapult': 'colorless',
      'Gray Ogre': 'red',
      'Greed': 'black',
      'Green Mana Battery': 'colorless',
      'Grizzly Bears': 'green',
      'Healing Salve': 'white',
      'Helm of Chatzuk': 'colorless',
      'Hill Giant': 'red',
      'Holy Armor': 'white',
      'Holy Strength': 'white',
      'Howl from Beyond': 'black',
      'Howling Mine': 'colorless',
      'Hurkyl\'s Recall': 'blue',
      'Hurloon Minotaur': 'red',
      'Hurr Jackal': 'red',
      'Hurricane': 'green',
      'Hypnotic Specter': 'black',
      'Immolation': 'red',
      'Inferno': 'red',
      'Instill Energy': 'green',
      'Iron Star': 'colorless',
      'Ironclaw Orcs': 'red',
      'Ironroot Treefolk': 'green',
      'Island': 'land',
      'Island Fish Jasconius': 'blue',
      'Island Sanctuary': 'white',
      'Ivory Cup': 'colorless',
      'Ivory Tower': 'colorless',
      'Jade Monolith': 'colorless',
      'Jandor\'s Saddlebags': 'colorless',
      'Jayemdae Tome': 'colorless',
      'Jump': 'blue',
      'Junún Efreet': 'black',
      'Karma': 'white',
      'Keldon Warlord': 'red',
      'Killer Bees': 'green',
      'Kismet': 'white',
      'Kormus Bell': 'colorless',
      'Land Leeches': 'green',
      'Land Tax': 'white',
      'Leviathan': 'blue',
      'Ley Druid': 'green',
      'Library of Leng': 'colorless',
      'Lifeforce': 'green',
      'Lifelace': 'red',
      'Lifetap': 'green',
      'Lightning Bolt': 'red',
      'Living Artifact': 'colorless',
      'Living Lands': 'green',
      'Llanowar Elves': 'green',
      'Lord of Atlantis': 'blue',
      'Lord of the Pit': 'black',
      'Lost Soul': 'black',
      'Lure': 'green',
      'Magical Hack': 'blue',
      'Magnetic Mountain': 'red',
      'Mahamoti Djinn': 'blue',
      'Mana Clash': 'red',
      'Mana Flare': 'red',
      'Mana Short': 'blue',
      'Mana Vault': 'colorless',
      'Manabarbs': 'red',
      'Marsh Gas': 'black',
      'Marsh Viper': 'black',
      'Meekstone': 'colorless',
      'Merfolk of the Pearl Trident': 'blue',
      'Mesa Pegasus': 'white',
      'Millstone': 'colorless',
      'Mind Bomb': 'blue',
      'Mind Twist': 'black',
      'Mishra\'s Factory': 'colorless',
      'Mishra\'s War Machine': 'colorless',
      'Mons\'s Goblin Raiders': 'red',
      'Morale': 'white',
      'Mountain': 'land',
      'Murk Dwellers': 'black',
      'Nafs Asp': 'black',
      'Nether Shadow': 'black',
      'Nevinyrral\'s Disk': 'colorless',
      'Nightmare': 'black',
      'Northern Paladin': 'white',
      'Oasis': 'colorless',
      'Obsianus Golem': 'colorless',
      'Onulet': 'colorless',
      'Orcish Artillery': 'red',
      'Orcish Oriflamme': 'red',
      'Ornithopter': 'colorless',
      'Osai Vultures': 'white',
      'Paralyze': 'black',
      'Pearled Unicorn': 'white',
      'Personal Incarnation': 'white',
      'Pestilence': 'black',
      'Phantasmal Forces': 'blue',
      'Phantasmal Terrain': 'blue',
      'Phantom Monster': 'blue',
      'Piety': 'white',
      'Pikemen': 'white',
      'Pirate Ship': 'blue',
      'Pit Scorpion': 'black',
      'Plague Rats': 'black',
      'Plains': 'land',
      'Power Leak': 'blue',
      'Power Sink': 'blue',
      'Power Surge': 'red',
      'Pradesh Gypsies': 'green',
      'Primal Clay': 'colorless',
      'Prodigal Sorcerer': 'blue',
      'Psionic Entity': 'blue',
      'Psychic Venom': 'blue',
      'Purelace': 'white',
      'Pyrotechnics': 'red',
      'Radjan Spirit': 'green',
      'Rag Man': 'black',
      'Raise Dead': 'black',
      'Rebirth': 'green',
      'Red Elemental Blast': 'red',
      'Red Mana Battery': 'colorless',
      'Red Ward': 'red',
      'Regeneration': 'green',
      'Relic Bind': 'colorless',
      'Reverse Damage': 'white',
      'Righteousness': 'white',
      'Rod of Ruin': 'colorless',
      'Royal Assassin': 'black',
      'Samite Healer': 'white',
      'Sandstorm': 'red',
      'Savannah Lions': 'white',
      'Scathe Zombies': 'black',
      'Scavenging Ghoul': 'black',
      'Scryb Sprites': 'green',
      'Sea Serpent': 'blue',
      'Seeker': 'white',
      'Segovian Leviathan': 'blue',
      'Sengir Vampire': 'black',
      'Serra Angel': 'white',
      'Shanodin Dryads': 'green',
      'Shapeshifter': 'colorless',
      'Shatter': 'red',
      'Shivan Dragon': 'red',
      'Simulacrum': 'black',
      'Sindbad': 'blue',
      'Siren\'s Call': 'blue',
      'Sisters of the Flame': 'red',
      'Sleight of Mind': 'blue',
      'Smoke': 'red',
      'Sorceress Queen': 'black',
      'Soul Net': 'colorless',
      'Spell Blast': 'blue',
      'Spirit Link': 'white',
      'Spirit Shackle': 'black',
      'Stasis': 'blue',
      'Steal Artifact': 'blue',
      'Stone Giant': 'red',
      'Stone Rain': 'red',
      'Stream of Life': 'green',
      'Strip Mine': 'colorless',
      'Sunglasses of Urza': 'colorless',
      'Sunken City': 'blue',
      'Swamp': 'land',
      'Swords to Plowshares': 'white',
      'Sylvan Library': 'green',
      'Tawnos\'s Wand': 'colorless',
      'Tawnos\'s Weaponry': 'colorless',
      'Tempest Efreet': 'red',
      'Terror': 'black',
      'Tetravus': 'colorless',
      'The Brute': 'red',
      'The Hive': 'colorless',
      'The Rack': 'colorless',
      'Thicket Basilisk': 'green',
      'Thoughtlace': 'blue',
      'Throne of Bone': 'colorless',
      'Timber Wolves': 'green',
      'Time Elemental': 'blue',
      'Titania\'s Song': 'green',
      'Tranquility': 'green',
      'Triskelion': 'colorless',
      'Tsunami': 'green',
      'Tundra Wolves': 'white',
      'Tunnel': 'red',
      'Twiddle': 'blue',
      'Uncle Istvan': 'black',
      'Unholy Strength': 'black',
      'Unstable Mutation': 'blue',
      'Unsummon': 'blue',
      'Untamed Wilds': 'green',
      'Urza\'s Avenger': 'colorless',
      'Uthden Troll': 'red',
      'Vampire Bats': 'black',
      'Venom': 'black',
      'Verduran Enchantress': 'green',
      'Visions': 'green',
      'Volcanic Eruption': 'blue',
      'Wall of Air': 'blue',
      'Wall of Bone': 'black',
      'Wall of Brambles': 'green',
      'Wall of Dust': 'red',
      'Wall of Fire': 'red',
      'Wall of Ice': 'green',
      'Wall of Spears': 'colorless',
      'Wall of Stone': 'red',
      'Wall of Swords': 'white',
      'Wall of Water': 'blue',
      'Wall of Wood': 'green',
      'Wanderlust': 'green',
      'War Mammoth': 'green',
      'Warp Artifact': 'colorless',
      'Water Elemental': 'blue',
      'Weakness': 'black',
      'Web': 'green',
      'Whirling Dervish': 'green',
      'White Knight': 'white',
      'White Mana Battery': 'colorless',
      'White Ward': 'white',
      'Wild Growth': 'green',
      'Will-o\'-the-Wisp': 'black',
      'Winds of Change': 'red',
      'Winter Blast': 'green',
      'Winter Orb': 'colorless',
      'Wooden Sphere': 'colorless',
      'Word of Binding': 'black',
      'Wrath of God': 'white',
      'Xenic Poltergeist': 'colorless',
      'Yotian Soldier': 'colorless',
      'Zephyr Falcon': 'blue',
      'Zombie Master': 'black',
    };
    
    // Helper to determine card color (4th Edition cards lack color data)
    function getCardColor(card) {
      // If card already has color, use it
      if (card.color) return card.color.toLowerCase();
      
      // Check 4th Edition color map
      if (FED_COLOR_MAP[card.name]) return FED_COLOR_MAP[card.name];
      
      // Look up in Beta cards
      const allBetaCards = [...BETA_CARDS.commons, ...BETA_CARDS.uncommons, ...BETA_CARDS.rares, ...BETA_CARDS.lands];
      const betaMatch = allBetaCards.find(c => c.name === card.name);
      if (betaMatch && betaMatch.color) return betaMatch.color.toLowerCase();
      
      return 'colorless';
    }
    
    function updateCollection() {
      const entries = Object.values(collection);
      
      // Count unique cards
      dom.collCount.textContent = entries.length;
      
      if (entries.length === 0) {
        // Show empty message, hide all sections
        dom.emptyCollection.style.display = 'block';
        dom.power9Section.style.display = 'none';
        dom.dualSection.style.display = 'none';
        dom.whiteSection.style.display = 'none';
        dom.blueSection.style.display = 'none';
        dom.blackSection.style.display = 'none';
        dom.redSection.style.display = 'none';
        dom.greenSection.style.display = 'none';
        dom.colorlessSection.style.display = 'none';
        return;
      }
      
      dom.emptyCollection.style.display = 'none';
      
      // Categorize cards
      const power9Cards = [];
      const dualCards = [];
      const whiteCards = [];
      const blueCards = [];
      const blackCards = [];
      const redCards = [];
      const greenCards = [];
      const colorlessCards = [];
      
      entries.forEach(entry => {
        const card = entry.card;
        if (card.isPowerNine) {
          power9Cards.push(entry);
        } else if (card.isDual) {
          dualCards.push(entry);
        } else {
          const color = getCardColor(card);
          switch (color) {
            case 'white': whiteCards.push(entry); break;
            case 'blue': blueCards.push(entry); break;
            case 'black': blackCards.push(entry); break;
            case 'red': redCards.push(entry); break;
            case 'green': greenCards.push(entry); break;
            case 'land': break; // Skip lands (shouldn't be in collection anyway)
            default: colorlessCards.push(entry); break;
          }
        }
      });
      
      // Helper to create card element with count badge
      function createCardWithCount(entry) {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-with-count';
        wrapper.appendChild(createCardElement(entry.card, 'mini', 'none'));
        
        if (entry.count > 1) {
          const badge = document.createElement('span');
          badge.className = 'card-count-badge';
          badge.textContent = entry.count;
          wrapper.appendChild(badge);
        }
        return wrapper;
      }
      
      // Helper to populate a section
      function populateSection(sectionEl, areaEl, cards) {
        if (cards.length > 0) {
          sectionEl.style.display = 'block';
          areaEl.innerHTML = '';
          // Sort by name
          cards.sort((a, b) => a.card.name.localeCompare(b.card.name));
          cards.forEach(entry => areaEl.appendChild(createCardWithCount(entry)));
        } else {
          sectionEl.style.display = 'none';
        }
      }
      
      // Populate each section
      populateSection(dom.power9Section, dom.power9Area, power9Cards);
      populateSection(dom.dualSection, dom.dualArea, dualCards);
      populateSection(dom.whiteSection, dom.whiteArea, whiteCards);
      populateSection(dom.blueSection, dom.blueArea, blueCards);
      populateSection(dom.blackSection, dom.blackArea, blackCards);
      populateSection(dom.redSection, dom.redArea, redCards);
      populateSection(dom.greenSection, dom.greenArea, greenCards);
      populateSection(dom.colorlessSection, dom.colorlessArea, colorlessCards);
    }
