import {SystemType} from './system-type';

export interface GalaxyType {
    id: string,
    name: string,
    weight: number,
    speed: number,
    discoverer: string,
    position: {
        x: number,
        y: number
    },
    diameter: string,
    numberOfStars: string,
    thickness: string,
    type: string
}

export interface GalaxySchemaType extends Document {
    getGalaxies: ()=>  Promise<GalaxyType[]>,
    getGalaxyById: (id: string) => Promise<GalaxyType>,
    getSystemsByGalaxyId: (id: string) => Promise<SystemType[]>,

}