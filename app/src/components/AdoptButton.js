import { Button, Tooltip } from "@chakra-ui/react";
import { useAccount, useSigner } from "wagmi";
import { getAnimalMetadataQuery } from "../utils/metadata";
import { useContract, useProvider } from "wagmi";
import * as ethers from "ethers";
import adoptABI from "../abi/Adopt.json";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

const AdoptButton = (props) => {
  const { isConnected } = useAccount();
  const provider = useProvider();
  const [{ data: signData }, getSigner] = useSigner();
  const contract = useContract({
    addressOrName: "0x750a152Ed5ea3499769DDa973F599D27d56AeaBc",
    contractInterface: adoptABI.abi,
    signerOrProvider: getSigner(),
  });

  // get metadata
  const metadataSql = getAnimalMetadataQuery(
    process.env.REACT_APP_ANIMAL_TRAITS_TABLE_NAME,
    props.id
  );

  const tokenUri = `https://testnet.tableland.network/query?mode=list&s=${encodeURIComponent(
    metadataSql
  )}`;

  const { config } = usePrepareContractWrite({
    addressOrName: "0x750a152Ed5ea3499769DDa973F599D27d56AeaBc",
    contractInterface: adoptABI.abi,
    functionName: "mintNFT",
    overrides: {
      value: ethers.utils.parseEther("0.15"),
    },
    args: ["0x44D54D4Df70054d674F86E077C464623a83f4114", tokenUri],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const adoptDog = async () => {
    console.log(data);
    //const results = await write.();
    //console.log(results);
  };

  return (
    <>
      <Tooltip
        label="Connect wallet first"
        shouldWrapChildren
        isDisabled={isConnected}
      >
        <Button
          disabled={!isConnected}
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
