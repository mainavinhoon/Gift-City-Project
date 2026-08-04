
import './globals.css'
import Provider from '@/context/Provider'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: 'GIFT City — Gujarat International Finance Tec-City',
  description: 'GIFT City is India\'s first operational smart city and International Financial Services Centre. Explore events, community posts, and connect with the GIFT City ecosystem.',
  keywords: 'GIFT City, IFSC, Gujarat, Financial Hub, Smart City, Events',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Provider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: 'var(--cream)',
                color: 'var(--ink)',
                border: '1.5px solid var(--ink)',
                borderRadius: '0',
                boxShadow: '4px 4px 0 var(--orange)',
                padding: '12px 16px',
              },
              success: { iconTheme: { primary: '#1A4A2A', secondary: '#EDE8DE' } },
              error:   { iconTheme: { primary: '#B5401A', secondary: '#EDE8DE' } },
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
