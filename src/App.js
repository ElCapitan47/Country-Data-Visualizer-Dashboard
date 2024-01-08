import LayoutComponent from "./components/Layout";
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter,LabelList, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RadialBarComponent from "./components/RadialBar";
import { ReferenceDot } from "recharts";

function App() {
  const [countries,setCountries] = useState(['Germany', 'Spain', 'Italy', 'France', 'Japan']); //Default countries to show initially
  const [countryData, setCountryData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const colors = [ '#29AB87', '#01796F', '#008080','#30BFBF', '#0C99BA','#1164B5', '#004F98', '#003152'];
  useEffect(() => {
    console.log(countryData);
  }, [countryData]);
  
  useEffect(() => {
    const getData = async () => {
      try {
        setIsPending(true);
        const promises = countries.map(async (item, index) => {
          const response = await fetch(`https://restcountries.com/v3.1/name/${item}?fullText=true`);
          const formattedResponse = await response.json();
          const giniValues = Object.values(formattedResponse[0]?.gini || {});
          const details = {
            key: index,
            name: formattedResponse[0]?.name?.common || '',
            area: formattedResponse[0]?.area || '',
            population: formattedResponse[0]?.population || '',
            lang: Object.keys(formattedResponse[0]?.languages || {}).length,
            timezones: formattedResponse[0]?.timezones.length || 1,
            capLat: formattedResponse[0]?.capitalInfo?.latlng[0],
            capLong: formattedResponse[0]?.capitalInfo?.latlng[1],
            gini: giniValues.length > 0 ? giniValues[0] : null,
            cioc: formattedResponse[0]?.cioc,
            fill: colors[index % colors.length],
          
          };
          return details;
        });
  
        const newData = await Promise.all(promises);
        setCountryData(newData);
        setIsPending(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsPending(false);
      }
    };
  
    getData();
    // eslint-disable-next-line
  }, [countries]);
  
  
  const [country, setCountry]= useState("");
  

  const AddCountry= ()=>{
    setCountries([...countries,country]);
  }

  const DeleteCountry=(name)=>{
    console.log(name);
    console.log(countries);
    const indexToDelete= countries.indexOf(name);
    console.log(indexToDelete);
    if (indexToDelete !== -1) {
      const newCountries = [...countries];
      newCountries.splice(indexToDelete, 1);
      setCountries(newCountries);
    }
    console.log(countries);

  }

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
    <div className="App">
      <div className="w-screen h-screen">
        <div className="w-full h-full">
          <LayoutComponent country={country} setCountry={setCountry} countries={countries} AddCountry={AddCountry}>
            <div className='main w-full h-full p-2 lg:p-5'>
            {
              !isPending && 
            <div className="w-full h-full flex justify-between lg:flex-col">
              {/* flex-col w-1/4 h-full */}
             <div className="flex flex-col w-1/4 h-full lg:flex-row lg:w-full lg:h-fit items-center">
                {countryData.map((item) => (
                  // style={{ maxWidth: '300px', width: '100%', maxHeight: 'fit-content', backgroundColor:`${item.fill}` }}
                  <Card key={item.name} className="m-2 lg:m-5 w-full lg:max-w-76 lg:max-h-fit lg:w-full" style={{ backgroundColor:`${item.fill}` }}>
                    <CardContent className="space-y-2" >
                        <div className="flex items-center justify-end">
                        <Icon icon="maki:cross" fontSize={12} color="white" onClick={()=>{DeleteCountry(item.name);}}/>
                        </div>

                        <div className="flex items-center justify-start">
                          <Typography variant="caption lg:h5" component="div" className="text-white">
                          {item.name}
                          </Typography>
                        </div>
            
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Section 1 and 2*/}
              <div className="w-full flex-1 overflow-auto">
                <div className="flex flex-col overflow-auto lg:w-full lg:h-1/2  lg:flex-row items-center justify-between p-2">
                {/* width="25%" height="100%" */}
                  <ResponsiveContainer className="w-full h-1/5 lg:w-1/4 lg:h-full" style={{ backgroundColor: '#121212', borderRadius: '7px' }}>
                  <BarChart
                    data={countryData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    
                    <XAxis dataKey="name" tick={{ fill: 'white' }}/>
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip content={<BarCustomTooltip type='Area'/>} />
                    <Legend />
                    <Bar 
                    dataKey="area" 
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
                  {/* width="45%" height="100%" */}
                  <ResponsiveContainer  className="w-full h-1/5 lg:w-1/4 lg:h-full" >
                  <BarChart
                    data={countryData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    
                    <XAxis dataKey="name" tick={{ fill: 'white' }}/>
                    <YAxis tick={{ fill: 'white' }}/>
                    <Tooltip content={<BarCustomTooltip type='Population'/>} />
                    <Legend />
                    <Bar dataKey="population" fill="#ffffff" />
                    <ReferenceDot
                      x={0}  
                      y={0}  
                      r={5}
                      isFront
                      alwaysShow={false}
                    />
                  </BarChart>

                
                </ResponsiveContainer>

                <RadialBarComponent countryData={countryData}></RadialBarComponent>
    
                  
                  
                </div>

                {/* Section 2 */}
                <div className="flex flex-col overflow-auto lg:w-full lg:h-1/2  lg:flex-row items-center justify-between p-2">
                   {/* width="32%" height="100%"  */}
                  <ResponsiveContainer  className="w-full h-1/5 lg:w-1/4 lg:h-full">
                    <BarChart
                      data={countryData}
                      layout="vertical" 
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      
                      <XAxis type="number" tick={{ fill: 'white' }} domain={[0, 5]} />
                      <YAxis dataKey="name" type="category" tick={{ fill: 'white' }} />
                      <Tooltip content={<BarCustomTooltip type='Languages' />} />
                      <Legend />
                      <Bar dataKey="lang" fill="#ffffff" />
                      <ReferenceDot
                      x={0}  
                      y={0}  
                      r={5}
                      isFront
                      alwaysShow={false}
                    />
                    </BarChart>
                  </ResponsiveContainer>

                  {/* width="32%" height="100%" */}
                  <ResponsiveContainer  className="w-full h-1/5 lg:w-1/4 lg:h-full" style={{ backgroundColor: '#121212', borderRadius: '7px' }}>
                  <BarChart
                    
                    data={countryData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    
                    <XAxis dataKey="name" tick={{ fill: 'white' }}/>
                    <YAxis tick={{ fill: 'white' }}/>
                    <Tooltip content={<BarCustomTooltip type='Timezones'/>} />
                    <Legend />
                    <Bar dataKey="timezones" fill="#ffffff"/>
                    <ReferenceDot
                      x={0}  
                      y={0}  
                      r={5}
                      isFront
                      alwaysShow={false}
                    />
                  </BarChart>

                
                </ResponsiveContainer>
                {/* width="32%" height="100%" */}
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
    
    
                  
                  
                </div>

              </div>
             

             
              

            </div>
            }
      
          
            
           </div>
          </LayoutComponent>

        </div>
      

      </div>
    </div>
  );
}

export default App;
