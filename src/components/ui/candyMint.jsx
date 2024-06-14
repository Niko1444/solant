import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useMemo } from 'react';
// import useUserSOLBalanceStore from '../../nft-build/useUserSOLBalanceStore';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { generateSigner, transactionBuilder, publicKey, some } from '@metaplex-foundation/umi';
import { fetchCandyMachine, mintV2, mplCandyMachine, safeFetchCandyGuard } from "@metaplex-foundation/mpl-candy-machine";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { clusterApiUrl } from '@solana/web3.js';
import * as bs58 from 'bs58';

const quicknodeEndpoint = "https://solana-devnet.g.alchemy.com/v2/Yw6g1yw54yXlyLYD5kXbxH4-8tAxvVGY " || clusterApiUrl('devnet');
const candyMachineAddress = publicKey("D6EKAouiQNwxHznYPUf13e4qiC1ckaMLtuKRpypgvLy1");
const treasury = publicKey("H6oEWNDbXCCXXwjZG4XViVTdctoXubnGa1LDQ76vWNk5");

export default function CandyMint() {
    const { connection } = useConnection();
    const wallet = useWallet();
    // const { getUserSOLBalance } = useUserSOLBalanceStore();

    const umi = useMemo(() =>
        createUmi(quicknodeEndpoint)
            .use(walletAdapterIdentity(wallet))
            .use(mplCandyMachine())
            .use(mplTokenMetadata()),
        [wallet, mplCandyMachine, walletAdapterIdentity, mplTokenMetadata, quicknodeEndpoint, createUmi]
    );

    const onClick = useCallback(async () => {
        if (!wallet.publicKey) {
            console.log('error', 'Wallet not connected!');
            return;
        }

        const candyMachine = await fetchCandyMachine(
            umi,
            candyMachineAddress,
        );
        const candyGuard = await safeFetchCandyGuard(
            umi,
            candyMachine.mintAuthority,
        );
        try {
            const nftMint = generateSigner(umi);
            const transaction = await transactionBuilder()
                .add(setComputeUnitLimit(umi, { units: 800_000 }))
                .add(
                    mintV2(umi, {
                        candyMachine: candyMachine.publicKey,
                        candyGuard: candyGuard?.publicKey,
                        nftMint,
                        collectionMint: candyMachine.collectionMint,
                        collectionUpdateAuthority: candyMachine.authority,
                        mintArgs: {
                            solPayment: some({ destination: treasury }),
                        },
                    })
                );
            const { signature } = await transaction.sendAndConfirm(umi, {
                confirm: { commitment: "confirmed" },
            });
            const txid = bs58.encode(signature);
            console.log('success', `Mint successful! ${txid}`)

            // getUserSOLBalance(wallet.publicKey, connection);
        } catch (error) {
            console.log('error', `Mint failed! ${error?.message}`);
        }
    // }, [wallet, connection, getUserSOLBalance, umi, candyMachineAddress, treasury]);

    }, [wallet, connection, umi, candyMachineAddress, treasury]);

    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                    rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <button
                    className="px-8 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                    onClick={onClick}
                >
                    <span>Mint NFT </span>
                </button>
            </div>
        </div>
    );
};