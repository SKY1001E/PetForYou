import { User } from "./user-models";

export interface Rating {
    id: number;
    raterUserId?: number;
    recipientUserId?: number;
    score?: number;
    comment?: string;
    ratingDate?: Date | null;
    raterUser?: User | null;
    recipientUser?: User | null;
  }