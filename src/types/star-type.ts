export interface StarType {
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
    imageName: string
}


export interface StarSchemaType extends Document {
    getCentralStars: ()=>  Promise<StarType[]>,
    getCentralStarById: (id: string)=>  Promise<StarType>,

}