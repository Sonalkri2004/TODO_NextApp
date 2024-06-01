import React from "react";
import { Box, Button, Link, Text, useColorMode, Flex, VStack, Heading } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Box 
      w="100%" 
      p={4} 
      bg={colorMode === "dark" ? "gray.800" : "white"} 
      shadow="lg" 
      position="relative"
      zIndex="1000"
      boxShadow="lg"
      _hover={{ boxShadow: "2xl" }}
    >
      <Flex 
        direction={{ base: "column", sm: "row" }} 
        alignItems="center" 
        justifyContent="space-between" 
        maxW="1200px" 
        mx="auto"
        position="relative"
      >
        <Heading 
          size="lg" 
          color="purple.500" 
          textAlign={{ base: "center", sm: "center" }}
          mb={{ base: 2, sm: 0 }}
          mt={{ base: 2, sm: 0 }}
        >
          TODO APP
        </Heading>
        <Button 
          onClick={toggleColorMode} 
          ml={{ base: 0, sm: "auto" }}
          mb={{ base: 2, sm: 0 }}
          bg="transparent"
          _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.200" }}
        >
          {colorMode === "dark" ? <FaSun /> : <FaMoon />}
        </Button>
        {isLoggedIn ? (
          <VStack spacing={2} alignItems={{ base: "center", sm: "flex-start" }} mb={{ base: 2, sm: 0 }}>
            <Text color="green.500" fontSize={{ base: "md", sm: "lg" }}>
              {user.email}
            </Text>
            <Link color="red.500" fontSize={{ base: "md", sm: "lg" }} onClick={() => auth.signOut()}>
              Logout
            </Link>
          </VStack>
        ) : (
          <Button
            leftIcon={<FaGoogle />}
            onClick={handleAuth}
            bgGradient="linear(to-r, purple.400, purple.600)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, purple.500, purple.700)" }}
          >
            Login with Google
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Auth;