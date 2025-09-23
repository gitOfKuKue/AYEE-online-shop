import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAPICalling from "../Common/useAPICalling";
import Container from "./EssentialComponents/Container";
import BuyNowBtn from "./buttons/BuyNowBtn";
import { DollarSign, Edit, ImagePlus } from "lucide-react";
import CustomBtn from "./buttons/CustomBtn";
import ChangeFileBtn from "./buttons/ChangeFileBtn";
import useAlertStore from "../Common/Store/useAlertStore";
import useUser from "../Hook/useUser";
import SwitchBtn from "./buttons/SwitchBtn";

const ProductDetails = () => {
  const fileInputRef = useRef(null);

  const { data } = useUser();
  const user = data?.user;

  const { id } = useParams();
  const maxStars = 5;

  const { products, fetchProducts, baseUrl, productImagePath } =
    useAPICalling();
  const [isEdit, setIsEdit] = useState(false);
  const { handleAlert } = useAlertStore();

  const product = products?.find((p) => p.id === id);

  const [isOutOfStock, setIsOutOfStock] = useState(false);

  useEffect(() => {
    // Out of stock if quantity is 0 OR product is marked invalid
    setIsOutOfStock(product?.quantity <= 0 || product?.valid === false);
  }, [product]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    imageFile: null,
    category: "",
    price: "",
    valid: true,
  });

  useEffect(() => {
    // ensure products are loaded if user came directly
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        quantity: product.quantity || "",
        imageFile: null, // we only set if user selects new file
        category: product.category || "",
        price: product.price || "",
        // ✅ FIXED: preserve false
        valid: product.valid ?? true,
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  // handle text and file inputs
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, valid: e.target.checked }));
    } else if (type === "file" && files.length > 0) {
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
    fd.append("quantity", formData.quantity);
    fd.append("category", formData.category);
    fd.append("description", formData.description);
    fd.append("valid", formData.valid);
    if (formData.imageFile) fd.append("image", formData.imageFile); // send the file
    const res = await fetch(`${baseUrl}/api/products/${product?.id}`, {
      method: "PUT",
      body: fd, // ✅ do not set Content-Type manually
    });

    const data = await res.json();
    if (res.ok) {
      handleAlert(data.message || "Product updated!", 200);
      // reset form
      setFormData({
        title: "",
        description: "",
        quantity: "",
        imageFile: null,
        category: "",
        price: "",
        valid: true,
      });
    } else {
      handleAlert(data.message || "Failed to update product!", 404);
    }
    await fetchProducts();
    setIsEdit(false);
  };

  return (
    <section className="py-8 bg-background">
      <Container>
        <div
          className={`${
            isEdit && "blur-2xl"
          } grid md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl p-8`}
        >
          {/* ---------- Left: Product Image ---------- */}
          <div className="flex justify-center items-center bg-gray-100 rounded-xl overflow-hidden">
            {product.image ? (
              <img
                src={productImagePath(product.image)}
                alt={product.title}
                className="w-full h-full object-cover max-h-[550px]"
              />
            ) : (
              <span className="text-gray-400">No Image Available</span>
            )}
          </div>

          {/* ---------- Right: Product Info ---------- */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-800 leading-snug">
                  {product.title}
                </h1>
                {isOutOfStock && (
                  <div className="border border-red-600 rounded-[var(--standard-radius)] px-2 py-1">
                    <h1 className="text-red-500 text-xl font-bold">
                      Out of stock
                    </h1>
                  </div>
                )}
              </div>
              <span className="ml-4 px-3 py-1 text-sm rounded-full bg-amber-100 text-amber-800 capitalize">
                {product.category}
              </span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-6">
              {[...Array(maxStars)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`w-6 h-6 transition-colors ${
                    i < Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.783 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.209l8.2-1.191L12 .587z"
                  />
                </svg>
              ))}
              <span className="ml-3 text-gray-500 text-sm">
                ({product.sold} sold)
              </span>
            </div>

            {/* Price */}
            {product.price && (
              <p className="text-3xl font-extrabold text-green-600 mb-8">
                ${product.price}
              </p>
            )}

            {/* Buy Button */}
            {!isOutOfStock && (
              <div className="mt-auto pt-6 border-t border-gray-200">
                <BuyNowBtn price={product.price} product={product} />
              </div>
            )}

            <div className="flex justify-between items-center mt-auto ">
              {/* Back link */}
              <Link
                to="/shop"
                className="inline-block text-blue-600 hover:underline"
              >
                ← Back to products
              </Link>

              {user?.role === "admin" && (
                <button
                  className="flex items-center gap-1 py-1 px-3 rounded-[var(--standard-radius)] bg-[var(--gray--)] text-font2 text-md hover:bg-gray-400 hover:text-font1"
                  onClick={handleEdit}
                >
                  <Edit size={15} />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>

      <div
        className={`${
          isEdit ? "block" : "hidden"
        } absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[var(--standard-radius)] w-[80%]`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-[var(--standard-radius)] p-8 md:p-10"
        >
          {/* Grid: Image + Details */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ✅ Image Upload Section */}
            <div>
              <div
                className="border-2 border-dashed border-border rounded-[var(--standard-radius)] relative w-full h-[360px] flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer mb-3"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="h-full w-full overflow-hidden">
                  <img
                    src={
                      formData.imageFile
                        ? URL.createObjectURL(formData.imageFile)
                        : productImagePath(product.image)
                    }
                    alt="preview"
                    className="object-cover w-full h-full rounded-[var(--standard-radius)]"
                  />
                </div>

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
              <div onClick={() => fileInputRef.current?.click()}>
                <ChangeFileBtn title="Change image" type="button" />
              </div>
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
                <select
                  name="category"
                  id="category"
                  className="border border-border p-3 rounded-[var(--standard-radius)] w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Soft Drink">Soft Drink</option>
                  <option value="Smoothie">Smoothie</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Juice">Juice</option>
                  <option value="Mocktail">Mocktail</option>
                  <option value="Tea">Tea</option>
                  <option value="Milkshake">Milkshake</option>
                </select>
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

              {/* valid */}
              <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 mt-4">
                <span className="text-sm font-medium text-gray-700">
                  Product Stock Status
                </span>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Out of stock</span>
                  <SwitchBtn handleChange={handleChange} formData={formData} />
                  <span className="text-sm text-gray-600">In stock</span>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Submit Button */}
          <div className="mt-8 flex justify-end gap-2">
            <CustomBtn
              title="Save"
              status={200}
              type="submit"
              className="px-6 py-3"
            />
            <div onClick={handleEdit}>
              <CustomBtn
                title="Cancel"
                type="button"
                status={404}
                className="px-6 py-3"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductDetails;
