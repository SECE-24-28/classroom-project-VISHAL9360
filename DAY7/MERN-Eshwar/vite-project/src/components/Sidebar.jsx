import React from 'react'

const Sidebar = ({ items = ['Prepaid', 'Postpaid', 'DTH', 'Electricity'] }) => {
  return (
    <aside style={{width:220, padding:'1rem', background:'#0b1220', color:'#cbd5e1', borderRadius:8}}>
      <h3 style={{marginTop:0, marginBottom:'0.5rem'}}>Services</h3>
      <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:8}}>
        {items.map((it,idx) => (
          <li key={idx} style={{padding:'0.5rem 0.75rem',background:'#071023',borderRadius:6}}>
            <a href="#" style={{color:'#e2e8f0',textDecoration:'none'}}>{it}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
