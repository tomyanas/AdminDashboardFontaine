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

const cards = [
  {
    icon: Members,
    title: "Personal",
    subtitle: "Manejo y edicion de tu personal",
    linkTo: "",
  },
  {
    icon: SiteSettings,
    title: "Configuracion Del Sitio",
    subtitle: "Editar y Agregar funcionalidades del sitio",
    linkTo: "site-settings",
  },
  {
    icon: OrderIcon,
    title: "Añadir Personal",
    subtitle: "Añadir un nuevo miebro al Staff",
    form: StaffMemberForm,
  },
  {
    icon: CouponIcon,
    title: "Agregar Cupones",
    subtitle: "Agregar cupones de descuento",
  },
  {
    icon: SidebarCategoryIcon,
    title: "Agregar Categorias",
    subtitle: "Crear una nueva categoria",
    form: AddCategoryForm,
  },
  {
    icon: ProductIcon,
    title: "Agregar Productos",
    subtitle: "Crear un nuevo producto",
    form: AddProductForm,
  },
];

const Settings = () => {
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

export default Settings;
