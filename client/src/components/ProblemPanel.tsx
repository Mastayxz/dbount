// src/components/ProblemPanel.tsx
import React from "react";
import type { Problem } from "../types/problem";
import ProblemItem from "./problemItem";

interface ProblemPanelProps {
  problems: Problem[];
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ProblemPanel: React.FC<ProblemPanelProps> = ({
  problems,
  onUpdate,
  onDelete,
}) => {
  return (
    <ul className="grid gap-4">
      {problems.map((problem) => (
        <ProblemItem
          key={problem.id}
          problem={problem}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ProblemPanel;
