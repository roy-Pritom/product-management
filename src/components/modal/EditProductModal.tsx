import { Modal, ModalContent, ModalHeader, ModalBody, Button, Spacer, Input } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { TProduct } from "../../types/product";
import { useUpdateProductMutation } from "../../redux/api/product/productApi";
import Swal from "sweetalert2";

type TProps = {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onOpenChange: any;
  product:TProduct;
}

export default function EditProductModal({ isOpen, onOpenChange,product }: TProps) {
  // update Product 
  const [updateProduct] = useUpdateProductMutation();
  const { register, handleSubmit } = useForm<FieldValues>();

  // update Product 
  const onSubmit = async (data: FieldValues) => {
    const productData = {
      id:product?.id,
      data
    }
    try {
      const res = await updateProduct(productData);
      //  console.log(res);
      if (res?.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
        onOpenChange(false)
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
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>

          <>
            <ModalHeader className="flex flex-col gap-1">Update Product</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} >
                <Spacer y={3} />
                <Input
                  defaultValue={product.name}
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
                  defaultValue={product.title}
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
                  defaultValue={product.description}
                  fullWidth
                  label="Description"
                  placeholder="Enter your product description"
                  {...register("description", {
                    required: "Description is required"
                  })}
                  required
                />
                <Spacer y={2} />


                <Spacer y={1.5} />
                <Button type="submit" color="primary" fullWidth className="py-4">
                  Update Product
                </Button>
              </form>
            </ModalBody>
          </>

        </ModalContent>
      </Modal>
    </>
  );
}
