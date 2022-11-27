import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.9",
// };
const config: HardhatUserConfig ={
  defaultNetwork: 'hardhat',
  networks: {
      hardhat: {
        chainId: 31337,
        allowUnlimitedContractSize: true
      },
      localhost: {
        chainId: 31337,
        gas: 2100000,
        gasPrice: 8000000000,
        allowUnlimitedContractSize: true
      }
  },
  solidity: "0.8.9",
  namedAccounts: {
    deployer: {
      default: 0,
    }
  }
}

export default config;