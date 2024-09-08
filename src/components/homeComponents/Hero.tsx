import { Button, Card, CardBody, CardHeader, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  // Define animation variants for the cards
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // Animation for the container to stagger cards in a row, one by one
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.5,
        when: "beforeChildren",
      },
    },
  };

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src="https://img.freepik.com/free-vector/modern-welcome-composition-with-blurred-effect_23-2147900386.jpg?ga=GA1.1.391682662.1694501547&semt=ais_hybrid"
          alt="Banner Background"
          className="object-cover w-full h-full"
          style={{ opacity: 0.5 }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-800 mix-blend-multiply opacity-70"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section with Animations */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1 className="text-6xl font-extrabold mb-4 leading-tight">
            Elevate Your Business with Us
          </h1>
          <p className="text-xl max-w-md mb-8 leading-relaxed">
            Join our community and access the best products and services to help
            your business thrive in today's competitive market.
          </p>
          {/* <Link to="/products"> */}
          <Button
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            color="primary"
            size="lg"
            className="rounded-full shadow-lg transform transition hover:shadow-xl hover:scale-105"
          >
            <Link to="/products">
            
            All Product
            </Link>
          </Button>
          {/* </Link> */}
        </motion.div>

        {/* Right Section with Animated Cards in a Row */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 flex lg:flex-row flex-col gap-3 lg:space-x-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="flex justify-center"
              variants={cardVariants}
            >
              <Card className="w-full max-w-xs rounded-xl shadow-xl bg-white text-black overflow-hidden">
                <CardHeader className="flex items-center gap-3 p-4 bg-blue-500 text-white">
                  <Image
                    alt="Product Image"
                    height={40}
                    radius="sm"
                    src="https://cdn-icons-png.flaticon.com/128/679/679922.png"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">Product {index}</p>
                    <p className="text-sm text-gray-200">Subtitle {index}</p>
                  </div>
                </CardHeader>
                <CardBody className="p-4">
                  <p className="text-base">
                    Discover our exclusive products that cater to all your needs
                    and elevate your lifestyle.
                  </p>
                </CardBody>
                <CardFooter className="p-4 flex justify-end">
                  <Button color="primary" size="sm">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
