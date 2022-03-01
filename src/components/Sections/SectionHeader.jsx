import { Box, Heading } from "@chakra-ui/react";

export const SectionHeader = ({ children, title, size = "xl" , ...props }) => {
  return (
    <Box
      bg={"#fff"}
      minHeight="fit-content"
      padding={"10px"}
      boxShadow="1px 1px 3px 1px #0003"
      paddingBottom={"2rem"}
      {...props}
    >
      <Heading p={"1rem"} textAlign="center" color="#343a40" size={size}>
        {title}
      </Heading>
      {children}
    </Box>
  );
};
