// 1986-87 Fleer Basketball - Complete 132-card set + 11 stickers
// Prices are raw/ungraded market values (Jan 2026) - rounded to whole dollars
// Sources: SportsCardsPro, PSA Price Guide
// Pack composition: 12 cards + 1 sticker

const FLEER_1986 = {
  name: '1986-87 Fleer Basketball',
  year: 1986,
  packSize: 12,

  // Chase card
  chaseCards: ['Michael Jordan'],

  // Premium rookies (HOF players)
  premiumRookies: [
    'Charles Barkley', 'Patrick Ewing', 'Akeem Olajuwon',
    'Karl Malone', 'Clyde Drexler', 'Chris Mullin',
    'Isiah Thomas', 'Dominique Wilkins', 'Joe Dumars'
  ],

  // Complete 132-card set - prices from SportsCardsPro (raw/ungraded)
  cards: [
    { number: 1, name: 'Kareem Abdul-Jabbar', team: 'Lakers', price: 30 },
    { number: 2, name: 'Alvan Adams', team: 'Suns', price: 6 },
    { number: 3, name: 'Mark Aguirre', team: 'Mavericks', price: 9 },
    { number: 4, name: 'Danny Ainge', team: 'Celtics', price: 15 },
    { number: 5, name: 'John Bagley', team: 'Cavaliers', price: 5 },
    { number: 6, name: 'Thurl Bailey', team: 'Jazz', price: 5 },
    { number: 7, name: 'Charles Barkley', team: '76ers', rookie: true, price: 130 },
    { number: 8, name: 'Benoit Benjamin', team: 'Clippers', rookie: true, price: 5 },
    { number: 9, name: 'Larry Bird', team: 'Celtics', price: 82 },
    { number: 10, name: 'Otis Birdsong', team: 'Nets', price: 5 },
    { number: 11, name: 'Rolando Blackman', team: 'Mavericks', price: 7 },
    { number: 12, name: 'Manute Bol', team: 'Bullets', rookie: true, price: 14 },
    { number: 13, name: 'Sam Bowie', team: 'Trail Blazers', price: 8 },
    { number: 14, name: 'Joe Barry Carroll', team: 'Warriors', price: 5 },
    { number: 15, name: 'Tom Chambers', team: 'Sonics', price: 7 },
    { number: 16, name: 'Maurice Cheeks', team: '76ers', price: 8 },
    { number: 17, name: 'Michael Cooper', team: 'Lakers', price: 10 },
    { number: 18, name: 'Wayne Cooper', team: 'Nuggets', price: 5 },
    { number: 19, name: 'Pat Cummings', team: 'Knicks', price: 5 },
    { number: 20, name: 'Terry Cummings', team: 'Bucks', price: 6 },
    { number: 21, name: 'Adrian Dantley', team: 'Jazz', price: 10 },
    { number: 22, name: 'Brad Davis', team: 'Mavericks', price: 5 },
    { number: 23, name: 'Walter Davis', team: 'Suns', price: 6 },
    { number: 24, name: 'Darryl Dawkins', team: 'Nets', price: 6 },
    { number: 25, name: 'Larry Drew', team: 'Kings', price: 5 },
    { number: 26, name: 'Clyde Drexler', team: 'Trail Blazers', rookie: true, price: 47 },
    { number: 27, name: 'Joe Dumars', team: 'Pistons', rookie: true, price: 25 },
    { number: 28, name: 'Mark Eaton', team: 'Jazz', price: 6 },
    { number: 29, name: 'James Edwards', team: 'Suns', price: 5 },
    { number: 30, name: 'Alex English', team: 'Nuggets', price: 6 },
    { number: 31, name: 'Julius Erving', team: '76ers', price: 41 },
    { number: 32, name: 'Patrick Ewing', team: 'Knicks', rookie: true, price: 53 },
    { number: 33, name: 'Vern Fleming', team: 'Pacers', rookie: true, price: 5 },
    { number: 34, name: 'Sleepy Floyd', team: 'Warriors', price: 5 },
    { number: 35, name: 'World B. Free', team: 'Cavaliers', price: 7 },
    { number: 36, name: 'George Gervin', team: 'Bulls', price: 8 },
    { number: 37, name: 'Artis Gilmore', team: 'Spurs', price: 8 },
    { number: 38, name: 'Mike Gminski', team: 'Nets', price: 5 },
    { number: 39, name: 'Rickey Green', team: 'Jazz', price: 5 },
    { number: 40, name: 'Sidney Green', team: 'Bulls', price: 5 },
    { number: 41, name: 'David Greenwood', team: 'Spurs', price: 5 },
    { number: 42, name: 'Darrell Griffith', team: 'Jazz', price: 5 },
    { number: 43, name: 'Bill Hanzlik', team: 'Nuggets', price: 5 },
    { number: 44, name: 'Derek Harper', team: 'Mavericks', rookie: true, price: 8 },
    { number: 45, name: 'Gerald Henderson', team: 'Sonics', price: 5 },
    { number: 46, name: 'Roy Hinson', team: 'Cavaliers', price: 5 },
    { number: 47, name: 'Craig Hodges', team: 'Bucks', price: 5 },
    { number: 48, name: 'Phil Hubbard', team: 'Cavaliers', price: 5 },
    { number: 49, name: 'Jay Humphries', team: 'Suns', rookie: true, price: 5 },
    { number: 50, name: 'Dennis Johnson', team: 'Celtics', price: 10 },
    { number: 51, name: 'Eddie Johnson', team: 'Kings', price: 5 },
    { number: 52, name: 'Frank Johnson', team: 'Bullets', price: 5 },
    { number: 53, name: 'Magic Johnson', team: 'Lakers', price: 73 },
    { number: 54, name: 'Marques Johnson', team: 'Clippers', price: 6 },
    { number: 55, name: 'Steve Johnson', team: 'Trail Blazers', price: 5 },
    { number: 56, name: 'Vinnie Johnson', team: 'Pistons', price: 6 },
    { number: 57, name: 'Michael Jordan', team: 'Bulls', rookie: true, price: 3344 },
    { number: 58, name: 'Clark Kellogg', team: 'Pacers', price: 5 },
    { number: 59, name: 'Albert King', team: 'Nets', price: 5 },
    { number: 60, name: 'Bernard King', team: 'Knicks', price: 8 },
    { number: 61, name: 'Bill Laimbeer', team: 'Pistons', price: 10 },
    { number: 62, name: 'Allen Leavell', team: 'Rockets', price: 5 },
    { number: 63, name: 'Lafayette Lever', team: 'Nuggets', price: 5 },
    { number: 64, name: 'Alton Lister', team: 'Bucks', price: 5 },
    { number: 65, name: 'Lewis Lloyd', team: 'Rockets', price: 5 },
    { number: 66, name: 'Maurice Lucas', team: 'Lakers', price: 5 },
    { number: 67, name: 'Jeff Malone', team: 'Bullets', price: 9 },
    { number: 68, name: 'Karl Malone', team: 'Jazz', rookie: true, price: 50 },
    { number: 69, name: 'Moses Malone', team: '76ers', price: 11 },
    { number: 70, name: 'Cedric Maxwell', team: 'Clippers', price: 5 },
    { number: 71, name: 'Rodney McCray', team: 'Rockets', price: 5 },
    { number: 72, name: 'Xavier McDaniel', team: 'Sonics', rookie: true, price: 12 },
    { number: 73, name: 'Kevin McHale', team: 'Celtics', price: 15 },
    { number: 74, name: 'Mike Mitchell', team: 'Spurs', price: 5 },
    { number: 75, name: 'Sidney Moncrief', team: 'Bucks', price: 8 },
    { number: 76, name: 'Johnny Moore', team: 'Spurs', price: 8 },
    { number: 77, name: 'Chris Mullin', team: 'Warriors', rookie: true, price: 39 },
    { number: 78, name: 'Larry Nance', team: 'Suns', price: 13 },
    { number: 79, name: 'Calvin Natt', team: 'Nuggets', price: 5 },
    { number: 80, name: 'Norm Nixon', team: 'Clippers', price: 5 },
    { number: 81, name: 'Charles Oakley', team: 'Bulls', rookie: true, price: 10 },
    { number: 82, name: 'Akeem Olajuwon', team: 'Rockets', rookie: true, price: 96 },
    { number: 83, name: 'Louis Orr', team: 'Knicks', price: 5 },
    { number: 84, name: 'Robert Parish', team: 'Celtics', price: 16 },
    { number: 85, name: 'Jim Paxson', team: 'Trail Blazers', price: 5 },
    { number: 86, name: 'Sam Perkins', team: 'Mavericks', rookie: true, price: 7 },
    { number: 87, name: 'Ricky Pierce', team: 'Bucks', price: 5 },
    { number: 88, name: 'Paul Pressey', team: 'Bucks', price: 5 },
    { number: 89, name: 'Kurt Rambis', team: 'Lakers', price: 14 },
    { number: 90, name: 'Robert Reid', team: 'Rockets', price: 5 },
    { number: 91, name: 'Doc Rivers', team: 'Hawks', rookie: true, price: 9 },
    { number: 92, name: 'Alvin Robertson', team: 'Spurs', rookie: true, price: 7 },
    { number: 93, name: 'Cliff Robinson', team: '76ers', price: 5 },
    { number: 94, name: 'Tree Rollins', team: 'Hawks', price: 5 },
    { number: 95, name: 'Dan Roundfield', team: 'Bullets', price: 5 },
    { number: 96, name: 'Jeff Ruland', team: 'Bullets', price: 5 },
    { number: 97, name: 'Ralph Sampson', team: 'Rockets', price: 9 },
    { number: 98, name: 'Danny Schayes', team: 'Nuggets', price: 5 },
    { number: 99, name: 'Byron Scott', team: 'Lakers', rookie: true, price: 9 },
    { number: 100, name: 'Purvis Short', team: 'Warriors', price: 5 },
    { number: 101, name: 'Jerry Sichting', team: 'Celtics', price: 8 },
    { number: 102, name: 'Jack Sikma', team: 'Bucks', price: 7 },
    { number: 103, name: 'Derek Smith', team: 'Clippers', price: 5 },
    { number: 104, name: 'Larry Smith', team: 'Warriors', price: 5 },
    { number: 105, name: 'Rory Sparrow', team: 'Knicks', price: 5 },
    { number: 106, name: 'Steve Stipanovich', team: 'Pacers', price: 5 },
    { number: 107, name: 'Terry Teagle', team: 'Warriors', price: 5 },
    { number: 108, name: 'Reggie Theus', team: 'Kings', price: 6 },
    { number: 109, name: 'Isiah Thomas', team: 'Pistons', rookie: true, price: 60 },
    { number: 110, name: 'LaSalle Thompson', team: 'Kings', price: 5 },
    { number: 111, name: 'Mychal Thompson', team: 'Spurs', price: 5 },
    { number: 112, name: 'Sedale Threatt', team: '76ers', rookie: true, price: 5 },
    { number: 113, name: 'Wayman Tisdale', team: 'Pacers', rookie: true, price: 6 },
    { number: 114, name: 'Andrew Toney', team: '76ers', price: 5 },
    { number: 115, name: 'Kelly Tripucka', team: 'Pistons', price: 5 },
    { number: 116, name: 'Mel Turpin', team: 'Cavaliers', price: 5 },
    { number: 117, name: 'Kiki Vandeweghe', team: 'Trail Blazers', price: 6 },
    { number: 118, name: 'Jay Vincent', team: 'Mavericks', price: 5 },
    { number: 119, name: 'Bill Walton', team: 'Celtics', price: 14 },
    { number: 120, name: 'Spud Webb', team: 'Hawks', rookie: true, price: 32 },
    { number: 121, name: 'Dominique Wilkins', team: 'Hawks', rookie: true, price: 50 },
    { number: 122, name: 'Gerald Wilkins', team: 'Knicks', rookie: true, price: 5 },
    { number: 123, name: 'Buck Williams', team: 'Nets', price: 6 },
    { number: 124, name: 'Gus Williams', team: 'Bullets', price: 5 },
    { number: 125, name: 'Herb Williams', team: 'Pacers', price: 5 },
    { number: 126, name: 'Kevin Willis', team: 'Hawks', rookie: true, price: 5 },
    { number: 127, name: 'Randy Wittman', team: 'Hawks', price: 5 },
    { number: 128, name: 'Al Wood', team: 'Mavericks', price: 5 },
    { number: 129, name: 'Mike Woodson', team: 'Kings', price: 5 },
    { number: 130, name: 'Orlando Woolridge', team: 'Bulls', price: 5 },
    { number: 131, name: 'James Worthy', team: 'Lakers', price: 29 },
    { number: 132, name: 'Checklist', team: null, price: 30 }
  ],

  // Complete 11 stickers - Jordan sticker is the chase
  stickers: [
    { number: 1, name: 'Hawks Logo', team: 'Hawks', price: 8 },
    { number: 2, name: 'Celtics Logo', team: 'Celtics', price: 12 },
    { number: 3, name: 'Bulls Logo', team: 'Bulls', price: 15 },
    { number: 4, name: 'Pistons Logo', team: 'Pistons', price: 8 },
    { number: 5, name: 'Lakers Logo', team: 'Lakers', price: 12 },
    { number: 6, name: 'Bucks Logo', team: 'Bucks', price: 8 },
    { number: 7, name: 'Knicks Logo', team: 'Knicks', price: 10 },
    { number: 8, name: 'Michael Jordan Sticker', team: 'Bulls', price: 800 },
    { number: 9, name: '76ers Logo', team: '76ers', price: 8 },
    { number: 10, name: 'Suns Logo', team: 'Suns', price: 8 },
    { number: 11, name: 'Trail Blazers Logo', team: 'Trail Blazers', price: 8 }
  ]
};

// Helper to get card price
function getFleerCardPrice(cardName) {
  const card = FLEER_1986.cards.find(c => c.name === cardName);
  if (card) return card.price;
  const sticker = FLEER_1986.stickers.find(s => s.name === cardName);
  if (sticker) return sticker.price;
  return null;
}

// Helper to check if card is a chase card
function isChaseCard(cardName) {
  return FLEER_1986.chaseCards.includes(cardName);
}

// Helper to check if card is a premium rookie
function isPremiumRookie(cardName) {
  return FLEER_1986.premiumRookies.includes(cardName);
}
