import React from 'react'
import { HiMiniArrowsRightLeft } from "react-icons/hi2";
function Swapbtn({handleswap}) {
  
    

    return (
    <div>
      <button className='bg-indigo-500 rounded-full text-white font-extrabold p-3' onClick={handleswap}><HiMiniArrowsRightLeft/></button>
    </div>
  )
}

export default Swapbtn
