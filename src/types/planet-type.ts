export interface PlanetType {
    id: string,
    name: string,
    weight: number,
    speed: number,
    discoverer: string,
    systemId: string,
    position: {
        x: number,
        y: number
    },
    size: {
        width: number,
        height: number
    },
    type: string,
    imageName: string,
    parentRadius: number,
    angle: number,
    orbitSpeed: number,
    observers: string[]
}

export interface PlanetSchemaType extends Document {
    getPlanets: ()=>  Promise<PlanetType[]>,
    getPlanetById: (id: string)=>  Promise<PlanetType>,
}