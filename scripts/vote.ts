import * as fs from "fs"
import { network, ethers } from "hardhat"
import { proposalsFile, developmentChains, VOTING_PERIOD } from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks"

const index=0
async function main(proposalIndex: number) {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
  // Get the last proposal for the network. You could also change it for your index
  const proposalId = proposals[network.config.chainId!].at(-1);
  // 0 = Against, 1 = For, 2 = Abstain for this example
  const voteWay = 1
  const governor = await ethers.getContract("GovernorContract")

  const reason = "I lika do da cha cha"
  const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason);
  await voteTx.wait(1);
  if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
      }
      console.log(`whoohoo lets go!!!`);
}

main(index)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

