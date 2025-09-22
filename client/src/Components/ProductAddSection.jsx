import { DollarSign, ImagePlus } from "lucide-react";
import React, { useState } from "react";
import CustomBtn from "./buttons/CustomBtn";
import useFetchFuncs from "../Common/useFetchFuncs";
import { useRef } from "react";
import useAlertStore from "../Common/Store/useAlertStore";

const ProductAddSection = () => {
  const fileInputRef = useRef(null);
  const { baseUrl } = useFetchFuncs();
  const { handleAlert } = useAlertStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageFile: null,
    category: "",
    price: "",
  });

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

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("price", formData.price);
    fd.append("category", formData.category);
    fd.append("description", formData.description);
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
        image: "",
        imageFile: null,
        category: "",
        price: "",
      });
    } else {
      handleAlert(data.message || "Failed to add product!", 400);
    }
  };

  return (
    <div>
      <h1 className="text-5xl text-font2 font-bold mb-5">New product</h1>

      {/* Main Section */}
      <form className="grid grid-cols-3 gap-3 p-5 border border-border rounded-[var(--standard-radius)]" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="col-span-1 border rounded-[var(--standard-radius)] relative w-full h-[338px] overflow-hidden">
          {formData.imageFile ? (
            <div className="w-full h-full">
              <img
                src={URL.createObjectURL(formData.imageFile)}
                alt="preview"
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div
              className="w-full h-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <ImagePlus size={100} className="text-font2-light mx-auto" />
                <h1 className="text-lg text-font2-light">Add product image</h1>
              </div>
            </div>
          )}

          <input
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png, .heic"
            id="image-upload"
            onChange={handleChange}
            ref={fileInputRef}
            hidden
          />
        </div>

        {/* Detail Input Section */}
        <div className="grid grid-cols-3 gap-3 border p-3 rounded-[var(--standard-radius)] col-span-2">
          {/* Product title */}
          <div>
            <label
              htmlFor="title"
              className="block text-md text-font2-light mb-1"
            >
              Product Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="eg. Shirt"
              className="border border-border p-2 rounded-[var(--standard-radius)] w-full h-10"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-md text-font2-light mb-1"
            >
              Price
            </label>
            <div className="relative flex items-center">
              <DollarSign className="absolute left-1" />
              <input
                id="price"
                name="price"
                type="number"
                placeholder="100"
                className="border border-border pl-7 py-2 rounded-[var(--standard-radius)] w-full h-10"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-md text-font2-light mb-1"
            >
              Product Category
            </label>
            <select
              name="category"
              id="category"
              className="border border-border p-2 rounded-[var(--standard-radius)] w-full h-10"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="softDrink">Soft Drink</option>
              <option value="smoothie">Smoothie</option>
              <option value="coffee">Coffee</option>
              <option value="juice">Juice</option>
              <option value="mocktail">Mocktail</option>
              <option value="tea">Tea</option>
              <option value="milkshake">Milkshake</option>
            </select>
          </div>

          {/* Description */}
          <div className="col-span-3">
            <label
              htmlFor="description"
              className="block text-md text-font2-light mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="resize-none w-full h-50 border border-border p-2 rounded-[var(--standard-radius)]"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <CustomBtn title="Add" />
      </form>
    </div>
  );
};

export default ProductAddSection;
