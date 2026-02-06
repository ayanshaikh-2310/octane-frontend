import { Bell, Menu } from "lucide-react";
import UserMenu from "./UserMenu";
import "../../styles/Header.css";

export default function Header({ pathname, onMenuClick }) {
  const getBreadcrumb = (path) => {
    if (path === "/") return "Dashboard";
    const segments = path.split("/").filter(Boolean);
    return segments
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" / ");
  };

  return (
    <header className="app-header">
      {/* LEFT */}
      <div className="header-left">
        <button className="mobile-menu-toggle" onClick={onMenuClick}>
          <Menu size={24} />
        </button>

        <div className="header-titles">
          <h1 className="welcome-title">Welcome, Admin</h1>
          <p className="breadcrumb">{getBreadcrumb(pathname)}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="header-right">
        <div className="notification">
          <Bell size={20} />
          <span className="badge" />
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
