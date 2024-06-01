import React from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";

const AddTodo = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("pending");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a todo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const todo = {
      title,
      description,
      status,
      userId: user.uid,
    };
    await addTodo(todo);
    setIsLoading(false);
    setTitle("");
    setDescription("");
    setStatus("pending");
    toast({ title: "Todo created successfully", status: "success" });
  };

  // Using Chakra UI's color mode values for better theme support
  const inputBg = useColorModeValue("white", "gray.700");
  const boxBg = useColorModeValue("gray.100", "gray.800");
  const buttonBg = useColorModeValue("purple.200", "purple.600");
  const buttonHoverBg = useColorModeValue("purple.600", "purple.400");

  return (
    <Box
      display="flex"
      justifyContent="center"
      
      minHeight="40vh"
    
      p={8}
      
    >
      <Box
        w={{ base: "90%", md: "60%", lg: "40%" }}
        bg={boxBg}
        p={5}
        borderRadius="md"
        boxShadow="md"
      >
        <Stack spacing={4}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            bg={inputBg}
            focusBorderColor="purple.500"
            borderRadius="md"
            border="2px"
            borderColor="purple.500"
            _hover={{
              borderColor: "purple.600",
              boxShadow: "0 0 5px purple",
            }}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            bg={inputBg}
            focusBorderColor="purple.500"
            borderRadius="md"
            border="2px"
            borderColor="purple.500"
            _hover={{
              borderColor: "purple.600",
              boxShadow: "0 0 5px purple",
            }}
          />
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            bg={inputBg}
            focusBorderColor="purple.500"
            borderRadius="md"
            border="2px"
            borderColor="purple.500"
            _hover={{
              borderColor: "purple.600",
              boxShadow: "0 0 5px purple",
            }}
          >
            <option value="pending" style={{ color: "yellow", fontWeight: "bold" }}>
              Pending ⌛
            </option>
            <option value="completed" style={{ color: "green", fontWeight: "bold" }}>
              Completed ✅
            </option>
          </Select>
          <Button
            onClick={handleTodoCreate}
            disabled={title.length < 1 || description.length < 1 || isLoading}
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg }}
            borderRadius="md"
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddTodo;