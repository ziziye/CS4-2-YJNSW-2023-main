import { Section } from "nsw-ds-react";
import { useCallback, useEffect, useRef, useState } from "react";
import cms from "../../api-clients/cms";
import "./WelcomeBanner.css";

function WelcomeBanner() {
  const firstUpdate = useRef(true);

  const [titleInfo, setTitleInfo] = useState("");
  const [subTitleInfo, setsubTitleInfo] = useState("");

  const fetchTitleInfo = useCallback(async () => {
    let res = await cms.getTitle();
    if (res.error && res.error.status === 404) {
      return;
    }
    setTitleInfo(res.data.attributes.mainTitle);
    setsubTitleInfo(res.data.attributes.subtitle);
  });
  useEffect(() => {
    if (firstUpdate.current) {
      fetchTitleInfo();
      firstUpdate.current = false;
    } else {
      firstUpdate.current = true;
    }
  });
  console.log(titleInfo.data == null);
  return (
    <Section container={true} style="white">
      {/* <div className="nsw-grid"> */}
      <h1 id="homeTitle">{titleInfo == "" ? "Stepping Stones" : titleInfo}</h1>
      <p id="homeTitleDesc">
        {subTitleInfo == "" ? "Take the first step to plan your career" : subTitleInfo}
      </p>
      <h2 className="WelcomeBanner">What do you want to do?</h2>
      {/* </div> */}
    </Section>
  );
}

export default WelcomeBanner;
