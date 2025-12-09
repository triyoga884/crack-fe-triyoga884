export enum RoomType {
  MEETING_ROOM = 'meeting room',
  PRIVATE_OFFICE = 'private office',
  PODCAST_STUDIO = 'podcast studio',
}

export enum UserRoles {
  USER = 'user',
  PROVIDER = 'provider',
  ADMIN = 'admin',
}

export interface Room {
  id: number;
  name: string;
  capacity: number;
  price_per_day: number;
  amenities: string[];
  is_active: boolean;
  is_verified: boolean;
  room_type: RoomType;
  address: string;
  images: string[];
  desc: string;
}

export type WorkspaceTab = {
  name: string;
  value: string;
  desc: string;
  key_benefit: string[];
  image: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
};
