import React, { useEffect, useState } from 'react'
import Dropdowns from '../components/Dropdowns';
import { FaHeart } from "react-icons/fa";

import Swapbtn from '../components/Swapbtn';
//https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}

function Content() {

const [amount,setamount]=useState();
const [currencies,setcurrencies]=useState([]);
const [fromcurreny,setfromcurrency]=useState('INR');
const [tocurrency,settocurrency]=useState('USD');
const [convertedAmount,setconvertedAmount]=useState(null);
const [Converting,setconverting]=useState(false);

const [favourites, setfavourites] = useState((JSON.parse(localStorage.getItem("favourites") || [])));

const fetchcurrencies=async ()=>{
try {
    const res=await fetch("https://api.frankfurter.dev/v1/currencies");
    const data=await res.json();

    setcurrencies(Object.keys(data));

} catch (error) {
    console.log("404 error ");
    

}

}

useEffect(()=>{
    fetchcurrencies();
},[]);



const convertcurrency= async()=>{
if (!amount) {
    return
}
setconverting(true);


    try {
        const res=await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromcurreny}&symbols=${tocurrency}`);
        const data=await res.json();
 setconvertedAmount(data.rates[tocurrency]+" "+tocurrency);
    } catch (error) {
        console.log("404 error ");
        
    
    }finally{
        setconverting(false)

    }


}

const handlefavourite=(currency)=>{
let updatedfav=[...favourites];
if (favourites.includes(currency)) {
    updatedfav=updatedfav.filter(fav=>fav !== currency)

}
else{
    updatedfav.push(currency);
}

setfavourites(updatedfav);
localStorage.setItem("favourites",JSON.stringify(updatedfav));

}

const handleswap=()=>{
setfromcurrency(tocurrency);
settocurrency(fromcurreny);
}

  return (
    <div className='flex items-center justify-center min-h-screen body'>
    <div className='currency-converter max-w-xl mx-auto m-auto  w-[600px] p-5  rounded-lg  shadow-md'>
      <h2 className=' mb-5 font-semibold text-4xl text-white  underline'>Currency Converter</h2>
    
<div className=' flex gap-7  content-center justify-center'> 
<Dropdowns  currencies={currencies}
             title="From"
              setfavourites={handlefavourite}
              setcurrency={setfromcurrency}
              currency={fromcurreny}
              favourites={favourites}
              /> 
<Swapbtn handleswap={handleswap}/>
<Dropdowns currencies={currencies} 
            title='To'
             setfavourites={handlefavourite}
             setcurrency={settocurrency}
             currency={tocurrency}
             favourites={
                favourites
             }/>
 </div>


<div className='mt-4'>
    <label htmlFor="amount" className=' block text-xl font-medium text-white'>Amount:</label>
<input type="number" name="" id="inputamount" value={amount} onChange={(e)=>{
setamount(e.target.value); 
}}  className=' shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 w-full p-2 border-gray-800  border-t-[3px] border-r-[3px] border-l-[3px] border-b-[3px] rounded-full border-t-green-400 border-r-green-400 border-l-blue-500 border-b-blue-500 placeholder:text-center placeholder:text-white text-black font-bold'  placeholder='Enter the Amount'/>
</div>
<div className=' flex justify-end mt-6'>
    <button type='' onClick={convertcurrency} className={`px-5 py-2 bg-indigo-500 text-white rounded-3xl hover:bg-indigo-700 shadow-2xl  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset ${Converting?"animate-bounce":""}`}>Convert</button>

</div>
{
 convertedAmount && (
<div className='mt-4  text-2xl font-medium text-center text-green-400 ' > Converted Amount is : {convertedAmount}  </div>
)}

<div className='mt-4  text-2xl font-medium text-center text-white ' > Created by </div><div className=' flex justify-center gap-3 '> <FaHeart className='text-red-500'/> <a href="https://portfolio-professional.netlify.app/" className=' underline hover:text-green-500 font-semibold text-2xl'> Subham Dey</a> <FaHeart className='text-red-500'/>  </div>


    </div>
    </div>
  )
}

export default Content
