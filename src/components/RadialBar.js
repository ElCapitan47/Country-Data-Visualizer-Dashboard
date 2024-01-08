import React from 'react'
import { Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const RadialBarComponent = ({countryData}) => {
    // console.log(countryData);
   

    const style = {
        top: '50%',
        right: '10%',
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
      };
    
      const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          const countryData = payload[0].payload; 
          return (
            <div style={{ backgroundColor: '#121212', padding: '5px', border: '1px solid #ccc', color: '#fff' }}>
              <p className='font-semibold'>{`${countryData.name}`}</p>
              <p>{`Gini Index: ${payload[0].value}`}</p>
            </div>
          );
        }
      
        return null;
      };
  return (
    // width="25%" height="100%"
    <ResponsiveContainer  className="w-full h-full lg:w-1/4 lg:h-full">
                 
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={8} data={countryData}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#ffffff' }}
            background={{ fill: 'black' }}
            clockWise
            dataKey="gini"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
        
    </ResponsiveContainer>
  )
}

export default RadialBarComponent
