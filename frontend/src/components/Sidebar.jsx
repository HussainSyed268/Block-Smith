import { FaArrowLeft } from 'react-icons/fa'; // Ensure you have react-icons installed
import React, { useRef, useState } from "react";
import Network from "react-vis-network-graph";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import server from "../assests/server.png"
import node from "../assests/lcd.png"
import { useEffect } from "react";


const Sidebar = () => {
    const graphRef = useRef(null);
    const [datas, setDatas] = useState("--");
    const [data, setData] = useState({
      nodes: [
        { id: "Server", label: "Server", color: "green", shape: "image", image: server,size: 35 },
        { id: "Node_1", label: "snaqvi", color: "blue", shape: "image", image: node,size: 35 },
        { id: "Node_2", label: "umehmood", color: "blue", shape: "image", image: node,size: 35 },
        { id: "Node_3", label: "AzaanJutt", color: "blue", shape: "image", image: node,size: 35 },
        { id: "Node_4", label: "ShahKhalid", color: "blue", shape: "image", image: node,size: 35 }
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
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-white fixed top-1/2 right-0 transform -translate-y-1/2">
                    <FaArrowLeft />
                </label>
            </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-[60rem] min-h-full bg-base-200 text-base-content">
                <div className='h-16 mx-2 mt-2 '>
                    <h1 className='text-4xl font-bold font-roboto text-center'>Mining Network</h1>
                </div>
                <div className='h-[47rem] mx-2'>

                <div className="h-[47rem] w-full border-2 border-black dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
                {/* Radial gradient for the container to give a faded look */}
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
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
                enabled: true,
                hierarchicalRepulsion: {
                    centralGravity: 0.0, // No pull towards the center
                    springLength: 100, // Adjust the length of the springs
                    springConstant: 0.01, // Adjust the strength of the springs


                  nodeDistance: 170 // Adjust the desired distance between nodes
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
      </Grid>
                </div>
                
                
                </div>
            </ul>
        </div>
        </div>
    
    )
}
export default Sidebar;