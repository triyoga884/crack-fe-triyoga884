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
import { Controller, useForm } from 'react-hook-form';
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

function EditWorkspaceFormModalAdmin({
  payload,
  setDialog,
}: {
  payload: Room | null;
  setDialog: any;
}) {
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

  const onSubmit = (data: any) => {
    console.log(data);
    setDialog(false);
  };

  return (
    <form id="workspace-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Workspace</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Controller
            name="is_verified"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Verified Status</FieldLabel>
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
        </FieldGroup>
        <DialogFooter>
          <Button form="workspace-edit-form" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}

export default EditWorkspaceFormModalAdmin;
