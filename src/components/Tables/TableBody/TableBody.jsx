import { Tbody, Tr, Td } from "@chakra-ui/react";

export const TableBody = ({ items, headers }) => {
  return (
    <Tbody>
      {items &&
        items.map((row, i) => (
          <Tr key={i}>
            {headers?.map((header, x) => (
              <Td
                key={x}
                minW="150px"
                px={2}
                py={3}
                fontSize={"0.875rem"}
                fontWeight={600}
                borderLeft={"1px solid #eee"}
                color={
                  row[header.property] === undefined ||
                  row[header.property] === null
                    ? "crimson"
                    : "#4E4E4E"
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
            ))}
          </Tr>
        ))}
    </Tbody>
  );
};
