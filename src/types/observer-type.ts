export interface ObserverType {
    id: string,
    name: string,
    observablePlanets: string[],
}

export interface ObserverSchemaType extends Document {
    getObservers: ()=>  Promise<ObserverType[]>,
    setObservers: (data: {name: string, observablePlanets: string[]})=>  Promise<any>,
}