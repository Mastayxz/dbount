import React from "react";
import { Link } from "react-router-dom";
import type { Problem } from "../types/problem";

const ProblemItem: React.FC<{
  problem: Problem;
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}> = ({ problem, onUpdate, onDelete }) => {
  return (
    <li className="border rounded-xl shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition">
      <Link to={`/problems/${problem.id}`} className="flex gap-4 p-4 block">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
            {problem.owner.slice(2, 4).toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {problem.owner.slice(0, 6)}...{problem.owner.slice(-4)}
              </p>
              <p className="mt-1 text-base text-gray-900 dark:text-white">
                {problem.description}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4">
            <span>
              Reward: <strong>{problem.reward} ETH</strong>
            </span>
            <span>
              Status: {problem.isResolved ? "✅ Selesai" : "🕒 Belum selesai"}
            </span>
          </div>
        </div>
      </Link>

      {/* Tombol Edit/Delete di luar Link */}
      {(onUpdate || onDelete) && (
        <div className="px-4 pb-2 flex justify-end gap-2 text-sm">
          {onUpdate && (
            <button
              onClick={() => onUpdate(problem.id)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(problem.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </li>
  );
};

export default ProblemItem;
