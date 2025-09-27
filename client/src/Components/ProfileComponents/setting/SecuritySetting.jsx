import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useAlertStore from "../../../Common/Store/useAlertStore";
import useAPICalling from "../../../Common/useAPICalling";
import useUser from "../../../Hook/useUser";

const SecuritySetting = () => {
  const { data } = useUser();
  const { handleAlert } = useAlertStore();
  const { fetchUsers, baseUrl } = useAPICalling();
  const [user, setUser] = useState(null);

  const [isCurrentPwd, setIsCurrentPwd] = useState(false);

  // Load user data
  useEffect(() => {
    if (!data?.user?.id) return;

    const loadUsers = async () => {
      const users = await fetchUsers();
      const user = users.find((u) => String(u.id) === String(data.user.id));
      setUser(user);
    };

    loadUsers();
  }, [fetchUsers, data?.user?.id]);

  const [passwords, setPasswords] = useState({
    currentPwd: "",
    password: "",
    repeatPwd: "",
  });

  // track visibility for each field
  const [show, setShow] = useState({
    currentPwd: false,
    password: false,
    repeatPwd: false,
  });

  const handlePwdChanges = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();

    // Handling for fill form
    if (!passwords.currentPwd || !passwords.password || !passwords.repeatPwd) {
      return handleAlert("Fill all the form!", 404);
    }

    // Handling for matching new password and repeat password
    if (passwords.password !== passwords.repeatPwd) {
      return handleAlert("Password doesn't match!", 404);
    }

    try {
      const res = await fetch(`${baseUrl}/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });
      const data = await res.json();

      if (res.ok) {
        handleAlert(data.message, 200);
        setPasswords({
          currentPwd: "",
          password: "",
          repeatPwd: "",
        });
        setIsCurrentPwd(false);
      } else {
        if (data.status === "currentPassword") {
          setIsCurrentPwd(true);
        }

        handleAlert(data.message, 404);
      }
    } catch (error) {
      console.log(error.message);
      handleAlert(error.message, 500);
    }
  };

  return (
    <div className="w-full h-full p-5 space-y-6">
      <h1 className="text-3xl font-bold text-font2">Security Settings</h1>

      <form
        className="w-full bg-white shadow-md border border-gray-200 rounded-lg p-6 space-y-6"
        onSubmit={handlePwdSubmit}
      >
        <h2 className="text-xl font-semibold text-font2-light">Password</h2>

        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-font2-light mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={show.currentPwd ? "text" : "password"}
              name="currentPwd"
              value={passwords.currentPwd}
              className={`w-full border rounded-lg px-3 py-2 pr-10 ${
                isCurrentPwd && "border-red-600"
              }`}
              onChange={handlePwdChanges}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("currentPwd")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show.currentPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {isCurrentPwd && (
            <p className="text-red-500 text-sm">Current password is wrong!</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-font2-light mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={show.password ? "text" : "password"}
              name="password"
              value={passwords.password}
              className="w-full border rounded-lg px-3 py-2 pr-10"
              onChange={handlePwdChanges}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("password")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show.password ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Repeat Password */}
        <div>
          <label className="block text-sm font-medium text-font2-light mb-1">
            Repeat Password
          </label>
          <div className="relative">
            <input
              type={show.repeatPwd ? "text" : "password"}
              name="repeatPwd"
              value={passwords.repeatPwd}
              className="w-full border rounded-lg px-3 py-2 pr-10"
              onChange={handlePwdChanges}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("repeatPwd")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show.repeatPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-iconic text-white px-4 py-2 rounded-lg hover:bg-iconic-dark transition-colors"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default SecuritySetting;
