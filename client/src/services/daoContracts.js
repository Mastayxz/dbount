// src/services/daoContracts.js

import { ethers } from "ethers";
import DAO from "../abi/DAO.json";

const DAO_ABI = DAO.abi;
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // ganti dengan benar

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
