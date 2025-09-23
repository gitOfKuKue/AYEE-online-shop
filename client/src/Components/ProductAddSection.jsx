import { Cross, DollarSign, ImagePlus, X } from "lucide-react";
import React, { useState } from "react";
import CustomBtn from "./buttons/CustomBtn";
import useAPICalling from "../Common/useAPICalling";
import { useRef } from "react";
import useAlertStore from "../Common/Store/useAlertStore";
import useCategory from "../Common/useCategory";
import AddIconBtn from "./buttons/AddIconBtn";

const ProductAddSection = () => {
  const fileInputRef = useRef(null);
  const { baseUrl, fetchProducts } = useAPICalling();
  const { handleAlert } = useAlertStore();
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    imageFile: null,
    category: "",
    price: "",
  });

  const { categories } = useCategory();
  const { products } = useAPICalling();

  // handle text and file inputs
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file.name, // save filename only
        imageFile: file, // keep File object for upload/preview
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Taking now
    const time = new Date();

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("price", formData.price);
    fd.append("quantity", formData.quantity);
    fd.append("category", formData.category);
    fd.append("description", formData.description);
    fd.append("time", time);
    if (formData.imageFile) fd.append("image", formData.imageFile); // send the file

    const res = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      body: fd, // ✅ do not set Content-Type manually
    });

    const data = await res.json();
    if (res.ok) {
      handleAlert(data.message || "Product added!", 200);
      // reset form
      setFormData({
        title: "",
        description: "",
        quantity: "",
        imageFile: null,
        category: "",
        price: "",
      });
      await fetchProducts();
    } else {
      handleAlert(data.message || "Failed to add product!", 400);
    }
  };

  const handleAddCategory = () => {
    setIsAddCategory(!isAddCategory);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-font2-light mb-8 text-center">
        Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-[var(--standard-radius)] p-8 md:p-10"
      >
        {/* Grid: Image + Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ✅ Image Upload Section */}
          <div
            className="border-2 border-dashed border-border rounded-[var(--standard-radius)] relative w-full h-[360px] flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {formData.imageFile ? (
              <img
                src={URL.createObjectURL(formData.imageFile)}
                alt="preview"
                className="object-cover w-full h-full rounded-[var(--standard-radius)]"
              />
            ) : (
              <div className="text-center">
                <ImagePlus size={100} className="mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500 text-lg">
                  Click to add product image
                </p>
              </div>
            )}

            <input
              type="file"
              name="image"
              accept=".jpg,.jpeg,.png,.heic"
              id="image-upload"
              onChange={handleChange}
              ref={fileInputRef}
              hidden
            />
          </div>

          {/* ✅ Details Section */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-font2-light mb-1"
              >
                Product Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Classic Shirt"
                className="border border-border p-3 rounded-[var(--standard-radius)] w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-font2-light mb-1"
              >
                Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="500"
                  className="border border-border pl-9 p-3 rounded-[var(--standard-radius)] w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-font2-light mb-1"
              >
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="e.g. 100"
                className="border border-border p-3 rounded-[var(--standard-radius)] w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-font2-light mb-1"
              >
                Product Category
              </label>
              {isAddCategory ? (
                <div className="relative flex items-center">
                  <input
                    id="category"
                    name="category"
                    type="text"
                    placeholder="e.g. Fruit, Vehicle"
                    className="border border-border p-3 rounded-[var(--standard-radius)] w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    value={formData.category}
                    onChange={handleChange}
                  />
                  <X
                    className="absolute right-2 text-font2-light hover:text-font2 cursor-pointer"
                    onClick={handleAddCategory}
                  />
                </div>
              ) : (
                <div className="flex h-[50px] items-center gap-2">
                  <select
                    name="category"
                    id="category"
                    className="border border-border p-3 rounded-[var(--standard-radius)] w-full focus:ring-2 focus:ring-blue-300 focus:outline-none h-full"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories(products).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div
                    className="w-[35px] h-[35px]"
                    onClick={handleAddCategory}
                  >
                    <AddIconBtn type="button" />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-font2-light mb-1"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Describe your product..."
                className="resize-none border border-border p-3 rounded-[var(--standard-radius)] w-full h-40 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* ✅ Submit Button */}
        <div className="mt-8 flex justify-end">
          <CustomBtn
            title="Add"
            type="submit"
            status={200}
            className="px-6 py-3"
          />
        </div>
      </form>
    </div>
  );
};

export default ProductAddSection;
