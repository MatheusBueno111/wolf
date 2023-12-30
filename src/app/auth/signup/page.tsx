'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import * as z from 'zod'
import GoogleIcon from '@/components/icons/GoogleIcon'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CreateUserFormSchema = z
  .object({
    email: z.string().min(1, 'Email é necessário').email('Email inválido'),
    password: z
      .string()
      .min(1, 'Senha é necessária')
      .min(8, 'A senha deve ter no minímo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é necessária'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não batem',
  })

type CreateUserFormData = z.infer<typeof CreateUserFormSchema>

export default function SignUp() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const createUser: SubmitHandler<CreateUserFormData> = async (data, event) => {
    event?.preventDefault()
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('User created:', data)
        router.push('/auth/signin')
        reset()
      } else {
        throw new Error('Failed to create user')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex w-96 flex-col items-center justify-center gap-4 rounded-lg border border-zinc-300 px-6 py-8 shadow-md lg:px-8">
      <h1 className="text-center text-lg">Crie sua conta</h1>
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex h-full w-full flex-col gap-2"
      >
        <label htmlFor="" className="text-md font-semibold">
          Email
        </label>
        <Input.Root>
          <Input.Control placeholder="Email" {...register('email')} />
        </Input.Root>
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
        <label htmlFor="" className="text-md mt-5 font-semibold">
          Senha
        </label>
        <Input.Root>
          <Input.Control
            type="password"
            placeholder="Senha"
            {...register('password')}
          />
        </Input.Root>
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
        <label htmlFor="" className="text-md mt-5 font-semibold">
          Confirme sua senha
        </label>
        <Input.Root>
          <Input.Control
            type="password"
            placeholder="Repita a senha"
            {...register('confirmPassword')}
          />
        </Input.Root>
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
        <div className="mt-2 flex flex-col">
          <Button.Root>
            <Button.Control type="submit">Cadastrar</Button.Control>
          </Button.Root>
        </div>
      </form>

      <div className="flex w-full items-center gap-2">
        <div className="w-full border-b-2 border-violet-300" />
        <span className="text-md">ou</span>
        <div className="w-full border-b-2 border-violet-300" />
      </div>

      <Button.Root>
        <Button.Control
          type="submit"
          variant="outline"
          className="flex flex-row"
          onClick={() => signIn('google')}
        >
          <GoogleIcon />
          Sign up with google
        </Button.Control>
      </Button.Root>
      <div className="flex gap-1">
        <p className="text-sm">Já possui conta?</p>
        <Link href="/auth/signin" className="text-sm text-violet-600 underline">
          Login!
        </Link>
      </div>
    </div>
  )
}
