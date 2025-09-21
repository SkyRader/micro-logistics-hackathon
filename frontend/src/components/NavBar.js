import React from "react"
import './NavBarcss.css'

function Header(){
    return(

<div className="topnav">
  <a style={{ marginLeft: 30 }}>Logo</a>
  <a style={{ marginLeft: 350 }}>User ID</a>
  <a>Role</a>
  <a>Name</a>
  <img src="noprofile.png" className="noprofile" />
</div>

    )
}

export default Header