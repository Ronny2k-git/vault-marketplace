<div align="center">

# 🔐 Vault Marketplace

A decentralized Web3 marketplace for creating and managing token vaults on Ethereum Sepolia.

![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![Ethereum](https://img.shields.io/badge/Sepolia-Testnet-627EEA?style=flat-square&logo=ethereum&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

### Overview

Users can deploy their own vaults, deposit and withdraw ERC-20 tokens, and explore active or completed vaults through a modern web interface — all backed by smart contracts on Sepolia.

**Core features:**

- Create token vaults directly on the blockchain
- Deposit and withdraw ERC-20 tokens
- Browse active and completed vaults
- Wallet connection and authentication
- Smart contract interaction on Sepolia
- Responsive, modern UI

---

### Stack

| Layer          | Technologies                                        |
| -------------- | --------------------------------------------------- |
| **Frontend**   | Next.js · React · Tailwind CSS · Wagmi · Viem · Zod |
| **Backend**    | Prisma ORM · MySQL                                  |
| **Blockchain** | Solidity · Ethereum Sepolia Testnet                 |
| **Deployment** | Vercel                                              |

---

### Smart Contracts

Solidity contracts handle:

- Creating new token vaults
- Managing deposits and withdrawals
- Storing vault information on-chain

Custom ERC-20 tokens were also developed and deployed to Sepolia for testing the marketplace and vault functionality.

---

### Project Architecture

```text
User
   │
   ▼

Next.js + React
   │
   ├──────────────► Smart Contracts (Solidity)
   │                    │
   │                    ▼
   │             Ethereum Sepolia
   │
   ▼
Next.js API Routes
   │
   ▼
Prisma ORM
   │
   ▼
MySQL Database
```

---

### Getting Started

```bash
git clone <Ronny2k-git/vault-marketplace>
npm install
```

```env
You'll need your own:

- **MySQL database** (local or hosted — e.g. Railway, PlanetScale)
- **Sepolia RPC URL** (free tier via [Alchemy](https://alchemy.com) or [Infura](https://infura.io))
- **Deployed contract address** (deploy your own using the contracts in `/contracts`)
```

```bash
npm run dev
```

→ `http://localhost:3000`

---

<sub>Built for educational and portfolio purposes.</sub>
