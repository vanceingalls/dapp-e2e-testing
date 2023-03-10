//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    // string public _name = "Nader Dabit Token";
    // string public _symbol = "NDT";
    // uint public _totalSupply = 1000000;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000 * (10 ** 18));
        // _balances[msg.sender] = totalSupply;
    }

    // function transfer(address to, uint amount) external {
    //     require(balances[msg.sender] >= amount, "Not enough tokens");
    //     balances[msg.sender] -= amount;
    //     balances[to] += amount;
    // }

    // function balanceOf(address account) external view returns (uint) {
    //     return balances[account];
    // }
}
