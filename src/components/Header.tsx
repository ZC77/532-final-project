import { FunctionComponent } from "react";
import { Navbar } from "react-bootstrap";

const Header: FunctionComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="mx-auto">
        <Navbar.Brand>COMPX532 - EV Sales visualization</Navbar.Brand>
      </div>
    </Navbar>
  );
};

export default Header;
