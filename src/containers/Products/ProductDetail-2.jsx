// import React, { useEffect, useState } from "react";
// import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
// import { useDb } from "../../db/DbProvider";
// import { Section } from "../../components/Sections/Section";
// import { SectionHeader } from "../../components/Sections/SectionHeader";
// import {
//   Stack,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useParams } from "react-router-dom";

// const ProductDetail = () => {
//   const db = useDb();
//   let { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(async () => {
//     let productDetail = await db.getOneProduct(productId);
//     setProduct(productDetail);
//   }, []);
//   return (
//     <Section>
//       <SectionHeader
//         title={product ? "Edit: " + product.name : "Edit Product"}
//         paddingBottom={"10px"}
//         size="lg"
//       />
//       {product ? (
//         <Tabs
//           variant="enclosed"
//           bg={"#fff"}
//           minHeight="400px"
//           padding={"1rem"}
//           boxShadow="1px 1px 3px 1px #0003"
//         >
//           <TabList>
//             <Tab>Detalle</Tab>
//             <Tab>Stock</Tab>
//             <Tab>Gallery</Tab>
//           </TabList>

//           <TabPanels>
//             <TabPanel>
//               <p>one!</p>
//               <h1>{product.name}</h1>
//               <p>{product.category}</p>
//             </TabPanel>
//             <TabPanel>
//               <p>two!</p>
//             </TabPanel>
//             <TabPanel>
//               <p>three!</p>
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       ) : (
//         <InLineLoader />
//       )}
//     </Section>
//   );
// };
// export default ProductDetail;
