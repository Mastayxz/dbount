// src/pages/Bounty.tsx
import React, { useEffect, useState } from "react";
import { fetchAllProblems } from "../services/problemService";
import type { Problem } from "../types/problem";
import ProblemPanel from "../components/ProblemPanel";

const Bounty: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    fetchAllProblems().then(setProblems);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar Semua Bounty</h1>
      <ProblemPanel problems={problems} />
    </div>
  );
};

export default Bounty;
