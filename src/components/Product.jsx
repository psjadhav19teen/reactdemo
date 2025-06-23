import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Base from "./Base";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchproduct();
    }, []);

    const fetchproduct = async () => {
        try {
            const response = await axios.get('https://djangoreact.pythonanywhere.com/allproducts/');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const show_search = async () => {
        if (searchTerm.trim() === '') return;
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
        const data = await response.json();
        setProducts(data.products);
    };

    const fectchelectronics = async () => {
        const response = await fetch('https://dummyjson.com/products/category/laptops/');
        const data = await response.json();
        setProducts(data.products);
    };

    return (
        <>
            <Base searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={show_search} />

            <div className="container my-4">
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-outline-secondary">Mobile</button>
                    <button className="btn btn-outline-secondary" onClick={fectchelectronics}>Electronics</button>
                    <button className="btn btn-outline-secondary">Shoes</button>
                    <button className="btn btn-outline-secondary">Clothes</button>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row g-4">
                    {products && products.map((p, index) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <img 
                                    src={p.photo} 
                                    className="card-img-top img-fluid" 
                                    alt={p.name} 
                                    style={{ height: "200px", objectFit: "cover" }} 
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-primary">{p.name}</h5>
                                    <p className="card-text text-muted mb-1">{p.category}</p>
                                    <p className="card-text fw-semibold text-dark mb-3">Price: ${p.price}</p>
                                    <Link to={`/productdetails/${p.id}`} className="btn btn-sm btn-primary mt-auto">View More</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
