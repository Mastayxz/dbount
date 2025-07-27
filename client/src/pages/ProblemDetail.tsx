import React, { useEffect, useState } from "react";
import SolutionForm from "../components/SolutionForm";
import SolutionList from "../components/SolutionList";
import type { Problem } from "../types/problem";
import { fetchAllProblems } from "../services/problemService";

const ProblemDetail = ({ problemId }: { problemId: number }) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const loadProblem = async () => {
      const allProblems = await fetchAllProblems();
      console.log("All problems:", allProblems);
      const selected = allProblems.find((p) => p.id === problemId);
      console.log("Selected problem:", selected);
      if (selected) setProblem(selected);
    };

    loadProblem();
  }, [problemId]);

  return (
    <div className="space-y-6">
      {problem && (
        <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {problem.owner.slice(0, 6)}...{problem.owner.slice(-4)}
          </p>
          <p className="text-base text-gray-900 dark:text-white mt-1">
            {problem.description}
          </p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4">
            <span>
              Reward: <strong>{problem.reward} ETH</strong>
            </span>
            <span>
              Status: {problem.isResolved ? "✅ Selesai" : "🕒 Belum selesai"}
            </span>
          </div>
        </div>
      )}

      <SolutionForm
        problemId={problemId}
        onSuccess={() => setReloadKey((prev) => prev + 1)}
      />
      <SolutionList key={reloadKey} problemId={problemId} />
    </div>
  );
};

export default ProblemDetail;
