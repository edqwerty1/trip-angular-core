export interface ILocations {
    locations: ILocation[];
}

export interface ILocation {
    id: string;
    name: string;
    address: IAddress;
    price: number;
    imageUrl: string;
    nights: number;
    upVotes: string[];
    downVotes: string[];
}

export interface IAddress {
    address1: string,
    address2: string,
    address3: string,
    address4: string,
    address5: string,
    postCode: string,
}