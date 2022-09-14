import { Button } from "@chakra-ui/react";

const AdoptButton = (props) => {
  const adoptDog = () => {
    console.log(props.id);
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
