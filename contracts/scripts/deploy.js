const hre = require("hardhat");

async function main() {
  const DAO = await hre.ethers.getContractFactory("DAO");
  const dao = await DAO.deploy();

  // Ganti .deployed() dengan .waitForDeployment()
  await dao.waitForDeployment();

  // Ganti dao.address dengan await dao.getAddress()
  console.log(`✅ DAO deployed to: ${await dao.getAddress()}`);
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});
