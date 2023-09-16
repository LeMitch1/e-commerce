import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  FormHelperText,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchLogin } from "../API";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  async function handleLogin(e) {
    e.preventDefault();
    auth.login(username);
    navigate(redirectPath, { replace: true });

    const user = await fetchLogin(username, password);
    setUser(user);
    console.log(user.token);
    console.log(username, password);

    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    localStorage.setItem("userToken", JSON.stringify(user.token));
  }

  const isError = username === "";
  const validPassword = password.length < 7;

  useEffect(() => {
    setTimeout(() => setIsFetching(false), 250);
  }, []);

  return (
    <>
      {isFetching ? (
        <Stack
          paddingTop={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner boxSize="12em" size="xl" color="blue.500" thickness="4px" />
        </Stack>
      ) : (
        <Flex
          minH={"87vh"}
          align={"center"}
          justify={"center"}
          bg="gray.50"
          as="form"
          onSubmit={handleLogin}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool features
              </Text>
            </Stack>
            <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="email" isInvalid={isError} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {!isError ? (
                    <FormHelperText>Please enter your username</FormHelperText>
                  ) : (
                    <FormErrorMessage>Username is required.</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl id="password" isInvalid={validPassword} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!validPassword ? (
                    <FormHelperText>Enter your password</FormHelperText>
                  ) : (
                    <FormErrorMessage>
                      Password must be at least 8 characters
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Text>Don&apos;t have an account?</Text>
                    <Text color={"blue.400"}>Sign up here</Text>
                  </Stack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
    </>
  );
}
