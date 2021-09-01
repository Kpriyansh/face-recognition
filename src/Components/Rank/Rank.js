import React from 'react';
const Rank=(props)=>{

    return(
        <div style={{textAlign:'center',marginTop:'-10px',fontWeight:'lighter'}}>
            <p className='f3 white'>
                {`${props.user.name}, your current entry count is...`} 
                <br/>
                {`#${props.user.rank}`}
            </p>
            
        </div>
    );
}
export default Rank;