import {UniverseSchemaType, UniverseType} from './universe-type';
import {GalaxySchemaType, GalaxyType} from './galaxy-type';
import {SystemSchemaType, SystemType} from './system-type';
import {StarSchemaType, StarType} from './star-type';
import {PlanetSchemaType, PlanetType} from './planet-type';
import {ObserverSchemaType} from './observer-type';



export interface ObservatoryType {
    universe: UniverseSchemaType,
    galaxies: GalaxySchemaType,
    systems: SystemSchemaType,
    centralStars: StarSchemaType,
    planets: PlanetSchemaType,
    observers: ObserverSchemaType,

    getAllSpaceObjects: () => Promise<UniverseType & GalaxyType[] & SystemType[] & StarType[] & PlanetType[]>,
    getObjectById: (id: string, type: string) => Promise<UniverseType | GalaxyType | SystemType | StarType | PlanetType>,
    createSpaceObject: (data: {name: string, type: string, discoverer: string, galaxyId?: string, systemId?: string, imageName?: string, weight?: number, speed?: number, position?:{x: number, y: number}, size?: string, parentRadius?: number, angle?: number, orbitSpeed?: number}) => Promise<void>,

    editObjectById: (data: {name: string, type: string, discoverer: string, galaxyId?: string, systemId?: string, imageName?: string, weight?: number, speed?: number, position?:{x: number, y: number}, size?: string, parentRadius?: number, angle?: number, orbitSpeed?: number}) => Promise<void>,

    removeObject: (id: string, type: string)=> Promise<void>
}