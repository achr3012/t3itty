import Providers from './components/Providers'
import Navigation from './components/Navigation'
import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: 'T3itty - Twitter clone using NextJS',
  description: 'T3itty Achraf Aissaoui\'s Twitter clone',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex-col md:flex-row container mx-auto flex items-start pb-8 sm:pb-0">
        <Providers>
          <nav className="bg-white fixed bottom-0 w-full sm:w-20 sm:h-full left-0 sm:top-0 lg:sticky lg:h-screen lg:w-1/4 lg:p-0 xl:w-1/6">
            <Navigation />
          </nav>
          <div className="w-full sm:pl-20 lg:pl-0 xl:w-3/6">
            <Header />
            {children}
          </div>
          <div className="hidden xl:flex w-2/6 sticky top-0 px-2 py-4">
            <h2 className="text-3xl font-bold">Other components</h2>
          </div>
        </Providers>
      </body>
    </html>
  )
}
