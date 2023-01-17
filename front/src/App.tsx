import { useState, useEffect } from 'react'
import './style.scss'


// function App() {
//   const [name, setName] = useState("")
//   const [data, setData] = useState([{}])

//   async function handleSubmit(){

//     let url = `http://localhost:4000/names/${name}` 
//     const result  = await fetch(url, {method: "GET",
//     headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin' : '*'
//     }})
    
//     const res = await result.json()
//     console.log('result', res);
//     setData(res)
//   }

//   const result: any = Object.values(data)
//   console.log(result)

//   function handlechange(e: any) {
    
//     setName(e.target.value.toUpperCase());
//   }

//   return (
//     <div className="parent">
//         <div className='child'> <h1>Comme vous je m'appelle</h1> 
//           <input type="text" placeholder='  entrez un nom' onChange={handlechange}></input>  
          
//           <div className='button'><button onClick={handleSubmit}>submit</button></div>
//               {result[1] ? 
//               <div className='result'>
//                 <p>{result[1]} enfants nees a Nice ces 20 dernieres annees ont recu ce meme nom</p>
//             </div>
//                 : null
//               }
//         </div>
//     </div>
//   )
// }

// export default App


import * as React from "react";
import { useForm } from "react-hook-form";
import Result from './Result';


export default function App() {
  const { register, handleSubmit, getValues, resetField, formState: { isSubmitSuccessful } } = useForm({ mode: "onChange", defaultValues: { firstName: "" } });
  const [name, setName] = useState("")
  let singleValue: string = "";

  const onSubmit = () => {
    singleValue = getValues("firstName");
    setName(singleValue.toUpperCase());
    resetField("firstName");
    console.log('name', name)
  }
 


  return (
    <>
      <div className='container'> 
        <h1>Comme vous, je m'appelle</h1> 
          <form onSubmit={handleSubmit(onSubmit)}>
            <input className='container' {...register("firstName", { required: true })} placeholder="Entrez un prénom" />
            <div>
              <button type="submit">
                <h2>Decouvrez combien d'enfants nés à  Nice depuis l'an 2000 portent le même</h2>
              </button>
            </div>
          </form>
      </div>
          <Result value={name} />
          {/* <p className='ps'>* - de 3 apparitions sur les 20 dernières années équivaut à "aucun résultat"</p> */}
    </>
  );
}
