export enum RoomType {
  MEETING_ROOM = 'MEETING_ROOM',
  PRIVATE_OFFICE = 'PRIVATE_OFFICE',
  PODCAST_STUDIO = 'PODCAST_STUDIO',
}

export enum UserRoles {
  USER = 'user',
  PROVIDER = 'provider',
  ADMIN = 'admin',
}

export interface Room {
  id: string;
  name: string;
  address: string;
  description: string;
  amenities: { name: string }[];
  pricePerDay: number;
  type: RoomType;
  capacity: number;
  isActive: boolean;
  isVerified: boolean;
  images: { url: string }[];
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

export type Booking = {
  workspaceId: string;
  startDate: string;
  endDate: string;
};

export type Payment = {
  bookingId: string;
  method: string;
};
