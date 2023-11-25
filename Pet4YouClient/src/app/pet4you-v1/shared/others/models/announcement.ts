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

export enum AnnouncementType {
    Buy = 'Buy',
    Swap = 'Swap',
    Sale = 'Sale',
    Search = 'Search'
}

export enum PetType {
    Dog = 'Dog',
    Cat = 'Cat',
    Other = '',
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Unknown = 'Unknown'
}
