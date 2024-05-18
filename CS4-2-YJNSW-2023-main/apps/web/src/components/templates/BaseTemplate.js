import { Masthead } from "nsw-ds-react";
import Footer from "../organisms/Footer";
import Breadcrumbs from "../organisms/Breadcrumbs";
import Header from "../organisms/Header";
import MainNav from "../organisms/MainNav";
import PropTypes from "prop-types";
import "./BaseTemplate.css";

function BaseTemplate({ content }) {
  return (
    <>
      <div className="main-wrapper">
        <Masthead />
        <Header />
        <MainNav />
        <Breadcrumbs />
        {content}
      </div>
      <Footer />
    </>
  );
}

BaseTemplate.propTypes = {
  content: PropTypes.element.isRequired,
};

export default BaseTemplate;
