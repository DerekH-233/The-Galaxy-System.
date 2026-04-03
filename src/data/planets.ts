import { PlanetData } from './types';

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    category: 'terrestrial',
    color: '#9ca3af',
    secondaryColor: '#4b5563',
    size: 0.4,
    sunOrbitRadius: 100,
    sunOrbitSpeed: 4.1,
    description: 'The smallest and innermost planet in the Solar System. It has no atmosphere to retain heat, resulting in surface temperatures that vary more than on any other planet.',
    satellites: [],
    markers: [],
    mass: "3.285 × 10^23 kg",
    gravity: "3.7 m/s²",
    temperature: "-173°C to 427°C"
  },
  {
    id: 'venus',
    name: 'Venus',
    category: 'terrestrial',
    color: '#fbbf24',
    secondaryColor: '#92400e',
    size: 0.9,
    sunOrbitRadius: 150,
    sunOrbitSpeed: 1.6,
    description: 'The second planet from the Sun, often called Earth\'s twin. It has the densest atmosphere of all terrestrial planets, consisting mostly of carbon dioxide.',
    satellites: [],
    markers: [],
    mass: "4.867 × 10^24 kg",
    gravity: "8.87 m/s²",
    temperature: "462°C (Average)"
  },
  {
    id: 'earth',
    name: 'Earth',
    category: 'terrestrial',
    color: '#3b82f6',
    secondaryColor: '#10b981',
    size: 1,
    sunOrbitRadius: 220,
    sunOrbitSpeed: 1,
    description: 'Our home planet, the only known world with life. It features a diverse range of environments and a protective atmosphere.',
    satellites: [
      {
        id: 'moon',
        name: 'Moon',
        type: 'natural',
        orbitRadius: 220,
        orbitSpeed: 0.2,
        size: 24,
        color: '#d1d5db',
        details: 'The Moon is Earth\'s only natural satellite and the fifth largest moon in the Solar System.'
      },
      {
        id: 'iss',
        name: 'ISS',
        type: 'artificial',
        orbitRadius: 140,
        orbitSpeed: 1.5,
        size: 8,
        color: '#ffffff',
        details: 'The International Space Station is a modular space station in low Earth orbit.'
      }
    ],
    markers: [],
    mass: "5.972 × 10^24 kg",
    gravity: "9.81 m/s²",
    temperature: "-88°C to 58°C"
  },
  {
    id: 'mars',
    name: 'Mars',
    category: 'terrestrial',
    color: '#ef4444',
    secondaryColor: '#b91c1c',
    size: 0.9,
    sunOrbitRadius: 300,
    sunOrbitSpeed: 0.5,
    description: 'The Red Planet, home to Olympus Mons, the highest mountain in the solar system, and Valles Marineris, one of the largest canyons.',
    satellites: [
      { id: 'phobos', name: 'Phobos', type: 'natural', orbitRadius: 130, orbitSpeed: 3, size: 10, color: '#a8a29e', details: 'Phobos is the larger and closer of the two natural satellites of Mars.' },
      { id: 'deimos', name: 'Deimos', type: 'natural', orbitRadius: 180, orbitSpeed: 1.5, size: 8, color: '#78716c', details: 'Deimos is the smaller and outer of the two natural satellites of Mars.' }
    ],
    markers: [
      { id: 'jezero', name: 'Jezero Crater', lat: 18.4, lng: 77.5, description: 'Perseverance rover landing site.' }
    ],
    mass: "6.39 × 10^23 kg",
    gravity: "3.72 m/s²",
    temperature: "-153°C to 20°C"
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    category: 'gas-giant',
    color: '#f59e0b',
    secondaryColor: '#d97706',
    size: 1.5,
    sunOrbitRadius: 450,
    sunOrbitSpeed: 0.08,
    description: 'The largest planet in our solar system. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined.',
    satellites: [
      { id: 'io', name: 'Io', type: 'natural', orbitRadius: 160, orbitSpeed: 4, size: 12, color: '#facc15', details: 'Io is the innermost of the four Galilean moons of Jupiter and the most volcanically active body in the Solar System.' },
      { id: 'europa', name: 'Europa', type: 'natural', orbitRadius: 200, orbitSpeed: 2.5, size: 14, color: '#e2e8f0', details: 'Europa is the smallest of the four Galilean moons orbiting Jupiter, and the sixth-closest to the planet.' }
    ],
    markers: [],
    mass: "1.898 × 10^27 kg",
    gravity: "24.79 m/s²",
    temperature: "-110°C (Average)"
  },
  {
    id: 'saturn',
    name: 'Saturn',
    category: 'gas-giant',
    color: '#fbbf24',
    secondaryColor: '#b45309',
    size: 1.4,
    sunOrbitRadius: 600,
    sunOrbitSpeed: 0.03,
    description: 'Famous for its spectacular ring system, Saturn is the second-largest planet in the Solar System and is composed mostly of hydrogen and helium.',
    satellites: [
      { id: 'titan', name: 'Titan', type: 'natural', orbitRadius: 240, orbitSpeed: 1.2, size: 20, color: '#fcd34d', details: 'Titan is the largest moon of Saturn and the second-largest natural satellite in the Solar System.' }
    ],
    markers: [],
    mass: "5.683 × 10^26 kg",
    gravity: "10.44 m/s²",
    temperature: "-178°C (Average)"
  }
];
