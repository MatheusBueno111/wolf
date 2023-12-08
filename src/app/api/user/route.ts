import { db } from '@/services/db'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ success: true })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, username, password } = body

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password,
      },
    })

    return NextResponse.json(
      {
        user: newUser,
        message: 'User create successfully',
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
