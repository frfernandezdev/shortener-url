import { cn } from "@/Utils";
import { Link } from "@inertiajs/react";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  as?: string;
  icon: ReactNode;
  color?: 'blue' | 'red' | 'grey';
};

const defaultClassNames = [
  'border',
  'focus:ring-4',
  'focus:outline-none',
  'font-medium',
  'rounded-lg',
  'text-sm',
  'p-2.5',
  'text-center',
  'inline-flex',
  'items-center',
  'me-2',
];

export default function IconButton({
  href,
  method,
  className = "",
  disabled,
  icon,
  color,
  ...props
}: IconButtonProps) {
  return href ? (
        <Link
          href={href}
          method={method}
          as="button"
          className={cn(className, defaultClassNames)}
          aria-label={props['aria-label']}
          disabled={disabled}
        >
          {icon}
          {props["aria-label"] && <span className="sr-only">{props["aria-label"]}</span>}
        </Link>
      ) : (
        <button
          className={cn(className, defaultClassNames)}
          onClick={props.onClick}
          aria-label={props['aria-label']}
          disabled={disabled}
        >
          {icon}
          {props["aria-label"] && <span className="sr-only">{props["aria-label"]}</span>}
        </button>
      );
}
