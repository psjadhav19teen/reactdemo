import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

export default function ProductDetails()
{
    const {id}=useParams()
    const [products,setProducts]=useState(null);

    async function fetchproductdetails() {
        let response=await fetch(`https://dummyjson.com/products/${id}`)
        let data=await response.json()
        setProducts(data)
        console.log(data)
    }
    useEffect(()=>{
        fetchproductdetails();
    },[id])

    if(!products)
    {
        return <div>Loading...</div>
    }

    return(
        <div>
            <h1>Product Details</h1>
            <h5 className='card-title'>{products.title}</h5>
            <p className='card-text'>{products.description}</p>
            <p className='card-text'>Price:{products.price}</p>
        </div>
    )
}