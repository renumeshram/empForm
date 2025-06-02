// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";

// const PermanentAddressForm = ({ onChange, values }) => {
//   const { register, reset, handleSubmit } = useForm({
//     defaultValues: values || {},
//   });

//   useEffect(() => {
//     reset(values);
//   }, [values, reset]);

//   const onSubmit = (data) => {
//     onChange(data);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="grid grid-cols-1 md:grid-cols-2 gap-4"
//     >
//       <input
//         {...register("addressLine1")}
//         placeholder="Address Line 1"
//         className="border p-2"
//         required
//       />
//       <input
//         {...register("addressLine2")}
//         placeholder="Address Line 2"
//         className="border p-2"
//       />
//       <input
//         {...register("city")}
//         placeholder="City"
//         className="border p-2"
//         required
//       />
//       <input
//         {...register("state")}
//         placeholder="State"
//         className="border p-2"
//         required
//       />
//       <input
//         {...register("pincode")}
//         placeholder="Pincode"
//         className="border p-2"
//         required
//       />
//       <button
//         type="submit"
//         className="mt-2 px-2 py-2 bg-blue-600 text-white"
//       >
//         Save 
//       </button>
//     </form>
//   );
// };

// export default PermanentAddressForm;
