import { Button } from "@chakra-ui/react";
import { getAnimalMetadataQuery } from "../utils/metadata";

const AdoptButton = (props) => {
  const adoptDog = () => {
    const animalMetadataQuery = getAnimalMetadataQuery(
      process.env.REACT_APP_ANIMAL_TRAITS_TABLE_NAME,
      props.id
    );

    console.log(animalMetadataQuery);
  };

  return (
    <Button
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
  );
};

export default AdoptButton;
