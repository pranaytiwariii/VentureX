// import { Fragment, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { X, User, Lock } from "lucide-react";
// import axios from "axios";
// import { useAuth } from "../../context/auth.context";

// export default function AuthModal({ isOpen, onClose }) {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("founder");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
//     try {
//       const url = isSignUp
//         ? "http://localhost:8000/api/user/register"
//         : "http://localhost:8000/api/user/login";
//       const response = await axios.post(url, { email, password, role });

//       if (!response.data.success) {
//         throw new Error("Authentication failed");
//       }

//       const { data } = response.data;

//       localStorage.setItem("accessToken", data.tokens.accessToken);
//       localStorage.setItem("refreshToken", data.tokens.refreshToken);

//       const profileResponse = await axios.get(
//         "http://localhost:5000/api/auth/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${data.tokens.accessToken}`,
//           },
//         }
//       );

//       alert(isSignUp ? "Registration successful" : "Login successful");
//       login(profileResponse.data.data);
//       onClose();
//     } catch (error) {
//       setError("Authentication error");
//       console.error("Authentication error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       setError("Please enter your email address");
//       return;
//     }
//     setIsLoading(true);
//     setError("");
//     try {
//       await axios.post("http://localhost:5000/api/auth/forgot-password", {
//         email,
//       });
//       alert("Password reset email sent successfully");
//       setIsForgotPassword(false);
//     } catch (error) {
//       setError("Error sending password reset email");
//       console.error("Error sending password reset email:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
//                   {isForgotPassword
//                     ? "Forgot Password"
//                     : isSignUp
//                     ? "Create Account"
//                     : "Sign In"}
//                   <button
//                     onClick={onClose}
//                     className="rounded-full p-1 hover:bg-gray-100"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </Dialog.Title>

//                 <form
//                   onSubmit={
//                     isForgotPassword ? handleForgotPassword : handleSubmit
//                   }
//                   className="mt-6 space-y-4"
//                 >
//                   {error && <p className="text-red-500 text-sm">{error}</p>}

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Email
//                     </label>
//                     <div className="relative mt-1">
//                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <User className="h-5 w-5 text-gray-400" />
//                       </span>
//                       <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {!isForgotPassword && (
//                     <div>
//                       <label
//                         htmlFor="password"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Password
//                       </label>
//                       <div className="relative mt-1">
//                         <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Lock className="h-5 w-5 text-gray-400" />
//                         </span>
//                         <input
//                           type="password"
//                           id="password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//                           required
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {isSignUp && (
//                     <div>
//                       <label
//                         htmlFor="role"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Role
//                       </label>
//                       <div className="relative mt-1">
//                         <select
//                           id="role"
//                           value={role}
//                           onChange={(e) => setRole(e.target.value)}
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
//                           required
//                         >
//                           <option value="founder">Founder</option>
//                           <option value="investor">Investor</option>
//                         </select>
//                       </div>
//                     </div>
//                   )}

//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//                   >
//                     {isLoading
//                       ? "Processing..."
//                       : isForgotPassword
//                       ? "Send Reset Email"
//                       : isSignUp
//                       ? "Sign Up"
//                       : "Sign In"}
//                   </button>
//                 </form>

//                 <div className="mt-4 text-center">
//                   {!isForgotPassword && (
//                     <button
//                       onClick={() => setIsSignUp(!isSignUp)}
//                       className="text-sm text-purple-600 hover:underline"
//                     >
//                       {isSignUp
//                         ? "Already have an account? Sign In"
//                         : "Don't have an account? Sign Up"}
//                     </button>
//                   )}
//                   {!isSignUp && (
//                     <button
//                       onClick={() => setIsForgotPassword(!isForgotPassword)}
//                       className="text-sm text-purple-600 hover:underline"
//                     >
//                       {isForgotPassword
//                         ? "Back to Sign In"
//                         : "Forgot Password?"}
//                     </button>
//                   )}
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, User, Lock } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/auth.context";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("founder");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const url = isSignUp
        ? "http://localhost:8000/api/user/register"
        : "http://localhost:8000/api/user/login";
      const response = await axios.post(url, { email, password, role });

      if (!response.data.success) {
        throw new Error("Authentication failed");
      }

      const { data } = response.data;

      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);

      const profileResponse = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${data.tokens.accessToken}`,
          },
        }
      );

      alert(isSignUp ? "Registration successful" : "Login successful");
      login(profileResponse.data.data);
      onClose();
    } catch (error) {
      setError("Authentication error");
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
      alert("Password reset email sent successfully");
      setIsForgotPassword(false);
    } catch (error) {
      setError("Error sending password reset email");
      console.error("Error sending password reset email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                  {isForgotPassword
                    ? "Forgot Password"
                    : isSignUp
                    ? "Create Account"
                    : "Sign In"}
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Title>

                <form
                  onSubmit={
                    isForgotPassword ? handleForgotPassword : handleSubmit
                  }
                  className="mt-6 space-y-4"
                >
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </span>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>

                  {!isForgotPassword && (
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {isSignUp && (
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <div className="relative mt-1">
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                          required
                        >
                          <option value="founder">Founder</option>
                          <option value="investor">Investor</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {isLoading
                      ? "Processing..."
                      : isForgotPassword
                      ? "Send Reset Email"
                      : isSignUp
                      ? "Sign Up"
                      : "Sign In"}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  {!isForgotPassword && (
                    <button
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-sm text-purple-600 hover:underline"
                    >
                      {isSignUp
                        ? "Already have an account? Sign In"
                        : "Don't have an account? Sign Up"}
                    </button>
                  )}
                  {!isSignUp && (
                    <button
                      onClick={() => setIsForgotPassword(!isForgotPassword)}
                      className="text-sm text-purple-600 hover:underline"
                    >
                      {isForgotPassword
                        ? "Back to Sign In"
                        : "Forgot Password?"}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
