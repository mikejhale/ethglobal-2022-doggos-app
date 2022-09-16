const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

require("dotenv").config();

const { adoptABI } = require("../artifacts/contracts/Adopt.sol/Adopt.json");
const { hexStripZeros } = require("ethers/lib/utils");
//const { ethers } = require("ethers");

describe("Adopt contract", async function () {
  const _name = "Adopt";
  const _symbol = "DOGGOS";
  const _tokenUri =
    "https://bafkreib5t4ekjpzzimyiwclaovwdeacriay5ugq4zo6w64ckzus5e55hx4.ipfs.nftstorage.link/";
  const recipient = "0x44D54D4Df70054d674F86E077C464623a83f4114";
  const adoptAddressGoerli = "0x750a152Ed5ea3499769DDa973F599D27d56AeaBc";

  async function deployTokenFixture() {
    //const [owner] = await ethers.getSigners();

    const [owner, account1, ...otheraccounts] = await ethers.getSigners();

    // const Adopt = await ethers.getContractFactory("Adopt");
    // const hardhatAdopt = await Adopt.deploy(_name, _symbol);
    // await hardhatAdopt.deployed();

    const hardhatAdopt = await hre.ethers.getContractAt(
      "Adopt",
      adoptAddressGoerli
    );

    return { hardhatAdopt, owner, account1 };
  }

  // You can nest describe calls to create subsections.

  // it("Should have the correct name and symbol ", async function () {
  //   //const { hardhatAdopt } = await loadFixture(deployTokenFixture);
  //   const { hardhatAdopt, owner } = await deployTokenFixture();

  //   expect(await hardhatAdopt.name()).to.equal(_name);
  //   expect(await hardhatAdopt.symbol()).to.equal(_symbol);
  // });

  it("Should mint a token with token ID 1 & 2 to account1", async function () {
    //const { hardhatAdopt, account1 } = await loadFixture(deployTokenFixture);
    const { hardhatAdopt, owner } = await deployTokenFixture();

    console.log(await hardhatAdopt.balanceOf(recipient));

    //const address1 = account1.address;
    //await hardhatAdopt.mintNFT(recipient, _tokenUri);
    expect(await hardhatAdopt.ownerOf(1)).to.equal(recipient);

    //await hardhatAdopt.mintNFT(recipient, _tokenUri);
    expect(await hardhatAdopt.ownerOf(2)).to.equal(recipient);

    console.log(await hardhatAdopt.balanceOf(recipient));

    //expect(await hardhatAdopt.balanceOf(recipient)).to.equal("2");
  });

  /*
  it("Get the default cost of minting", async function () {
    const { hardhatAdopt } = await loadFixture(deployTokenFixture);
    expect(await hardhatAdopt.getCost()).to.equal("10000000000000000");
  });

  it("Updates adoptionCost (Owner only)", async function () {
    const { hardhatAdopt } = await loadFixture(deployTokenFixture);
    await hardhatAdopt.updateCost("20000000000000000");
    expect(await hardhatAdopt.getCost()).to.equal("20000000000000000");
  });
  */
});
