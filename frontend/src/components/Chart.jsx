import React, { useEffect, useRef, useState, memo } from 'react';

function TradingViewWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
  
    script.onload = () => {
      setIsLoading(false);
    };
  
    script.innerHTML = `
    {
      "symbols": [
        [
          "BITSTAMP:BTCUSD|1D"
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "dark",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    }`;
  
    if (container.current) {
      container.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (container.current && container.current.contains(script)) {
        container.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      {isLoading && <div>Loading chart...</div>}
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
