import LayoutComponent from "./components/Layout";
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import RadialBarComponent from "./components/RadialBar";
import ScatterChartComponent from "./components/ScatterChart";
import BarChartComponent from "./components/BarChart";
import HorizontalBarChartComponent from "./components/HorizontalBarChart";

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

  return (
    <div className="App">
      <div className="w-screen h-screen">
        <div className="w-full h-full">
          <LayoutComponent country={country} setCountry={setCountry} countries={countries} AddCountry={AddCountry}>

            <div className='main w-full h-full p-2 lg:p-5'>
            {
              !isPending && 
            <div className="w-full h-full flex justify-between lg:flex-col">
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
              <div className="w-full flex  flex-col lg:flex-1 overflow-auto">
                {/* Section 1 */}
                
                <div className="flex flex-col w-full h-full lg:w-full lg:h-1/2  lg:flex-row items-center justify-between p-2">
                
                  <BarChartComponent style={{ backgroundColor: '#121212', borderRadius: '7px'}} xDataKey='name' yDataKey='' type='Area' dataKey='area' countryData={countryData}/>

                  <RadialBarComponent countryData={countryData}></RadialBarComponent>

                  <BarChartComponent  style={{ backgroundColor: '#121212', borderRadius: '7px'}} xDataKey='name' yDataKey='' type='Population' dataKey='population' countryData={countryData}/>

                </div>

                {/* Section 2 */}
                
                <div className="flex flex-col w-full h-full lg:w-full lg:h-1/2  lg:flex-row items-center justify-between p-2">
                  
                  <HorizontalBarChartComponent xDataKey='' yDataKey='name' type='Languages' dataKey='lang' countryData={countryData}/>
    
                  <BarChartComponent style={{ backgroundColor: '#121212', borderRadius: '7px'}} xDataKey='name' yDataKey='' type='Timezones' dataKey='timezones' countryData={countryData}/>

                  <ScatterChartComponent countryData={countryData}/>
               
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
