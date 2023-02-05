import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductProvider";



const Home = () => {
  const { state: { products, error, loading } } = useProducts();

  let content = <></>
  if (loading) {
    content = <p>data is loading</p>
  }
  if (error) {
    content = <p className="font-bold">something went wrong while connect to server</p>
  }
  if (!loading && !error && products.length === 0) {
    content = <p className="font-bold">no product found</p>
  }
  if (!loading && !error && products.length) {
    content = products.map((product) => <ProductCard
      key={product._id}
      product={product}
    ></ProductCard>)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
      {
        content
      }
    </div>
  );
};

export default Home;