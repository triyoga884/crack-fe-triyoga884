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
  address: string;
  description: string;
  amenities: string[];
  pricePerDay: number;
  type: RoomType;
  isActive: boolean;
  isVerified: boolean;
  images: string[];

  // capacity: number;
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
