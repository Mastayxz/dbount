// src/components/Solution/SolutionForm.tsx
import React, { useState } from "react";
import { submitSolution } from "../services/SolutionServices";

interface SolutionFormProps {
  problemId: number;
  onSuccess?: () => void;
}

const SolutionForm: React.FC<SolutionFormProps> = ({
  problemId,
  onSuccess,
}) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitSolution(problemId, content);
      setContent("");
      onSuccess?.();
    } catch (error) {
      console.error("Submit solution failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border p-2 rounded"
        rows={4}
        placeholder="Enter your solution..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Solution"}
      </button>
    </form>
  );
};

export default SolutionForm;
