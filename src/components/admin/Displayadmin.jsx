import "../../styles/Admin.css";
import { Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
// import AddAdminModal from "./AddAdminModal";

const adminSchema = Yup.object({
  name: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile")
    .required("Mobile required"),
  role: Yup.string().required("Role required"),
});

export default function Displayadmin({
  admins,
  setAdmins,
  totalAdmins,
  searchTerm,
  setSearchTerm,
  entries,
  setEntries,
  currentPage,
  setCurrentPage,
  totalPages,
  activeMenuId,
  setActiveMenuId,
  showExportModal,
  setShowExportModal,
  exportStartDate,
  setExportStartDate,
  exportEndDate,
  setExportEndDate,
  onExportAll,
  onExportDateRange,
  /* ✅ ADD ADMIN MODAL */
  showAddAdminModal,
  setShowAddAdminModal,
  refreshAdmin,
}) {
  const [initialValues, setIntialValues] = useState({
    id: 0,
    name: "",
    email: "",
    mobile: "",
    role: "",
    status: "Active",
  });

  /* =========================
     ✅ FORMIK SETUP (FIX)
  ========================= */
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: adminSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("All Fields set well", values);
      try {
        if (values.id == 0) {
          await saveAdmin(values);
        } else {
          await updateAdmin(values);
        }
      } finally {
        setSubmitting(false); // stops the Formik submission state
      }
    },
  });

  // ----------------------------Save-Admmin ---------------------------------------------------
  const saveAdmin = async (values) => {
    try {
      await api
        .post("/api/admin/add-admin", values)
        .then((res) => {
          setAdmins((prev) => [res.data.result, ...prev]);
          // alert("Admin created succesfully");
          toast.success("Admin created successfully");
          setShowAddAdminModal(false);
          refreshAdmin();
        })
        .catch((err) => {
          toast.error(err, "Failed to add admin ");
          // alert("Error While adding", err);
          // console.log("Error", err);
        });
    } catch (error) {
      alert(error.response?.data?.result || "Failed to add admin ❌");
      toast.error(error.response?.data?.result || "Failed to add admin ❌");
    }
  };

  //  -------------------DELETE ADMIN----------------------------------------------
  const handleDeleteAdmin = async (adminId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?",
    );

    if (!confirmDelete) return;

    try {
      await api
        .delete(`/api/admin/delete-admin/${adminId}`)
        .then((res) => {
          console.log(res.data.result);
          // 🔥 UI instant update
          setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
          toast.success("Admin deleted successfully ✅");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete admin ❌");
    }
  };

  const getAdmin = (admin) => {
    setIntialValues({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      mobile: admin.mobile,
      role: admin.role,
      status: admin.status,
    });
  };

  // This will open model will place the existingvalue
  const handleOpenAdminModal = (values) => {
    setShowAddAdminModal(true); // modal open
    getAdmin(values); // admin data load / set
  };

  const updateAdmin = async (values) => {
    try {
      const res = await api.put(`/api/admin/update-admin/${values.id}`, values);

      // 🔁 Update admin in list (replace, not add)
      setAdmins((prev) =>
        prev.map((admin) => (admin.id === values.id ? res.data.result : admin)),
      );

      toast.success("Admin updated successfully");
      setShowAddAdminModal(false);
      refreshAdmin(); // optional (agar backend se fresh data chahiye)
    } catch (error) {
      toast.error(error.response?.data?.result || "Failed to update admin");
    }
  };

  return (
    <div className="gym-admins-page">
      <div className="card admin-table-card">
        {/* HEADER */}
        <div className="table-header">
          <div className="table-header-title">GYM Admins</div>
          <button
            className="float-btn"
            onClick={() => setShowAddAdminModal(true)}
          >
            <Plus size={20} />
            Add Admin
          </button>
        </div>

        {/* CONTROLS */}
        <div className="table-controls-row">
          <div className="entries-control">
            Show
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
            >
              <option value={6}>6</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            entries
            <div className="export-container">
              <button
                className="btn-export"
                onClick={() => setShowExportModal(true)}
              >
                Export ⬇
              </button>
            </div>
          </div>

          <div className="search-control">
            Search:
            <input
              type="text"
              placeholder="Name or Email ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="admin-table-container-v2">
          <table className="admin-crud-table">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((admin, i) => (
                <tr key={admin.id || i}>
                  <td>{i + 1}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.mobile}</td>
                  <td>{admin.role}</td>
                  <td>
                    <span className="status-badge-active">{admin.status}</span>
                  </td>

                  <td>
                    <div
                      className="action-menu-container"
                      onMouseEnter={() => setActiveMenuId(admin.id || i)}
                      onMouseLeave={() => setActiveMenuId(null)}
                    >
                      {/* Three dots hamesha visible rahenge */}
                      <button className="btn-action-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </button>

                      {/* Menu sirf hover karne par dikhega */}
                      {activeMenuId === (admin.id || i) && (
                        <div className="action-dropdown-menu">
                          <button
                            className="menu-item edit"
                            onClick={() => handleOpenAdminModal(admin)}
                          >
                            Edit
                          </button>
                          <button
                            className="menu-item delete"
                            onClick={() => handleDeleteAdmin(admin.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="table-footer-pagination">
          <div className="info">
            Showing {(currentPage - 1) * entries + 1} to{" "}
            {Math.min(currentPage * entries, totalAdmins)} of {totalAdmins}
          </div>

          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Export Data</h3>

            <input
              type="date"
              value={exportStartDate}
              onChange={(e) => setExportStartDate(e.target.value)}
            />
            <input
              type="date"
              value={exportEndDate}
              onChange={(e) => setExportEndDate(e.target.value)}
            />

            <button onClick={onExportDateRange}>Export Date Range</button>
            <button onClick={onExportAll}>Export All</button>
            <button onClick={() => setShowExportModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* ADD ADMIN MODAL */}
      {showAddAdminModal && (
        <div className="modal-overlay">
          <div className="admin-modal-card">
            <h3>{values.id === 0 ? "Create Admin" : "Edit Admin"}</h3>

            <form onSubmit={handleSubmit} className="admin-modal-form">
              {/* NAME */}
              <div>
                <input
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.name && errors.name ? "error-field" : ""}
                />
                {touched.name && errors.name && (
                  <p className="error">{errors.name}</p>
                )}
              </div>
              {/* EMAIL */}
              <div>
                <input
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.email && errors.email ? "error-field" : ""}
                />
                {touched.email && errors.email && (
                  <p className="error">{errors.email}</p>
                )}
              </div>
              {/* MOBILE */}
              <div>
                <input
                  name="mobile"
                  placeholder="Mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    touched.mobile && errors.mobile ? "error-field" : ""
                  }
                />
                {touched.mobile && errors.mobile && (
                  <p className="error">{errors.mobile}</p>
                )}
              </div>
              {/* ROLE */}
              <div>
                <select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.role && errors.role ? "error-field" : ""}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  {/* <option value="Staff">Staff</option> */}
                </select>
                {touched.role && errors.role && (
                  <p className="error">{errors.role}</p>
                )}
              </div>
              {/* STATUS */}
              <div>
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* ACTIONS */}
              <div className="modal-actions  form-actions">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? values.id === 0
                      ? "Creating..."
                      : "Updating..."
                    : values.id === 0
                      ? "Create"
                      : "Update"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddAdminModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
