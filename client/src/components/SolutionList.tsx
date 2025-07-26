// src/components/Solution/SolutionList.tsx
import React, { useEffect, useState } from "react";
import { fetchSolutions, voteSolution } from "../services/SolutionServices";

interface SolutionListProps {
  problemId: number;
}

const SolutionList: React.FC<SolutionListProps> = ({ problemId }) => {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState<number | null>(null);

  const loadSolutions = async () => {
    setLoading(true);
    const res = await fetchSolutions(problemId);
    setSolutions(res);
    setLoading(false);
  };

  useEffect(() => {
    loadSolutions();
  }, [problemId]);

  const handleVote = async (index: number) => {
    try {
      setVoting(index);
      await voteSolution(problemId, index);
      await loadSolutions();
    } catch (error) {
      console.error("Voting failed", error);
    } finally {
      setVoting(null);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Solutions</h2>
      {loading ? (
        <p>Loading solutions...</p>
      ) : (
        solutions.map((s, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <p className="mb-2 text-gray-800">{s.content}</p>
            <p className="text-sm text-gray-500">Votes: {s.voteCount}</p>
            <button
              className="mt-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => handleVote(s.index)}
              disabled={voting === s.index}
            >
              {voting === s.index ? "Voting..." : "Vote"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SolutionList;
