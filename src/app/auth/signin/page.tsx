import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export default function SignUp() {
  return (
    <div className="flex w-96 flex-col items-center justify-center gap-4 rounded-lg border border-zinc-300 px-6 py-8 shadow-md lg:px-8">
      <h1 className="text-center text-lg">Faça login sua conta</h1>
      <form action="" className="flex h-full w-full flex-col gap-2">
        <label htmlFor="" className="text-md font-semibold">
          Email
        </label>
        <Input.Root>
          <Input.Control placeholder="email" />
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
          <Input.Control placeholder="senha" />
        </Input.Root>
        <div className="mt-2 flex flex-col">
          <Button.Root>
            <Button.Control type="submit">Cadastrar</Button.Control>
          </Button.Root>
        </div>
      </form>
    </div>
  )
}
