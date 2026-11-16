// ─────────────────────────────────────────────────────────────
// Your games. Add, remove or reorder entries — the site updates itself.
//
// Fields:
//   id          unique slug
//   title       game name
//   tagline     one-liner shown on the card
//   description longer text for the detail view (array = paragraphs)
//   year        number
//   engine      e.g. 'Godot', 'Unity'
//   tools       other tools used (optional)
//   tags        genres / features (used for filtering once there are 5+ games)
//   role        what YOU did on it
//   team        studio / collaborators (optional)
//   platforms   e.g. ['Web', 'Windows']
//   jam         optional { name, url }
//   status      'Released' | 'Jam' | 'In development' | 'Prototype'
//   color       accent color
//   cover       image path relative to /public, e.g. 'games/my-game/cover.webp'
//   screenshots array of image paths relative to /public
//   youtube     optional YouTube video id (shown in the detail view)
//   trailer     optional direct .mp4 URL (used instead of YouTube if set)
//   links       { steam, play, itch, source, devlog } — any can be omitted
//   spotlight   true = gets the big showcase section (use on one game)
//
// Image paths have NO leading slash so the site works on any GitHub Pages URL.
// ─────────────────────────────────────────────────────────────
export const games = [
  {
    id: 'ufo-sightings-simulator',
    title: 'UFO Sightings Simulator',
    tagline: 'Explore the mansion and the galaxy, one photo at a time.',
    description: [
      'A survival mystery game about shooting photos of paranormal phenomena. You play a ufologist living in a desolate mansion surrounded by wheat fields and empty mountains, scraping a living by selling photos to conspiracy websites.',
      'Take photos, sell them, and buy rations, tools, decorations and vehicles, all while managing hunger and sleep and uncovering the secrets of the island(s). Maybe you will even have a close encounter.',
    ],
    year: 2024,
    engine: 'Unity',
    tags: ['Simulation', 'Survival', 'Mystery', '3D', 'First-person'],
    role: 'Developer',
    team: 'Galera Studios × Space Banana Studio',
    platforms: ['Windows', 'Linux'],
    status: 'Released',
    released: '26 Jun 2024',
    price: '€4.99',
    color: '#ff5fa2',
    cover: 'games/ufo/cover.webp',
    screenshots: [
      'games/ufo/shot-1.webp',
      'games/ufo/shot-2.webp',
      'games/ufo/shot-3.webp',
      'games/ufo/shot-4.webp',
      'games/ufo/shot-5.webp',
      'games/ufo/shot-6.webp',
    ],
    // Official gameplay trailer, served from Steam's CDN
    trailer: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257012282/movie480.mp4',
    links: {
      steam: 'https://store.steampowered.com/app/2723820/UFO_Sightings_Simulator/',
      itch: 'https://galerastudios.itch.io/ufo-sightings-simulator',
    },
    spotlight: true,
  },
  {
    id: 'unstable-space-raiding',
    title: 'Unstable Space Raiding',
    tagline: 'A time-twisting puzzle platformer where your own past can kill you.',
    description: [
      'Reach the Stabilizer at the end of each level and bring it back to your ship. The catch: every move leaves an afterimage trail, and once you grab the Stabilizer, touching your own past is lethal.',
      'You can\'t die. You just get thrown back through space-time. Five handcrafted levels, gamepad support, and a lot of paradoxes.',
      'Made for GMTK Game Jam 2025 with a team of six and kept updated after the jam.',
    ],
    year: 2025,
    engine: 'Godot',
    tags: ['Puzzle Platformer', 'Time Travel', 'Pixel Art', '2D', 'Game Jam'],
    role: 'Programming',
    team: 'RomagnaStudios (team of 6)',
    platforms: ['Web', 'Windows'],
    jam: { name: 'GMTK Game Jam 2025', url: 'https://itch.io/jam/gmtk-2025/rate/3775492' },
    status: 'Jam',
    color: '#c86bff',
    cover: 'games/usr/cover.webp',
    screenshots: [
      'games/usr/shot-1.webp',
      'games/usr/shot-2.webp',
      'games/usr/shot-3.webp',
      'games/usr/shot-4.webp',
      'games/usr/shot-5.webp',
    ],
    youtube: '5k5eduR-Syg',
    links: { play: 'https://abtin0.itch.io/unstable-space-raiding' },
  },
  {
    id: 'the-labyrinth-of-the-stalker',
    title: 'The Labyrinth of the Stalker',
    tagline: 'A randomly generated horror labyrinth. Find the key, find the exit, keep the lights on.',
    description: [
      'Every run generates a new labyrinth. Find the key, then the exit, while something stalks you through the dark.',
      'Candles keep the stalker away until it blows them out, and it won\'t chase you if your flashlight is off. Light is both your safety and your giveaway.',
      'Made solo for Secret Santa Jam 2022, with 3D models built in Blender.',
    ],
    year: 2022,
    engine: 'Godot',
    tools: ['Blender'],
    tags: ['Horror', 'Survival', 'Procedural', 'Low-poly', '3D', 'Game Jam'],
    role: 'Solo: code, 3D models, design',
    platforms: ['Web', 'Windows', 'Linux'],
    jam: { name: 'Secret Santa Jam 2022', url: 'https://itch.io/jam/secret-santa-2022/rate/1836979' },
    status: 'Jam',
    color: '#ffb84d',
    cover: 'games/lab/cover.webp',
    screenshots: ['games/lab/shot-1.webp', 'games/lab/shot-2.webp'],
    youtube: 'ZtQRPBlKcCE',
    links: { play: 'https://abtin0.itch.io/the-labyrinth-of-the-stalker' },
  },
]

// Resolves a /public path against Vite's base URL (works on GitHub Pages subpaths).
export const asset = (p) => (/^https?:/.test(p) ? p : import.meta.env.BASE_URL + p)
