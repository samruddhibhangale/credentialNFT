const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Read the contract and IPFS metadata from files
  const contract = fs.readFileSync("./artifacts/contracts/CredentialNFT.sol/CredentialNFT.json");
  const metadata = fs.readFileSync("./metadata/nft_metadata.json");

  // Parse the JSON data
  const contractData = JSON.parse(contract);
  const metadataJson = JSON.parse(metadata);

  // Connect to the Goerli testnet
  const network = "goerli";
  const provider = ethers.getDefaultProvider(network);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Deploy the contract
  const CredentialNFT = await ethers.getContractFactory("CredentialNFT", signer);
  const credentialNFT = await CredentialNFT.deploy(metadataJson.ipfsHash);

  await credentialNFT.deployed();

  console.log("CredentialNFT deployed to:", credentialNFT.address);

  // Write the contract address to a file
  fs.writeFileSync("./deployed_addresses.json", JSON.stringify({
    goerli: credentialNFT.address
  }));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
