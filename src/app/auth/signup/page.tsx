import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export default function SignUp() {
  return (
    <div className="flex w-96 flex-col items-center justify-center gap-4 rounded-lg border border-zinc-300 px-6 py-8 shadow-md lg:px-8">
      <h1 className="text-center text-lg">Crie sua conta</h1>
      <form action="" className="flex h-full w-full flex-col gap-2">
        <label htmlFor="" className="text-md font-semibold">
          Email
        </label>
        <Input.Root>
          <Input.Control placeholder="email" />
        </Input.Root>
        <label htmlFor="" className="text-md mt-5 font-semibold">
          Senha
        </label>
        <Input.Root>
          <Input.Control placeholder="senha" />
        </Input.Root>
        <label htmlFor="" className="text-md mt-5 font-semibold">
          Confirme sua senha
        </label>
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
