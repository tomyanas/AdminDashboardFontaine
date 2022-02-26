import { Button, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDb } from "../../db/DbProvider";
const Orders = () => {
  let db = useDb();
  const test = async () => {
    let test = await db.addCategory({ name: "Crema de enjuegue", thumb: null });
    console.log("hello", test);
  };
  useEffect(() => {
    test();
  }, []);

  return <div className="orders">Orders Section</div>;
};
export default Orders;
