// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract IconicIndex is ERC721, Ownable {
    uint public startingPrice;
    uint currentId = 0;
    
    constructor(uint _startingPrice) ERC721("IconicIndex", "ICX") {
      startingPrice = _startingPrice;
      _safeMint(owner(), currentId);
    }

    /**
     * Add a new item id
     */
    function mint() public onlyOwner returns(uint) {
      currentId += 1;
      _safeMint(owner(), currentId);
      return currentId;
    }

    function transferEthToOwner() public payable {
      (bool sent, bytes memory data) = owner().call{value: msg.value}("");
      require(sent, "Failed to send Ether");
    }

    function purchase(uint _itemId) public payable {
        address _owner = owner();
        require(msg.value == startingPrice, 'Please supply the correct funds');
        require(ownerOf(_itemId) == _owner, 'Item not available for purchase');
        transferEthToOwner();
        _transfer(_owner, msg.sender, _itemId);
    }
  
}