import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { WorkspaceSchema } from '@/lib/schema';
import { Room, RoomType } from '@/lib/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function EditWorkspaceFormModal({ payload }: { payload: Room | null }) {
  const form = useForm<z.infer<typeof WorkspaceSchema>>({
    resolver: zodResolver(WorkspaceSchema) as any,
    defaultValues: {
      name: payload?.name || '',
      capacity: payload?.capacity || 1,
      amenities: payload?.amenities || [],
      price_per_day: payload?.price_per_day || 1,
      room_type: payload?.room_type || RoomType.PRIVATE_OFFICE,
      address: payload?.address || '',
      images: payload?.images || [],
      desc: payload?.desc || '',
      is_active: payload?.is_active || false,
      is_verified: payload?.is_verified || false,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const {
    fields: amenityFields,
    append: appendAmenity,
    remove: removeAmenity,
  } = useFieldArray({
    control,
    name: 'amenities',
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'images',
  });

  const onSubmit = (data: z.infer<typeof WorkspaceSchema>) => {
    console.log(data);
  };

  return (
    <form id="workspace-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Edit Workspace</DialogTitle>
          <DialogDescription>
            Make changes to the workspace here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup className="grid md:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input {...field} placeholder="Workspace Name" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
          <Controller
            name="capacity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Capacity</FieldLabel>
                <Input type="number" {...field} placeholder="Capacity" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
          {/* AMENITIES – dynamic array */}
          <Field className="md:col-span-2">
            <FieldLabel>Amenities</FieldLabel>
            <div className="space-y-2">
              {amenityFields.map((amenity, index) => (
                <div key={amenity.id} className="flex gap-2">
                  <Input
                    {...form.register(`amenities.${index}` as const)}
                    placeholder="Amenity (e.g. WiFi)"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeAmenity(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendAmenity('')}
              >
                + Add amenity
              </Button>
            </div>
            <FieldError>{errors.amenities?.message as string}</FieldError>
          </Field>
          <Controller
            name="price_per_day"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Price</FieldLabel>
                <Input type="number" {...field} placeholder="Capacity" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
          <Controller
            name="is_active"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Active Status</FieldLabel>
                <Select
                  value={String(field.value)}
                  onValueChange={(v) => field.onChange(v === 'true')}
                >
                  <SelectTrigger className="w-full lg:w-1/2">
                    <SelectValue placeholder="Select Room Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Nonactive</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
          <Controller
            name="room_type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Room Type</FieldLabel>
                <Select
                  value={field.value as any}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full lg:w-1/2">
                    <SelectValue placeholder="Select Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting room">Meeting Room</SelectItem>
                    <SelectItem value="private office">
                      Private Office
                    </SelectItem>
                    <SelectItem value="podcast studio">
                      Podcast Studio
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Address</FieldLabel>
                <Input {...field} placeholder="Address" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
          {/* IMAGES – dynamic array of URLs */}
          <Field className="md:col-span-2">
            <FieldLabel>Images (URLs)</FieldLabel>
            <div className="space-y-2">
              {imageFields.map((image, index) => (
                <div key={image.id} className="flex gap-2">
                  <Input
                    {...form.register(`images.${index}` as const)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendImage('')}
              >
                + Add image
              </Button>
            </div>
            <FieldError>{errors.images?.message as string}</FieldError>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="submit" form="workspace-edit-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}

export default EditWorkspaceFormModal;
