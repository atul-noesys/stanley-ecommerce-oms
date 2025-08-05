import ProductCharacteristicsTab from "./ProductCharacteristicsTab";
import ProductDescriptiontab from "./ProductDescriptiontab";

const ProductTabs = () => {
  return (
    <div className="mb-16 mt-10">
      <h3 className="mb-3 text-2xl font-semibold">About</h3>
      <div className="divide-y divide-primary/20 border-y border-primary/20 dark:divide-neutral-300 dark:border-neutral-300">
        <ProductDescriptiontab />
        <ProductCharacteristicsTab />
      </div>
    </div>
  );
};

export default ProductTabs;
