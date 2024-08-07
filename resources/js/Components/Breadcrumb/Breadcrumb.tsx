import { BreadcrumbItem, BreadcrumbItemProps } from "./BreadcrumbItem";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export type BreadcrumbProps = {
  breadcrumbs: BreadcrumbItemProps[];
};

export function Breadcrumb({ breadcrumbs }: BreadcrumbProps) {
  const renderBreadcrumb = (props: BreadcrumbItemProps, index: number) => {
    if (index % breadcrumbs.length) {
      props.icon = <ChevronRightIcon className="size-4" />;
    }
    return <BreadcrumbItem key={index} {...props} />;
  };
  return (
    <nav
      className="justify-between max-w-7xl mx-auto pt-3 pb-2 px-6 text-gray-600 sm:flex"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center mb-3 space-x-1 md:space-x-2 rtl:space-x-reverse sm:mb-0">
        {breadcrumbs.map(renderBreadcrumb)}
      </ol>
    </nav>
  );
}
