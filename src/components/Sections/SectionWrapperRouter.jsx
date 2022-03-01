import { Outlet } from "react-router-dom";
import { Section } from "./Section";
const SectionWrapperRouter = () => {
  return (
    <Section>
      <Outlet />
    </Section>
  );
};

export default SectionWrapperRouter;
