import axios from 'axios';
import { useEffect, useState } from 'react';

export default function RegisterProduct() {
    const [products, setProducts] = useState([]);
    const [newName, setName] = useState("");
    const [newCategory, setCategory] = useState("");
    const [newPrice, setPrice] = useState("");
    const [newPhoto, setPhoto] = useState("");

    async function fetchproduct() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/allproducts/');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/addproduct/', {
                name: newName,
                category: newCategory,
                price: newPrice,
                photo: newPhoto
            })
            .then(() => {
                fetchproduct();
                setName("");
                setCategory("");
                setPrice("");
                setPhoto("");
            });
    }

    useEffect(() => {
        fetchproduct();
    }, []);

    const storeduemail = localStorage.getItem('uemail');

    return (
        <div className="container py-5">
            <div className="text-center mb-4">
                <h3 className="fw-bold">Welcome, {storeduemail}!</h3>
                <a href="/" className="btn btn-outline-danger btn-sm mt-2">Logout</a>
            </div>

            <hr className="mb-5" />

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4">
                        <h4 className="mb-4 text-center text-primary">Add New Product</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={newName}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Category"
                                    value={newCategory}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Price"
                                    value={newPrice}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Photo URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Photo URL"
                                    value={newPhoto}
                                    onChange={(e) => setPhoto(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {products.length > 0 && (
                <>
                    <hr className="my-5" />
                    <h4 className="text-center mb-4">Product List</h4>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped text-center align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Photo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>${product.price}</td>
                                        <td>
                                            <img src={product.photo} alt={product.name} width="60" height="60" className="img-thumbnail" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
