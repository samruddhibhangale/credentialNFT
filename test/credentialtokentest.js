const { expect } = require("chai");

// Import the smart contract and web3 related packages
const { ethers } = require("hardhat");

// Define the test suite
describe("CredentialToken", function () {
  let contract;
  let owner;
  let recipient;
  let tokenID;

  // Define the test setup
  beforeEach(async function () {
    // Get the accounts of the deployer and a recipient for testing
    [owner, recipient] = await ethers.getSigners();

    // Deploy the contract using the deployer account
    const CredentialToken = await ethers.getContractFactory("CredentialToken");
    contract = await upgrades.deployProxy(CredentialToken, [], { initializer: 'initialize' });

    // Mint a token and approve the recipient to manage it
    tokenID = 1;
    await contract.mint(owner.address, tokenID);
    await contract.approve(recipient.address, tokenID);
  });

  // Test the minting of a new credential token
  describe("mint", function () {
    it("should increase the total supply by 1", async function () {
      await contract.mint(owner.address, 2);
      expect(await contract.totalSupply()).to.equal(2);
    });

    it("should emit a Transfer event", async function () {
      await expect(contract.mint(owner.address, 2)).to.emit(contract, "Transfer");
    });
  });

  // Test the transfer of a credential token
  describe("transferCredential", function () {
    it("should transfer the token to the recipient", async function () {
      await contract.transferCredential(tokenID, recipient.address);
      expect(await contract.ownerOf(tokenID)).to.equal(recipient.address);
    });

    it("should decrease the sender's balance by 1", async function () {
      const initialBalance = await contract.balanceOf(owner.address);
      await contract.transferCredential(tokenID, recipient.address);
      const finalBalance = await contract.balanceOf(owner.address);
      expect(finalBalance).to.equal(initialBalance - 1);
    });

    it("should increase the recipient's balance by 1", async function () {
      const initialBalance = await contract.balanceOf(recipient.address);
      await contract.transferCredential(tokenID, recipient.address);
      const finalBalance = await contract.balanceOf(recipient.address);
      expect(finalBalance).to.equal(initialBalance + 1);
    });

    it("should emit a Transfer event", async function () {
      await expect(contract.transferCredential(tokenID, recipient.address)).to.emit(contract, "Transfer");
    });

    it("should revert when the sender does not have enough tokens to transfer", async function () {
      await expect(contract.transferCredential(2, recipient.address)).to.be.revertedWith("ERC721: sender balance is lower than token amount");
    });

    it("should revert when the recipient already has a credential with the same ID", async function () {
      await contract.mint(recipient.address, 2);
      await expect(contract.transferCredential(2, recipient.address)).to.be.revertedWith("ERC721: token already minted");
    });
  });

  // Test the retrieval of token details
  describe("getTokenDetails", function () {
    it("should return the correct token details", async function () {
      const [tokenURI, ownerAddress, isApproved] = await contract.getTokenDetails(tokenID);
      expect(tokenURI).to.equal("");
      expect(ownerAddress).to.equal(owner.address);
      expect(isApproved).to.equal(true);
    });

    it("should revert when the specified token ID does not exist", async function () {
      await expect(contract.getTokenDetails(2)).to.be.revertedWith("
