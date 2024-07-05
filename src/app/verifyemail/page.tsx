// "use client";
// import React, { useState } from "react";
// import loginImg from "../../../public/login.jpg";
// import { useVerifyUserMutation } from "@/services/login";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function Verify() {
//   interface IUSER {
//     token: string;
//   }
//   const router = useRouter();
//   const [user, setUser] = useState<IUSER>({ token: "" });
//   const [verified, setVerified] = useState(false);
//   const [error, setError] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//   };
//   const [verifyUser] = useVerifyUserMutation();
//   //   console.log(token,"tetsstets");
//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       let res: any = await verifyUser(user);
//       console.log(res, "message");
//       if (res?.data?.status == "200") {
//         setVerified(true)
//         toast.success(res.data.message);
//         router.push("/login");
//       } else {
//         toast.error(res.data.error);
//       }
//       setUser({ token: "" });
//     } catch (error: any) {
//       toast.error(error.message);
//       console.error("Failed to login:", error);
//     }
//   };
//   return (
//     <div className="grid grid-cols-1 h-screen w-full">
//       <div className="bg-gray-800 flex flex-col justify-center">
//         <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
//           <h2 className="text-4xl text-white font-bold text-center">
//             VERIFICATION
//           </h2>
//           <div className="flex flex-col text-gray-400 py-2">
//             <label>TOKEN</label>
//             <input
//               className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
//               type="password"
//               name="token"
//               value={user.token}
//               onChange={handleChange}
//             />
//           </div>

//           <button
//             className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
//             onClick={onSubmit}
//           >
//             VERIFY
//           </button>
//         </form>
//       </div>
//       <Toaster position="top-right" reverseOrder={false} />
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect } from "react";
import { useVerifyUserMutation } from "@/services/login";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Verify() {
  interface IUSER {
    token: string;
  }

  const router = useRouter();
  const [user, setUser] = useState<IUSER>({ token: "" });
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [verifyUser] = useVerifyUserMutation();

  // Extract token from URL query and set it in the state
   useEffect(() => {
     const searchParams = new URLSearchParams(window.location.search);
     const urlToken = searchParams.get("token");
     console.log("Query params:", window.location.search);
     console.log("Encoded Token from URL:", urlToken);

     if (urlToken) {
       const decodedToken = decodeURIComponent(urlToken);
       console.log("Decoded Token:", decodedToken);
       setUser({ token: decodedToken });
     }
   }, []);


  // Automatically verify user when token is available
  useEffect(() => {
    if (user.token.length > 0) {
      onSubmit();
    }
  }, [user.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      let res: any = await verifyUser(user);
      console.log(res, "message");
      if (res?.data?.status == "200") {
        setVerified(true);
        toast.success(res.data.message);
        router.push("/login");
      } else {
        toast.error(res.data.error);
      }
      setUser({ token: "" });
    } catch (error: any) {
      toast.error(error.message);
      console.error("Failed to login:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 h-screen w-full">
      <div className="bg-gray-800 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
          onSubmit={onSubmit}
        >
          <h2 className="text-4xl text-white font-bold text-center">
            VERIFICATION
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>TOKEN</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              name="token"
              value={user.token}
              onChange={handleChange}
            />
          </div>

          <button
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            type="submit"
          >
            VERIFY
          </button>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
