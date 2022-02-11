import { Link } from "react-router-dom";
import "./SettingsCard.scss";
import { useDisclosure } from "@chakra-ui/react";
import { ModalForm } from "../Forms/ModalForm/ModalForm";

const SettingsCard = ({ Icon, title, subtitle, linkTo = false, form }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (linkTo)
    return (
      <Link to={linkTo}>
        <div className="settings-card">
          <div className="settings-card__icon">
            <Icon />
          </div>
          <div className="settings-card__content">
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
          </div>
        </div>
      </Link>
    );
  //_____________________________
  if (form)
    return (
      <div className="settings-card" onClick={onOpen}>
        <div className="settings-card__icon">
          <Icon />
        </div>
        <div className="settings-card__content">
          <h2>{title}</h2>
          <h4>{subtitle}</h4>
        </div>
        <ModalForm Form={form} isOpen={isOpen} onClose={onClose}/>
      </div>
    );
  //_____________________________
  return (
    <div className="settings-card">
      <div className="settings-card__icon">
        <Icon />
      </div>
      <div className="settings-card__content">
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
      </div>
    </div>
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
