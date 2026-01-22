# MTG Pack Rip Simulator

A web-based Magic: The Gathering pack opening simulator for early MTG sets. Open booster packs, booster boxes, starter decks, or starter boxes and build your collection.

**Live Demo:** https://mtg-pack-simulator.vercel.app

## Supported Sets

| Set | Year | Cards | Products |
|-----|------|-------|----------|
| Alpha | 1993 | 295 | Boosters + Starters |
| Beta | 1993 | 302 | Boosters + Starters |
| Unlimited | 1993 | 302 | Boosters + Starters |
| Arabian Nights | 1993 | 78 | Boosters (8-card packs) |
| Legends | 1994 | 310 | Boosters |
| 4th Edition | 1995 | 378 | Boosters + Starters |

## Features

- **Multiple Product Types**
  - Booster Pack: 15 cards revealed one-by-one
  - Booster Box: 36 packs (60 for Arabian Nights) with instant summary
  - Starter Deck: 60 cards revealed one-by-one
  - Starter Box: 10 decks with instant summary

- **Card Collection System**
  - Auto-collects cards after reveal
  - Max 4 copies per card (like real MTG)
  - Organized by Power Nine, Dual Lands, then colors
  - Count badges show duplicates

- **Visual Experience**
  - High-resolution card images from Scryfall API
  - Special animations for rares, Power Nine, and dual lands
  - Hover to zoom cards 2.8x
  - Click mini cards to view full-size
  - Set-specific pack art (4th Edition has 5 random designs)

- **Accurate Distribution**
  - Standard Booster: 11 commons, 3 uncommons, 1 rare
  - Arabian Nights: 6 commons, 1-2 uncommons, ~30% rare chance
  - Starter Deck: 23 commons, 13 uncommons, 2 rares, 22 lands
  - No duplicate rares within a single box opening

## Pokemon Mode

Switch to Pokemon mode to open classic 1st Edition Base Set packs!

### Supported Set

| Set | Year | Cards |
|-----|------|-------|
| 1st Edition Base Set | 1999 | 102 |

### Products

- **Booster Pack**: 11 cards (5 commons, 3 uncommons, 1 energy, 1 trainer, 1 rare)
- **Booster Box**: 36 packs (396 cards total)

### Features

- ~1 in 3 chance of pulling a holo rare
- Special animations for chase cards (Charizard, Blastoise, Venusaur, Mewtwo)
- Collection organized by Pokemon type (Fire, Water, Grass, Lightning, etc.)
- Energy cards excluded from collection tracking

## Tech Stack

- Vanilla HTML/CSS/JavaScript (no frameworks)
- Scryfall API for card images
- Base64 embedded pack art

## Project Structure

```
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
└── game.js         # Game logic and card data (~4MB with embedded images)
```

### Key Functions (game.js)

| Function | Purpose |
|----------|---------|
| `selectSet(setCode)` | Changes current set, updates header, resets collection |
| `openPack()` | Generates booster pack for current set |
| `openBoosterBox()` | Opens 36 packs (60 for ARN), no duplicate rares |
| `openStarterDeckPrepare()` | Generates 60-card starter deck |
| `openStarterBox()` | Opens 10 starter decks, no duplicate rares |
| `updateCollection()` | Renders collection organized by category/color |

### Scryfall Set Codes

| Set | Code |
|-----|------|
| Alpha | `lea` |
| Beta | `leb` |
| Unlimited | `2ed` |
| Arabian Nights | `arn` |
| Legends | `leg` |
| 4th Edition | `4ed` |

## Local Development

Simply open `index.html` in a browser, or serve with any static file server:

```bash
npx serve .
```

## Credits

- Card data and images: [Scryfall](https://scryfall.com/)
- Magic: The Gathering is a trademark of Wizards of the Coast LLC
