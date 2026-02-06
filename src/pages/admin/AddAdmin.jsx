// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import api from "../../api/axios";
// import "../../styles/AddAdmin.css";

// export default function AddAdmin() {
//   const [loading, setLoading] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       mobile: "",
//       role: "",
//       status: "Active",
//     },

//     validationSchema: Yup.object({
//       name: Yup.string()
//         .min(3, "Minimum 3 characters")
//         .required("Name is required"),

//       email: Yup.string().email("Invalid email").required("Email is required"),

//       mobile: Yup.string()
//         .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
//         .required("Mobile is required"),

//       role: Yup.string().required("Role is required"),

//       status: Yup.string()
//         .oneOf(["Active", "Inactive"])
//         .required("Status is required"),
//     }),

//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       try {
//         await api
//           .post("/api/admin/add-admin", values)
//           .then((res) => {
//             if (res.data.status === "success") {
//               alert("✅ Admin created & credentials sent to email");
//               resetForm();
//             }
//           })
//           .catch(() => {
//             alert(res.data.message || "❌ Failed to create admin");
//           });
//       } catch (error) {
//         alert(
//           error.response?.data?.message ||
//             "❌ Server error while creating admin",
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="add-admin-page">
//       <h2>Create Admin</h2>

//       <form onSubmit={formik.handleSubmit}>
//         {/* Name */}
//         <div>
//           <label>Admin Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter admin name"
//             onChange={formik.handleChange}
//             value={formik.values.name}
//           />
//           {formik.touched.name && formik.errors.name && (
//             <p className="error">{formik.errors.name}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <label>Email Address</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter email address"
//             onChange={formik.handleChange}
//             value={formik.values.email}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <p className="error">{formik.errors.email}</p>
//           )}
//         </div>

//         {/* Mobile */}
//         <div>
//           <label>Mobile Number</label>
//           <input
//             type="text"
//             name="mobile"
//             placeholder="Enter mobile number"
//             onChange={formik.handleChange}
//             value={formik.values.mobile}
//           />
//           {formik.touched.mobile && formik.errors.mobile && (
//             <p className="error">{formik.errors.mobile}</p>
//           )}
//         </div>

//         {/* Role */}
//         <div>
//           <label>Role</label>
//           <select
//             name="role"
//             onChange={formik.handleChange}
//             value={formik.values.role}
//           >
//             <option value="">Select Role</option>
//             <option value="Admin">Admin</option>
//             <option value="Staff">Staff</option>
//           </select>
//           {formik.touched.role && formik.errors.role && (
//             <p className="error">{formik.errors.role}</p>
//           )}
//         </div>

//         {/* Status (Full Width looks better) */}
//         <div className="full-width">
//           <label>Status</label>
//           <select
//             name="status"
//             onChange={formik.handleChange}
//             value={formik.values.status}
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="form-actions">
//           <button type="submit" disabled={loading}>
//             {loading ? "Creating Admin..." : "Create Admin"}
//           </button>

//           <button
//             type="button"
//             className="cancel-btn"
//             onClick={formik.resetForm}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
