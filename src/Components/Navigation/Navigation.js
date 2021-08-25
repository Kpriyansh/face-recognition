import React from 'react';
import Logo from '../Logo/Logo'
const Navigation = (props) => {
   
    if(props.curRoute==='home'){
    return(

       <nav style={{display:'flex',justifyContent:'space-between'}}>
           <Logo/>
           <p onClick={props.newRoute} className=" f3 link dim underline black pointer pa3" style={{height:"25px"}}>Sign Out</p>
       </nav>
   );
    }else{
        return(
        <nav style={{display:'flex',flexDirection:'row-reverse'}}>
           <p onClick={props.newRoute} className=" f3 link dim underline black pointer pa3" style={{height:"25px"}}>Sign In</p>
       </nav>
        );
    }
}
export default Navigation;