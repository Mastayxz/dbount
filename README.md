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

### Backend (Optional for MVP)
- Node.js + Express (or skip and use The Graph / on-chain data only)
- MongoDB (if needed for extra off-chain info)

### DAO Governance
- Snapshot (off-chain voting)
- ERC-20 based voting power
- Community-curated whitelist for fair voting

## 🧱 Project Structure
