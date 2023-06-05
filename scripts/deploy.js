async function main() {
	const [deployer] = await ethers.getSigners()

	console.log('Deploying contracts with the accounta: ', deployer.address)
	console.log('Account balance', (await deployer.getBalance()).toString())

	const Token = await ethers.getContractFactory('Token')	
	const token = await Token.deploy()

	console.log('Token address', token.address)
}

main()
	.then(() => process.exit(0))
	.catch(err => {
		console.error(err)
		process.exit(1)
	})
