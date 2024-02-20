const hre = require("hardhat");

async function main() {
  const dk = await hre.ethers.deployContract("DK");

  await dk.waitForDeployment();

  console.log(
    `Contract deployed to ${dk.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Contract deployed to 0x827119Ffa87Bed757416EC27A611282568aD16bC