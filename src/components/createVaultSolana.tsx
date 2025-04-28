import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import idl from "@/utils/solanaVaultIDL.json";
import { readContract } from "wagmi/actions";
import { wagmiConfig } from "./Providers";
import { erc20Abi, Hex } from "viem";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { FormValues } from "./vault/vaultCardCreate";

export async function CreateVaultSolana(
  formValues: FormValues,
  wallet: WalletContextState
) {
  const getTokenDecimals = async (tokenAddress: Hex) => {
    const decimals = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: "decimals",
    });
    return decimals;
  };

  async function getContract(address: Hex) {
    const name = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address,
      functionName: "name",
    });
    const symbol = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address,
      functionName: "symbol",
    });
    return { name, symbol };
  }

  try {
    if (!wallet.publicKey) {
      alert("Please connect your wallet");
      return;
    }

    const tokenDecimals = await getTokenDecimals(formValues.assetToken);

    const tokenData = await getContract(formValues.assetToken);
    const { name: assetTokenName, symbol: assetTokenSymbol } = tokenData;

    const connection = new Connection("https://api.devnet.solana.com");
    const provider = new AnchorProvider(connection, wallet, {});
    const programId = new PublicKey(
      "98p4PNqAJTskdbDY75Mqt1RPUGLu7NKnHYbiYS8HZ8HY"
    );

    const program = new Program(idl, programId, provider);

    const assetToken = new PublicKey(formValues.assetToken);
    const salt = formValues.salt;

    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), assetToken.toBuffer(), Buffer.from(String(salt))],
      programId
    );

    const vaultAssetAccount = await PublicKey.findProgramAddressSync(
      [
        wallet.publicKey!.toBuffer(),
        programId.toBuffer(),
        assetToken.toBuffer(),
      ],
      new PublicKey("ATokenGPv7DoD2v3aHkRk2xzP6GB49joTVW32kLZjjgU")
    );

    const tx = await program.methods
      .createVault(
        new BN(formValues.startDate!.getTime() / 1000),
        new BN(formValues.endDate!.getTime() / 1000),
        new BN(formValues.minDeposit),
        new BN(formValues.maxDeposit),
        salt
      )
      .accounts({
        assetToken: assetToken,
        vault: vaultPda,
        vaultAssetAccount: vaultAssetAccount[0],
        user: wallet.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: new PublicKey(
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        ),
        associatedTokenProgram: new PublicKey(
          "ATokenGPv7DoD2v3aHkRk2xzP6GB49joTVW32kLZjjgU"
        ),
      })
      .rpc();

    console.log("Vault created tx:", tx);

    await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: vaultPda.toBase58(),
        vaultName: formValues.vaultName,
        vaultLogo: formValues.vaultLogo,
        bannerUrl: formValues.bannerUrl,
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        chainId: 1399811149,
        assetTokenDecimals: tokenDecimals,
        assetTokenName,
        assetTokenSymbol,
        assetTokenAddress: formValues.assetToken,
      }),
    });

    alert("Vault successfully created on Solana!");
  } catch (error) {
    console.error(error);
    alert("Error creating Vault on Solana");
  }
}
