export interface SatelliteData {
  id: string;
  name: string;
  type: 'natural' | 'artificial';
  orbitRadius: number; // relative to planet size
  orbitSpeed: number; // degrees per second
  size: number;
  color: string;
  details?: string;
}

export interface MarkerData {
  id: string;
  name: string;
  lat: number; // -90 to 90
  lng: number; // -180 to 180
  description: string;
}

export interface PlanetData {
  id: string;
  name: string;
  category: 'terrestrial' | 'gas-giant' | 'ice-giant' | 'dwarf';
  color: string;
  secondaryColor?: string;
  size: number; // base size multiplier
  description: string;
  sunOrbitRadius: number; // distance from sun in solar system view
  sunOrbitSpeed: number; // orbital speed around sun
  satellites: SatelliteData[];
  markers: MarkerData[];
  mass?: string;
  gravity?: string;
  temperature?: string;
}
