import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { UserSchema } from '@/lib/schema';
import { UserRoles, User } from '@/lib/type';
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
  payload: User | null;
  setDialog: any;
}) {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema) as any,
    defaultValues: {
      id: payload?.id,
      name: payload?.name,
      email: payload?.email,
      password: payload?.password,
      role: payload?.role || UserRoles.USER,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setDialog(false);
  };

  return (
    <form id="user-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>User Roles</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full lg:w-1/2">
                    <SelectValue placeholder="Select Room Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter>
          <Button form="user-edit-form" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}

export default EditWorkspaceFormModalAdmin;
