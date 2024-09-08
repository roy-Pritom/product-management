import { useState } from "react";
import Loader from "../../components/ui/Loader";
import ProductCard from "../../components/ui/ProductCard";
import { useGetAllProductQuery } from "../../redux/api/product/productApi";
import { TProduct } from "../../types/product";
import Pagination from "../../components/ui/Pagination";

const AllProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 6;
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    
    const { data, isLoading } = useGetAllProductQuery({});
    const products = data?.categories;
    // console.log(data);
    const currentProducts = products?.slice(firstPostIndex, lastPostIndex);
    return (
        <div className="pt-20 max-w-7xl lg:mx-auto mx-3">
            <h3 className="text-4xl font-bold mb-10 text-center">All Products</h3>
            {
                isLoading ? (
                    <Loader />
                )
                    :
                    (

                        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 ">
                            {
                                currentProducts?.map((product: TProduct) => <ProductCard
                                    key={product?.id}
                                    product={product}
                                />)
                            }
                        </div>
                    )
            }
             <div className="flex justify-center items-center mt-5">
                <Pagination
                    totalPosts={products?.length}
                    postPerPage={postPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default AllProductPage;