'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import GoogleIcon from '@/components/icons/GoogleIcon'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const LoginUserFormSchema = z.object({
  email: z.string().min(1, 'Email é necessário').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é necessária')
    .min(8, 'A senha deve ter no minímo 8 caracteres'),
})

type LoginUserFormData = z.infer<typeof LoginUserFormSchema>

export default function SignUp() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push('/products')
    }
  }, [session, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(LoginUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onLogin: SubmitHandler<LoginUserFormData> = async (data, event) => {
    event?.preventDefault()
    console.log('data', data)
    const onLoginData = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    console.log('onLoginData', onLoginData)
    if (onLoginData?.error) {
      console.log('error', onLoginData)
    } else {
      router.push('/products')
    }
  }

  return (
    <div className="flex w-96 flex-col items-center justify-center gap-4 rounded-lg border border-zinc-300 px-6 py-8 shadow-md lg:px-8">
      <h1 className="text-center text-lg">Faça login sua conta</h1>
      <form
        onSubmit={handleSubmit(onLogin)}
        className="flex h-full w-full flex-col gap-2"
      >
        <label htmlFor="" className="text-md font-semibold">
          Email
        </label>
        <Input.Root>
          <Input.Control placeholder="email" {...register('email')} />
        </Input.Root>
        <div className="mt-5 flex justify-between text-sm">
          <label htmlFor="" className="text-md font-semibold">
            Senha
          </label>
          <a
            href="#"
            className="font-semibold text-violet-600 hover:text-violet-500"
          >
            Esqueceu a senha?
          </a>
        </div>
        <Input.Root>
          <Input.Control
            type="password"
            placeholder="senha"
            {...register('password')}
          />
        </Input.Root>
        <div className="mt-2 flex flex-col">
          <Button.Root className="w-full	">
            <Button.Control type="submit">Entrar</Button.Control>
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
          Sign in with google
        </Button.Control>
      </Button.Root>

      <div className="flex gap-1">
        <p className="text-sm">Não possui conta?</p>
        <Link href="/auth/signup" className="text-sm text-violet-600 underline">
          Inscreva-se!
        </Link>
      </div>
    </div>
  )
}
