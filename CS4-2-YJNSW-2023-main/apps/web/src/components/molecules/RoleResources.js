// const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;
import Proptypes from "prop-types";

function RoleResources({ roleActivities, strapiBaseURL }) {
  // console.log("resource", roleActivities);
  // console.log("strapiBaseURL", strapiBaseURL);
  console.log(roleActivities.data.attributes?.resources.data);
  const results = roleActivities.data.attributes?.resources.data.map((resourceInfo) => {
    return (
      <tr key={resourceInfo.id}>
        {resourceInfo.attributes?.document.data?.attributes ? (
          <>
            <td>
              <a
                href={strapiBaseURL + resourceInfo.attributes?.document.data?.attributes.url}
                target="_blank"
                rel="noreferrer"
              >
                {resourceInfo.attributes?.document.data?.attributes.caption}
              </a>
            </td>
            <td>{resourceInfo.attributes?.description}</td>
          </>
        ) : (
          <td>No resource</td>
        )}
      </tr>
    );
  });
  console.log(results);
  return (
    <>
      <h2>Resources</h2>
      {results && results.length > 0 ? (
        <div className="nsw-block">
          <table className="nsw-block" border="1">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{results}</tbody>
          </table>
        </div>
      ) : (
        <p>No Resources</p>
      )}
    </>
  );
}
RoleResources.propTypes = {
  roleActivities: Proptypes.object,
  strapiBaseURL: Proptypes.string,
};
export default RoleResources;
