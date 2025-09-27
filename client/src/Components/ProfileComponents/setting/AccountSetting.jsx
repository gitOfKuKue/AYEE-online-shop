import React, { useEffect, useState } from "react";
import useUser from "../../../Hook/useUser";
import useAPICalling from "../../../Common/useAPICalling";
import useAlertStore from "../../../Common/Store/useAlertStore";
import useAuthStore from "../../../Common/Store/useAuthStore";
import useConfirmationStore from "../../../Common/Store/useConfirmationStore";

const AccountSetting = () => {
  const { data } = useUser();
  const { fetchUsers, baseUrl } = useAPICalling();
  const { handleAlert } = useAlertStore();
  const [user, setUser] = useState(null);
  const { handleConfirmation } = useConfirmationStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shippingAddress: "",
  });

  // Load user data
  useEffect(() => {
    if (!data?.user?.id) return;

    const loadUsers = async () => {
      const users = await fetchUsers();
      const user = users.find((u) => String(u.id) === String(data.user.id));
      if (user) {
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          shippingAddress: user.shippingAddress || "",
        });
        setUser(user);
      }
    };

    loadUsers();
  }, [fetchUsers, data?.user?.id]);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        handleAlert(data.message, 200);
      } else {
        handleAlert(data.message, 404);
      }
    } catch (error) {
      handleAlert(error.message, 500);
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-full p-5 space-y-6">
      <h1 className="text-3xl font-bold text-font2">Account Settings</h1>

      {/* Personal Info Section */}
      <form
        className="w-full bg-white shadow-md border border-gray-200 rounded-lg p-6 space-y-6"
        onSubmit={handleSave}
      >
        <h2 className="text-xl font-semibold text-font2-light">
          Personal Info
        </h2>

        {/* Name & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-font2-light mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChanges}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-iconic"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-font2-light mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChanges}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-iconic"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-font2-light mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-font2-light mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChanges}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-iconic"
          />
        </div>

        {/* Shipping Address */}
        <div>
          <label className="block text-sm font-medium text-font2-light mb-1">
            Shipping Address
          </label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChanges}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-iconic resize-none"
          ></textarea>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-iconic text-white px-4 py-2 rounded-lg hover:bg-iconic-dark transition-colors"
        >
          Save Changes
        </button>
      </form>

      {/* Danger Zone Section */}
      <div className="w-full bg-white shadow-md border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-3">Danger Zone</h2>
        <p className="text-sm text-red-500 mb-4">
          Deleting your account is irreversible. All your data will be
          permanently removed.
        </p>
        <button
          onClick={() =>
            handleConfirmation(
              "Are you sure to delete your account?",
              "deleteUser"
            )
          }
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSetting;
