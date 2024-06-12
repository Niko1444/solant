'use client';

import './globals.css'
import '@fontsource/inika'
import '@fontsource-variable/yrsa'

import { useEffect, useMemo, useState } from 'react';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'

import "@solana/wallet-adapter-react-ui/styles.css"

// a server component so It will be temporarily disabled
// export const metadata = {
// 	title: 'Solant',
// 	description: 'The productive app for studying and working',
// }

export default function RootLayout({ children }) {

    const [mounted, setMounted] = useState(false)

    const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

    useEffect(() => {
        setMounted(true)
    }, []);

	// no background please fix <3
    return (
        mounted && 
        <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/Yw6g1yw54yXlyLYD5kXbxH4-8tAxvVGY" config={{commitment: "confirmed"}}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
					{mounted && children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
