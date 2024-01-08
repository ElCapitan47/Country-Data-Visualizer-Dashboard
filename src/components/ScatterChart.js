import React from 'react'
import { XAxis, YAxis, CartesianGrid, ScatterChart, Scatter,LabelList, Tooltip, ResponsiveContainer } from 'recharts';


const ScatterChartComponent = ({countryData}) => {

    const ScatterCustomTooltip = ({ active, payload}) => {
        if (active) {
            return (
            <div style={{ background: '#121212', padding: '10px', color: 'white' }}>
                <p className="font-semibold">{payload[0].payload.name}</p>
                <p>Longitude: {payload[0].payload.capLong}</p>
                <p>Latitude: {payload[0].payload.capLat}</p>
            </div>
            );
        }
        
        return null;
        };

  return (
    <ResponsiveContainer   className="w-full h-1/5 lg:w-1/4 lg:h-full"> 
        <ScatterChart
        margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
        }}
        >
        <CartesianGrid strokeDasharray="1 1" />
        <YAxis tick={{ fill: 'white' }} type="number" dataKey="capLat" name="Latitude" unit={`${'\u00B0'}`}  label={{ value: 'Latitude', angle: -90, position: 'insideLeft', color: 'white', fontSize: 16}}/>
        <XAxis tick={{ fill: 'white' }} type="number" dataKey="capLong" name="Longitude"  unit={`${'\u00B0'}`}  label={{ value: 'Longitude', position: 'insideBottom', offset: -5, color: 'white',  fontSize: 16}} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ScatterCustomTooltip/>} />
        <Scatter 
        name="GeoLocation" 
        data={countryData} 
        
        shape={({ cx, cy, payload }) => (
            <circle cx={cx} cy={cy} r={2} fill={payload.fill} strokeWidth={2} />
        )}
        >
            <LabelList dataKey="cioc" position="top"/>
        </Scatter>
        </ScatterChart>

                
    </ResponsiveContainer>
  )
}

export default ScatterChartComponent
