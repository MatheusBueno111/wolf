export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen items-center justify-center border border-red-700">
      {children}
    </main>
  )
}
