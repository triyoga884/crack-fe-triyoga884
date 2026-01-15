'use client';
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
import { Controller, Resolver, useForm } from 'react-hook-form';
import { UserSchema, userSchema } from '@/lib/schema';
import { UserRoles, User } from '@/lib/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateUser } from '../app/(admin)/_api/mutation';

function EditWorkspaceFormModalAdmin({
  payload,
  onClose,
}: {
  payload: User;
  onClose?: () => void;
}) {
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema) as Resolver<UserSchema>,
    defaultValues: {
      id: payload?.id,
      name: payload?.name,
      email: payload?.email,
      phone: payload?.phone,
      role: payload?.role,
    },
  });

  const { mutate: update } = useUpdateUser();

  const onSubmit = (data: UserSchema) => {
    update(data);
    onClose?.();
  };

  return (
    <DialogContent className="sm:max-w-[400px]">
      <form id="user-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="mb-2">Edit User</DialogTitle>
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
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRoles.USER}>User</SelectItem>
                    <SelectItem value={UserRoles.PROVIDER}>Provider</SelectItem>
                    <SelectItem value={UserRoles.ADMIN}>Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter>
          <Button className="my-2" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default EditWorkspaceFormModalAdmin;
