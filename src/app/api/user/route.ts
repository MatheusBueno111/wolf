import { db } from '@/services/db'
import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import * as z from 'zod'

const userSchema = z.object({
  email: z.string().min(1, 'Email é necessário').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é necessária')
    .min(8, 'A senha deve ter no minímo 8 caracteres')
    .optional(),
})

const userExists = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  })
}

const createUser = async (email: string, password?: string) => {
  const data: { email: string; password?: string } = { email }

  if (password) {
    const hashPassword = await hash(password, 10)
    data.password = hashPassword
  }

  return await db.user.create({
    data,
  })
}

export const GET = async () => {
  return NextResponse.json({ success: true })
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { email, password } = userSchema.parse(body)

    const existingUserByEmail = await userExists(email)

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'Email already exists' },
        { status: 409 },
      )
    }

    const newUser = await createUser(email, password)

    const { password: newUserPassword, ...userDetails } = newUser

    return NextResponse.json(
      {
        user: userDetails,
        message: 'User created successfully',
      },
      { status: 201 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message:
          'Erro ao criar usuário. Por favor, tente novamente mais tarde.',
      },
      { status: 500 },
    )
  }
}
