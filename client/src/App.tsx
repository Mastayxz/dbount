import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./lyouts/SideBar";
import NavBar from "./lyouts/Navbar";
import SubmitProblem from "./pages/submitProblem";
import Bounty from "./pages/Bounty"; // 🔥
import MyBounty from "./pages/MyBounty";
import ProblemDetail from "./pages/ProblemDetail";

function App() {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
        {/* Navbar di atas */}
        <NavBar account={account} setAccount={setAccount} />

        {/* Konten utama: sidebar + content */}
        <div className="flex flex-1">
          {/* Sidebar kiri */}
          <div className="w-64  p-4 shadow">
            <SideBar />
          </div>

          {/* Konten di tengah */}
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Bounty />} />
              <Route
                path="/submit"
                element={<SubmitProblem account={account} />}
              />
              <Route
                path="/my-bounty"
                element={<MyBounty account={account} />}
              />
              <Route
                path="/problems/:id"
                element={<ProblemDetail problemId={0} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
