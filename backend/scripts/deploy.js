const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constant");

async function main() {
    // Write your deployment files here
    const NFTMarketplace = await ethers.getContractFactory(
        "NFTMarketplace"
    );

    const nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.deployed();

    console.log("NFTMarketplace deployed to: ", nftMarketplace.address);

    // Now deploy the CryptoDevsDAO contract
    const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
    const cryptoDevsDAO = await CryptoDevsDAO.deploy(
        nftMarketplace.address,
        CRYPTODEVS_NFT_CONTRACT_ADDRESS,
        {
            // This assumes your metamask account has at least 1 ETH in its account
            // Change this value as you want
            value: ethers.utils.parseEther("1"),
        }
    );
    await cryptoDevsDAO.deployed();
    console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
// NFTMarketplace deployed to:  0xA8Ba375f599A32caf005C32dcaAe3AE86B81BAa3
// CryptoDevsDAO deployed to:  0xe098F1e83D754aC76F4fA8A15b4a9CfB61d8F72a
