import React, { useRef, useState } from "react";
import Network from "react-vis-network-graph";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import server from "../assests/server.png"
import node from "../assests/lcd.png"

const Networking = () => {
  const graphRef = useRef(null);
  const [datas, setDatas] = useState("--");
  const [data, setData] = useState({
    nodes: [{ id: "Server", label: "Server", color: "green", shape: "image",image:server }],
    edges: []
  });

  const addNode = () => {
    const newNodeId = `Node_${data.nodes.length + 1}`;
    setData({
      nodes: [
        ...data.nodes,
        { id: newNodeId, label: newNodeId, color: "blue", shape: "image",image:node }
      ],
      edges: [...data.edges, { from: "Server", to: newNodeId }]
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={addNode}>
            Add Node
          </Button>
        </Grid>
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
                  color: "white",
                  highlight: "white",
                  hover: "white",
                  inherit: false
                }
              },
              nodes: {
                font: {
                  color: "white"
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
