import { Button, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDb } from "../../db/DbProvider";
const Orders = () => {
  const db = useDb();
  let products = db.products;
  console.log("comp",db.products)

// useEffect(()=>{

// },[products])

  return (
    <div className="orders">
      <Stack>

      <Button onClick={()=>db.getAllProducts()}>Products</Button>
      {products?.map((prod )=> {
        console.log(prod)
        return <h6 key={prod.id}>{prod.name}</h6>})}
      <Button>bla</Button>
      <Button>bla</Button>
      <Button>bla</Button>
      <Button>bla</Button>
      </Stack>
        {/* Orders Section */}
    </div>
  );
};
export default Orders;