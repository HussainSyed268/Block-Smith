import React from 'react';
import MiningComponent from '../components/MiningComponent';
import { WavyBackground } from '../components/ui/wavy-background.tsx';
import Sidebar from '../components/Sidebar';

function Mining() {
    return (
        <div>

           <MiningComponent />
            <Sidebar />
        </div>
    );
}

export default Mining;