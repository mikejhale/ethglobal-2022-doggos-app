const ethers = require("ethers");
const adoptABI = require("../artifacts/contracts/Adopt.sol/Adopt.json");

async function main() {
  const [owner, account1, ...otheraccounts] = await ethers.getSigners();

  // const contract = new ethers.Contract(
  //   "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  //   adoptABI.abi,
  //   [owner]
  //);

  const hardhatAdopt = new ethers.Contract(
    "0xE32B7aBFbc03fA5a6955a5C6667a45e8cc03939E",
    adoptABI.abi
  );

  console.log(hardhatAdopt.methods);
  //const tokenURI = await hardhatAdopt.totalReleased();
  //const contents = (await axios.get(tokenURI)).data;

  //console.log(tokenURI);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
