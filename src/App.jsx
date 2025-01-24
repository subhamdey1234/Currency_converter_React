import { useState } from 'react'

import './App.css'
import Content from './pages/Content'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=''>
      <div className=' text-center'>
                    <Content/>
        </div>
    </div>
  )
}

export default App
