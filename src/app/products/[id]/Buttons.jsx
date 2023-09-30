"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function Buttons({ productId }) {
  const router = useRouter();

  return (
    <div className="mt-6 space-x-4">
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={async () => {
          if (confirm("are you sure you want to delete this product?")) {
            const res = await axios.delete("/api/products/" + productId);
            if (res.status === 204) {
              router.push("/products");
              router.refresh();
            }
          }
        }}>
        ELIMINAR
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => {
          router.push(`/products/edit/${productId}`);
        }}>
        EDITAR
      </button>
    </div>
  );
}

export default Buttons;
