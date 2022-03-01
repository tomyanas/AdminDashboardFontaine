import { Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
 
  return (
    <div className="dashboard">
       <Text color={useColorModeValue('gray.800', 'red')} >Dashboard Section</Text> 
    </div>
  );
};

export default Dashboard;
