const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AICatNFT", function () {
  it("Deploys and initializes", async function () {
    this.timeout(0);
    const ICAT = await ethers.getContractFactory("AICatNFT");

    const icat = await ICAT.deploy(
      "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
    );
    await icat.deployed();

    expect(await icat.total_cats()).to.equal("0");

    /*
    expect(await icat.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
    */
  });

  it("Creates Tickets only if you can pay the bills", async function () {
    this.timeout(0);
    const ICAT = await ethers.getContractFactory("AICatNFT");
    const signer1 = await ethers.getSigner(0);
    const icat = await ICAT.connect(signer1).deploy(
      "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
    );
    await icat.deployed();

    expect(await icat.total_cats()).to.equal("0");
    (
      await icat
        .connect(signer1)
        .purchaseTicket({ value: ethers.utils.parseEther("1.0") })
    ).wait();
    expect(await icat.total_cats()).to.equal("1");
    await icat.setMintPriceUSD(100000);

    expect(
      icat
        .connect(signer1)
        .purchaseTicket({ value: ethers.utils.parseEther("1.0") })
    ).to.be.reverted;
  });
});
