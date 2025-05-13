import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider, BN, Idl } from "@coral-xyz/anchor";
import idlJson from "@/utils/solanaVaultIDL.json";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { FormValues } from "./vault/vaultCardCreate";
import { getMint } from "@solana/spl-token";

//Token From Solana devnet: Es9vMFrzC1i3nYYkrsd7DFxZbC1jR8zjXvqz2ZV7EqnS

export async function CreateVaultSolana(
  formValues: FormValues,
  wallet: WalletContextState
) {
  const connection = new Connection("https://api.devnet.solana.com");

  const idl = (idlJson as any).default ?? (idlJson as any as Idl);

  const getTokenDecimals = async (tokenAddress: string) => {
    const mintInfo = await getMint(connection, new PublicKey(tokenAddress));
    return mintInfo.decimals;
  };

  const anchorWallet = {
    publicKey: wallet.publicKey,
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions,
  };

  try {
    if (!wallet.publicKey) {
      alert("Please connect your wallet");
      return;
    }

    const tokenDecimals = await getTokenDecimals(formValues.assetToken);

    const assetTokenName = "USDC";
    const assetTokenSymbol = "USDC";

    const provider = new AnchorProvider(connection, anchorWallet, {});
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
    // console.error(error);
    // alert("Error creating Vault on Solana");
    console.error("Error creating Vault on Solana", error);
  }
}
