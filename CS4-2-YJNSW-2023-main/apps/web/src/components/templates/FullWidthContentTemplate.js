import BaseTemplate from "./BaseTemplate";
import PropTypes from "prop-types";

function FullWidthContentTemplate({ content }) {
  const mainContent = (
    <div className="nsw-container">
      <div className="nsw-layout">
        <main className="nsw-layout__main">{content}</main>
      </div>
    </div>
  );

  return <BaseTemplate content={mainContent} />;
}

FullWidthContentTemplate.propTypes = {
  content: PropTypes.element.isRequired,
};

export default FullWidthContentTemplate;
