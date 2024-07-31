import { Link, PropsOf } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type LinkProps = PropsWithChildren & PropsOf<typeof Link>;

export const CustomLink = ({ children, ...props }: LinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      as={NextLink}
      color={pathname === props.href ? "secondary" : "text"}
      pointerEvents={pathname === props.href ? "none" : "auto"}
      _hover={{ textDecoration: "none", color: "accent" }}
      {...props}
    >
      {children}
    </Link>
  );
};
