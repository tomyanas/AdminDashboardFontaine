import { Button, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDb } from "../../db/DbProvider";
const Orders = () => {
  let db = useDb();
  const test = async () => {
    let test = await db.deleteCategory("4YU1n0kX63BmQ67EbPsk");
    console.log("hello", test);
  };
  useEffect(() => {
    test();
  }, []);

  return <div className="orders">Orders Section</div>;
};
export default Orders;
