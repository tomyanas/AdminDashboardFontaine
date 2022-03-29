import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

export const SectionHeader = ({ children, title, size = "xl" , ...props }) => {
  return (
    <Box
      bg={useColorModeValue("#fafafa", "gray.900")}
      minHeight="fit-content"
      padding={"10px"}
      boxShadow={useColorModeValue("1px 1px 3px 1px #0003","1px 1px 3px 1px #fff1")}
      paddingBottom={"2rem"}
      {...props}
    >
      <Heading p={"1rem"} textAlign="center" color={useColorModeValue("#343a40", "#eee")} size={size}>
        {title}
      </Heading>
      {children}
    </Box>
  );
};
