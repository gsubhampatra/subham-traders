import { ReactNode, ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "submit" | "primary" | "delete" | "cancel";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  startIcon,
  endIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center mx-1 justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    submit: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    primary: "bg-primary text-white hover:bg-secondary focus:ring-primary-dark",
    delete: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    cancel: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const combinedClasses = [
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <FaSpinner className="mr-2 animate-spin" aria-hidden="true" />
      )}
      {startIcon && !isLoading && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && !isLoading && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};
