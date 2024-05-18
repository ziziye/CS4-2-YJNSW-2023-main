import { Header as NswHeader } from "nsw-ds-react";

function Header() {
  return (
    <NswHeader
      siteTitle="Youth Justice"
      siteDescriptor="Department of Communities & Justice"
      headerUrl="/"
      search={false}
      mobile={true}
    />
  );
}

export default Header;
