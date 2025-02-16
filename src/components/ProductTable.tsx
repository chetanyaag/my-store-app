import { useState } from 'react';
import { useEffect } from 'react';

class Category {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    constructor(id: number, name: string, description: string, isActive: boolean) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.isActive = isActive;
    }
  }
  
  class Product {
    id: number;
      name: string;
      price: number;
      stockQuantity: any;
      category: Category;
    constructor(id: number, name: string, price: number, stockQuantity: any, category: Category) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.stockQuantity = stockQuantity;
      this.category = new Category(
        category?.id,
        category?.name,
        category?.description,
        category?.isActive
      );
    }
  }

export default function ProductTable(){

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/product")
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            const formattedProducts = data.map(
              (item: { id: number; name: string; price: number; stockQuantity: any; category: Category; }) =>
                new Product(
                  item.id,
                  item.name,
                  item.price,
                  item.stockQuantity,
                  item.category
                )
            );
            setProducts(formattedProducts);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }, []);
    



    const columns = ["name", "price", "stockQuantity" ,"category", "description", "Category Status"];
    return (
        <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-800 text-white">
                {columns.map((column) => (
                  <th key={column} className="py-2 px-4 text-left capitalize">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={columns.length} className="text-center text-red-500 py-4">
                    {error}
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }
                  >
                  <td className="py-2 px-4 border border-gray-300">{product.name}</td>
                  <td className="py-2 px-4 border border-gray-300">{product.price}</td>
                  <td className="py-2 px-4 border border-gray-300">{product.stockQuantity}</td>
                  <td className="py-2 px-4 border border-gray-300">{product.category?.name || "N/A"}</td>
                  <td className="py-2 px-4 border border-gray-300">{product.category?.description || "N/A"}</td>
                  <td className="py-2 px-4 border border-gray-300">{product.category.isActive ? "Active" : "Inactive"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
}


