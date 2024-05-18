import ForceGraph2D from "react-force-graph-2d";
import Proptypes from "prop-types";
import RoleOverviewMedia from "./RoleOverviewMedia";
import { useEffect, useRef, useState, useContext } from "react";
import { CareerProgressionContext } from "../../contexts/CareerProgression";
import { Section } from "nsw-ds-react";

const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;

function RoleForceGraphData({ currentRole, progressRole }) {
  const forceRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [state, dispatch] = useContext(CareerProgressionContext);

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
  const [graphData, setGraphData] = useState(data);

  useEffect(() => {
    setGraphData(data);
  }, [data.nodes.length]);

  const handleNodeClick = (node) => {
    if (node && node.id !== currentNode.id) {
      setSelectedNode(node);
      dispatch({ type: "RETURN_ROLE_ID", payload: node.id });
      dispatch({ type: "CLICK_SWITCH_BUTTON", payload: false });
    } else {
      setSelectedNode(null);
    }
  };

  const handleNodeHover = (node) => {
    if (node && node.id !== currentNode.id) {
      setHoverNode(node);
    } else {
      setHoverNode(null);
    }
  };

  useEffect(() => {
    let node;
    if (nodes !== null) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === state.roleId) {
          node = nodes[i];
        }
      }
      setSelectedNode(node);
    }
  }, [state.roleId]);
  return (
    <Section>
      <ForceGraph2D
        width={600}
        height={400}
        graphData={graphData}
        cooldownTicks={50}
        ref={forceRef}
        onEngineStop={() => {
          forceRef.current.zoomToFit(300, 30);
        }}
        onEngineTick={() => {
          setNodes(graphData.nodes);
          forceRef.current.zoomToFit();
        }}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        linkWidth={2.5}
        maxZoom={15}
        minZoom={6}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;

          drawNode(ctx, node, 4, "rgb(235, 235, 235)", node.name, "black");
          if (node.id === currentNode.id) {
            drawNode(ctx, node, 5, "rgb(0, 38, 100)", node.name, "white");
          }

          if (selectedNode && node.id === selectedNode.id) {
            drawNode(ctx, selectedNode, 4, "rgb(0, 38, 100)", selectedNode.name, "white");
          }
          if (hoverNode && node.id === hoverNode.id) {
            drawNode(ctx, hoverNode, 4, "rgb(0, 38, 100)", hoverNode.name, "white");
          }
        }}
      />
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
    </Section>
  );
}

RoleForceGraphData.propTypes = {
  progressRole: Proptypes.array,
  currentRole: Proptypes.object,
};

const drawNode = (ctx, node, radius, colour, label, labelColour) => {
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = colour;
  ctx.fill();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = colour;
  ctx.lineWidth = 0.5;
  ctx.strokeText(label, node.x, node.y);
  ctx.fillStyle = labelColour;
  ctx.fillText(label, node.x, node.y);
};

export default RoleForceGraphData;
