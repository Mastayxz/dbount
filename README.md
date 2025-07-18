# dbounT 🛠🐛

**dbounT** is a decentralized bug bounty platform powered by DAO governance. It allows open-source project owners to submit bugs, contributors to claim and solve them, and the community to vote on the quality of the solution — all transparently and reward-driven on the blockchain.

## 🚀 Vision
> "Empowering communities to solve problems together, and rewarding contribution with fairness, transparency, and decentralization."

## ✨ Features
- 🐛 **Bug Listing**: Project owners can submit bounty-worthy issues.
- 🧠 **Contributor Claims**: Anyone can claim a bug and work on solving it.
- 🗳 **DAO Voting**: Community votes to approve or reject solutions.
- 💸 **Reward System**: Rewards are locked in smart contracts and only released upon approval.
- 🔒 **Anti-Spam Protection**: Minimum token or whitelist required for voting.
- 🔁 **Re-claim**: If a solution is rejected, the bounty can be reclaimed by others.

## 🛠 Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- Ethers.js / Wagmi for MetaMask integration

### Smart Contract
- Solidity
- Hardhat (Ethereum development environment)

### DAO Governance
- Community-curated whitelist for fair voting

## 🧱 Project Structure
dbounT/
├── client/ # React-based dApp
│ ├── src/
│ └── ...
├── contracts/ # Solidity Smart Contracts
│ ├── BountyFactory.sol
│ ├── BountyDAO.sol
│ └── ...
├── hardhat.config.js
├── scripts/ # Deployment scripts
├── README.md
└── package.json
