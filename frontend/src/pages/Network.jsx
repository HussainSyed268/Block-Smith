import React, { useState, useRef, useEffect } from "react";
import Network from "react-vis-network-graph";
import Grid from "@mui/material/Grid";
import server from "../assests/server.png";
import node from "../assests/lcd.png";

const Networking = () => {
  const graphRef = useRef(null);
  const [datas, setDatas] = useState("--");
  const [data, setData] = useState({
    nodes: [
      { id: "Server", label: "Server", color: "green", shape: "image", image: server },
      { id: "Node_1", label: "Node 1", color: "blue", shape: "image", image: node },
      { id: "Node_2", label: "Node 2", color: "blue", shape: "image", image: node },
      { id: "Node_3", label: "Node 3", color: "blue", shape: "image", image: node },
      { id: "Node_4", label: "Node 4", color: "blue", shape: "image", image: node }
    ],
    edges: [
      { from: "Server", to: "Node_1" },
      { from: "Server", to: "Node_2" },
      { from: "Server", to: "Node_3" },
      { from: "Server", to: "Node_4" }
    ]
  });

  useEffect(() => {
    // Logic to ensure the component updates with the initial set of nodes and edges.
    setData((prevData) => ({
      ...prevData,
      nodes: prevData.nodes,
      edges: prevData.edges
    }));
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Network
            graph={data}
            ref={graphRef}
            options={{
              layout: {
                hierarchical: {
                  enabled: true,
                  direction: "UD",
                  sortMethod: "directed"
                }
              },
              edges: {
                smooth: {
                  type: "continuous"
                },
                color: {
                  color: "black",
                  highlight: "black",
                  hover: "black",
                  inherit: false
                }
              },
              nodes: {
                font: {
                  color: "black"
                }
              },
              physics: {
                enabled: false,
                hierarchicalRepulsion: {
                  nodeDistance: 150 // Adjust the desired distance between nodes
                },
                minVelocity: 0.75,
                solver: "hierarchicalRepulsion"
              },
              interaction: {
                dragNodes: false
              }
            }}
            events={{
              click: (event) => {
                if (event.nodes.length > 0) {
                  setDatas(event.nodes[0]);
                }
              }
            }}
            style={{ height: "400px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <p>Selected Node: {datas}</p>
        </Grid>
      </Grid>
    </>
  );
};

export default Networking;
