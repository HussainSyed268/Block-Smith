import React, { useState } from 'react';
import Block from './CubeComponent'; // Import the Block component
import ChainComponent from './Chain'; // Import the ChainComponent
import CarouselWithButtons from './Carousel';
import '../css/block.css';

const BlockchainComponent = () => {
  const [blocks, setBlocks] = useState([
  <Block key={1} index={1} />,
  <Block key={2} index={2} />,
  <Block key={3} index={3} />,

]); // Initial block

  const addBlock = () => {
    const newIndex = blocks.length + 1;
    const newBlock = <Block key={newIndex} index={newIndex} />;
    setBlocks([...blocks, newBlock]);
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center relative">
      <div className='carousel carousel-center rounded-box w-[100vw] px-[3rem]  space-x-8 overflow-x-scroll'>
        <div className='carousel-item flex items-center justify-center'> 
        {blocks.map((block, index) => (
          <React.Fragment key={index}>
            {block}
            {index < blocks.length - 1 && (
              <div className='carousel-item'>
              <ChainComponent style={{ position: 'absolute', left: `calc(100% - 5px)` }} />
              </div> 
            )}
          </React.Fragment>
        ))}
      </div>
      </div>
      <div>
        <button className='text-white z-20 font-semibold h-10 bg-red-600 px-6 w-32 absolute rounded-xl top-[15rem] ' onClick={addBlock}>Add Block</button>
      </div>
    </div>

    
    
  </>
  );
};

export default BlockchainComponent;


