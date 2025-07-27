// src/services/solutionService.ts
import { ethers } from "ethers";
import { getDAOContract } from "./daoContracts.js";
import type { Solution } from "../types/solution";

export const submitSolution = async (problemId: number, content: string) => {
  const contract = await getDAOContract();
  const tx = await contract.submitSolution(problemId, content);
  await tx.wait();
};

export const voteSolution = async (problemId: number, solutionIndex: number) => {
  const contract = await getDAOContract();
  const tx = await contract.voteSolution(problemId, solutionIndex);
  await tx.wait();
};

export const fetchSolutions = async (problemId: number) => {
  const contract = await getDAOContract();
  const count = await contract.getSolutionsCount(problemId);
  const solutionIndices = Array.from({ length: Number(count) }, (_, i) => i);

  const solutions = await Promise.all(
    solutionIndices.map(async (index) => {
      const s = await contract.getSolution(problemId, index);
      return {
        id: Number(s[0]),
        contributor: s[1],
        content: s[2],
        voteCount: Number(s[3]),
        accepted: s[4],
        index: index, // penting untuk vote karena vote butuh index
      };
    })
  );

  return solutions;
};
