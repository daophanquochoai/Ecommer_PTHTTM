import { useState } from 'react'
import Home from "./pages/Home.tsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={'bg-primary'}>
      <Home />
    </div>
  )
}

export default App
