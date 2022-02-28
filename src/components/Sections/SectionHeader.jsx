import { Box, Heading } from "@chakra-ui/react";

export const SectionHeader = ({ children, title, ...props }) => {
  return (
    <Box
      {...props}
      bg={"#fff"}
      minHeight="fit-content"
      padding={"10px"}
      boxShadow="1px 1px 3px 1px #0003"
      paddingBottom={"2rem"}
    >
      <Heading p={"1rem"} textAlign="center" color="#343a40">
        {title}
      </Heading>
      {children}
    </Box>
  );
};
