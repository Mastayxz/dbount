// src/services/problemService.ts
import { ethers } from "ethers";
import { getDAOContract } from "./daoContracts.js";
import type { Problem } from "../types/problem";

export const fetchAllProblems = async (): Promise<Problem[]> => {
  const contract = await getDAOContract();
  const count = await contract.problemCounter();
  const ids = Array.from({ length: count }, (_, i) => i + 1);
  
  const problems = await Promise.all(
    ids.map(async (id) => {
      const p = await contract.problems(id);
      return {
        id: Number(p.id),
        owner: p.owner,
        description: p.description,
        reward: ethers.utils.formatEther(p.reward),
        isResolved: p.isResolved,
      };
    })
  );

  return problems;
};

export const submitProblem = async (description: string, reward: string) => {
  const contract = await getDAOContract();
  const tx = await contract.createProblem(description, {
    value: ethers.utils.parseEther(reward),
  });
  await tx.wait();
};

export async function updateProblem(
  id: number,
  description: string,
  reward: string
) {
  const contract = await getDAOContract();

  const tx = await contract.updateProblem(id, description, {
    value: ethers.utils.parseEther(reward),
  });

  await tx.wait();
}

export const deleteProblem = async (problemId: number) => {
  const contract = await getDAOContract();
  const tx = await contract.deleteProblem(problemId);
  await tx.wait();
};
