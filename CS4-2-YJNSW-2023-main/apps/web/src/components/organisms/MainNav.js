import { MainNav as NswMainNav } from "nsw-ds-react";

function MainNav() {
  return (
    <NswMainNav
      megaMenu={false}
      navItems={[
        {
          text: "Home",
          description: "home",
          url: "#",
        },
        // {
        //   text: "Logout",
        //   description: "Logout",
        //   url: "/logout",
        // },
      ]}
    />
  );
}

export default MainNav;
