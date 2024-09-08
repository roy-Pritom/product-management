import { Input, Button, Spacer, Checkbox, Card, Divider } from "@nextui-org/react";
import { FieldValues, useForm } from 'react-hook-form';
import { useCreateProductMutation } from "../../redux/api/product/productApi";
import Swal from "sweetalert2";

const AddProductPage = () => {
    // create product mutation
    const [createProduct] = useCreateProductMutation();
    const { register, handleSubmit, reset } = useForm<FieldValues>();

    // create product
    const onSubmit = async (data: FieldValues) => {
        // console.log(data);
        try {
            const res = await createProduct(data);
            //  console.log(res);
            if (res?.data) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: 'Please try again'
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.log(err?.message);
        }

    }

    return (
        <div className="pt-20 max-w-7xl md:mx-auto mx-3">
            <Card className="max-w-[400px] p-[20px] mt-[20px] mx-auto " >
                <p className="text-center">
                    Create Your Product
                </p>
                <p className="text-center text-gray-500 mb-4 text-xl">
                    Please fill in the details to create a product.
                </p>
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Spacer y={3} />
                    <Input
                        fullWidth
                        label="Name"
                        placeholder="Enter your product name"
                        {...register("name", {
                            required: "Name is required"
                        })}
                        required
                    />
                    <Spacer y={2} />
                    <Input
                        fullWidth
                        label="Title"
                        placeholder="Enter your product title"
                        {...register("title", {
                            required: "Title is required"
                        })}
                        required
                    />
                    <Spacer y={2} />
                    <Input
                        fullWidth
                        label="Description"
                        placeholder="Enter your product description"
                        {...register("description", {
                            required: "Description is required"
                        })}
                        required
                    />
                    <Spacer y={2} />

                    <Checkbox isRequired >
                        I agree to the terms and conditions
                    </Checkbox>
                    <Spacer y={1.5} />
                    <Button type="submit" color="primary" fullWidth>
                        Create Product
                    </Button>
                </form>
            </Card>

        </div>
    );
};

export default AddProductPage;