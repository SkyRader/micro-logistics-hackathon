import React from "react"
import "./donor.css";

function Content(){
  return(
  <div className="ngobody">
  <button className="button">Add Items</button>
  <br />
  <br />
  <a
    style={{
      marginTop: 95,
      marginLeft: 80,
      fontSize: "xx-large",
      color: "grey"
    }}
    href="#ad"
  >
    Active Donations
  </a>
  <a
    style={{
      color: "grey",
      float: "right",
      marginTop: 0,
      marginRight: 70,
      fontSize: "xx-large"
    }}
  >
    Past Donations
  </a>
  <div className="box">
    <div className="item-header">
      <a className="item-name">item name</a>
      <a className="qty">Quantity</a>
    </div>
    <a className="description">description</a>
    <div className="expiry-location-wrapper">
      <a className="expiry" style={{ marginLeft: 300, fontSize: "x-large" }}>
        Expiry
      </a>
      <a style={{ fontSize: "x-large", marginRight: 300 }}>Location</a>
    </div>
  </div>
</div>

  )
}

export default Content