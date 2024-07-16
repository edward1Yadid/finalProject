import React, { useEffect, useState } from 'react'

import ExpirienceCustomers from '../services/ExpirienceCustomers';
import { getAllModels } from '../services/axios/modelsStore/modelsApiAxios';
import GeneralPageCompenent from '../services/GeneralPageComponent';
function OurModels() {
    const [modelsWebStore, setModelWebStore] = useState();
    useEffect(() => {
        const fetchModels = async () => {
          try {
            const modelsWeb = await getAllModels();
            console.log(modelsWeb);
            setModelWebStore(modelsWeb);
          } catch (error) {
            console.error("Error fetching models:", error);
          }
        };
    
        fetchModels();
      }, []);
  return (
<>

<GeneralPageCompenent
    title={"Embodying Elegance: Meet Our Fashion Ambassadors"}
    subtitle={
      "Explore Their Unique Styles and Commitment to Harmony and Sustainability"
    }
  />

        <ExpirienceCustomers models={modelsWebStore} /> 
</>
  )
}

export default OurModels
