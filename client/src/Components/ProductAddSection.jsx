import { DollarSign, ImagePlus } from "lucide-react";
import React, { useState } from "react";
import CustomBtn from "./buttons/CustomBtn";

const ProductAddSection = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    
  }

  return (
    <div>
      <h1 className="text-5xl text-font2 font-bold mb-5">New product</h1>

      {/* Main Section */}
      <form className="grid grid-cols-3 gap-3 p-5 border border-border rounded-[var(--standard-radius)]">
        {/* Image Adding */}
        <div className="col-span-1 border rounded-[var(--standard-radius)] relative overflow-hidden">
          {/* <div className="absolute top-1/2 left-1/2 -translate-1/2" onClick={() => document.getElementById("image-upload").click()}>
                <ImagePlus size={100} className="text-font2-light mx-auto"/>
                <h1 className="text-lg text-font2-light">Add product image</h1>
            </div> */}
          <div className="w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <input type="file" accept="image/*" id="image-upload" hidden />
        </div>

        {/* Detail Inputting Section */}
        <div className=" grid grid-cols-3 gap-3 border p-3 rounded-[var(--standard-radius)] col-span-2">
          {/* Requesting product title */}
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
              onChange={handleChange}
            />
          </div>

          {/* Requesting product price */}
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
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Requesting product category */}
          <div>
            <label
              htmlFor="category"
              className="block text-md text-font2-light mb-1"
            >
              Product category
            </label>
            <select
              name="category"
              id="category"
              className="border border-border p-2 rounded-[var(--standard-radius)] w-full h-10"
              onChange={handleChange}
            >
              <option disabled>Select category</option>
              <option value="softDrink">Soft Drink</option>
              <option value="smoothie">Smoothie</option>
              <option value="coffee">Coffee</option>
              <option value="juice">Juice</option>
              <option value="mocktail">Mocktail</option>
              <option value="tea">Tea</option>
              <option value="milkshake">Milkshake</option>
            </select>
          </div>

          {/* Requesting description */}
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
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <CustomBtn title="Submit" />
      </form>
    </div>
  );
};

export default ProductAddSection;
