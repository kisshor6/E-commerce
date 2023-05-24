import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers : {
                authorization : JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result)
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            },
            method: "Delete"
        });
        result = await result.json()
        if (result) {
            getProducts();
        }
    }
    const searchHandle = async(event)=>{
        const key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }else{
            getProducts();
        }
        
    }

  return (
      <div className='product-list'>
          <h3>Product-List</h3>
          <input type='search' onChange={searchHandle} className='search-box' placeholder='Search Product'/>
          <ul>
              <li>S.no</li>
              <li>name</li>
              <li>price</li>
              <li>category</li>
              <li>company</li>
              <li>Operations</li>

          </ul>
          { products.length>0 ?
              products.map((item, index) =>
                  <ul key={item._id}>
                      <li>{index + 1}</li>
                      <li>{item.name}</li>
                      <li>${item.price}</li>
                      <li>{item.category}</li>
                      <li>{item.company}</li>
                      <li>
                          <button className='deleteBtn' onClick={() => deleteProduct(item._id)}>delete</button>
                          <Link to={"/update/" + item._id}>Update</Link>
                      </li>

                  </ul>
              ): <h2>No data available</h2>
          }
    </div>
  )
}

export default Products
