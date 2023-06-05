/** @type import('hardhat/config').HardhatUserConfig */
require('@nomicfoundation/hardhat-toolbox')

/*
// Deploying to a real network
const INFURA_API_KEY = '<key>'
const SEPOLIA_PRIVATE_KEY = '<key>'

module.exports = {
	solidity: "0.8.18",
	networks: {
		sepolia: {
			url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
			accounts: [SEPOLIA_PRIVATE_KEY]
		}
	}
};

// running the command
// npx hardhat run scripts/deploy.js --network sepolia
*/

module.exports = {
  solidity: "0.8.18",
};


