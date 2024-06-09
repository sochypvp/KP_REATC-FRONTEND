import "../src/App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/HeaderFooter/Header";
import Footer from "./Components/HeaderFooter/Footer";
import Home from "./Components/View/MainViews/Home";
import ProductDetail from "./Components/View/MainViews/ProductDetail";
import Product from "./Components/View/MainViews/Product";
import Contact from "./Components/View/MainViews/Contact";
import ShoppingCart from "./Components/View/MainViews/ShoppingCart";
import AccounForm from "./Components/View/Account/AccounForm";
import LogIn from "./Components/View/Account/LogIn";
import Register from "./Components/View/Account/Register";
import { ProductProvider } from "./Components/View/context/productContext";
import { MainCategProvider } from "./Components/View/context/mainCategContext";
import { SubCategProvider } from "./Components/View/context/subCategContext";
import { BrandProvider } from "./Components/View/context/brandContext";
import { HomePageProvider } from "./Components/View/context/homePageContext";
// import Login from "./Components/View/MainViews/Login";
import { AuthProvider } from "./Components/View/context/AuthContext";
// import Register from "./Components/View/MainViews/Register";
import PrivateRoute from "./Components/route/PrivateRoute";
import { UserProvider } from "./Components/View/context/userContext";
import CheckOut from "./Components/View/MainViews/CheckOut";
import Buying from "./Components/View/MainViews/Buying";

function App() {
  return (
    <ProductProvider>
      <MainCategProvider>
        <SubCategProvider>
          <BrandProvider>
            <HomePageProvider>
              <AuthProvider>
                <UserProvider>
                  <Router>
                    <Header />
                    <Routes>
                      {/* <MainPage /> */}
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Product />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/my_account/*" element={<PrivateRoute component={AccounForm} />} />
                      <Route path="/cart" element={<PrivateRoute component={ShoppingCart} />} />
                      <Route path="/login" element={<LogIn />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/checkout" element={<CheckOut/>} />
                      <Route path="/buying/:id" element={<Buying/>}/>
                    </Routes>
                    <Footer />
                  </Router>
                </UserProvider>
              </AuthProvider>
            </HomePageProvider>
          </BrandProvider>
        </SubCategProvider>
      </MainCategProvider>
    </ProductProvider>

  );
}

export default App;