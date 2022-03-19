import { Link } from "react-router-dom";
import { Box, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { CustomModal } from "../Forms/CustomModal/CustomModal";

const SettingsCard = ({ Icon, title, subtitle, linkTo = false, form }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (linkTo)
    return (
      <Link to={linkTo}>
        <Box
          display="flex"
          bg="#fff"
          boxShadow="1px 1px 3px 2px #0003"
          cursor="pointer"
          padding="35px 20px"
          height="100%"
          width="100%"
        >
          <Box
            display="flex"
            width="100px"
            justifyContent="center"
            alignItems="center"
            color="#4a8cca"
            mar="10px"
          >
            <Icon width="3.5rem" height="3.5rem" />
          </Box>
          <Box display="flex" flexDirection="column" lineHeight="1.5">
            <Heading
              m="0 0 5px"
              fontSize="1.5rem"
              color="#4a8cca"
              fontWeight="600"
            >
              {title}
            </Heading>
            <Text fontSize="0.875rem" color="#666d92">
              {subtitle}
            </Text>
          </Box>
        </Box>
      </Link>
    );
  //_____________________________
  if (form)
    return (
      <Box
        display="flex"
        bg="#fff"
        boxShadow="1px 1px 3px 2px #0003"
        cursor="pointer"
        padding="35px 20px"
        height="100%"
        width="100%"
        onClick={onOpen}
      >
        <Box
          display="flex"
          width="100px"
          justifyContent="center"
          alignItems="center"
          color="#4a8cca"
          mar="10px"
        >
          <Icon width="3.5rem" height="3.5rem" />
        </Box>
        <Box display="flex" flexDirection="column" lineHeight="1.5">
          <Heading
            m="0 0 5px"
            fontSize="1.5rem"
            color="#4a8cca"
            fontWeight="600"
          >
            {title}
          </Heading>
          <Text fontSize="0.875rem" color="#666d92">
            {subtitle}
          </Text>
        </Box>
        <CustomModal Component={form} isOpen={isOpen} onClose={onClose} />
      </Box>
    );
  //_____________________________
  return (
    <Box
      display="flex"
      bg="#fff"
      boxShadow="1px 1px 3px 2px #0003"
      cursor="pointer"
      padding="35px 20px"
      height="100%"
      width="100%"
    >
      <Box
        display="flex"
        width="100px"
        justifyContent="center"
        alignItems="center"
        color="#4a8cca"
        mar="10px"
      >
        <Icon width="3.5rem" height="3.5rem" />
      </Box>
      <Box display="flex" flexDirection="column" lineHeight="1.5">
        <Heading m="0 0 5px" fontSize="1.5rem" color="#4a8cca" fontWeight="600">
          {title}
        </Heading>
        <Text fontSize="0.875rem" color="#666d92">
          {subtitle}
        </Text>
      </Box>
    </Box>
  );
};
export default SettingsCard;

// return (
//   <>
//     {linkTo ? (
//       <Link to={linkTo}>
//         <div className="settings-card">
//           <div className="settings-card__icon">
//             <Icon />
//           </div>
//           <div className="settings-card__content">
//             <h2>{title}</h2>
//             <h4>{subtitle}</h4>
//           </div>
//         </div>
//       </Link>
//     ) : (
//       <div className="settings-card" onClick={click}>
//         <div className="settings-card__icon">
//           <Icon />
//         </div>
//         <div className="settings-card__content">
//           <h2>{title}</h2>
//           <h4>{subtitle}</h4>
//         </div>
//       </div>
//     )}
//   </>
// );
