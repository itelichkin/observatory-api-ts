import {StarType} from './star-type';
import {PlanetType} from './planet-type';

export interface SystemType {
    id: string,
    name: string,
    weight: number,
    speed: number,
    discoverer: string,
    galaxyId: string,
    position: {
        x: number,
        y: number
    },
    type: string,
    imageName: string,
    age: string,
    starsAmount: string,
    planetsAmount: string,
    dwarfPlanetAmount: string,
    satellitesAmount: string,
    smallBodyAmount: string,
    cometAmount: string
}


export interface SystemSchemaType extends Document {
    getSystems: ()=>  Promise<SystemType[]>,
    getSystemById: (id: string)=>  Promise<SystemType>,
    getCentralStarsBySystemId: (id: string)=>  Promise<StarType>,
    getPlanetsBySystemId: (id: string)=>  Promise<PlanetType>
}