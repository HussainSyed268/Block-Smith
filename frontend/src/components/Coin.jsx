import {useGLTF,Stage,PresentationControls} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';


function Model(props){
  const {scene} = useGLTF('/LEO.glb');
  return <primitive object={scene} {...props}/>;
}

function Coin() {
    const cubeRef = useRef();
    useFrame((state,delta)=>{
        cubeRef.current.rotation.y += 0.01;

    });
    
  return (
    <>
      <ambientLight intensity={0.5}/>
      <spotLight position={[10,10,10]} angle={0.15} intensity={0.2}/>

      <Stage environment={null}>
        <mesh ref={cubeRef}>
        <Model scale={0.001} />
        </mesh>
      </Stage>
      </>


  );
}

export default Coin;
