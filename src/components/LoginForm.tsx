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
import { useRouter } from 'next/navigation';
import { useLogin } from '../auth/mutations';

function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: {
      email: 'user1@example.com',
      password: 'password123',
    },
  });
  const { mutate: login, isPending, error } = useLogin();

  const onSubmit = async (data: LoginSchema) => {
    login(data, { onSuccess: () => router.push('/') });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-form-email"
                    aria-invalid={fieldState.invalid}
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
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id="login-form-password"
                    aria-invalid={fieldState.invalid}
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
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="login-form" className="w-full">
          Login
        </Button>
        <CardDescription>
          Don't have an account,{' '}
          <Link className="hover:underline" href="/signup">
            Sign Up
          </Link>{' '}
          now
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
