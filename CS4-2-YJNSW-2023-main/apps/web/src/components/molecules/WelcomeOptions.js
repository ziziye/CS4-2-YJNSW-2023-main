import { Card, CardCopy, Section } from "nsw-ds-react";
import { useState, useEffect, useRef, useCallback } from "react";
import PDF from "./Pdf";
import Video from "./Video";
import cms from "../../api-clients/cms";

const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;

function WelcomeOptions() {
  const roleId = localStorage.getItem("roleId");
  const [videoUrl, setVideoUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const [showVideo, setShowVideo] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  const firstUpdate = useRef(true);
  // const [homeInfo, setHomeInfo] = useState({ data: {} });

  const fetchHomeInfo = useCallback(async () => {
    let res = await cms.getHomeGuide();
    if (res.error && res.error.status === 404) {
      return;
    }
    // setHomeInfo(res);
    setVideoUrl(STRAPI_BASE_URL + res.data.attributes?.video.data?.attributes.url);
    console.log(STRAPI_BASE_URL + res.data.attributes?.video.data?.attributes.url);
    setPdfUrl(STRAPI_BASE_URL + res.data.attributes?.pdf.data?.attributes.url);
    console.log(STRAPI_BASE_URL + res.data.attributes?.pdf.data?.attributes.url);
  });

  useEffect(() => {
    if (firstUpdate.current) {
      fetchHomeInfo();
      // console.log(homeInfo);
      firstUpdate.current = false;
    } else {
      firstUpdate.current = true;
    }
  });

  return (
    <Section container={true} style="white">
      <div className="nsw-grid">
        <div className="nsw-col nsw-col-md-6 nsw-col-lg-4" data-cy="welcome-guide">
          <Card headline="Guide">
            <CardCopy>Find how Stepping Stone works.</CardCopy>
            <div style={{ display: "flex", padding: 20 }}>
              <button>
                <a
                  href={pdfUrl}
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    display: "block",
                    width: "100%",
                    height: "100%",
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  Preview PDF
                </a>
              </button>
              <button
                style={{ marginLeft: 10, color: "#000" }}
                onClick={() => {
                  setShowVideo(true);
                }}
              >
                <strong>Preview Video</strong>
              </button>
              {showPDF && (
                <PDF
                  url={pdfUrl}
                  close={() => {
                    setShowPDF(false);
                  }}
                ></PDF>
              )}
              {showVideo && (
                <Video
                  url={videoUrl}
                  close={() => {
                    setShowVideo(false);
                  }}
                ></Video>
              )}
            </div>
          </Card>
        </div>
        <div className="nsw-col nsw-col-md-6 nsw-col-lg-4" data-cy="welcome-findrole">
          <Card headline="Search Role" link="/search">
            <CardCopy>Find the desired role.</CardCopy>
          </Card>
        </div>
        <div className="nsw-col nsw-col-md-6 nsw-col-lg-4" data-cy="welcome-careerprogression">
          <Card headline="Career Progression" link={`/roles/${roleId}/progression`}>
            <CardCopy>Discover your career progression.</CardCopy>
          </Card>
        </div>
      </div>
    </Section>
  );
}

export default WelcomeOptions;
