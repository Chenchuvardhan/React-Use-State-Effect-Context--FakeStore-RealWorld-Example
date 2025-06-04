import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { ProductSearch } from './product-search/product-search.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductSearch />
  </StrictMode>,
)
