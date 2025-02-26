export type FeedItem = {
    id: string;
    title: string;
    category: string;
    date: string;
    type: "VIDEO" | "AUDIO";
  };

  export interface LoginResponseModel {
    status: number;
    data?: AppUser;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: string;
    message?: string;
  }

  export interface AppUser {
    name: string;
    email: string;
    mobileNo?: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
  }