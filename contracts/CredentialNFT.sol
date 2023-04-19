// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "ipfs-http-client/declarations.sol";

contract CredentialNFT is Initializable, ERC721URIStorageUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    struct Credential {
        string name;
        string organization;
        string issueDate;
        string expirationDate;
        string ipfsHash;
    }

    mapping(uint256 => Credential) private _credential;

    function initialize() public initializer {
        __ERC721URIStorage_init();
        __CredentialNFT_init_unchained();
    }

    function __CredentialNFT_init_unchained() internal initializer {
        _tokenIds.increment();
    }

    function tokenizeCredential(
        string memory name,
        string memory organization,
        string memory issueDate,
        string memory expirationDate,
        string memory ipfsHash
    ) public returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, ipfsHash);

        _credential[newTokenId] = Credential(name, organization, issueDate, expirationDate, ipfsHash);

        return newTokenId;
    }

    function getCredential(uint256 tokenId) public view returns (Credential memory) {
        require(_exists(tokenId), "CredentialNFT: invalid token id");
        return _credential[tokenId];
    }

    function updateCredentialIpfsHash(uint256 tokenId, string memory newIpfsHash) public {
        require(_exists(tokenId), "CredentialNFT: invalid token id");
        require(ownerOf(tokenId) == msg.sender, "CredentialNFT: caller is not the owner of the token");

        _credential[tokenId].ipfsHash = newIpfsHash;
        _setTokenURI(tokenId, newIpfsHash);
    }

    function storeNFTDataOnIPFS(string memory data) public returns (string memory) {
        IpfsHttpClient ipfsClient = new IpfsHttpClient("localhost", 5001);
        bytes memory ipfsData = bytes(data);
        IpfsHttpClient.CID memory ipfsCid = ipfsClient.add(ipfsData);

        return string(ipfsCid.bytes);
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721URIStorageUpgradeable) {
        super._burn(tokenId);
        delete _credential[tokenId];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721URIStorageUpgradeable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _authorizeUpgrade(address) internal pure override returns (bool) {
        return true;
    }
}
