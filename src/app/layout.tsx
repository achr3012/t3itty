import Providers from './components/Providers'
import './globals.css'

export const metadata = {
  title: 'T3itty - Twitter clone using NextJS',
  description: 'T3itty Achraf Aissaoui\'s Twitter clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
