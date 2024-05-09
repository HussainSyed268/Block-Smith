import React, { useState, useEffect } from 'react';
import { withScreenSize } from '@vx/responsive';
import Background from '../components/components/background';
import BitcoinPrice from '../components/components/bitcoinprice';

const Bitcoin = ({ screenWidth, screenHeight }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <div className="app">
      <div className="center">
        <BitcoinPrice data={data} width={screenWidth} height={screenHeight} />
        { console.log("Here is data")}
         { console.log(data)}
        <p className="disclaimer">
          {data.disclaimer}
        </p>
      </div>
      <style jsx>{`
        .app,
        .center {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          display: flex;
          font-family: arial;
          flex-direction: column;
        }
        .disclaimer {
          margin-top: 35px;
          font-size: 11px;
          color: white;
          opacity: 0.4;
        }
        .center {
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default withScreenSize(Bitcoin);
