import { Button } from "@nextui-org/react";
import { useGetAllProductQuery } from "../../redux/api/product/productApi";
import { TProduct } from "../../types/product";
import Loader from "../ui/Loader";
import ProductCard from "../ui/ProductCard";
import { Link } from "react-router-dom";

const TopProduct = () => {
    const { data, isLoading } = useGetAllProductQuery({});
    const products = data?.categories;
    // console.log(data);
    return (
        <div className="pt-20">
            <div className="space-y-4 mb-8">
            <h3 className="text-4xl font-bold  text-center">Our Products</h3>
            <p className="text-center  ">Discover our exclusive collection of high-quality products tailored to meet your needs.</p>
            </div>
            
            {
                isLoading ? (
                    <Loader />
                )
                    :
                    (

                        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 ">
                            {
                                products?.slice(0, 6)?.map((product: TProduct) => <ProductCard
                                    key={product?.id}
                                    product={product}
                                />)
                            }
                        </div>
                    )
            }
            <div className="flex justify-center items-center">
                <Link to='/products'>
                    <Button className="mt-5">See all</Button>
                </Link>
            </div>
        </div>
    );
};

export default TopProduct;