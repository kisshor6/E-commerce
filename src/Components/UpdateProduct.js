import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductsDetails();
    },[])
   
    const getProductsDetails = async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))

            } 
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async() =>{
    
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method : "PUT",
            body : JSON.stringify({name, price, category, company}),
            headers : {
                "Content-Type": "application/json",
                authorization: JSON.parse(localStorage.getItem('token'))
              
            } 
        });
        result = await result.json();
        if (result) {
            navigate("/");
        }
    }


  return (
      <div className='container'>
          <h1>Update Product</h1>
          <input className='input_box' value={name}
              onChange={(e) => { setName(e.target.value) }}
              type='text' placeholder='Enter Product name' />

          <input className='input_box' value={price}
              onChange={(e) => { setPrice(e.target.value) }}
              type='text' placeholder='Enter Product price' />

          <input className='input_box' value={category}
              onChange={(e) => { setCategory(e.target.value) }}
              type='text' placeholder='Enter Product category' />

          <input className='input_box' value={company}
              onChange={(e) => { setCompany(e.target.value) }}
              type='text' placeholder='Enter Product company' />

          <button className='submit_button' onClick={updateProduct} type='submit'>update Product</button>
      </div>
  )
}

export default UpdateProduct
