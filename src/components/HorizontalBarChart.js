import React from 'react'
import { BarChart, Bar, XAxis, YAxis,Tooltip, Legend, ResponsiveContainer, ReferenceDot} from 'recharts';

const HorizontalBarChartComponent = ({style, xDataKey, yDataKey, type, dataKey, countryData}) => {

    const BarCustomTooltip = ({ active, payload, type}) => {
        if (active && payload && payload.length) {
          const countryData = payload[0].payload; // The country name is in payload[0].payload.name
          return (
            <div style={{ backgroundColor: '#121212', padding: '5px', border: '1px solid #ccc', color:'white' }}>
              <p className="font-semibold">{`${countryData.name}`}</p>
              <p>{`${type}: ${payload[0].value}`}</p>
            </div>
          );
        }
      
        return null;
      };
  return (
    <ResponsiveContainer className="w-full h-1/5 lg:w-1/4 lg:h-full" style={style}>
                  <BarChart
                    data={countryData}
                    layout= "vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    
                    <XAxis type='number' tick={{ fill: 'white' }} domain={[0, 5]}/>
                    <YAxis dataKey={yDataKey} type="category" tick={{ fill: 'white' }} />
                    <Tooltip content={<BarCustomTooltip type={type}/>} />
                    <Legend />
                    <Bar 
                    dataKey={dataKey} 
                    fill="#ffffff" 
                   
                    />
                    <ReferenceDot
                      x={0}  
                      y={0}  
                      r={5}
                      isFront
                      alwaysShow={false}
                    />
                  </BarChart>
                  </ResponsiveContainer>
  )
}

export default HorizontalBarChartComponent
