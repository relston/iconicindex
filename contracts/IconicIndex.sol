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

    function floorPriceFor(uint256 _itemId) public view virtual returns(uint256) {
      console.log("Returning %s price for token %s", _floorPrices[_itemId], _itemId);
      return _floorPrices[_itemId];
    }

    /**
     * Add a new item id
     * set a floor price for the item
     */
    function postItem(uint256 floorPrice) public onlyOwner {
      currentId += 1;
      _floorPrices[currentId] = floorPrice;
    }
    
    // @todo: mint to be public, reflecting normal nft drops
    function mint() public onlyOwner returns(uint) {
      _safeMint(owner(), currentId);
      return currentId;
    }

    // @question what is this?
    // @todo change this to benifitary address
    function transferEthToOwner() public payable {
      (bool sent, bytes memory data) = owner().call{value: msg.value}("");
      require(sent, "Failed to send Ether");
    }

    function purchase(uint256 _itemId) public payable {
        address _owner = owner();
        require(msg.value == _floorPrices[_itemId], 'Please supply the correct funds');
        require(ownerOf(_itemId) == _owner, 'Item not available for purchase');
        transferEthToOwner();
        _transfer(_owner, msg.sender, _itemId);
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
     // @todo test this
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        // @todo: make sure this means provisioned
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return string(abi.encodePacked(_baseUri, tokenId.toString()));
    }

    // @todo: add test to set baseUri
    function setBaseUri(string memory baseUri) public onlyOwner {
      _baseUri = baseUri;
    }
  
}