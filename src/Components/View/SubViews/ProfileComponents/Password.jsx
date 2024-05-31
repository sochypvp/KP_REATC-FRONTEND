import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useUser } from "../../context/userContext";

const Password = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const { user, updateUserPassword } = useUser();
  const [userPassword, setUserPassword] = useState({ password: '', newPassword: '', confirmPassword: '' });

  const hanldeChangePassword = (e) => {
    setUserPassword({
      ...userPassword,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    await updateUserPassword(userPassword);
    if (user.status) {
      alert("success");
    } else {
      alert("error");
    }
  }

  return (
    <form onSubmit={handleSubmitPassword} className="w-full flex max-md:flex-col items-center max-md:items-start py-4  ">
      <div className="w-2/3 max-md:w-full space-y-4">
        {/* Current Password */}
        <div className="w-full flex max-lg:flex-wrap justify-start">
          <div className="w-1/2 max-lg:w-full pr-8">
            <label
              htmlFor="Current Password*"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Current Password*
            </label>
            <div className="relative mt-2 ">
              <input
                required
                type={showCurrentPassword ? "text" : "password"}
                name="password"
                id=""
                onChange={hanldeChangePassword}
                className="block w-full border border-b-black py-1.5 px-2 pr-10 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Current Password"
              />
              <button
                onClick={toggleCurrentPasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showCurrentPassword ? (
                  <EyeIcon className="h-4 w-4 text-gray-600" />
                ) : (
                  <EyeSlashIcon className="h-4 w-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* New Password */}
        <div className="w-full flex max-lg:flex-wrap justify-start">
          <div className="w-full pr-8 max-lg:mb-4">
            <label
              htmlFor="New Password*"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New Password*
            </label>
            <div className="relative mt-2 ">
              <input
                required
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id=""
                onChange={hanldeChangePassword}
                className="block w-full  border border-b-black py-1.5 px-2 pr-10 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="New Password"
              />
              <button
                onClick={toggleNewPasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showNewPassword ? (
                  <EyeIcon className="h-4 w-4 text-gray-600" />
                ) : (
                  <EyeSlashIcon className="h-4 w-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          <div className="w-full pr-8">
            <label
              htmlFor="Confirm New Password*"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm New Password*
            </label>
            <div className="relative mt-2 ">
              <input
                required
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmPassword"
                id=""
                onChange={hanldeChangePassword}
                className="block w-full  border border-b-black py-1.5 px-2 pr-10 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Confirm New Password"
              />
              <button
                onClick={toggleConfirmNewPasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showConfirmNewPassword ? (
                  <EyeIcon className="h-4 w-4 text-gray-600" />
                ) : (
                  <EyeSlashIcon className="h-4 w-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 max-md:mt-5">
        <button type="submit" className="px-5 py-4 max-md:text-sm text-center text-nowrap hover:bg-gray-100 border border-slate-500 font-bold ">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default Password;
