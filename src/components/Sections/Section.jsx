import { Box } from "@chakra-ui/react";

export const Section = ({ children, ...props }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={"1rem"}
      w={"100%"}
      height={"fit-content"}
      {...props}
    >
      {children}
    </Box>
  );
};
