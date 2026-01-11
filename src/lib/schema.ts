import * as z from 'zod';
import { RoomType, UserRoles } from './type';

export const bookingSchema = z.object({
  workspaceId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export type BookingSchema = z.infer<typeof bookingSchema>;

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(4, 'Name atleast 4 character'),
  email: z.email(),
  password: z.string().min(4, 'Password atleast 4 character'),
  role: z.enum(UserRoles).default(UserRoles.USER),
});

export type UserSchema = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(4, 'Name at least 4 characters'),
  email: z.email(),
  password: z.string(),
  role: z.enum(UserRoles).default(UserRoles.USER),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const workspaceFormSchema = z.object({
  name: z.string().min(1, 'Workspace name is required'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  amenities: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
    })
  ),
  price_per_day: z.coerce.number().min(1, 'Price per day must be at least 1'),
  room_type: z.enum(RoomType).default(RoomType.PRIVATE_OFFICE),
  address: z.string().min(1, 'Address is required'),
  images: z.array(
    z.object({
      url: z.url().min(1, 'At least one image is required'),
    })
  ),
  desc: z.string().min(1, 'Description is required'),
  is_active: z.boolean(),
  is_verified: z.boolean(),
});

export type WorkspaceFormSchema = z.infer<typeof workspaceFormSchema>;

export const workspaceFormToApiSchema = workspaceFormSchema.transform(
  (data) => ({
    name: data.name,
    capacity: data.capacity,
    price_per_day: data.price_per_day,
    room_type: data.room_type,
    address: data.address,
    desc: data.desc,
    is_active: data.is_active,
    is_verified: data.is_verified,

    amenities: [...data.amenities.map((a) => a.name)],
    images: [...data.images.map((img) => img.url)],
  })
);

export const apiToWorkspaceFormSchema = z
  .object({
    name: z.string(),
    capacity: z.number(),
    amenities: z.array(z.string()),
    price_per_day: z.number(),
    room_type: z.string(),
    address: z.string(),
    images: z.array(z.string()),
    desc: z.string(),
    is_active: z.boolean(),
    is_verified: z.boolean(),
  })
  .transform((data) => ({
    ...data,
    amenities: data.amenities.map((name) => ({ name })),
    images: data.images.map((url) => ({ url })),
  }));
