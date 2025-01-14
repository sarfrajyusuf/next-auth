"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSignUpUserMutation } from "@/services/login";
import { useNavigate } from "react-router-dom";

interface IUSER {
  username: string;
  email: string;
  password: string;
}
export default function SignUp() {
  const router = useNavigate();
  const [signUpUser, { data, error }] = useSignUpUserMutation();
  const [user, setUser] = useState<IUSER>({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    //   setLoading(true);
      const res: any = await signUpUser(user);
      toast.success(res?.data?.message);
      if (res) {
        setUser({ username: "", email: "", password: "" }); // Clear the form
        // router.push("/verifyemail");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="grid grid-cols-1 h-screen w-full">
      {/* <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src="/next.svg" alt="" />
      </div> */}

      <div className="bg-gray-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
          <h2 className="text-4xl text-white font-bold text-center">SIGN UP</h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Username</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
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
            onClick={handleSubmit}
          >
            {buttonDisable&& buttonDisable? "NO SIGNUP" : "SIGNUP"}
          </button>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
