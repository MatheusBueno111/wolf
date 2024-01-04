import { db } from './db'

interface GetUserByEmailServiceProps {
  email: string
}
export const getUserByEmailService = async ({
  email,
}: GetUserByEmailServiceProps) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return {
        user: null,
        status: 'error',
        message: 'User not found',
      }
    }

    return {
      user,
      status: 'success',
      message: 'Usuário encontrado',
    }
  } catch (error) {
    console.error(error)
  }
}
