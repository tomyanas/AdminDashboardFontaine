import { Tbody, Tr, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CellActions } from "../TableCell/TableCell";

export const TableBody = ({ items, headers }) => {
  let [state, setState] = useState([])
  useEffect(()=>{
    setState(items)
  },[items])
  return (
    <Tbody>
      {state &&
        state.map((row, i) => {
          {
            // console.log(row,headers);
          }
          return (
            <Tr
              key={i}
              _hover={{
                bg: "#e9ecef",
              }}
            >
              {headers?.map((header, x) =>
                header.name === "Actions" ? (
                  <CellActions header={header} itemId={row.id} key={x}/>
                ) : (
                  <Td
                    borderColor="#dee2e6"
                    key={x}
                    minW="fit-content"
                    px={2}
                    py={3}
                    fontSize={"0.875rem"}
                    fontWeight={400}
                    color={
                      row[header.property] === undefined ||
                      row[header.property] === null
                        ? "crimson"
                        : "#495057"
                    }
                    // textAlign={
                    //   (row[header.property] === undefined ||
                    //     row[header.property] === null) &&
                    //   "center"
                    // }
                    textAlign={
                      row[header.property] === undefined ||
                      row[header.property] === null ||
                      (typeof row[header.property] === "number" && "center")
                    }
                    // isNumeric={typeof row[header.property] === "number"}
                  >
                    {row[header.property] === undefined ||
                    row[header.property] === null
                      ? "No Value"
                      : row[header.property]}
                  </Td>
                )
              )}
            </Tr>
          );
        })}
    </Tbody>
  );
};
