// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract IconicIndex is ERC721, Ownable {
  using Strings for uint256;
  uint256 currentId = 0;
  string _baseUri;

  // Recipient of eth used to mint item
  address public beneficiaryAddress;
  
  // Mapping from token ID to floor price
  mapping(uint256 => uint256) private _floorPrices;

  // Mapping from token ID to owner address
  // mapping(uint256 => address) private _owners;
  constructor(string memory baseUri, address _beneficiaryAddress, uint floorPrice) ERC721("IconicIndex", "ICX") {
    _floorPrices[currentId] = floorPrice;
    _baseUri = baseUri;
    beneficiaryAddress = _beneficiaryAddress;
  }

  function floorPriceFor(uint256 _tokenId) external view virtual returns(uint256) {
    return _floorPrices[_tokenId];
  }

  /**
   * @dev Add a new item id
   *      set a floor price for the item
   */
  function postItem(uint256 floorPrice) external onlyOwner returns(uint) {
    require(floorPrice > 0, 'Please supply a floor price');
    currentId += 1;
    _floorPrices[currentId] = floorPrice;
    return currentId;
  }

  /**
   * @dev User is able to mint a posted token 
   */
  function mint(uint _tokenId) external payable returns(uint) {
    uint256 floorPrice = _floorPrices[_tokenId];
    require(floorPrice != 0, 'Unknown token id');
    require(msg.value >= _floorPrices[_tokenId], 'Please supply the correct funds');
      
    _safeMint(msg.sender, _tokenId);
    return _tokenId;
  }

  /**
    * @dev Returns eth balance of contract
    */
  function totalBalance() external view returns(uint) {
    return payable(address(this)).balance;
  }

  /**
   * @dev Beneficiary can receive the Eth balance from contract
   */
  function withdrawFunds() external {
    require(msg.sender == beneficiaryAddress, 'Only beneficiary can withdrawal funds');
    payable(msg.sender).transfer(this.totalBalance());
  }

  /**
   * @dev See {IERC721Metadata-tokenURI}.
   */
  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

      return string(abi.encodePacked(_baseUri, tokenId.toString()));
  }

  function setBaseUri(string memory baseUri) external onlyOwner {
    _baseUri = baseUri;
  }
}