import React from 'react'

const Footer = ({ company = 'Recharge Inc.' }) => {
  const year = new Date().getFullYear()
  return (
    <footer style={{padding:'1rem',textAlign:'center',color:'#94a3b8',borderTop:'1px solid rgba(255,255,255,0.04)',marginTop:'2rem'}}>
      <small>
        © {year} {company}. All rights reserved. Built with React + Vite.
      </small>
    </footer>
  )
}

export default Footer
