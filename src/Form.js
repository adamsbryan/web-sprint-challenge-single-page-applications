import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .required("You must enter a name for the order"),
  
    size: yup
        .string()
        .oneOf(["small", "medium", "larg"], "You must choose your pizza size")
        .required("You must select a size"),
    
    specialInstructions: yup.string(),

    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    mushrooms: yup.boolean(),
    pineapple: yup.boolean()
  });

export default function Form() {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [formState, setFormState] = useState({
        name: "",
        size: "",
        specialInstructions: "",
        pepperoni: false,
        sausage: false,
        mushrooms: false,
        pineapple: false
    });

    const [errors, setErrors] = useState({
        name: "",
        size: ""
    });

    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data);
                console.log("success", post);
            })
            .catch(err => console.log(err.response));
    };

    const validateChange = e => {
        yup.reach(formSchema, e.target.name)
            .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
            
            .then(valid => {
                setErrors({
                    ...errors, [e.target.name] : ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors, [e.target.name] : err.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState, [e.target.name] : 
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    };

    return(
        <div>
            <h2>Build Your Own Pizza</h2>
            <form onSubmit = {formSubmit}>
                <label htmlFor = "name">
                    Name
                    <input
                        id = "name"
                        type = "text"
                        name = "name"
                        value = {formState.name}
                        onChange = {inputChange}
                    />
                    {errors.name.length > 0 ? <p className = "error">{errors.name}</p> : null}
                </label>

                <label htmlFor = "size">
                    Pizza size
                    <select
                        id = "size"
                        type = "text"
                        name = "size"
                        value = {formState.size}
                        onChange = {inputChange}
                    >
                    <option value="">Choose pizza size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="larg">Large</option>   
                    </select>
                    {errors.size.length > 0 ? <p className = "error">{errors.size}</p> : null}
                </label>

                <h2>Choose your toppings:</h2>

                <label htmlFor = "pepperoni">
                    Pepperoni
                    <input 
                        id = "pepperoni"
                        type = "checkbox"
                        name = "pepperoni"
                        checked = {formState.pepperoni}
                        onChange = {inputChange}
                    />
                </label>

                <label htmlFor = "sausage">
                    Sausage
                    <input 
                        id = "sausage"
                        type = "checkbox"
                        name = "sausage"
                        checked = {formState.sausage}
                        onChange = {inputChange}
                    />
                </label>

                <label htmlFor = "mushrooms">
                    Mushrooms
                    <input 
                        id = "mushrooms"
                        type = "checkbox"
                        name = "mushrooms"
                        checked = {formState.mushrooms}
                        onChange = {inputChange}
                    />
                </label>

                <label htmlFor = "pineapple">
                    Pineapple
                    <input 
                        id = "pineapple"
                        type = "checkbox"
                        name = "pineapple"
                        checked = {formState.pineapple}
                        onChange = {inputChange}
                    />
                </label>
                
                <div>
                    <label htmlFor = "spInstructions">
                        Special instructions:
                        <textarea
                            id = "spInstructions"
                            name = "specialInstructions"
                            value = {formState.specialInstructions}
                            onChange = {inputChange}
                        />
                    </label>    
                </div>
               
                <pre>{JSON.stringify(post, null, 2)}</pre>
                <button disabled = {buttonDisabled}>Order</button>
            </form>
        </div>
    );
}