const {expect} = require('chai')
const {ethers} = require('hardhat') // optional, ethers is available in the global scope
const {loadFixture} = require('@nomicfoundation/hardhat-network-helpers')

describe('Testing Token contract functionality...', () => {
	const deployTokenFixture = async () => {
		const [owner, addr1, addr2] = await ethers.getSigners()

		const Token = await ethers.getContractFactory("Token")
		const hardhatToken = await Token.deploy()

		await hardhatToken.deployed()

		return {Token, hardhatToken, owner, addr1, addr2}
	}

	describe('Deployment', () => {
		it('Should set the right owner', async () => {
			const {hardhatToken, owner} = await loadFixture(deployTokenFixture)
			expect(await hardhatToken.owner()).to.equal(owner.address)
		})

		it('Should assign the total supply of tokens to the owner', async () =>{
			const {hardhatToken, owner} = await loadFixture(deployTokenFixture)
			const ownerBalance = await hardhatToken.balanceOf(owner.address)
			expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
		})
	})

	describe('Transactions', () => {
		it('Should transfer tokens between accounts', async () => {
			const {hardhatToken, owner, addr1, addr2} = await loadFixture(deployTokenFixture)

			// transfer 50 tokens from owner to addr1
			// await hardhatToken.transfer(addr1.address, 50)
			// expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50)
			await expect(hardhatToken.transfer(addr1.address, 50))
				.to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50])

			// transfer 50 tokens from addr1 to addr2
			// .connect(Signer) to send a transaction from another account
			// await hardhatToken.connect(addr1).transfer(addr2.address, 50)
			// expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50)
			await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
				.to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50])
		})

		it('Should emit Transfer events', async () => {
			const {hardhatToken, owner, addr1, addr2} = await loadFixture(deployTokenFixture)

			// Transfer 50 tokens from owner to addr1
			await expect(hardhatToken.transfer(addr1.address, 50))
				.to.emit(hardhatToken, 'Transfer')
				.withArgs(owner.address, addr1.address, 50)
		})

		it("Should fail if sender doesn't have ehough tokens", async () => {
			const {hardhatToken, owner, addr1} = await loadFixture(deployTokenFixture)
			const initialOwnerBalance = await hardhatToken.balanceOf(owner.address)
			
			await expect(hardhatToken.connect(addr1).transfer(owner.address, 1))
				.to.be.revertedWith("Not enough tokens")

			expect(await hardhatToken.balanceOf(owner.address))
				.to.equal(initialOwnerBalance)
		})
	})
})
