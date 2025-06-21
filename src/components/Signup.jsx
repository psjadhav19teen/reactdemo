import { useState } from "react";
import Base from "./Base";

export default function Signup()
{

    const [formData,setFormData]=useState({
        uemail:"",
        upass:"",
        ucpass:""
    })

    const [errors,setErrors]=useState({});
    const [submitted,setSubmitted]=useState(false);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value,
        }));
    };

    const validate=()=>{
        let newErrors={}
        if (!formData.uemail) newErrors.uemail='Email is required';
        if (!formData.upass) newErrors.upass='Password is required';
        if (!formData.ucpass) newErrors.ucpass='Confirm Password is required';
        if (formData.upass!==formData.ucpass) newErrors.ucpass='Password and Confirm password does not match';
        if ((formData.upass).length<8) newErrors.upass='Password must be greater than 8 character length';
        return newErrors;
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const validateErrors=validate()
        setErrors(validateErrors)
        if(Object.keys(validateErrors).length===0)
        {
            console.log(formData.uemail,formData.upass,formData.ucpass);
            setSubmitted(true)
            localStorage.setItem('uemail',formData.uemail)
            localStorage.setItem('upass',formData.upass)
            window.location.href="/signin"
        }
        else
        {
            setSubmitted(false)
        }
    }



    return(
        <>
        <Base/>
        <div className="container mt-2 justify-content-center">
            <div className="row">
                <h2>SignUP Form</h2>
                { submitted && <p style={{color:"green"}}>Form submitted successfully!</p>}
            
            <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name="uemail" value={formData.uemail} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                { errors.uemail && <p style={{color:"red"}}>{errors.uemail}</p>}
        </div>

        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="upass" value={formData.upass} onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
            { errors.upass && <p style={{color:"red"}}>{errors.upass}</p>}
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
            <input type="password" name="ucpass" value={formData.ucpass} onChange={handleChange} className="form-control" id="exampleInputPassword2"/>
            { errors.ucpass && <p style={{color:"red"}}>{errors.ucpass}</p>}
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>

            </div>
        </div>
        </>
    )
}