// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ProjectNFTs is ERC721 {
    uint256 internal s_tokenId;
    mapping(uint256 => address) internal s_tokenIdToOwner;
    mapping(address => uint256) internal s_ownerToTokenId;
    mapping(uint256 => string) internal s_tokenIdToUri;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        s_tokenId = 0;
    }

    function mint() internal {
        s_tokenId++;
        _mint(address(this), s_tokenId);
    }

    function setTokenUri(uint256 tokenId, string memory uri) internal {
        s_tokenIdToUri[tokenId] = uri;
    }

    function setTokenOwner(uint256 tokenId, address owner) internal {
        s_tokenIdToOwner[tokenId] = owner;
    }

    function setOwnerTokenId(address owner, uint256 tokenId) internal {
        s_ownerToTokenId[owner] = tokenId;
    }

    function transferNFT(address to, uint256 tokenId) internal {
        safeTransferFrom(address(this), to, tokenId);
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        return s_tokenIdToOwner[tokenId];
    }

    function tokenIdOf(address owner) public view returns (uint256) {
        return s_ownerToTokenId[owner];
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return s_tokenIdToUri[tokenId];
    }
}
