import facebook from "../../../assets/Home/facebook.png";
import instagram from "../../../assets/Home/instagram.png";
import linkedIn from "../../../assets/Home/linkedin.png";
import twitter from "../../../assets/Home/twitter.png";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="mt-10 py-12 bg-green-200 text-black">
            <div className="max-w-6xl mx-auto">
                <div className="flex md:flex-row flex-col gap-10 justify-center items-center">
                    <Link to='/products'>
                        <p>Products</p>
                    </Link>
                    <Link to="/create-product">
                        <p>Add Product</p>
                    </Link>
                    <Link to="/about">
                        <p>About Us</p>
                    </Link>
                    <p>Why Choose Us</p>
                </div>
                <div className="flex gap-6  justify-center items-center my-8">
                    <Link to='https://www.facebook.com/pritom.roy.581525?mibextid=ZbWKwL'>
                        <img src={facebook} width={30} height={30} alt="facebook" />
                    </Link>
                    <img src={instagram} width={30} height={30} alt="instagram" />
                    <img src={twitter} width={30} height={30} alt="twitter" />
                    <Link to='https://www.linkedin.com/in/pritom-roy-aba25b279'>
                        <img src={linkedIn} width={30} height={30} alt="linkedIn" />
                    </Link>
                </div>
                <div className="border-b-[1px] border-dashed border-black">
                </div>
                <div className="flex lg:flex-row flex-col lg:gap-0 md:gap-4 gap-2 justify-between items-center pt-8">
                    <p>@2024 PH Health Care.All Rights Reserved.</p>
                    <h3 className="md:text-4xl text-3xl font-bold"><span className="text-[#29CD9C]">E</span>Com</h3>
                    <p>Privacy Policy! Terms & Conditions</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;