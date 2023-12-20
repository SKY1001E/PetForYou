export interface Announcement {
    id?: number,
    title?: string,
    type?: string,
    description?: string,
    petType?: string,
    publicationDate?: Date,
    userId?: number,
    completed: boolean,
    advertisementLocation?: {
        id?: number,
        country?: string,
        city?: string,
        region?: string
    },
    advertisementInfo?: {
        id?: number,
        breed?: string,
        age?: number,
        price?: number,
        gender?: string
    }
}

export interface AnnouncementFilterModel {
    advertisementType: string;
    petTypes?: string[];
    petBreeds?: string[];
    location:  {
        country?: string,
        city?: string,
        region?: string
    },
    gender?: string;
    minAge?: number;
    maxAge?: number;
    minPrice?: number;
    maxPrice?: number;
}


export enum AnnouncementType {
    Buy = 'buy',
    Exchange = 'exchange',
    Free = 'free',
    Sell = 'sell',
    Search = 'search'
}

export enum PetType {
    Dog = 'dog',
    Cat = 'cat',
    Fish = 'fish',
    Bird = 'bird',
    Hamster = 'hamster',
    Rabbit = 'rabbit',
    Turtle = 'turtle',
    Reptile = 'reptile',
    Other = 'other'
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Unknown = 'unknown'
}

export enum SortType {
    PriceAsc = "price_asc",
    PriceDesc = "price_desc",
    DateAsc = "date_asc",
    DateDesc = "date_desc"
}