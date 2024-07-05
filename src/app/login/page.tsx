"use client";
import React, { useState } from "react";
import { useLoginUserMutation } from "@/services/login";
import toast, { Toaster } from "react-hot-toast";

interface IUSER {
  email: string;
  password: string;
}
export default function Login() {
    const [loginUser, { data, error }] = useLoginUserMutation();
    const [user, setUser] = useState<IUSER>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res: any = await loginUser(user);
      console.log(res.data.message, "message");
      setUser({ email: "", password: "" });
      toast.success(res.data.message);
      // Handle success (e.g., redirect to another page)
    } catch (error: any) {
      // Handle error
      toast.error(error.message);
      console.error("Failed to login:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 h-screen w-full">
      {/* <div className="hidden sm:block"> */}
        {/* <img className="w-full h-full object-cover" alt="" /> */}
      {/* </div> */}

      <div className="bg-gray-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
          <h2 className="text-4xl text-white font-bold text-center">
            SIGN IN
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            onClick={onSubmit}
          >
            SIGNIN
          </button>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
