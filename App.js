import { createChart } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";


function App() {
  const chartContainerRef = useRef();
  const [candlePrice, setCandlePrice] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  useEffect(() => {
    
    const chart = createChart(chartContainerRef.current, {
      
        layout: {
            background: { color: '#222' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
        },
    
      width: chartContainerRef.current.clientWidth,
      height:400,
      });

      const newSeries = chart.addCandlestickSeries({
        upColor: '#26a69a', 
        downColor: '#ef5350', 
        borderVisible: false, 
        wickUpColor: '#26a69a', 
        wickDownColor: '#ef5350', 
      });

      fetch('http://localhost:1880/al30d')
       .then(res => res.json())
       .then(data => {
          const cdata = data.map (d => {
            return {time:d[0]/1000, open: d[1], high: d[2], low:d[3], close:d[4]}
    });
    newSeries.setData(cdata);
 })
 .catch(err => console.log(err));

        chart.subscribeCrosshairMove((param) => {
          if (param.time) {
            const data = param.seriesData.get(newSeries);
            setCandlePrice(data);
          }
        })

      //newSeries.setData(initialData)

      return () => [chart.remove()];
    }, []);

  return (
    <div ref={chartContainerRef} style={{position: "relative"}}>
      <div 
        style={{
         position: "absolute",
         top: 20,
         left: 100,
         zIndex:20,
         color: "white",
      }}
    > 
      <select id = "bonos">
        < option value="">Choose one</option>
        < option value="AL30D"> AL30D </option>
        < option value="AL29D"> AL29D </option>
      </select>
      <input
          id="pass"
          type={
              showPassword ? "text" : "password"
          }
          value={password}
          onChange={(e) =>
              setPassword(e.target.value)
          }
      />
      <input
          id="check"
          type="hidden" //"checkbox" 
          value={showPassword}
          onChange={() =>
           setShowPassword((prev) => !prev)
         }
       />
      <div>AL30D </div>
        <div style={{display: "flex"}}>
        <div style={{marginRight: 10}}> Apertura: {candlePrice?.open}</div>
        <div style={{marginRight: 10}}>  Máximo: {candlePrice?.high}</div>
        <div style={{marginRight: 10}}>  Mínimo: {candlePrice?.low}</div>
        <div style={{marginRight: 10}}>  Cierre: {candlePrice?.close}</div>
        </div>
    </div>
  </div>
  );  
};

export default App;
