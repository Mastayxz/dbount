import React, { useEffect, useState } from "react";
import {
  fetchAllProblems,
  submitProblem,
  updateProblem,
  deleteProblem,
} from "../services/problemService";
import type { Problem } from "../types/problem";
import ProblemItem from "../components/problemItem";

const SubmitProblem: React.FC = () => {
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [account, setAccount] = useState<string | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editReward, setEditReward] = useState("");

  useEffect(() => {
    fetchProblems();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Metamask tidak ditemukan.");
    try {
      const [selectedAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(selectedAccount);
    } catch (error) {
      console.error("Gagal konek wallet:", error);
      alert("Gagal konek ke wallet.");
    }
  };

  const fetchProblems = async () => {
    try {
      const data = await fetchAllProblems();
      setProblems(data);
    } catch (err) {
      console.error("Gagal fetch masalah:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return alert("Hubungkan wallet terlebih dahulu.");
    try {
      await submitProblem(description, reward);
      alert("Masalah berhasil ditambahkan.");
      setReward("");
      setDescription("");
      fetchProblems();
    } catch (err) {
      console.error("Gagal submit:", err);
      alert("Terjadi kesalahan saat submit.");
    }
  };

  const handleUpdate = (id: number) => {
    const problem = problems.find((p) => p.id === id);
    if (!problem) return;
    setEditId(id);
    setEditDescription(problem.description);
    setEditReward(problem.reward); // tambahkan ini
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus masalah ini?")) return;
    try {
      await deleteProblem(id);
      alert("Masalah berhasil dihapus.");
      fetchProblems();
    } catch (err) {
      console.error("Gagal delete:", err);
      alert("Gagal menghapus masalah.");
    }
  };

  const handleModalUpdate = async () => {
    if (!editId) return;
    try {
      await updateProblem(editId, editDescription, editReward); // kirim reward
      alert("Masalah berhasil diperbarui.");
      setShowModal(false);
      setEditId(null);
      setEditDescription("");
      setEditReward("");
      fetchProblems();
    } catch (err) {
      console.error("Gagal update:", err);
      alert("Gagal memperbarui masalah.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        {!account ? (
          <button onClick={connectWallet} className="btn">
            Connect Wallet
          </button>
        ) : (
          <p>Wallet: {account}</p>
        )}
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Buat Masalah</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Deskripsi masalah"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Reward (ETH)"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button type="submit" className="btn" disabled={!account}>
            Submit
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Daftar Masalah</h2>
        {problems.length === 0 ? (
          <p>Belum ada masalah.</p>
        ) : (
          <ul className="space-y-4">
            {problems.map((p) => (
              <ProblemItem
                key={p.id}
                problem={p}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold mb-4">Edit Masalah</h2>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={4}
              className="w-full border p-2 rounded mb-4"
            />
            <input
              type="number"
              placeholder="Reward (ETH)"
              value={editReward}
              onChange={(e) => setEditReward(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleModalUpdate}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitProblem;
