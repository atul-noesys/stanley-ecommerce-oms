import BestSellersSection from "@/components/home/sections/BestSellers";
import FAQsSection from "@/components/home/sections/FAQs";
import HeaderSection from "@/components/home/sections/Header";
import NewArrivals from "@/components/home/sections/NewArrival";
import PopularCategoriesSection from "@/components/home/sections/PopluarCategories";
import RecommendedSection from "@/components/home/sections/Recommend";
// import StylesSection from "@/components/home/sections/StylesSection";
// import MainSlider from "@/components/slider/main-slider";

const page = () => {
  return (
    <main>
      <NewArrivals />
      {/* <MainSlider /> */}
      <HeaderSection />
      <BestSellersSection />
      <PopularCategoriesSection />
      {/* <StylesSection /> */}
      <RecommendedSection />
      <FAQsSection />
    </main>
  );
};

export default page;
