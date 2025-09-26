import React, { useState } from "react";

export default function EditProfileForm({ user, onSubmit, className }) {
  const [formData, setFormData] = useState({
    name: `${user?.firstName} ${user?.lastName}`,
    phone: user?.phone || "",
    address: user?.shippingAddress || "",
    profileImage: user?.profileImage || null,
    preview: user?.profileImage || null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: file,
        preview: URL.createObjectURL(file),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const [firstName, ...rest] = formData.name.trim().split(" ");
    const lastName = rest.join(" ");
    onSubmit({
      ...user,
      firstName,
      lastName,
      phone: formData.phone,
      shippingAddress: formData.address,
      profileImage: formData.profileImage,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-gray-200 ${className}`}
    >
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
        Edit Your Profile
      </h2>

      {/* ===== Desktop Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* --- Left column: Profile image --- */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <img
              src={
                formData.preview ||
                "https://via.placeholder.com/200x200.png?text=Profile"
              }
              alt="Profile Preview"
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-200 shadow-md"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 text-sm rounded-full cursor-pointer hover:bg-blue-700 transition"
            >
              Change
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <p className="text-gray-500 text-center px-4">
            Recommended size: 200x200px. JPG or PNG only.
          </p>
        </div>

        {/* --- Right column: Form fields --- */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg shadow-sm"
              placeholder="Enter your full name"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg shadow-sm"
              placeholder="e.g. 09796000227"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={4}
              className="w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg shadow-sm"
              placeholder="Your shipping or home address"
            />
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
