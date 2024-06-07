'use client'
import {SessionProvider} from 'next-auth/react'

export default function Provider({children: children,session}){
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}