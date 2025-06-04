import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
let searchCategoryContext = createContext(null);

export const MainComponent = () => {
    let categoryName = useContext(searchCategoryContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/category/${categoryName}`)
            .then(response => { setProducts(response.data);})
    }, [categoryName])
    return (
        <div>
            <p></p>
            <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
                {
                    products.map((p, index) => <div className="card mb-4" key={p.id} style={{ width: '270px' }}>
                        <div className="card-header">
                            <img src={p.image} style={{ height: '160px', width:'250px' }} />
                        </div>
                        <div className="card-body">
                             <div className="">{p.title.substring(0,10)}</div>
                        </div>
                        <div className="card-footer">
                         <span className="bg-success fw-bold text-white">$ {p.price}</span>
                         <div className="mt-2">
                         <button className="btn btn-warning bi bi-cart2 mx-4">Cart</button><button className="btn btn-success">Buy</button>
                         </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}
export const ProductSearch = () => {
    const [category, searchCategory] = useState('');
    const [categoryName, setCategory] = useState('jewelery')
    function handleSearchClick() {
        setCategory(category);
    }
    function handleSearchChange(e) {
        searchCategory(e.target.value);
    }
    function handleKeyDown(e) {
        if (e.key == 'Enter') {
            handleSearchClick();
        }
    }
    return (
        <div >
            <div className="container-fluid text-center input-group w-50 mt-2 ">
                <input type="text" onChange={handleSearchChange} className="form-control mx-2" onKeyDown={handleKeyDown} style={{ height: '35px', top: '2px' }} />
                <button className="btn btn-warning bi bi-search position-relative" onClick={handleSearchClick} type="submit"></button>
            </div>
            <main>
                <searchCategoryContext.Provider value={categoryName}>
                    <MainComponent />
                </searchCategoryContext.Provider>
            </main>
        </div>
    )
}