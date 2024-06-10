
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/context/Provider'
import Navbar from '@/components/navbar/Navbar'
const inter = Inter({ subsets: ['latin'] })
import Footer from '@/components/footer/Footer'

import { Toaster } from "react-hot-toast";

export const metadata = {
  title: 'Gift City',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className=" sm:mt-0 sm:m-8 ">
        
     <Provider >
     <Navbar/>
     {children}

     </Provider>
     <Toaster position="bottom-center" />
        <Footer/>
        </body>
    </html>
  )
}
