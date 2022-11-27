import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { MIN_DELAY, ADDRESS_ZERO } from '../helper-hardhat-config';
const deployTimeLock: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const {getNamedAccounts, deployments, network} = hre;
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    log("deploying timelock...")

    const timelock = await deploy("TimeLock",{
        from: deployer,
        args: [MIN_DELAY,[], [], deployer ],
        log: true,
    })

}
export default deployTimeLock;