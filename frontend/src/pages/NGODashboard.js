import React from "react"
import "./ngo.css";


function Content(){
  return(
  <div className="ngobody">
  <a
    style={{
      float: "left",
      marginTop: 95,
      marginLeft: 80,
      fontSize: "xx-large",
      color: "grey"
    }}
    href="#ad"
  >
    Available Donations
  </a>
  <div className="top-right">
    <button className="button">Filters</button>
    <a className="claims" style={{ color: "grey" }}>
      claims
    </a>
  </div>
  <div className="box">
    <a className="item-name">Item Name</a>
    <a className="qty">Qty:</a>
    <a className="provider-name">provider name</a>
    <a className="description">description</a>
    <div className="expiry-location-wrapper">
      <a className="expiry" style={{ marginLeft: 300, fontSize: "x-large" }}>
        Expiry
      </a>
      <a className="location" style={{ fontSize: "x-large" }}>
        Location
      </a>
      <button className="button" style={{ width: 200, height: 50 }}>
        Place Order
      </button>
    </div>
  </div>
</div>
  )
}

export default Content