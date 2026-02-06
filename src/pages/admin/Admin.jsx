import { useState, useEffect } from "react";
// import useApi from "../../hooks/useApi";
import Displayadmin from "../../components/admin/Displayadmin";
import axios from "axios";
import api from "../../api/axios";

export default function Admin() {
  // const { data, loading, error } = useApi("/api/admin/get-admins");

  // ✅ LOCAL STATE (CRUD ke liye)
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State varbale for pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [activeMenuId, setActiveMenuId] = useState(null);
  // state for setting entties
  const [entries, setEntries] = useState(5);

  // state for export feature
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportStartDate, setExportStartDate] = useState("");
  const [exportEndDate, setExportEndDate] = useState("");

  // state adminmodel
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  const fetchAdmins = async () => {
    axios;
    await api
      .get("/api/admin/get-admins")
      .then((res) => {
        console.log("Full Response", res.data.result);
        setAdmins(res.data.result || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
  };

  // ✅ API → local state sync
  useEffect(() => {
    setLoading(true);
    fetchAdmins();
  }, []);

  // 🔍 Search
  const adminArray = Array.isArray(admins) ? admins : [];

  const validAdmins = adminArray.filter(
    (admin) => admin && admin.name && admin.email,
  );

  const filteredAdmins = validAdmins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 📄 Pagination

  const indexOfLast = currentPage * entries;
  const indexOfFirst = indexOfLast - entries;
  const currentAdmins = filteredAdmins.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAdmins.length / entries);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // 📤 Export All
  const handleExportAll = () => {
    const headers = ["Name,Email,Mobile,Role,Status"];
    const rows = admins.map(
      (admin) =>
        `${admin.name},${admin.email},${admin.mobile},${admin.role},${admin.status}`,
    );

    downloadCSV(headers, rows, "gym_admins_all");
    setShowExportModal(false);
  };

  // 📅 Export Date Range (demo)
  const handleExportDateRange = () => {
    if (!exportStartDate || !exportEndDate) {
      alert("Please select both dates");
      return;
    }

    const headers = ["Name,Email,Mobile,Role,Status"];
    const rows = admins.map(
      (admin) =>
        `${admin.name},${admin.email},${admin.mobile},${admin.role},${admin.status}`,
    );

    downloadCSV(headers, rows, `admins_${exportStartDate}_to_${exportEndDate}`);
    setShowExportModal(false);
  };

  const downloadCSV = (headers, rows, filename) => {
    const csv =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `${filename}.csv`;
    link.click();
  };

  if (loading) return <h3>Loading admins...</h3>;
  if (error) return <h3>Error loading admins</h3>;

  return (
    <Displayadmin
      admins={currentAdmins} // ✅ paginated list
      setAdmins={setAdmins} // ✅ DELETE ke liye
      totalAdmins={filteredAdmins.length}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      entries={entries}
      setEntries={setEntries}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      activeMenuId={activeMenuId}
      setActiveMenuId={setActiveMenuId}
      showExportModal={showExportModal}
      setShowExportModal={setShowExportModal}
      exportStartDate={exportStartDate}
      setExportStartDate={setExportStartDate}
      exportEndDate={exportEndDate}
      setExportEndDate={setExportEndDate}
      onExportAll={handleExportAll}
      onExportDateRange={handleExportDateRange}
      showAddAdminModal={showAddAdminModal}
      setShowAddAdminModal={setShowAddAdminModal}
      refreshAdmin={fetchAdmins}
    />
  );
}
