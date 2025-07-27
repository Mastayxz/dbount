import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useEffect } from "react";


type Props = {
  account: string | null;
  setAccount: (account: string) => void;
};

const NavBar = ({ account, setAccount }: Props) => {
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Metamask tidak ditemukan.");
      return;
    }
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

  // Cek akun aktif kalau sudah login sebelumnya
  useEffect(() => {
    const checkConnectedWallet = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Gagal cek akun:", error);
        }
      }
    };
    checkConnectedWallet();
  }, []);

  return (
    <Navbar fluid rounded className="">
      <NavbarBrand href="#">
        <img src="/assets/logo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          dbounT
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {account ? (
          <Button color="gray" className="text-sm cursor-default">
            {account.slice(0, 6)}...{account.slice(-4)}
          </Button>
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavBar;
