import {observable, computed} from "mobx";
import {observer} from "mobx-react";
import React,{Component} from 'react';
import style from './styleA.less'
//console.log(style,style.fruit,style.price)
class ToolA extends Component{
    
    render(){
        let fruit = this.props.fruit;
        return (
            <div>
                <p className="fruit" > fruit {fruit.name}</p>
                <p className="price"> price {fruit.price}</p>
            </div>
        );
    }
}

export default ToolA;