import React from "react";
import { render } from "react-dom";
import ToolA from "./components/ToolA.js"
import {observable} from "mobx"
import {create} from 'mobx-persist';
//import {test} from './models/TestStore'
import auth from './models/AuthStore'

let fruits=[{name:"apple",price:30}];
console.log("toolA",ToolA)
let hydrare = create({});

render(
  <div>
    <p>hello</p>
    <ToolA fruit={fruits[0]} />
  </div>,
  document.getElementById("root")
);

setTimeout(()=>{
  if(!auth.hasToken()){
    auth.setToken("mmmtest")
  }
},1000)

setTimeout(()=>{
  auth.clearToken()
},5000)