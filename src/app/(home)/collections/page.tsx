import Breadcrumbs from "@/components/Breadcrumbs";
import PopularCategoriesSection from "@/components/home/sections/PopluarCategories";
import ButtonLink from "@/shared/Button/ButtonLink";

const CollectionsPage = () => {
  const breadcrumbItems = [
    { title: <ButtonLink href="/">Home</ButtonLink> },
    { title: "Collections" },
  ];
  return (
    <main className="pb-24">
      <div className="container mb-6">
        <Breadcrumbs Items={breadcrumbItems} />
      </div>
      <PopularCategoriesSection />
    </main>
  );
};

export default CollectionsPage;
