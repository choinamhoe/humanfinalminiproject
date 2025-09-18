import { Map, List } from "lucide-react";

const Button = ({ viewMode, setViewMode }) => {
  return (
    <>
      <div
        className="flex-center"
        style={{
          flexDirection: "row",
          gap: "4px",
          justifyContent: "flex-start",
          padding: "20px 0px 0px 20px",
        }}
      >
        <button
          className={`view-btn ${viewMode === "map" ? "active" : ""}`}
          onClick={() => setViewMode("map")}
        >
          <Map size={16} />
          지도중심
        </button>
        <button
          className={`view-btn ${viewMode === "balance" ? "active" : ""}`}
          onClick={() => setViewMode("balance")}
        >
          균등보기
        </button>
        <button
          className={`view-btn ${viewMode === "list" ? "active" : ""}`}
          onClick={() => setViewMode("list")}
        >
          <List size={16} />
          목록중심
        </button>
      </div>
    </>
  );
};

export default Button;
