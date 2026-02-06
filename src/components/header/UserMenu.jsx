import { User, UserCircle, KeyRound, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import "../../styles/Header.css";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-box" ref={menuRef}>
      <div
        className="avatar"
        onClick={() => setOpen((prev) => !prev)}
        style={{ cursor: "pointer" }}
      >
        <User size={20} />
      </div>

      {open && (
        <div className="user-dropdown">
          <button className="dropdown-item" onClick={() => alert("Profile")}>
            <UserCircle size={16} />
            <span>Profile</span>
          </button>

          <button
            className="dropdown-item"
            onClick={() => alert("Change Password")}
          >
            <KeyRound size={16} />
            <span>Change Password</span>
          </button>

          <div className="dropdown-divider"></div>

          <button
            className="dropdown-item danger"
            onClick={() => alert("Logout")}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
