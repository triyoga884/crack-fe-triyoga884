import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { WorkspaceSchema, workspaceSchema } from '@/lib/schema';
import { Room, RoomType } from '@/lib/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function EditWorkspaceFormModal({
  payload,
  onClose,
}: {
  payload: Room | null;
  onClose?: () => void;
}) {
  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema) as any,
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

  const onSubmit = (data: WorkspaceSchema) => {
    console.log('Submitting data:', data);
    onClose?.();
  };

  return (
    <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
      <form id="workspace-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit Workspace - {payload?.name}</DialogTitle>
          <DialogDescription>
            Make changes to the workspace here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup className="grid md:grid-cols-2 gap-4 py-4">
          <Controller
            name="name"
            control={control}
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
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Capacity</FieldLabel>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Capacity"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="price_per_day"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Price Per Day</FieldLabel>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Price"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="room_type"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Room Type</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
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
            name="is_active"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Active Status</FieldLabel>
                <Select
                  value={String(field.value)}
                  onValueChange={(v) => field.onChange(v === 'true')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="is_verified"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Verified Status</FieldLabel>
                <Select
                  value={String(field.value)}
                  onValueChange={(v) => field.onChange(v === 'true')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Verification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Verified</SelectItem>
                    <SelectItem value="false">Not Verified</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="md:col-span-2">
                <FieldLabel>Address</FieldLabel>
                <Input {...field} placeholder="Address" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="desc"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="md:col-span-2">
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="Workspace description"
                  rows={3}
                />
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
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default EditWorkspaceFormModal;
