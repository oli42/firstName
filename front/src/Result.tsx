import { useEffect, useState } from "react";
import './style.scss'

export default function Result ({value}: any) {

    const [data, setData] = useState([{}])
    let result: any = [{}];
    
    async function handleData(){
      
        let url = `http://localhost:4000/names/${value}` 
        const res  = await fetch(url, {method: "GET",
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
        }})
        
        const res2 = await res.json()
        result = Object.values(res2)
        setData(result)
      } 

      useEffect(() => {
        if (value.length > 1)
            handleData();
      }, [value])
    

    return (
        <div className='result'>
              {data[1] && data[1] != 0 ? 
                  <p>{data[1]} enfants nés à  Nice depuis l'an 2000 portent le prénom {value}</p>
              : data[1] == 0 ?
                  <div>
                  <p>Aucun résultat pour votre recherche</p>
                  <span>* - de 3 apparitions sur les 20 dernières années équivaut à "aucun résultat"</span>
                  </div>
              : null
              }
        </div>
    )

}
