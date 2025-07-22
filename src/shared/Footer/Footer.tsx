import React from "react";

import FooterBottom from "./FooterBottom";
// import FooterMain from './FooterMain';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand dark:bg-neutral-900">
      <div>
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
