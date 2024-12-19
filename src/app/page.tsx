"use client";

import { ConnectButton, TransactionButton } from "thirdweb/react";
import { client } from "./client";
import { defineChain, toWei, prepareTransaction } from "thirdweb";

export default function Home() {

  const chain = defineChain(1952959480); // chain ID for Lumia Testnet

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
            accountAbstraction={{ chain, sponsorGas: true }}
          />
          <div className="w-10"></div>
          <TransactionButton
            transaction={() => {
              // Create a transaction object and return it
              const transaction = prepareTransaction({
                  to: "0x4c5e2A9382842B4BE9cc08174131EDCfB1C9Da1A",
                  chain,
                  client: client,
                  value: toWei("0.00005"), // changing to lower value since I have 0.0001
              });
              return transaction;
            }}
            onTransactionSent={(result) => {
              console.log("Transaction submitted", result.transactionHash);
            }}
            onTransactionConfirmed={(receipt) => {
              console.log("Transaction confirmed", receipt.transactionHash);
            }}
            onError={(error) => {
              console.error("Transaction error", error);
            }}
          >
            Transfer
          </TransactionButton>
        </div>
      </div>
    </main>
  );
}
