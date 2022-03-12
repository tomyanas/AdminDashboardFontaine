import SettingsCard from "../../components/SettingsCard/SettingsCard";
import { Members } from "../../assets/icons/Members";
import { SiteSettings } from "../../assets/icons/SiteSettings";
import { OrderIcon } from "../../assets/icons/OrderIcon";
import { CouponIcon } from "../../assets/icons/CouponIcon";
import { SidebarCategoryIcon } from "../../assets/icons/SidebarCategoryIcon";
import { ProductIcon } from "../../assets/icons/ProductIcon";
import StaffMemberForm from "../../components/Forms/StaffMemberForm";
import { AddCategoryForm } from "../../components/Forms/AddCategoryForm";
import AddProductForm from "../../components/Forms/ProductForm";
import AddProductDetail from "../../components/Forms/ProductDetailForm";

const cards = [
  {
    icon: Members,
    title: "Staff Members",
    subtitle: "Manage your employees and their permission",
    linkTo: "staff",
  },
  {
    icon: SiteSettings,
    title: "Site Settings",
    subtitle: "View and update your site settings",
    linkTo: "site-settings",
  },
  {
    icon: OrderIcon,
    title: "Add Staff Members",
    subtitle: "Add your staff members from here",
    form: StaffMemberForm,
  },
  {
    icon: CouponIcon,
    title: "Add Coupons",
    subtitle: "Add coupons from here",
    form: AddProductDetail,
  },
  {
    icon: SidebarCategoryIcon,
    title: "Add Categories",
    subtitle: "Add product categories from here",
    form: AddCategoryForm,
  },
  {
    icon: ProductIcon,
    title: "Add Products",
    subtitle: "Add products from here",
    form: AddProductForm,
  },
];

const SettingsOptions = () => {
  return (
    <div className="settings-options">
      {cards?.map(({ icon, title, subtitle, linkTo = false, form = false }) => {
        return (
          <SettingsCard
            key={title + "_key"}
            Icon={icon}
            title={title}
            subtitle={subtitle}
            linkTo={linkTo}
            form={form}
          />
        );
      })}
    </div>
  );
};

export default SettingsOptions;
