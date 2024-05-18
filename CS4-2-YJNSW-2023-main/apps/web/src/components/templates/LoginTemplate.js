import { Masthead } from "nsw-ds-react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import PropTypes from "prop-types";

function LoginTemplate({ content }) {
  return (
    <>
      <div className="main-wrapper">
        <Masthead />
        <Header />
        <div className="nsw-container">
          <div className="nsw-layout">
            <div className="nsw-layout__main">{content}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

LoginTemplate.propTypes = {
  content: PropTypes.element.isRequired,
};

export default LoginTemplate;
