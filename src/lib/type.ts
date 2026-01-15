export enum RoomType {
  MEETING_ROOM = 'MEETING_ROOM',
  PRIVATE_OFFICE = 'PRIVATE_OFFICE',
  PODCAST_STUDIO = 'PODCAST_STUDIO',
}

export enum UserRoles {
  USER = 'USER',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN',
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

export interface RawRoom {
  id: string;
  name: string;
  address: string;
  description: string;
  amenities: string[];
  pricePerDay: number;
  type: RoomType;
  capacity: number;
  isActive: boolean;
  isVerified: boolean;
  images: string[];
}

export interface RoomDashboard extends Room {
  owner: { name: string };
}
export interface RawRoomDashboard extends RawRoom {
  owner: { name: string };
}

export type WorkspaceTab = {
  name: string;
  value: string;
  desc: string;
  key_benefit: string[];
  image: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  phone: string;
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

export type Stat = {
  title: string;
  value: number;
};
