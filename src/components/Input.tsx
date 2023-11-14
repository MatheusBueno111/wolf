import { ComponentProps } from 'react'

type InputPrefix = ComponentProps<'div'>

function InputPrefix(props: InputPrefix) {
  return <div {...props} />
}

type InputControl = ComponentProps<'input'>

function InputControl(props: InputControl) {
  return (
    <input
      {...props}
      className="flex w-full border-0 bg-transparent text-zinc-900 placeholder-zinc-400 outline-none placeholder:text-sm"
    />
  )
}

type InputRootProps = ComponentProps<'div'>

function InputRoot(props: InputRootProps) {
  return (
    <div
      {...props}
      className="flex w-full items-center gap-4 rounded-lg px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-violet-500"
    />
  )
}

export const Input = {
  Prefix: InputPrefix,
  Control: InputControl,
  Root: InputRoot,
}
