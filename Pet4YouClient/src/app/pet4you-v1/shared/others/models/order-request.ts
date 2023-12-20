import { Announcement } from "./announcement";
import { User } from "./user-models";

export interface OrderRequest {
    id: number;
    advertisementId?: number;
    userId?: number;
    message?: string;
    status?: string;
    advertisement?: Announcement | null;
    user?: User | null;
  }