import Providers from './components/Providers'
import Navigation from './components/Navigation'
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
          <div className="flex-col md:flex-row container mx-auto flex items-start sm:pr-4">
            <Navigation />
            <div className="md:min-h-screen md:flex-grow md:border-x">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
