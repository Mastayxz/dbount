// src/services/daoContracts.js

import { ethers } from "ethers";
import DAO from "../abi/DAO.json";

const DAO_ABI = DAO.abi;
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ganti dengan benar

export const getDAOContract = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, DAO_ABI, signer);
  } else {
    alert("Please install MetaMask to use this app.");
  }
};
