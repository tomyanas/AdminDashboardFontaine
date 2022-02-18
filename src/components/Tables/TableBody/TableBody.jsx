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
                fontWeight={600}
                color={
                  row[header.property] === undefined ||
                  row[header.property] === null
                    ? "crimson"
                    : "#4E4E4E"
                }
                textAlign={
                  (row[header.property] === undefined ||
                    row[header.property] === null) &&
                  "center"
                }
                isNumeric={typeof row[header.property] === "number"}
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
