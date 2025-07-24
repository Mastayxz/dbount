import React, { useState } from "react";
import { ethers } from "ethers";
import { getDAOContract } from "../services/daoContracts.js";

function SubmitProblem() {
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [account, setAccount] = useState(null);

  // Function to connect to the user's wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Wallet connect error:", err);
        alert("Gagal konek ke wallet.");
      }
    } else {
      alert("Metamask tidak ditemukan.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (typeof window.ethereum === "undefined") {
      alert("Metamask belum terpasang.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const contract = await getDAOContract();
      const tx = await contract.createProblem(description, {
        value: ethers.utils.parseEther(reward),
      });
      await tx.wait();

      alert("Problem berhasil dibuat!");
      setDescription("");
      setReward("");
    } catch (err) {
      console.error("Error creating problem:", err);
      alert("Gagal submit masalah.");
    }
  };

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Wallet: {account}</p>
      )}

      <form onSubmit={handleSubmit}>
        <h2>Buat Masalah</h2>
        <textarea
          placeholder="Deskripsi masalah"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <br />
        <input
          type="number"
          placeholder="Reward (ETH)"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
        <br />
        <button type="submit" disabled={!account}>
          Submit Masalah
        </button>
      </form>
    </div>
  );
}

export default SubmitProblem;
