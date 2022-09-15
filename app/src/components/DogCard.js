import React, { useState } from "react";
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
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaDog, FaEthereum } from "react-icons/fa";
import DogTraits from "./DogTraits";
import AdoptButton from "./AdoptButton";

const DogCard = (props) => {
  const [traitsOpen, setTraitsOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex p={4}>
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
          />
        </AspectRatio>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {!props.minted && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Adoptable
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
            0.1
            <Icon as={FaEthereum} />
          </Flex>

          <AdoptButton id={props.id} name={props.name} />
        </Box>
      </Box>
    </Flex>
  );
};

export default DogCard;
