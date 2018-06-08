export interface UniverseType {
    id: string,
    name: string,
    weight: string,
    speed: string,
    discoverer: string,
    position: {
        x: number,
        y: number
    },
    galaxiesAmount: number,
    age: string,
    averageTemperature: string,
    diameter: string,
    type: string,
}

export interface UniverseSchemaType extends Document {
    getUniverse: ()=>  Promise<UniverseType>
}