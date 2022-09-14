import React from "react";
import { useAccount } from "wagmi";
import DogList from "../components/DogList";
const Home = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return <DogList />;
};

export default Home;
