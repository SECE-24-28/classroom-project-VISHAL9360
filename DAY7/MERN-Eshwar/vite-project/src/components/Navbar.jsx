import React from 'react'

const Navbar = ({ title = 'Mobile Recharge' }) => {
  return (
    <header className="app-navbar" style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '0.75rem 1rem',background: 'linear-gradient(90deg,#1e293b,#0f172a)',color:'#fff'}}>
      <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
        <div style={{width:36,height:36,background:'#646cff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>R</div>
        <h1 style={{fontSize:'1.1rem',margin:0}}>{title}</h1>
      </div>
      <nav>
        <a href="#" style={{color:'#cbd5e1',marginRight:16,textDecoration:'none'}}>Home</a>
        <a href="#" style={{color:'#cbd5e1',marginRight:16,textDecoration:'none'}}>Recharge</a>
        <a href="#" style={{color:'#cbd5e1',textDecoration:'none'}}>Plans</a>
      </nav>
    </header>
  )
}

export default Navbar
