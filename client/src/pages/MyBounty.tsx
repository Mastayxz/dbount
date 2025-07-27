// src/pages/MyBounty.tsx
import React, { useEffect, useState } from "react";
import {
  fetchAllProblems,
  updateProblem,
  deleteProblem,
} from "../services/problemService";
import type { Problem } from "../types/problem";
import ProblemPanel from "../components/ProblemPanel";

const MyBounty: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [account, setAccount] = useState<string>(""); // ganti dengan Metamask logic aslinya

  useEffect(() => {
    async function fetchData() {
      const all = await fetchAllProblems();
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(acc[0]);

      // hanya tampilkan bounty milik akun ini
      const my = all.filter(
        (p) => p.owner.toLowerCase() === acc[0].toLowerCase()
      );
      setProblems(my);
    }
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteProblem(id);
    setProblems((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: number) => {
    alert(`Update untuk id ${id} (bisa arahkan ke modal nanti)`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bounty Saya</h1>
      <ProblemPanel
        problems={problems}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MyBounty;
