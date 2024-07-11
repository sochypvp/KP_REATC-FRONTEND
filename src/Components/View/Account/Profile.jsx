import { useEffect, useState } from "react";
import Password from "../SubViews/ProfileComponents/Password";
import { useUser } from '../context/userContext';

const Profile = () => {

  const [userData, setUserData] = useState({ firstName: '', lastName: '', customerEmail: '', });
  const { user, error, loading, updateUserData, updateUserPassword } = useUser();

  const hanldeChangeUser = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    const check = await updateUserData(userData);
    if(check) {
      alert('successfully !');
    }
  }


  useEffect(() => {
    if (localStorage.getItem('userId') != null) {
      if (user) {
        setUserData({
          firstName: user && user.customerName ? user.customerName.split(' ')[0] : '',
          lastName: user && user.customerName ? user.customerName.split(' ')[1] : '',
          customerEmail: user && user.customerEmail ? user.customerEmail : '',
        })
      }
    }
  }, [loading]);

  if (error) return (<>{error}</>);
  if (loading) return (<>Loading...</>);

  return (
    <article className="flex flex-col justify-center">
      <p className="text-black uppercase font-extrabold text-lg max-md:text-base pb-5">Profile</p>
      <h1 className="text-3xl max-md:text-2xl">Hi, {userData && userData.lastName}</h1>
      {/* <Username /> */}
      <form onSubmit={handleSubmitUser} className="w-full flex max-md:flex-col items-center max-md:items-start py-5 border-b border-b-slate-400 ">
        <div className="w-2/3 max-md:w-full space-y-4">
          {/* Username */}
          <div className="w-full flex max-lg:flex-wrap justify-start">
            <div className="w-full pr-8 max-md:pr-0 max-lg:mb-4">
              <label
                htmlFor="First Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="relative mt-2 shadow-sm">
                <input
                  type="text"
                  name="firstName"
                  id=""
                  onChange={hanldeChangeUser}
                  value={userData.firstName}
                  className="block w-full  border border-b-black py-1.5 px-2 pr-10 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="w-full pr-8 max-md:pr-0">
              <label
                htmlFor="Last Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="lastName"
                  id=""
                  onChange={hanldeChangeUser}
                  value={userData.lastName}
                  className="block w-full  border border-b-black py-1.5 px-2 pr-10 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
          {/* Email / Phone Number */}
          <div className="w-full flex max-lg:flex-wrap justify-start">
            <div className="w-full pr-8 max-md:pr-0 max-lg:mb-4">
              <label
                htmlFor="Email Address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="relative mt-2 shadow-sm">
                <input
                  type="text"
                  name="customerEmail"
                  id=""
                  onChange={hanldeChangeUser}
                  value={userData.customerEmail}
                  className="block w-full  border border-b-black py-1.5 px-2 pr-10 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Email@gmail.com"
                />
              </div>
            </div>
            <div className="w-full pr-8 max-md:pr-0">
              <label
                htmlFor="Phone Number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="relative mt-2 shadow-sm">
                <input
                  readOnly
                  type="text"
                  name=""
                  id=""
                  value={user && user.phone}
                  className="block w-full  border border-b-black py-1.5 px-2 pr-10 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 max-md:w-full max-md:mt-5 ">
          <button type="submit" className="px-5 py-4 max-md:text-sm hover:bg-gray-100 border border-slate-500 font-bold ">
            Change Profile
          </button>
        </div>
      </form>
      <p className="text-black uppercase font-extrabold text-lg pt-4 max-md:text-base ">Password</p>
      <Password />
    </article>
  );
}

export default Profile