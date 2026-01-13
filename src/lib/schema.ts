import * as z from 'zod';
import { RoomType, UserRoles } from './type';

export const bookingSchema = z.object({
  workspaceId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export type BookingSchema = z.infer<typeof bookingSchema>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(4, 'Name atleast 4 character'),
  email: z.email(),
  phone: z.string(),
  role: z.enum(UserRoles).default(UserRoles.USER),
});
// password: z.string().min(4, 'Password atleast 4 character'),

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
  phone: z.string(),
  role: z.enum(UserRoles).default(UserRoles.USER),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const workspaceUpdateFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Workspace name is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().min(1, 'Description is required'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  amenities: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
    })
  ),
  images: z.array(
    z.object({
      url: z.url().min(1, 'At least one image is required'),
    })
  ),
  pricePerDay: z.coerce.number().min(1, 'Price per day must be at least 1'),
  type: z.enum(RoomType).default(RoomType.PRIVATE_OFFICE),
  isActive: z.boolean(),
  isVerified: z.boolean(),
});

export type WorkspaceUpdateFormSchema = z.infer<
  typeof workspaceUpdateFormSchema
>;

export const workspaceUpdateFormToApiSchema =
  workspaceUpdateFormSchema.transform((data) => ({
    ...data,
    amenities: [...data.amenities.map((a) => a.name)],
    images: [...data.images.map((img) => img.url)],
  }));

export type WorkspaceUpdateFormToApiSchema = z.infer<
  typeof workspaceUpdateFormToApiSchema
>;

export const apiToWorkspaceUpdateFormSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    description: z.string(),
    amenities: z.array(z.string()),
    images: z.array(z.string()),
    pricePerDay: z.number(),
    type: z.string(),
    capacity: z.number(),
    isActive: z.boolean(),
    isVerified: z.boolean(),
  })
  .transform((data) => ({
    ...data,
    amenities: data.amenities.map((name) => ({ name })),
    images: data.images.map((url) => ({ url })),
  }));

export const workspaceCreateFormSchema = z.object({
  name: z.string().min(1, 'Workspace name is required'),
  address: z.string().min(1, 'Address is required'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  description: z.string().min(1, 'Description is required'),
  amenities: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
    })
  ),
  images: z.array(
    z.object({
      url: z.url().min(1, 'At least one image is required'),
    })
  ),
  pricePerDay: z.coerce.number().min(1, 'Price per day must be at least 1'),
  type: z.enum(RoomType).default(RoomType.PRIVATE_OFFICE),
});

export type WorkspaceCreateFormSchema = z.infer<
  typeof workspaceCreateFormSchema
>;

export const workspaceCreateToApiSchema = workspaceCreateFormSchema.transform(
  (data) => ({
    ...data,
    amenities: [...data.amenities.map((a) => a.name)],
    images: [...data.images.map((img) => img.url)],
  })
);
