import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const isError = username === "";

  const validPassword = password.length < 7;

  return (
    <>
      <FormControl isInvalid={isError} isRequired>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={username} onChange={handleUsernameChange} />
        {!isError ? (
          <FormHelperText>Please enter your username</FormHelperText>
        ) : (
          <FormErrorMessage>Username is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={validPassword} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {!validPassword ? (
          <FormHelperText>Enter your password</FormHelperText>
        ) : (
          <FormErrorMessage>
            Password must be at least 8 characters
          </FormErrorMessage>
        )}
      </FormControl>
    </>
  );
}
