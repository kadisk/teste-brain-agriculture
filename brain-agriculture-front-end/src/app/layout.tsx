import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata = {
  title: 'Brain Agriculture - Produtor Rural',
  description: 'Monitoramento simplificado de plantação',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
