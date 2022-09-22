import React, { useState, useEffect } from "react";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Tooltip,
  AspectRatio,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import * as ethers from "ethers";
import { FaDog, FaEthereum } from "react-icons/fa";
import DogTraits from "./DogTraits";
import AdoptButton from "./AdoptButton";

const DogCard = (props) => {
  const [traitsOpen, setTraitsOpen] = useState(false);
  const [isAdopted, setisAdopted] = useState(false);
  const [filter, setFilter] = useState("none");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setAdopted = (adopted) => {
    setisAdopted(adopted);
  };

  useEffect(() => {
    if (isAdopted) {
      setFilter("grayscale(100%)");
    }
  }, [isAdopted]);

  return (
    <Flex p={4} alignItems="flex-start">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {!props.minted && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="green.200"
          />
        )}

        <AspectRatio w="320px" ratio={1 / 1}>
          <Image
            src={props.image_url}
            alt={`Picture of ${props.name}`}
            roundedTop="lg"
            style={{ filter: filter }}
          />
        </AspectRatio>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {!props.minted && !isAdopted ? (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Adoptable
              </Badge>
            ) : (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="gray">
                Adopted!
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            >
              {props.name}
            </Box>
            <Tooltip
              label="View Details"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <Box>
                <IconButton
                  variant="outline"
                  icon={
                    <Icon
                      onClick={onOpen}
                      h={7}
                      w={7}
                      alignSelf={"center"}
                      as={FaDog}
                    />
                  }
                />
              </Box>
            </Tooltip>
            <DogTraits {...props} isOpen={isOpen} onClose={onClose} />
          </Flex>
          <Flex alignItems="center">
            {ethers.utils.formatEther(props.price)}
            <Icon as={FaEthereum} />
          </Flex>

          {!props.minted && !isAdopted ? (
            <AdoptButton
              id={props.id}
              name={props.name}
              price={props.price}
              setAdopted={setAdopted}
            />
          ) : null}
        </Box>
      </Box>
    </Flex>
  );
};

export default DogCard;
