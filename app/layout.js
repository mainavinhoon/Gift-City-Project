
import { Outfit } from 'next/font/google'
import './globals.css'
import Provider from '@/context/Provider'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ['latin'], weight: ['300','400','500','600','700','800','900'] })

export const metadata = {
  title: 'GIFT City — Gujarat International Finance Tec-City',
  description: 'GIFT City is India\'s first operational smart city and International Financial Services Centre. Explore events, community posts, and connect with the GIFT City ecosystem.',
  keywords: 'GIFT City, IFSC, Gujarat, Financial Hub, Smart City, Events',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`bg-slate-50 ${outfit.className}`}>
        <Provider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                borderRadius: '0.75rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
