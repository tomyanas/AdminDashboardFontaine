import { Box } from "@chakra-ui/react";

export const Section = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      display="flex"
      flexDirection="column"
      gap={"1rem"}
      w={"100%"}
      height={"fit-content"}
    >
      {children}
    </Box>
  );
};
