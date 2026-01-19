# MTG Pack Rip Simulator

## Overview
A web-based Magic: The Gathering pack opening simulator supporting early MTG sets. Users can open booster packs, booster boxes, starter decks, or starter boxes and build a collection organized by color.

## Supported Sets
- **Alpha** (1993) - 295 cards, boosters + starters
- **Beta** (1993) - 302 cards, boosters + starters
- **Unlimited** (1993) - 302 cards, boosters + starters
- **Arabian Nights** (1993) - 78 cards, boosters only (8-card packs)
- **Legends** (1994) - 310 cards, boosters only
- **4th Edition** (1995) - 378 cards, boosters + starters, 5 random pack designs

## Files
```
├── index.html      - Main HTML structure
├── styles.css      - All styling, animations, responsive design
├── game.js         (~4MB) - Game logic, card data, embedded pack images
└── MTGproject.md   - This file
```

## Tech Stack
- Vanilla HTML/CSS/JS (no frameworks)
- Scryfall API for card images (`https://api.scryfall.com/cards/named?exact={name}&set={setCode}`)
- Base64 embedded images for pack/deck box art

## Product Types
| Product | Contents | Reveal Style |
|---------|----------|--------------|
| **Booster Pack** | 15 cards (8 for ARN) | Card-by-card |
| **Booster Box** | 36 packs (60 for ARN) | Instant summary |
| **Starter Deck** | 60 cards | Card-by-card |
| **Starter Box** | 10 decks (600 cards) | Instant summary |

## Key Components

### game.js Structure
- **SETS_CONFIG**: Set metadata (name, fullName, code, year, releaseDate, cardCount, hasStarter, boosterSize)
- **PACK_IMAGES**: Base64 encoded pack art (4ed is array of 5 images for randomization)
- **BETA_CARDS**: Full Beta card database with rarities
- **ARN_CARDS**: Arabian Nights cards
- **LEG_CARDS**: Legends cards
- **FED_CARDS**: 4th Edition cards (378 cards)
- **ALPHA_CARDS/UNLIMITED_CARDS**: Derived from Beta (Alpha missing 2 cards)
- **BASIC_LANDS**: `['Plains', 'Island', 'Swamp', 'Mountain', 'Forest']` - excluded from collection

- **Key Functions**:
  - `selectSet(setCode)` - Changes current set, updates header info, resets collection
  - `selectProduct(type)` - Switches between booster/booster-box/starter/starter-box
  - `updatePackImage(setCode)` - Swaps pack box art (handles arrays for random selection)
  - `getCardPool()` - Returns card data for current set
  - `createCardElement(card, size, animationType)` - Creates card DOM elements
  - `showCardEnlarged(card)` - Shows clicked mini card in main display
  - `openPack()` - Generates booster pack for current set
  - `openBoosterBox()` - Opens 36 packs (60 for ARN), no duplicate rares
  - `openStarterDeckPrepare()` - Generates 60-card starter deck
  - `openStarterBox()` - Opens 10 starter decks, no duplicate rares
  - `showBoxResults()` - Displays box opening summary with highlights
  - `updateCollection()` - Renders collection organized by category/color

- **Config**: `USE_CARD_ART = true` - Toggle Scryfall images vs text cards
- **State**:
  - `currentSetCode = 'leb'` - Current set (defaults to Beta)
  - `collection = {}` - Object tracking cards by name|set with counts

### styles.css Structure
- Dark theme with gold accents (#d4af37)
- Set selector buttons
- Product selector (4 options)
- Card reveal animations (normal, rare, power9)
- Mini card hover effect (scales to 2.8x)
- Box results display with stats
- Collection sections with color-themed headers
- Card count badges for duplicates
- Responsive layout

### index.html Structure
- Header with title "MTG PACK RIP SIMULATOR"
- Dynamic subtitle showing set name, release date, and card count
- Set selector (Alpha/Beta/Unlimited/Arabian Nights/Legends/4th Edition)
- Product selector (Booster Pack/Booster Box/Starter Deck/Starter Box)
- Pack/Starter containers with embedded box images
- Main card reveal area
- Revealed cards row (clickable mini cards)
- Box results container (for box openings)
- Collection section organized by:
  - Power Nine (gold theme)
  - Dual Lands (purple theme)
  - White / Blue / Black / Red / Green / Artifacts

## Features
- Switch between 6 different MTG sets
- 4 product types: single packs/decks or full boxes
- Dynamic header updates with set info when switching sets
- Set-specific pack box art (embedded base64, swaps on set change)
- 4th Edition has 5 different pack designs that randomize each time
- Click mini cards to view full-size in main area
- Hover mini cards for 2.8x zoom preview
- Special animations for rares, Power Nine, dual lands
- **Auto-collect**: Cards automatically added after reveal (no Keep button)
- **Smart collection**:
  - Basic lands excluded
  - Max 4 copies per card
  - Count badge shows (2), (3), (4) for duplicates
  - Organized by Power Nine → Dual Lands → Colors
- **Box opening**:
  - Instant results with stats summary
  - Highlights Power Nine and Dual Land pulls
  - Shows all rares as hoverable mini cards
  - No duplicate rares within a single box

## Card Distribution
- **Standard Booster (Alpha/Beta/Unlimited/Legends/4th Edition)**: 11 commons, 3 uncommons, 1 rare
- **Arabian Nights Booster**: 6 commons, 1-2 uncommons, ~30% chance of rare
- **Starter Deck (60 cards)**: 23 commons, 13 uncommons, 2 rares, 22 lands
- **Booster Box**: 36 packs (60 for Arabian Nights), unique rares only
- **Starter Box**: 10 decks, unique rares only

## Scryfall Set Codes
- `lea` - Alpha
- `leb` - Beta
- `2ed` - Unlimited
- `arn` - Arabian Nights
- `leg` - Legends
- `4ed` - 4th Edition
