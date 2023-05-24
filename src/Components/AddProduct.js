import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const addProduct = async()=>{

        if (!name || !price || !category || !company) {

            setError(true)
            return false;
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id 
        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, company, userId}),
            headers : {
                authorization: JSON.parse(localStorage.getItem('token')),
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        if (result) {
            navigate("/");
        }
    }

  return (
      <div className='container'>
          <h1>Add Product</h1>
          <input className='input_box' value={name} 
          onChange={(e)=>{setName(e.target.value)}}
           type='text'  placeholder='Enter Product name' />

        { error && !name && <span className='input-invalid'>Input Valid name</span>}
          <input className='input_box' value={price} 
          onChange={(e)=>{setPrice(e.target.value)}}
           type='text' placeholder='Enter Product price' />

          {error && !price && <span className='input-invalid'>Input Valid price</span>}
          <input className='input_box' value={category} 
          onChange={(e)=>{setCategory(e.target.value)}} 
          type='text' placeholder='Enter Product category' />

          {error && !category && <span className='input-invalid'>Input Valid category</span>}
          <input className='input_box' value={company} 
          onChange={(e)=>{setCompany(e.target.value)}}
           type='text' placeholder='Enter Product company' />
          {error && !company && <span className='input-invalid'>Input Valid company</span>}

          <button className='submit_button' onClick={addProduct}  type='submit'>Add Product</button>
    </div>
  )
}

export default AddProduct
