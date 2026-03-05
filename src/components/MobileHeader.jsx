import React from "react";
import { Menu } from "lucide-react";

export default function MobileHeader({ toggleSidebar }) {
    return (
        <div className="mobile-header">
            <div className="sidebar-logo" style={{ marginBottom: 0 }}>
                <div className="logo-icon" style={{ backgroundColor: "#fff" }}></div>
                <span
                    style={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "1.2rem",
                        marginLeft: "10px",
                    }}
                >
                    Elias
                </span>
            </div>
            <button
                onClick={toggleSidebar}
                style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                <Menu size={28} />
            </button>
        </div>
    );
}
