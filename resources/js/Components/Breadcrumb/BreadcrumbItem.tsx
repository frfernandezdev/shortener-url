import { Link } from "@inertiajs/react";
import { ReactNode } from "react";

export type BreadcrumbItemProps = {
  href: string;
  label: string;
  icon?: ReactNode;
};

export function BreadcrumbItem({ href, label, icon }: BreadcrumbItemProps) {
  return (
    <li>
      <div className="flex items-center">
        {icon}
        <Link
          href={href}
          className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
        >
          {label}
        </Link>
      </div>
    </li>
  );
}
