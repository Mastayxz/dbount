// src/pages/Bounty.tsx
import React, { useEffect, useState } from "react";
import { fetchAllProblems } from "../services/problemService";
import type { Problem } from "../types/problem";
import ProblemPanel from "../components/ProblemPanel";

import BoxBounty from "../components/BoxBounty";

const Bounty: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    fetchAllProblems().then(setProblems);
  }, []);

  return (
    <>
    <div className="rounded-xl bg-gray-700 w-auto h-full"> 
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 items-center gap-4 mx-5 my-5 p-5">
        <BoxBounty >

        </BoxBounty>
        <ProblemPanel problems={problems} />
      </div>
    </div>
    
    </>
  );
};

export default Bounty;
