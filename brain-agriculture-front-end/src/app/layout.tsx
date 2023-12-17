import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'

import HeaderMain from "../componentes/HeaderMain"

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
      <body>
        <HeaderMain/>
        {children}
      </body>
    </html>
  )
}
