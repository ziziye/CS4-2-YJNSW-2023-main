import Proptypes from "prop-types";
import "./RoleOverviewMedia.css";

function RoleOverviewMedia({ role, strapiBaseURL }) {
  return (
    <figure className="nsw-media">
      <div className="nsw-media__video">
        {role.attributes?.media.data?.attributes.mime.includes("video") ? (
          <video controls>
            <source src={strapiBaseURL + role.attributes?.media.data?.attributes.url} />
          </video>
        ) : (
          ""
        )}
        {role.attributes?.media.data?.attributes.mime.includes("image") ? (
          <img
            src={strapiBaseURL + role.attributes?.media.data?.attributes.url}
            alt={role.attributes?.media.data?.attributes.alternativeText}
          />
        ) : (
          ""
        )}
      </div>
    </figure>
  );
}

RoleOverviewMedia.propTypes = {
  role: Proptypes.object,
  strapiBaseURL: Proptypes.string,
};

export default RoleOverviewMedia;
