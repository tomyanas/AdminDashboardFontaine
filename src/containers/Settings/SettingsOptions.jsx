import SettingsCard from "../../components/SettingsCard/SettingsCard";
import { Members } from "../../assets/icons/Members";
import { SiteSettings } from "../../assets/icons/SiteSettings";
import { OrderIcon } from "../../assets/icons/OrderIcon";
import { CouponIcon } from "../../assets/icons/CouponIcon";
import { SidebarCategoryIcon } from "../../assets/icons/SidebarCategoryIcon";
import { ProductIcon } from "../../assets/icons/ProductIcon";
import "./Settings.scss";

const cards = [
  {
    icon: Members,
    title: "Staff Members",
    subtitle: "Manage your employees and their permission",
    linkTo: 'staff',
  },
  {
    icon: SiteSettings,
    title: "Site Settings",
    subtitle: "View and update your site settings",
    linkTo: 'site-settings',
  },
  {
    icon: OrderIcon,
    title: "Add Staff Members",
    subtitle: "Add your staff members from here",
  },
  {
    icon: CouponIcon,
    title: "Add Coupons",
    subtitle: "Add coupons from here",
  },
  {
    icon: SidebarCategoryIcon,
    title: "Add Categories",
    subtitle: "Add product categories from here",
  },
  {
    icon: ProductIcon,
    title: "Add Products",
    subtitle: "Add products from here",
  },
];

const SettingsOptions = () => {
  return (
    <div className="settings-options">
      {cards?.map(({ index, icon, title, subtitle, linkTo = false }) => {
        return <SettingsCard key={index} Icon={icon} title={title} subtitle={subtitle} linkTo={linkTo}/>;
      })}
    </div>
  );
};
export default SettingsOptions;
