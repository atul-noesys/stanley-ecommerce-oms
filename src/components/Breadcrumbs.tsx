import { pathOr } from "ramda";
import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type BreadcrumbProps = {
  Items: { title: string | ReactNode }[];
};
const Breadcrumbs: FC<BreadcrumbProps> = ({ Items }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center text-sm mt-6">
      <ul className="flex items-center">
        {Items.map((item, idx) => {
          const title = pathOr("", ["title"], item);
          return (
            <li className="group" key={idx}>
              {typeof title === "string" ? (
                <div className="flex items-center">
                  <div className="m-2 h-px w-4 bg-neutral-400 group-first:hidden" />
                  <span className="text-neutral-500 dark:text-neutral-700">
                    {t(title)}
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="m-2 h-px w-4 bg-neutral-400 group-first:hidden" />
                   {title}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
