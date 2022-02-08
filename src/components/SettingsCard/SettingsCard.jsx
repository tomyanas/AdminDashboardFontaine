import { Link } from "react-router-dom";
import "./SettingsCard.scss";

const SettingsCard = ({ Icon, title, subtitle, linkTo, drawer }) => {
  return (
    <>
      {linkTo ? (
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
      ) : (
        <div className="settings-card">
          <div className="settings-card__icon">
            <Icon />
          </div>
          <div className="settings-card__content">
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
          </div>
        </div>
      )}
    </>
  );
};
export default SettingsCard;
