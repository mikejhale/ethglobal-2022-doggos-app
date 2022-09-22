import { useEffect, useState } from "react";
import { Button, Tooltip } from "@chakra-ui/react";
import { getAnimalMetadataQuery } from "../utils/metadata";
import { useAccount, useContract, useProvider } from "wagmi";
import * as ethers from "ethers";
import { adoptAnimal } from "../utils/animal";
import adoptABI from "../abi/Adopt.json";

import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";

const AdoptButton = (props) => {
  const [isMinting, setIsMinting] = useState(false);
  const { isConnected } = useAccount();
  const provider = useProvider();
  // const contract = useContract({
  //   addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
  //   contractInterface: adoptABI.abi,
  //   signerOrProvider: provider,
  // });

  // get metadata
  const metadataSql = getAnimalMetadataQuery(
    process.env.REACT_APP_ANIMAL_TRAITS_TABLE_NAME,
    props.id
  );

  const tokenUri = `https://testnet.tableland.network/query?mode=list&s=${encodeURIComponent(
    metadataSql
  )}`;

  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: adoptABI.abi,
    functionName: "mintNFT",
    args: ["0x44D54D4Df70054d674F86E077C464623a83f4114", tokenUri],
    overrides: {
      value: props.price,
    },
  });

  const {
    data,
    isLoading,
    isSuccess,
    write: writeMint,
  } = useContractWrite({
    ...config,
    onSuccess(data) {
      adoptAnimal(props.id);
    },
    onSettled(data, error) {
      props.isMinting(false);
      setIsMinting(false);
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const adoptDog = async () => {
    setIsMinting(true);
    props.isMinting(true);
    writeMint();
  };

  return (
    <>
      <Tooltip
        label="Connect wallet first"
        shouldWrapChildren
        isDisabled={isConnected}
      >
        <Button
          disabled={!isConnected || isMinting}
          onClick={adoptDog}
          mt={10}
          w={"full"}
          bg={"green.500"}
          color={"white"}
          rounded={"xl"}
          _hover={{
            bg: "green.400",
          }}
          _focus={{
            bg: "green.400",
          }}
        >
          Adopt {props.name}
        </Button>
      </Tooltip>
    </>
  );
};

export default AdoptButton;
