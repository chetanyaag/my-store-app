// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import ProductTable from './components/ProductTable'

function App() {


  return (
    <>
      <header className="bg-gray-800 text-white py-4 px-6 flex items-center">
        <h1 className="text-2xl font-bold font-comic">My Store</h1>
      </header>
      <ProductTable/>
    </>



  )
}

export default App
