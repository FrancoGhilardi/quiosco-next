"use client";
import React, { memo } from "react";
import { ProductSchema } from "@/src/schema";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateProduct } from "@/actions/update-product-actions";

type EditProductFormProps = {
  children: React.ReactNode;
};

const EditProductForm: React.FC<EditProductFormProps> = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const id: number = +params.id!;

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const result = ProductSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    const response = await updateProduct(result.data, id);

    if (response?.errors) {
      response.errors.forEach((issue) => toast.error(issue.message));
      return;
    }

    toast.success("Producto actualizado correctamente");
    router.push("/admin/products");
  };
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5" action={handleSubmit}>
        {children}
        <input
          type="submit"
          value={"Guardar Cambios"}
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        />
      </form>
    </div>
  );
};

export default memo(EditProductForm);
