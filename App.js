// import Products from "./components/Header/Products";
import "./App.css";
import Header from "./components/UI/Header/Header";


import data from "./components/Data/Itemlist";
import Footer from "./components/Footer/Footer";
import Routes from "./components/UI/Routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import homedata from "./components/Data/HomeItems";
import { AuthContextProvider } from "./Store/auth-context";

function App() {
  const { productItems } = data;
  const {prodItems} = homedata;
  const [cartItems, setCartItems] = useState([]);
  

  const handleAddProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );
    }
  };
 

  return (
    <div>
      <div>
        <AuthContextProvider>
        <Router>
          <Header cartItems={cartItems}/>
          <Routes
            productItems={productItems}
            cartItems={cartItems}
            handleAddProduct={handleAddProduct}
            handleRemoveProduct={handleRemoveProduct}
            prodItems={prodItems}
            
          />
        </Router>
        </AuthContextProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
