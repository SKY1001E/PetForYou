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
    Buy = 'Купівля',
    Swap = 'Обмін',
    Sale = 'Продаж'
}

export enum PetType {
    Dog = 'Собака',
    Cat = 'Кіт',
}

export enum Gender {
    Male= 'Самець',
    Female = 'Самка'
}
