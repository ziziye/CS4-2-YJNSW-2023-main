import BaseTemplate from "./BaseTemplate";
import PropTypes from "prop-types";

function LeftSidebarTemplate({ topContent, sidebarContent, mainContent, styleOption }) {
  const content = (
    <>
      <main className="nsw-container">
        <div className="nsw-layout">
          <div className="nsw-layout__main">{topContent}</div>
          <div className="nsw-layout__sidebar nsw-layout__sidebar--desktop" />
        </div>
        <div className="nsw-layout">
          <div className="nsw-layout__sidebar">{sidebarContent}</div>
          <div className={`nsw-layout__main ${styleOption ? styleOption : ""}`}>{mainContent}</div>
        </div>
      </main>
    </>
  );

  return <BaseTemplate content={content} />;
}

LeftSidebarTemplate.propTypes = {
  topContent: PropTypes.element.isRequired,
  sidebarContent: PropTypes.element.isRequired,
  mainContent: PropTypes.element.isRequired,
  styleOption: PropTypes.string,
};

export default LeftSidebarTemplate;
