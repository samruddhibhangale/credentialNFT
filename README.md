# credentialNFT
CredentialNFT is a smart contract that tokenizes credentials as non-fungible tokens (NFTs) and stores the NFT metadata on IPFS. 
This project provides a sample implementation of the CredentialNFT contract using the Hardhat development environment.

Deployment
To deploy the CredentialNFT contract to the Goerli testnet, you will need to have an Ethereum wallet with some test Ether. You can get test Ether from a Goerli testnet faucet, such as https://faucet.goerli.mudit.blog/.

1. Clone the repository and install the required dependencies:
- git clone https://github.com/samruddhibhangale/credentialNFT.git
- cd CredentialNFT
- npm install

2. Create a new file named .env in the project root directory, and add your Ethereum wallet private key as follows:
- PRIVATE_KEY="your_private_key_here"

3. Compile the CredentialNFT contract:
- npx hardhat compile

4. Deploy the contract to the Goerli testnet:\
- npx hardhat run scripts/deploy.js --network goerli
