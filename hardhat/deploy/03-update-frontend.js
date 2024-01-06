const {
    frontEndContractsFile,
    frontEndAbiLocation,
} = require("../helper-hardhat-config")
require("dotenv").config()
const fs = require("fs")
const { network, ethers } = require("hardhat");

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const nftMarketplace = await ethers.getContract("NFTMarketplace")

    // console.log(ethers);

    // console.log("nftMarketplace.interface.", nftMarketplace.interface.formatJson());
    fs.writeFileSync(
        `${frontEndAbiLocation}NFTMarketplace.json`,
        nftMarketplace.interface.formatJson()
    )

    // const basicNft = await ethers.getContract("BasicNft")
    // fs.writeFileSync(
    //     `${frontEndAbiLocation}BasicNft.json`,
    //     basicNft.interface.format(ethers.utils.FormatTypes.json)
    // )
}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const nftMarketplace = await ethers.getContract("NFTMarketplace");
    const proxyAddress = await nftMarketplace.getAddress();

    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"));

    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["NFTMarketplace"].includes(proxyAddress)) {
            contractAddresses[chainId]["NFTMarketplace"].push(proxyAddress)
        }
    } else {
        contractAddresses[chainId] = { NftMarketplace: [proxyAddress] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]