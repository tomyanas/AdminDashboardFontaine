import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Eye } from '../../../assets/icons/Eye';
import { EyeOff } from '../../../assets/icons/EyeOff';

export const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <Input
      {...field}
      {...props}
      bg={useColorModeValue('#EEEEEE', '#2d3748')}
      borderRadius={0}
      // borderBottom={useColorModeValue('none', '1px solid #eeeeee')}
      border={useColorModeValue('none', '1px solid #eeeeee')}
      _placeholder={{
        color: useColorModeValue('#777777', '#aaaaaa'),
        fontWeight: 600,
      }}
      // border= '2px solid #51a6f5'
      _focus={{
        // border: useColorModeValue('2px solid #51a6f5', '2px 0 2x 0 solid #51a6f5'),
        border: '2px solid #51a6f5',
        // borderButton: useColorModeValue('none', '2px solid #51a6f5'),
      }}
    />
  );
};
export const CustomTextarea = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <Textarea
      {...field}
      {...props}
      border={useColorModeValue('none', '1px solid #eeeeee')}
      bg={useColorModeValue('#EEEEEE', '#2d3748')}
      borderRadius={0}
      _placeholder={{
        color: useColorModeValue('#777777', '#aaaaaa'),
        fontWeight: 600,
      }}
      _focus={{ border: '2px solid #51a6f5' }}
    />
  );
};

export const CustomSelect = ({ field, form, children, ...props }) => {
  return (
    <Select
      {...field}
      {...props}
      border={useColorModeValue('none', '1px solid #eeeeee')}
      bg={useColorModeValue('#EEEEEE', '#2d3748')}
      color={useColorModeValue('#161f6a', '#bababa')}
      fontWeight={700}
      _focus={{ border: '2px solid #51a6f5' }}
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
        // bg={useColorModeValue("#EEEEEE", "#2d3748")}
        // bg="EEEEEE"
        // border="none"
        border={useColorModeValue('none', '1px solid #eeeeee')}
        bg={useColorModeValue('#EEEEEE', '#2d3748')}
        color={useColorModeValue('#161f6a', '#bababa')}
        borderRadius={0}
        _placeholder={{ color: '#777', fontWeight: 600 }}
        _focus={{ border: '2px solid #51a6f5' }}
        type={show ? 'text' : 'password'}
        // autoComplete={true}
      />
      <InputRightElement width="4.5rem">
        <Button
          p={2}
          fontSize={'10px'}
          // color="#aaa"

          color={useColorModeValue('#161f6a', '#bababa')}
          bg="transparent"
          onClick={() => setShow(!show)}
          _focus={{ outline: 'none' }}
          _hover={{ bg: 'transparent', color: '#777' }}
          _active={{ bg: 'transparent', color: '#777' }}
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
      colorScheme={color || 'blue'}
      borderRadius={3}
      width="100%"
      style={{ marginTop: 15 }}
      _focus={{ outline: 'none' }}
    >
      {content}
    </Button>
  );
};
