import BaseTemplate from "./BaseTemplate";
import PropTypes from "prop-types";

function FiftyPercentContentTemplate({ content1, content2 }) {
  const content = (
    <div className="nsw-container">
      <div
        className="nsw-layout-1"
        style={{
          display: "grid",
          width: "50%",
          float: "left",
          justifyContent: "center",
          alignItems: "left",
          padding: "5%",
        }}
      >
        <main className="nsw-layout__main_1">{content1}</main>
      </div>
      <div
        className="nsw-layout-2"
        style={{
          display: "grid",
          width: "50%",
          justifyContent: "center",
          alignItems: "right",
          padding: "5%",
        }}
      >
        <main className="nsw-layout__main_2">{content2}</main>
      </div>
    </div>
  );

  return <BaseTemplate content={content} />;
}

FiftyPercentContentTemplate.propTypes = {
  content1: PropTypes.element.isRequired,
  content2: PropTypes.element.isRequired,
};

export default FiftyPercentContentTemplate;
