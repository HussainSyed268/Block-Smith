import {Canvas, useFrame} from '@react-three/fiber';
import {useGLTF,Stage,PresentationControls} from '@react-three/drei';

import Coin from './Coin';


function CoinContainer() {
    
  return (
    <div className='relative w-[20rem] h-[20rem]'>
    <Canvas dpr={[1,2]} camera={{fov:45}} style={{"position":"absolute"}}>
        <Coin/>
    </Canvas>
    </div>

  );
}

export default CoinContainer;
