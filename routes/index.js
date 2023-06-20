// import { Connection, GetProgramAccountsFilter } from "@solana/web3.js";
// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const rpcEndpoint = 'https://ultra-summer-pallet.solana-mainnet.discover.quiknode.pro/b3f3b6dd36dc4d3d98fe4ce8f9813ef41b3e8185/';

var express = require('express');
var router = express.Router();

async function getTokenAccounts(wallet, solanaConnection) {
  const filters = [
      {
        dataSize: 165,    //size of account (bytes)
      },
      {
        memcmp: {
          offset: 0,     //location of our query in the account (bytes)
          bytes: wallet,  //our search criteria, a base58 encoded string
        }            
      }
   ];

  const accounts = await solanaConnection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,   //SPL Token Program, new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      {filters: filters}
  );

  // console.log(accounts);
  console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
  //mint_addresses.push(accounts);
  fs.writeFileSync('test.json', JSON.stringify(accounts));

  console.log(accounts[0]);
  return accounts[0];
  // console.log(accounts[0]["account"]["data"]["parsed"]);

}

/* GET home page. */
router.get('/', function(req, res, next) {
  // const solanaConnection = new Connection(rpcEndpoint);
  // const token_king = '9noXzpXnkyEcKF3AeXqUHTdR59V5uvrRBUZ9bwfQwxeq';
  // const walletToQuery = token_king;

  // var testData = getTokenAccounts(walletToQuery, solanaConnection);

  res.render('index', { title: 'The Pancake Chef & $YRUP Token Official Site | Home', data_test: 'testData' });
});

module.exports = router;
