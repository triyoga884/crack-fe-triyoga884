'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, Resolver } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import Link from 'next/link';
import { SignupSchema, signupSchema } from '@/lib/schema';
import { UserRoles } from '@/lib/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRegister } from '../auth/mutations';
import { useRouter } from 'next/navigation';

function SignUpForm() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema) as Resolver<SignupSchema>,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      role: UserRoles.USER,
    },
  });

  const { mutate: register } = useRegister();
  const router = useRouter();

  const onSubmit = (data: SignupSchema) => {
    register(data, { onSuccess: () => router.push('/login') });
  };

  return (
    <Card className="w-full max-w-sm rounded-2xl border shadow-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create your account
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          Fill the form below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <form
          id="signup-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup className="space-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel
                    htmlFor="signup-form-name"
                    className="text-sm font-medium"
                  >
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-form-name"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel
                    htmlFor="signup-form-email"
                    className="text-sm font-medium"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    type="email"
                    {...field}
                    id="signup-form-email"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel
                    htmlFor="signup-form-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id="signup-form-password"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel
                    htmlFor="signup-form-phone"
                    className="text-sm font-medium"
                  >
                    Phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-form-phone"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1">
                  <FieldLabel className="text-sm font-medium">
                    User Role
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 w-full rounded-lg">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="PROVIDER">Provider</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pt-6">
        <Button
          type="submit"
          form="signup-form"
          className="h-11 w-full rounded-lg text-base font-semibold"
        >
          Sign up
        </Button>

        <CardDescription className="text-center text-sm">
          Already have an account?{' '}
          <Link
            className="font-medium text-primary underline-offset-4 hover:underline"
            href="/login"
          >
            Log in
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default SignUpForm;
