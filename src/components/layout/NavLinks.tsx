const NavLinks = [
  {
    label: "Dashboard",
    authRequired: false,
    href: "/",
  },
  {
    label: "Waitlists",
    authRequired: true,
    href: "/waitlists",
  },
];

export const NonUserLinks = [
  {
    label: "Signup",
    authRequired: true,
    href: "/signup",
  },
  {
    label: "Login",
    authRequired: true,
    href: "/login",
  },
];

export default NavLinks;
