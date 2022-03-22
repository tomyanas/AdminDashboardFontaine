import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Eye } from "../../../assets/icons/Eye";
import { EyeOff } from "../../../assets/icons/EyeOff";

export const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <Input
      {...field}
      {...props}
      bg="#EEEEEE"
      borderRadius={0}
      border="none"
      _placeholder={{ color: "#777", fontWeight: 600 }}
      _focus={{ border: "2px solid #51a6f5" }}
    />
  );
};
export const CustomTextarea = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <Textarea
      {...field}
      {...props}
      bg="#EEEEEE"
      borderRadius={0}
      border="none"
      _placeholder={{ color: "#777", fontWeight: 600 }}
      _focus={{ border: "2px solid #51a6f5" }}
    />
  );
};

export const CustomSelect = ({
  field,
  form,
  children,
  ...props
}) => {
  return (
    <Select
      {...field}
      {...props}
      bg="#EEEEEE"
      color="#161f6a"
      fontWeight={700}
      _focus={{ border: "2px solid #51a6f5" }}
      borderRadius={0}
      // border="none"
    >
      {children}
    </Select>
  );
};

export const CustomInputPassword = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const [show, setShow] = useState(false);
  return (
    <InputGroup size="md">
      <Input
        {...field}
        {...props}
        bg="#EEEEEE"
        borderRadius={0}
        border="none"
        _placeholder={{ color: "#777", fontWeight: 600 }}
        _focus={{ border: "2px solid #51a6f5" }}
        type={show ? "text" : "password"}
        // autoComplete={true}
      />
      <InputRightElement width="4.5rem">
        <Button
          p={2}
          fontSize={"10px"}
          color="#aaa"
          bg="transparent"
          onClick={() => setShow(!show)}
          _focus={{ outline: "none" }}
          _hover={{ bg: "transparent", color: "#777" }}
          _active={{ bg: "transparent", color: "#777" }}
        >
          {show ? <EyeOff /> : <Eye />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export const CustomButton = ({ content, color, ...props }) => {
  return (
    <Button
      {...props}
      colorScheme={color || "blue"}
      borderRadius={3}
      width="100%"
      style={{ marginTop: 15 }}
      _focus={{ outline: "none" }}
    >
      {content}
    </Button>
  );
};
