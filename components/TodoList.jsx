import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Center,
    Stack,
  } 
  from "@chakra-ui/react";
  import React, { useEffect } from "react";
  import useAuth from "../hooks/useAuth";
  import { collection, onSnapshot, query, where } from "firebase/firestore";
  import { db } from "../firebase";
  import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
  import { deleteTodo, toggleTodoStatus } from "../api/todo";
  
  const TodoList = () => {
    const [todos, setTodos] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
  
    const refreshData = () => {
      if (!user) {
        setTodos([]);
        return;
      }
      const q = query(collection(db, "todo"), where("user", "==", user.uid));
      onSnapshot(q, (querySnapshot) => {
        let ar = [];
        querySnapshot.docs.forEach((doc) => {
          ar.push({ id: doc.id, ...doc.data() });
        });
        setTodos(ar);
      });
    };
  
    useEffect(() => {
      refreshData();
    }, [user]);
  
    const handleTodoDelete = async (id) => {
      if (confirm("Are you sure you wanna delete this todo?")) {
        deleteTodo(id);
        toast({ title: "Todo deleted successfully", status: "success" });
      }
    };
  
    const handleToggle = async (id, status) => {
      const newStatus = status === "completed" ? "pending" : "completed";
      await toggleTodoStatus({ docId: id, status: newStatus });
      toast({
        title: `Todo marked ${newStatus}`,
        status: newStatus === "completed" ? "success" : "warning",
      }
    );
    };
  
    return (
      <Center mt={10} flexDirection="column">
        <Heading as="h1" size="2xl" color="purple.500" mb={8}>
          Your TODOs
        </Heading>
        <Box w="80%">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
            {todos &&
              todos.map((todo) => (
                <Box
                  key={todo.id}
                  p={6}
                  borderRadius="lg"
                  boxShadow="2xl"
                  bgGradient="linear(to-r, purple.400, gray.100)"
                  transition="0.2s"
                  _hover={{ boxShadow: "lg" }}
                >
                  <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Heading as="h3" fontSize={"xl"}>
                      {todo.title}
                    </Heading>
                    <Stack direction="row" spacing={2}>
                      <Badge
                        color="red.500"
                        bg="inherit"
                        transition="0.2s"
                        _hover={{
                          bg: "inherit",
                          transform: "scale(1.2)",
                        }}
                        onClick={() => handleTodoDelete(todo.id)}
                        cursor="pointer"
                      >
                        <FaTrash />
                      </Badge>
                      <Badge
                        color={todo.status === "pending" ? "gray.500" : "green.500"}
                        bg="inherit"
                        transition="0.2s"
                        _hover={{
                          bg: "inherit",
                          transform: "scale(1.2)",
                        }}
                        onClick={() => handleToggle(todo.id, todo.status)}
                        cursor="pointer"
                      >
                        {todo.status === "pending" ? <FaToggleOff /> : <FaToggleOn />}
                      </Badge>
                    </Stack>
                  </Stack>
                  <Badge
                    float="right"
                    opacity="0.8"
                    bg={todo.status === "pending" ? "yellow.500" : "green.300"}
                    mb={4}
                  >
                    {todo.status}
                  </Badge>
                  <Text>{todo.description}</Text>
                </Box>
              ))}
          </SimpleGrid>
        </Box>
      </Center>
    );
  };
  
  export default TodoList;