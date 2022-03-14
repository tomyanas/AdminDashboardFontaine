import { Box, Button, HStack } from "@chakra-ui/react";

import { useEffect, useState } from "react";

export const TablePagination = ({ arrayItems, handler, order }) => {
  // console.log("pg render", arrayItems[0].name )

  const ITEMS_PER_PAGE = 10;
  let totalPages = Math.ceil(arrayItems.length / ITEMS_PER_PAGE);
  const [nroPage, setNroPage] = useState(1);
  let pageNumbers = [];
  let lastIndex = nroPage * ITEMS_PER_PAGE;
  let firstIndex = lastIndex - ITEMS_PER_PAGE;
  let items = arrayItems.slice(firstIndex, lastIndex);

  if (!!totalPages && totalPages > 3) {
    pageNumbers = [];
    if (nroPage === 1) {
      pageNumbers.push(nroPage);
      pageNumbers.push(nroPage + 1);
      pageNumbers.push(nroPage + 2);
    } else if (nroPage === totalPages) {
      pageNumbers.push(nroPage - 2);
      pageNumbers.push(nroPage - 1);
      pageNumbers.push(nroPage);
    } else {
      pageNumbers.push(nroPage - 1);
      pageNumbers.push(nroPage);
      pageNumbers.push(nroPage + 1);
    }
  } else if (!!totalPages && totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }
  // console.log(pageNumbers);
  useEffect(() => {
    handler(items);
  }, [nroPage, arrayItems, order]);
  useEffect(() => {
    setNroPage(1);
  }, [arrayItems]);

  const onClick = (e) => {
    let page = Number(e.target.value);
    if (page <= totalPages && page >= 1) {
      handler(items);
      setNroPage(page);
    }
  };

  return (
    <Box
      w="100%"
      h={"60px"}
      bg={"white"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap="10px"
    >
      
      {totalPages > 2 && nroPage !== 1 && (
        <Button
          value={nroPage - 1}
          onClick={(e) => onClick(e)}
          disabled={nroPage === 1}
        >
          prev
        </Button>
      )}
      {totalPages > 1 &&
        pageNumbers.map((item) => (
          <Button
            key={item}
            value={item}
            onClick={(e) => onClick(e)}
            disabled={nroPage === item}
          >
            {item}
          </Button>
        ))}

      {totalPages > 2 && nroPage !== totalPages && (
        <Button
          value={nroPage + 1}
          disabled={nroPage === totalPages}
          onClick={(e) => onClick(e)}
        >
          next
        </Button>
      )}
    </Box>
  );
};
