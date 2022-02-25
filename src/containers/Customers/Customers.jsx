import React, { useEffect, useState } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import "./Customers.scss";
import axios from "axios";
import { URL_BASE } from "../../settings/constants";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";

const Customers = () => {
  // let [customers, setCustomers] = useState([]);
  const db = useDb()
  let customers = db.customers;
  
  const headers = [
    {
      name: "First Name",
      property: "firstName",
    },
    {
      name: "Last Name",
      property: "lastName",
    },
    {
      name: "Email",
      property: "email",
    },
    {
      name: "Role",
      property: "role",
    },
  ];
  
  useEffect(() => {
    // axios.get(`${URL_BASE}/customers`).then((data) => {
    //   setCustomers(data.data);
    //   console.log(data.data);
    // });
    db.getAllCustomers()
  }, []);
  return (
    <div className="customers">
        {customers.length ? (
        <CustomTable headers={headers} items={customers} />
      ) : (
        <InLineLoader />
      )}
      {/* <CustomTable headers={headers} items={sales}></CustomTable> */}
    </div>
  );
};
export default Customers;


// const headers = [
//   {
//     name: "Product",
//     property: "product",
//   },
//   {
//     name: "Last Year Sale",
//     property: "lastYearSale",
//   },
//   {
//     name: "This Year Sale",
//     property: "thisYearSale",
//   },
//   {
//     name: "Last Year Profit",
//     property: "lastYearProfit",
//   },
//   {
//     name: "This Year Profit",
//     property: "thisYearProfit",
//   },
// ];

// const sales = [
//   {
//     product: "Bamboo Watch",
//     lastYearSale: 0,
//     thisYearSale: 40,
//     // lastYearProfit: 54406,
//     thisYearProfit: 43342,
//   },
//   {
//     // product: "Black Watch",
//     lastYearSale: 83,
//     // thisYearSale: 9,
//     lastYearProfit: 423132,
//     thisYearProfit: 312122,
//   },
//   {
//     product: "Blue Band",
//     lastYearSale: 38,
//     thisYearSale: 5,
//     lastYearProfit: 12321,
//     thisYearProfit: 8500,
//   },
//   {
//     product: "Blue T-Shirt",
//     lastYearSale: 49,
//     thisYearSale: 22,
//     lastYearProfit: 745232,
//     thisYearProfit: 65323,
//   },
//   {
//     product: "Brown Purse",
//     lastYearSale: 17,
//     thisYearSale: 79,
//     lastYearProfit: 643242,
//     thisYearProfit: 500332,
//   },
//   {
//     product: "Chakra Bracelet",
//     lastYearSale: 52,
//     thisYearSale: 65,
//     lastYearProfit: 421132,
//     thisYearProfit: 150005,
//   },
//   {
//     product: "Galaxy Earrings",
//     lastYearSale: 82,
//     thisYearSale: 12,
//     lastYearProfit: 131211,
//     thisYearProfit: 100214,
//   },
//   {
//     product: "Game Controller",
//     lastYearSale: 44,
//     thisYearSale: 45,
//     lastYearProfit: 66442,
//     thisYearProfit: 53322,
//   },
//   {
//     product: "Gaming Set",
//     lastYearSale: 90,
//     thisYearSale: 56,
//     lastYearProfit: 765442,
//     thisYearProfit: 296232,
//   },
//   {
//     product: "Gold Phone Case",
//     lastYearSale: 75,
//     thisYearSale: 54,
//     lastYearProfit: 21212,
//     thisYearProfit: 12533,
//   },
// ];
