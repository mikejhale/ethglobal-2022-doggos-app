const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Adopt contract", async function () {
  const _name = "Adopt";
  const _symbol = "Doggos";
  const _tokenUri =
    "https://nftstorage.link/ipfs/bafkreieevqbpdoxeu6yqj35xdz5gnjtmjxgurck34kl7fldzfrgdpjrvbu";

  async function deployTokenFixture() {
    const [owner, account1, ...otheraccounts] = await ethers.getSigners();

    const Adopt = await ethers.getContractFactory("Adopt");
    const hardhatAdopt = await Adopt.deploy(_name, _symbol);
    await hardhatAdopt.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { hardhatAdopt, owner, account1 };
  }

  // You can nest describe calls to create subsections.

  it("Should have the correct name and symbol ", async function () {
    const { hardhatAdopt } = await loadFixture(deployTokenFixture);

    expect(await hardhatAdopt.name()).to.equal(_name);
    expect(await hardhatAdopt.symbol()).to.equal(_symbol);
  });

  it("Should mint a token with token ID 1 & 2 to account1", async function () {
    const { hardhatAdopt, account1 } = await loadFixture(deployTokenFixture);

    const address1 = account1.address;
    await hardhatAdopt.mintNFT(address1, _tokenUri);
    expect(await hardhatAdopt.ownerOf(1)).to.equal(address1);

    await hardhatAdopt.mintNFT(address1, _tokenUri);
    expect(await hardhatAdopt.ownerOf(2)).to.equal(address1);

    expect(await hardhatAdopt.balanceOf(address1)).to.equal(2);
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
