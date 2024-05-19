import React, { useState } from 'react';
import Block from './CubeComponent'; // Import the Block component
import ChainComponent from './Chain'; // Import the ChainComponent

const BlockchainComponent = () => {
  const [blocks, setBlocks] = useState([<Block key={1} index={1} />]); // Initial block

  const addBlock = () => {
    const newIndex = blocks.length + 1;
    const newBlock = <Block key={newIndex} index={newIndex} />;
    setBlocks([...blocks, newBlock]);
  };

  return (
    <div className="flex items-center justify-start">
      {blocks.map((block, index) => (
        <React.Fragment key={index}>
          {block}
          {index < blocks.length - 1 && (
            <ChainComponent style={{ position: 'absolute', left: `calc(100% - 5px)` }} /> 
          )}
        </React.Fragment>
      ))}
      <button onClick={addBlock}>Add Block</button>
    </div>
  );
};

export default BlockchainComponent;
