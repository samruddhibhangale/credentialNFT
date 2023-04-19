const { ethers, upgrades } = require("hardhat");

async function main() {
  const CredentialNFT = await ethers.getContractFactory("CredentialNFT");
  const contract = await upgrades.deployProxy(CredentialNFT);
  await contract.deployed();

  console.log("CredentialNFT contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
