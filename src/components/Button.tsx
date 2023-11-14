import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: ['rounded-md px-4 py-2 text-sm font-semibold outline-none shadow-sm'],

  variants: {
    variant: {
      primary: 'bg-violet-600 text-white hover:bg-violet-700',
      outline: 'border border-zinc-300 text-zinc-700 hover:bg-zinc-50',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonPrefix = ComponentProps<'div'>

function ButtonPrefix(props: ButtonPrefix) {
  return <div {...props} />
}

type ButtonControl = ComponentProps<'button'> & VariantProps<typeof button>

function ButtonControl({ variant, ...props }: ButtonControl) {
  return <button {...props} className={button({ variant })} />
}

type ButtonRootProps = ComponentProps<'div'>

function ButtonRoot({ children, ...props }: ButtonRootProps) {
  return (
    <div {...props} className="flex flex-grow justify-center">
      {children}
    </div>
  )
}

export const Button = {
  Prefix: ButtonPrefix,
  Control: ButtonControl,
  Root: ButtonRoot,
}
