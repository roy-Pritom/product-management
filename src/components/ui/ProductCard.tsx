import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button, useDisclosure } from "@nextui-org/react";
import { TProduct } from "../../types/product";
import { motion } from "framer-motion";
import { Pencil, TrashIcon } from "lucide-react";
import { useDeleteProductMutation } from "../../redux/api/product/productApi";
import Swal from "sweetalert2";
import EditProductModal from "../modal/EditProductModal";

export default function ProductCard({ product }: { product: TProduct }) {
    const { name, title, description, id } = product;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // delete
    const [deleteProduct] = useDeleteProductMutation();
    // delete product
    const handleDelete = async (id: number) => {
        // Show the SweetAlert2 confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Call the deleteProduct function if confirmed
                    const res = await deleteProduct(id);
                    //   console.log(res);
                    if (res?.data) {
                        // Show success alert after successful deletion
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error("Failed to delete:", error);
                    // Optional: Show an error alert if deletion fails
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the product. Please try again.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <motion.div
            whileHover={{
                scale: 1.08,
                boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
            }}

            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.5,
            }}
            className="max-w-[400px] rounded-xl "
        >
            <Card className="max-w-[400px] h-[230px]">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://cdn-icons-png.flaticon.com/128/679/679922.png"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">{name}</p>
                        <p className="text-small text-default-500">{title}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>{description}</p>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-center gap-5 items-center">

                    <Button onPress={onOpen} size="sm" color="primary" variant="ghost" className="flex items-center justify-center" >
                        <Pencil className="w-4 h-4" />
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(id)} size="sm" className="flex items-center justify-center
                     bg-red-400 hover:bg-red-700 text-white" >
                        <TrashIcon className="w-4 h-4" />
                        Delete
                    </Button>
                </CardFooter>
            </Card>
            <EditProductModal onOpenChange={onOpenChange} isOpen={isOpen}
                product={product}
            />
        </motion.div>
    );
}
