import { Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
 
  return (
    <div className="dashboard">
       <Text color={useColorModeValue('red', 'gray.800')} >Dashboard Section</Text> 
    </div>
  );
};

export default Dashboard;
