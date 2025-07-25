import React from "react";
import type { Problem } from "../types/problem";

const ProblemItem: React.FC<{
  problem: Problem;
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}> = ({ problem, onUpdate, onDelete }) => {
  return (
    <li className="p-4 border rounded shadow">
      <p><strong>ID:</strong> {problem.id}</p>
      <p><strong>Deskripsi:</strong> {problem.description}</p>
      <p><strong>Reward:</strong> {problem.reward} ETH</p>
      <p><strong>Pemilik:</strong> {problem.owner}</p>
      <p><strong>Status:</strong> {problem.isResolved ? "Selesai" : "Belum selesai"}</p>

      <div className="flex gap-2 mt-2">
        <button onClick={() => onUpdate?.(problem.id)} className="text-blue-600">Edit</button>
        <button onClick={() => onDelete?.(problem.id)} className="text-red-600">Delete</button>
      </div>
    </li>
  );
};

export default ProblemItem;
