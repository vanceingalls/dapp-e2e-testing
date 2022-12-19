// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = require("ethers");

async function simulate(contract, ...args) {
  const gasPrice = await contract.signer.getGasPrice();
  console.log(`Current gas price: ${gasPrice}`);
  const estimatedGas = await contract.signer.estimateGas(
    args.length
      ? contract.getDeployTransaction(...args)
      : contract.getDeployTransaction()
  );
  console.log(`Estimated gas: ${estimatedGas}`);
  const deploymentPrice = gasPrice.mul(estimatedGas);
  const deployerBalance = await contract.signer.getBalance();
  console.log(
    `Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`
  );
  console.log(
    `Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`
  );
  if (Number(deployerBalance) < Number(deploymentPrice)) {
    throw new Error("You dont have enough balance to deploy.");
  }
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  simulate(Greeter, "Hello, World!");
  const greeter = await Greeter.deploy("Hello, World!");

  const Token = await hre.ethers.getContractFactory("Token");
  simulate(Token, "Nader Dabit Token", "NDT");
  const token = await Token.deploy("Nader Dabit Token", "NDT");

  await greeter.deployed();
  await token.deployed();

  console.log("Greeter deployed to:", greeter.address);
  console.log("Token deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
