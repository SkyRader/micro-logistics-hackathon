import React from "react"
import "./logincss.css";

function Content(){

<div className="loginbox">
  <div className="logobox">
    <p>hello</p>
  </div>
  <form>
    <select className="dropdown">
      <option>--Select--</option>
      <option>NGO</option>
      <option>Provider</option>
    </select>
    <input className="formbox" placeholder="enter email" />
    <br />
    <label style={{ fontSize: "large" }}>Password:</label>
    <input
      className="formbox"
      placeholder="enter password"
      style={{ width: 406 }}
    />
    <br />
    <input className="formbox" placeholder="enter password" />
    <br />
    <a style={{ float: "left" }}>Don't have an account?</a>
    <a href="#su">Sign up</a>
    <a style={{ float: "right" }} href="#fp">
      forgot password
    </a>
    <br />
    <br />
    <br />
    <input className="submit" type="button" defaultValue="LOGIN" />
  </form>
</div>

}

export default Content
