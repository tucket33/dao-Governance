import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from "hardhat";
import { governance } from '../typechain-types/@openzeppelin/contracts';

const deployGovernanceToken: DeployFunction = async function 

(hre: HardhatRuntimeEnvironment) {
    const {getNamedAccounts, deployments, network} = hre;
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    log("deploying governance token...")
    const governanceToken = await deploy("GovernanceToken",{
        from: deployer,
        args: [],
        log: true,
        //wait confirmations
    })
    // verify
    log(`deployed governance token to  address ${governanceToken.address}`)
    await delegate(governanceToken.address, deployer);
    log(`delegated.....`);
};

const delegate = async (governanceTokenAddress: string, delegatedAccount: string) =>{
    const governanceToken= await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
    const tx = await governanceToken.delegate(delegatedAccount);
    await tx.wait(1);
    // if no checlpoint then I havent delegated propdrly
    console.log(`checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`);
}

  export default deployGovernanceToken;