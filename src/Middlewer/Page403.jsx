import React from "react";
import { useNavigate } from "react-router-dom";
export default function Page403() {
  const navigator=useNavigate()
  return (
    <div className="page_403">
      <h1>403</h1>
      <h1>Accsess denied</h1>
      <h1>Plase Login To Accsess This Page</h1>
      <button className="btn btn-success btn-lg" onClick={()=>{
        navigator('/login')
      }}>Login</button>
    </div>
  );
}
