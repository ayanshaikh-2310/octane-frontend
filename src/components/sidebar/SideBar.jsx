import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  HeartPulse,
  CreditCard,
  FileText,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Package,
  X,
  Bell,
  UserCog,
  Activity,
  UserPlus,
  IdCard,
} from "lucide-react";
// import logo from "../../assets/logo.png";
import "../../styles/SideBar.css";

export default function SideBar({ isOpen, setSidebarOpen }) {
  const location = useLocation();
  const [activeHighlight, setActiveHighlight] = useState("Dashboard");
  const [isSystemDown, setIsSystemDown] = useState(false);

  // Using a Set to allow multiple menus to be open at once
  const [openMenus, setOpenMenus] = useState(new Set());

  // Sync only when actual navigation happens (e.g. back button)
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveHighlight("Dashboard");
    } else if (path.startsWith("/admin") || path.startsWith("/trainer")) {
      setActiveHighlight("OFC Manage");
      setOpenMenus((prev) => new Set(prev).add("OFC Manage"));
    } else if (path.startsWith("/wellness")) {
      setActiveHighlight("Wellness");
      setOpenMenus((prev) => new Set(prev).add("Wellness"));
    } else if (path.startsWith("/members")) {
      setActiveHighlight("Members");
      setOpenMenus((prev) => new Set(prev).add("Members"));
    } else if (path.startsWith("/billing")) {
      setActiveHighlight("Billing");
      setOpenMenus((prev) => new Set(prev).add("Billing"));
    } else if (path.startsWith("/events")) {
      setActiveHighlight("Events");
    }
  }, [location.pathname]);

  // Close sidebar on mobile when a link is clicked
  const closeOnMobile = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleParentToggle = (menuLabel) => {
    setActiveHighlight(menuLabel);
    const newOpenMenus = new Set(openMenus);
    if (newOpenMenus.has(menuLabel)) {
      newOpenMenus.delete(menuLabel);
    } else {
      newOpenMenus.add(menuLabel);
    }
    setOpenMenus(newOpenMenus);
  };

  const handleDirectLinkClick = (label) => {
    setActiveHighlight(label);
    closeOnMobile();
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Mobile Close Button */}
      <div
        className="mobile-sidebar-close"
        onClick={() => setSidebarOpen(false)}
      >
        <X size={24} />
      </div>
      <div className="brand">
        <div className="brand-logo-container">
          {/* <img src={logo} alt="Logo" className="brand-logo-img" /> */}
          <span className="brand-text">Octane Fit City</span>
        </div>
        <div className="admin-tag">ADMIN MANAGEMENT PANEL</div>

        {/* This shows whether the system is active or not */}
        <div
          className={`system-status-node sidebar-status ${isSystemDown ? "offline" : ""}`}
          onClick={() => setIsSystemDown(!isSystemDown)}
          style={{
            cursor: "pointer",
            marginTop: "10px",
            padding: "8px 15px",
            gap: "8px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: isSystemDown
              ? "rgba(239, 68, 68, 0.3)"
              : "rgba(34, 197, 94, 0.3)",
            fontSize: "0.7rem",
            background: isSystemDown
              ? "rgba(239, 68, 68, 0.05)"
              : "rgba(34, 197, 94, 0.05)",
            boxShadow: isSystemDown
              ? "none"
              : "0 0 15px rgba(34, 197, 94, 0.1)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          title="Click to toggle system status (simulation)"
        >
          {isSystemDown ? (
            <AlertTriangle size={12} style={{ color: "var(--danger)" }} />
          ) : (
            <div className="status-indicator-wrapper">
              <div className="presence-dot status-pulse"></div>
              <Zap
                size={12}
                style={{
                  color: "var(--success)",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
          )}
          <span
            className={`status-text ${isSystemDown ? "offline" : ""}`}
            style={{ fontSize: "0.6rem" }}
          >
            SYSTEM:{" "}
            <span
              style={{
                fontWeight: "900",
                color: isSystemDown ? "var(--danger)" : "var(--success)",
              }}
            >
              {isSystemDown ? "OFFLINE" : "ONLINE"}
            </span>
          </span>
        </div>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section">
          <NavLink
            to="/"
            end // Crucial: prevented default active match for / on every route
            className={({ isActive }) =>
              `nav-link ${activeHighlight === "Dashboard" ? "active" : ""}`
            }
            onClick={() => handleDirectLinkClick("Dashboard")}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className="nav-section">
          {/* <div className="nav-label">Management</div> */}
          <NavItem
            icon={<ShieldCheck size={20} />}
            label="OFC Manage"
            isOpen={openMenus.has("OFC Manage")}
            isHighlighted={activeHighlight === "OFC Manage"}
            onToggle={() => handleParentToggle("OFC Manage")}
          >
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <UserCog size={16} />
              <span>Admin</span>
            </NavLink>

            <NavLink
              to="/trainer"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <Dumbbell size={16} />
              <span>Trainer</span>
            </NavLink>
          </NavItem>
        </div>

        <div className="nav-section">
          {/* <div className="nav-label">Wellness</div> */}
          <NavItem
            icon={<HeartPulse size={20} />}
            label="Health Services"
            isOpen={openMenus.has("Wellness")}
            isHighlighted={activeHighlight === "Wellness"}
            onToggle={() => handleParentToggle("Wellness")}
          >
            <NavLink
              to="/wellness/appointments"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <CalendarDays size={16} />
              <span>Appointments</span>
            </NavLink>
            <NavLink
              to="/wellness/packages"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <Package size={16} />
              <span>Packages</span>
            </NavLink>
            <NavLink
              to="/wellness/services"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <Activity size={16} />
              <span>Services</span>
            </NavLink>
          </NavItem>
        </div>

        <div className="nav-section">
          {/* <div className="nav-label">Community</div> */}
          <NavItem
            icon={<Users size={20} />}
            label="Gym Members"
            isOpen={openMenus.has("Members")}
            isHighlighted={activeHighlight === "Members"}
            onToggle={() => handleParentToggle("Members")}
          >
            <NavLink
              to="/members/list"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <Users size={16} />
              <span>Members List</span>
            </NavLink>
            <NavLink
              to="/members/add-members"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <UserPlus size={16} />
              <span>Add Members</span>
            </NavLink>
          </NavItem>
        </div>

        <div className="nav-section">
          {/* <div className="nav-label">Gym Plans</div> */}
          <NavItem
            icon={<IdCard size={20} />}
            label="Gym Membership"
            isOpen={openMenus.has("Membership")}
            isHighlighted={activeHighlight === "Membership"}
            onToggle={() => handleParentToggle("Membership")}
          >
            <NavLink
              to="/membership/user-membership"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <IdCard size={16} />
              <span>User Membership</span>
            </NavLink>
            <NavLink
              to="/membership/packages"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <Package size={16} />
              <span>Membership Packages</span>
            </NavLink>
          </NavItem>
        </div>

        <div className="nav-section">
          {/* <div className="nav-label">Economy</div> */}
          <NavItem
            icon={<CreditCard size={20} />}
            label="Billing"
            isOpen={openMenus.has("Billing")}
            isHighlighted={activeHighlight === "Billing"}
            onToggle={() => handleParentToggle("Billing")}
          >
            <NavLink
              to="/billing/invoice"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <FileText size={16} />
              <span>Invoices</span>
            </NavLink>
            <NavLink
              to="/billing/payment"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <CreditCard size={16} />
              <span>Payments</span>
            </NavLink>
            <NavLink
              to="/billing/alerts"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <Bell size={16} />
              <span>Renewal Alerts</span>
            </NavLink>
          </NavItem>
        </div>

        <div className="nav-section">
          {/* <div className="nav-label">Economy</div> */}
          <NavItem
            icon={<CalendarDays size={20} />}
            label="Events"
            isOpen={openMenus.has("Events")}
            isHighlighted={activeHighlight === "Events"}
            onToggle={() => handleParentToggle("Events")}
          >
            <NavLink
              to="/event/list"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <FileText size={16} />
              <span>Event List</span>
            </NavLink>
            <NavLink
              to="/event/add-event"
              className={({ isActive }) =>
                `submenu-link ${isActive ? "active" : ""}`
              }
            >
              <CalendarDays size={16} />
              <span>Add Event</span>
            </NavLink>
          </NavItem>
        </div>
      </div>
    </aside>
  );
}

const NavItem = ({
  icon,
  label,
  children,
  isOpen,
  isHighlighted,
  onToggle,
}) => {
  return (
    <div>
      <div
        className={`nav-link ${isHighlighted ? "active" : ""}`}
        onClick={onToggle}
        style={{ justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {icon}
          <span>{label}</span>
        </div>
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </div>
      {isOpen && <div className="submenu">{children}</div>}
    </div>
  );
};
