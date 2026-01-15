'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
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
import { LoginSchema, loginSchema } from '@/lib/schema';
import { useLogin } from '../auth/mutations';

function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: {
      email: 'admin@example.com',
      password: 'password123',
    },
  });
  const { mutate: login, isPending, error } = useLogin();

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <Card className="w-full max-w-sm rounded-2xl border shadow-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Login to your account
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          Enter your email and password below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup className="space-y-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel
                    htmlFor="login-form-email"
                    className="text-sm font-medium"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-form-email"
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
                    htmlFor="login-form-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id="login-form-password"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
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
          form="login-form"
          className="h-11 w-full rounded-lg text-base font-semibold"
        >
          Login
        </Button>

        <CardDescription className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            className="font-medium text-primary underline-offset-4 hover:underline"
            href="/signup"
          >
            Sign Up
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
