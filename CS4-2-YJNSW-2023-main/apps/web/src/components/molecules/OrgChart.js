import React from "react";
import Chart from "react-google-charts";
import RoleOverviewMedia from "./RoleOverviewMedia";
import Proptypes from "prop-types";
const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;

export const Orgdata = [
  //   {
  //     v: "Caseworker Custody (Identified)",
  //     f: 'Caseworker Custody <div style="color:red; font-style:italic">(Identified)</div>',
  //   },
  //   "Caseworker Custody (Identified)",
  //   "",
  // ],
  // ["Assistant Manager", "Caseworker Custody (Identified)", ""],
  // ["Marketing Coordinator", "Caseworker Custody (Identified)", ""],
  // ["Marketing Manager", "Marketing Coordinator", ""],
  // ["Director of Marketing", "Marketing Coordinator", ""],
  // ["Senior Marketing Manager", "Marketing Manager", ""],
];

function OrgChart({ progressRole, currentRole }) {
  const handleNodeClick = (chart) => {
    const selection = chart.chartWrapper.getChart().getSelection();
    const selectedNode = Orgdata[selection[0].row + 1][0];

    currentRole = progressRole.find(
      (role) => role.attributes.toRole.data.attributes.roleName === selectedNode
    );
    alert("You selected " + selectedNode);
  };
  const data = {
    nodes: progressRole?.map((role) => ({
      id: role.attributes.toRole.data.id,
      name: role.attributes.toRole.data.attributes.roleName,
    })),
    links: progressRole?.map((role) => ({
      source: currentRole.id,
      target: role.attributes.toRole.data.id,
    })),
  };
  const currentNode = {
    id: currentRole.id,
    name: currentRole.attributes?.roleName,
  };
  data.nodes.push(currentNode);

  for (let i = 0; i < data.links.length; i++) {
    Orgdata.push([
      {
        v: currentRole.attributes?.roleName,
        f: currentRole.attributes?.roleName,
      },
      currentRole.attributes?.roleName,
      "",
    ]);
    Orgdata.push([
      data.nodes.find((item) => item.id === data.links[i].target).name,
      data.nodes.find((item) => item.id === data.links[i].source).name,
      "",
    ]);
  }
  console.log(Orgdata);
  return (
    <>
      <div className="container mt-5">
        <h4>RoadMap</h4>
        <Chart
          chartType="OrgChart"
          data={Orgdata}
          options={options}
          width="100%"
          height="400px"
          chartEvents={[
            {
              eventName: "select",
              callback: handleNodeClick,
            },
          ]}
        />
      </div>
      <div className="nsw-grid">
        <div className="nsw-col nsw-col-sm-6">
          <div className="nsw-block">
            <RoleOverviewMedia role={currentRole} strapiBaseURL={STRAPI_BASE_URL} />
          </div>
        </div>
        <div className="nsw-col nsw-col-sm-6">
          <div className="nsw-block">
            <h3>{currentRole.attributes?.roleName}</h3>
            <p>{currentRole.attributes?.longDesc}</p>
            {currentRole.attributes?.mediaPDF.data?.attributes.mime === "application/pdf" ? (
              <a
                href={STRAPI_BASE_URL + currentRole.attributes?.mediaPDF.data?.attributes.url}
                rel="noreferrer"
                target="_blank"
                data-cy="link-role"
              >
                Learn more about this role
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
OrgChart.propTypes = {
  progressRole: Proptypes.array,
  currentRole: Proptypes.object,
};
export default OrgChart;
export const options = {
  allowHtml: true,
  nodeClickBehavior: "tooltip",
};
