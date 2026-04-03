"use client";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { Cart, Product } from "@/store/product-store";

type UploadProduct = Product & {
  quantity: number;
};

function convertProductsToCart(products: UploadProduct[]): Cart[] {
  const newCartProducts = products.map((product) => ({
    sku: product.sku,
    product_name: product.name,
    price: product.price,
    image: product.image,
    quantity: product.quantity,
    stock_in_hand: product.stock_in_hand,
    back_order:
      product.quantity > product.stock_in_hand ? product.quantity - product.stock_in_hand : 0,
    minimum_order_quantity: product.minimum_order_quantity,
  }));

  return newCartProducts;
}

interface ValidateProductsAgGridProps {
  products: UploadProduct[];
  onAddToCart?: (cart: Cart[]) => void;
}

const ValidateProductsAgGrid = observer(
  ({ products, onAddToCart }: ValidateProductsAgGridProps) => {
    const [rowData, setRowData] = useState<UploadProduct[]>(products);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<number>(0);
    const router = useRouter();

    const allQuantitiesValid = useCallback((products: UploadProduct[]) => {
      return products.every(
        (product) => (product.quantity ?? 0) <= (product.stock_in_hand ?? 0),
      );
    }, []);

    const [addToCartButtonDisable, setAddToCartButtonDisable] =
      useState<boolean>(!allQuantitiesValid(products));
    const [acceptBackOrder, setAcceptBackOrder] = useState<boolean>(false);

    const handleQuantityChange = (index: number, newQuantity: number) => {
      setRowData((prev) => {
        const newData = [...prev];
        newData[index] = {
          ...newData[index],
          quantity: Math.max(0, newQuantity),
        } as UploadProduct;
        setAddToCartButtonDisable(!allQuantitiesValid(newData));
        return newData;
      });
    };

    const handleEdit = (index: number) => {
      setEditingIndex(index);
      setEditValue(rowData[index]?.quantity ?? 0);
    };

    const handleSaveEdit = (index: number) => {
      handleQuantityChange(index, editValue);
      setEditingIndex(null);
    };

    const handleDelete = (index: number) => {
      setRowData((prevData) => {
        const newData = prevData.filter((_, i) => i !== index);
        setAddToCartButtonDisable(!allQuantitiesValid(newData));
        return newData;
      });
    };

    const handleAddToCart = () => {
      const cartData = convertProductsToCart(rowData);
      if (onAddToCart) {
        onAddToCart(cartData);
      }
      router.push("/checkout");
    };

    return (
      <div className="space-y-4">
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <div className="h-[360px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0">
                <tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Product Name</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Stock On Hand</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Quantity</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Back Order</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Unit Price</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Total Price</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((product, index) => {
                const backOrder =
                  product.quantity > product.stock_in_hand
                    ? product.quantity - product.stock_in_hand
                    : 0;
                const totalPrice = (product.price || 0) * product.quantity;
                const isHighlighted = product.quantity > product.stock_in_hand;

                return (
                  <tr
                    key={product.sku}
                    className={`border-b border-gray-200 ${
                      isHighlighted ? "bg-yellow-300/80" : "bg-white"
                    } hover:bg-gray-50 transition`}
                  >
                    <td className="px-4 py-1.5 text-sm">{product.sku}</td>
                    <td className="px-4 py-1.5 text-sm text-gray-700">{product.name}</td>
                    <td className="px-4 py-1.5 text-center text-sm">{product.stock_in_hand}</td>
                    <td className="px-4 py-1.5 text-center text-sm">
                      {editingIndex === index ? (
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max={product.stock_in_hand}
                            value={editValue}
                            onChange={(e) => setEditValue(Number(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(index)}
                            className="inline-flex items-center justify-center text-green-600 hover:text-green-700 p-1"
                          >
                            <MdCheck size={20} />
                          </button>
                        </div>
                      ) : (
                        <span>{product.quantity}</span>
                      )}
                    </td>
                    <td className="px-4 py-1.5 text-center text-sm">
                      {backOrder > 0 ? backOrder : "-"}
                    </td>
                    <td className="px-4 py-1.5 text-center text-sm">
                      ${(product.price || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-1.5 text-center text-sm font-medium">
                      ${totalPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-1.5 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="inline-flex items-center justify-center text-blue-600 hover:text-blue-700 p-1"
                          title="Edit quantity"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="inline-flex items-center justify-center text-red-600 hover:text-red-700 p-1"
                          title="Delete row"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-6">
          {addToCartButtonDisable && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptBackOrder"
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => setAcceptBackOrder(e.target.checked)}
              />
              <label
                htmlFor="acceptBackOrder"
                className="ml-2 text-base text-gray-700"
              >
                Accept All Back Order
              </label>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            disabled={!acceptBackOrder && addToCartButtonDisable}
            className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition bg-blue-600 text-white shadow-theme-xs hover:bg-blue-700 disabled:bg-gray-300 disabled:text-white px-4 py-2`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  },
);

export default ValidateProductsAgGrid;
