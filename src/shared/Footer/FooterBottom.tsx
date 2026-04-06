import React from "react";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex justify-center py-3">
      <div className="text-sm text-white">
        © {currentYear} Noesys Software Pvt Ltd, All rights reserved.
      </div>
    </div>
  );
};

export default FooterBottom;
