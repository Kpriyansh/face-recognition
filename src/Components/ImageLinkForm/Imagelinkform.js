import React from 'react';
import '../../index.css';
import './Imageform.css';
class ImagelinkForm extends React.Component {

   
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <p className='f3'>
                    {'This magic brain will detect faces in your picture. Give it a try'}
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>


                    <div className="shadow-5 pa3 br3" id='link-form' style={{ display: "flex", justifyContent: "center", width: "400px", marginLeft: "10px", marginRight: "10px" }}>
                        <input style={{
                            backgroundColor: "#fff", boxShadow: "inset 1px 2px 8px rgba(0,0,0,0.07)", fontFamily: "inherit", fontSize: "1em", width: "70%",
                            lineHeight: "1.45", borderRadius: "4px", padding: "0.6em 1.45em 0.7em", border: "1px solid #d1d1d1", color: "#525865", outline: "none", transition: ".18s"
                        }}
                            type="url" placeholder="Paste the link here"
                            onChange={this.props.onInputChange}
                        />
                        <button type="button" className="tc grow pointer bg-light-purple white"
                            style={{ padding: "0.4em 1.40em 0.4em", borderRadius: "4px", outline: "none", border: "0px solid black" }}
                            onClick={this.props.onButtonSubmit}
                            
                        >Detect</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default ImagelinkForm;