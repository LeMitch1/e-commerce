import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const isError = username === "";

  const validPassword = password.length > 7;

  // WORK ON PASSWORD

  return (
    <>
      <FormControl isInvalid={isError}>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={username} onChange={handleUserNameChange} />
        {!isError ? (
          <FormHelperText>
            Enter the username you'd like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Username is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={validPassword}>
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
