import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-root">
      <Navbar />
      <div style={{display:'flex',gap:20,alignItems:'flex-start',marginTop:20}}>
        <Sidebar />
        <main style={{flex:1}}>
          <section style={{display:'flex',gap:16,alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </section>

          <h1>Vite + React — Mobile Recharge UI</h1>

          <div className="card">
            <button onClick={() => setCount((c) => c + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> to build your app. The components
              <code>Navbar</code>, <code>Sidebar</code> and <code>Footer</code> are reusable.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App
