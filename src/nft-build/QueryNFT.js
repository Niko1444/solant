import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";


const rpcEndpoint = 'https://api.devnet.solana.com';
const solanaConnection = new Connection(rpcEndpoint);
const walletToQuery = 'H6oEWNDbXCCXXwjZG4XViVTdctoXubnGa1LDQ76vWNk5'; //example: vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg


const metaplex = Metaplex.make(solanaConnection)
    .use(keypairIdentity(walletToQuery))
    // .use(bundlrStorage());


async function getTokenAccounts(wallet, solanaConnection, metaplex) {
    const filters = [
        {
          dataSize: 165,    //size of account (bytes)
        },
        {
          memcmp: {
            offset: 32,     //location of our query in the account (bytes)
            bytes: wallet,  //our search criteria, a base58 encoded string
          },            
        }];
    solanaConnection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        {filters: filters}
    )
    .then(accounts => {
        console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
        accounts.forEach(async (account, i) => {
            //Parse the account data
            const parsedAccountInfo = account.account.data;
            const mintAddress = new PublicKey(parsedAccountInfo["parsed"]["info"]["mint"]);
            const tokenBalance = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
            //Log results
            console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
            console.log(`--Token Mint: ${mintAddress}`);
            console.log(`--Token Balance: ${tokenBalance}`);

            const nft = await metaplex.nfts().findByMint({ mintAddress });
            console.log(nft.json.name);
            console.log(nft.json.symbol);
            console.log(nft.json.description);
            console.log(nft.json.image);
            console.log(nft.json.attributes);
        });
    })
    .catch(error => console.error(error));
}
getTokenAccounts(walletToQuery, solanaConnection, metaplex);




