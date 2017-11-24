export interface ILocations {
    locations: ILocation[];
}

export interface ILocation {
    id: string;
    name: string;
    address: any;
    price: number;
    imageUrl: string;
    nights: number;
    upVotes: string[];
    downVotes: string[];
}