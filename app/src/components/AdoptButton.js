import { Button, Tooltip } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { getAnimalMetadataQuery } from "../utils/metadata";
import { useContract, useProvider } from "wagmi";
import adoptABI from "../abi/Adopt.json";

import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";

const AdoptButton = (props) => {
  const { isConnected } = useAccount();
  const provider = useProvider();
  const contract = useContract({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: adoptABI.abi,
    signerOrProvider: provider,
  });

  // get metadata
  const metadataSql = getAnimalMetadataQuery(
    process.env.REACT_APP_ANIMAL_TRAITS_TABLE_NAME,
    props.id
  );

  const tokenUri = `https://testnet.tableland.network/query?mode=list&s=${encodeURIComponent(
    metadataSql
  )}`;

  /*
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: adoptABI.abi,
    functionName: "mintNFT",
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
*/
  const adoptDog = async () => {
    // const totals = await contract.releaseable();
    //const results = await write();
    //console.log(contract.functions);
    console.log(
      await contract["totalReleased(address)"](
        "0x0D5CC855b24e3D7f4430bBfD52b04C9d594ACE31"
      )
    );
    // const nft = await contract.mintNFT(
    //
    // );
    // //console.log(await contract.getCost());
    // console.log(nft);
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
