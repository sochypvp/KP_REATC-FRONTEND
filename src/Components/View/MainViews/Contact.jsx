import {
  ClockIcon,
  EnvelopeIcon,
  HomeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="bg-white pt-5 text-black">
      <div className="max-sm:w-full w-10/12 m-auto py-2 px-4 lg:px-8">
        <div className="flex items-center text-base max-sm:text-sm pb-6">
          <Link to="/">
            <HomeIcon className="size-5 mr-2" />
          </Link>
          <span className="mr-2">/</span>
          <span className="mr-2">Contact us</span>
        </div>
        <div className=" grid gap-8 py-4 mx-auto lg:grid-cols-3">
          <div>
            <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl ">
              We’d love to hear from you
            </h1>

            <p className="mt-3 text-gray-500 ">
              Our friendly team is always here to chat.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:col-span-2 sm:grid-cols-2 ">
            <div className="p-4 rounded-lg border-1 md:p-6 text-black ">
              <span className="inline-block p-3 border border-black">
                <ClockIcon className="size-6" />
              </span>
              <h2 className="mt-4 text-base font-medium">Store Hours</h2>
              <p className="mt-2 text-sm">Mon-Fri from 7:30am to 5:30pm.</p>
              <p className="mt-2 text-sm">Sat-Sun from 8am to 5pm.</p>
            </div>

            <div className="p-4 rounded-lg border-1 md:p-6 text-black ">
              <span className="inline-block p-3 border border-black">
                <EnvelopeIcon className="size-6" />
              </span>
              <h2 className="mt-4 text-base font-medium">Email Address</h2>
              <p className="mt-2 text-sm">Email@gmail.com</p>
            </div>

            <div className="p-4 rounded-lg border-1 md:p-6 text-black ">
              <span className="inline-block p-3 border border-black">
                <PhoneIcon className="size-6" />
              </span>
              <h2 className="mt-4 text-base font-medium">Phone Number</h2>
              <p className="mt-2 text-sm">(+855) 60446580</p>
              <p className="mt-2 text-sm">(+855) 60446580</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
