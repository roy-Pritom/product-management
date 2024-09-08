import Hero from "../../components/homeComponents/Hero";
import TopProduct from "../../components/homeComponents/TopProduct";

const HomePage = () => {
    return (
        <div>
            <Hero/>
            <div className="max-w-7xl lg:mx-auto mx-3">
            <TopProduct/>
            </div>
        </div>
    );
};

export default HomePage;