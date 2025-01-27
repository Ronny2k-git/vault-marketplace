export const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "assetToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint40",
        name: "salt",
        type: "uint40",
      },
    ],
    name: "VaultCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "VAULT_IMPLEMENTATION",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "assetToken", type: "address" },
      { internalType: "uint40", name: "startDate", type: "uint40" },
      { internalType: "uint40", name: "endDate", type: "uint40" },
      { internalType: "uint256", name: "minDeposit", type: "uint256" },
      {
        internalType: "uint256",
        name: "maxDepositPerWallet",
        type: "uint256",
      },
      { internalType: "uint40", name: "salt", type: "uint40" },
    ],
    name: "createVault",
    outputs: [{ internalType: "address", name: "vault", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
