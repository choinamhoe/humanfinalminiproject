import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarWidth = 300;
  const collapsedWidth = 60; // 접혀있을 때 버튼만 보이도록 최소 폭

  return (
    <div
      style={{
        width: isOpen ? sidebarWidth : collapsedWidth,
        transition: "width 0.3s",
        overflowY: "hidden",
        borderRight: "solid 1px #e2e8f0",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* 사이드바 내용: 펼쳐져 있을 때만 */}
      {isOpen && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginBottom: "50px",
          }}
        >
          {children}
        </div>
      )}
      {/* 버튼: 항상 아래쪽에 고정 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "absolute",
          bottom: "10px",
          width: "80%",
          padding: "10px",
          backgroundColor: "#f1f5f9",
          color: "#64748b",
          border: "1px solid #e2e8f0",
        }}
      >
        {isOpen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );
};

export default Sidebar;
