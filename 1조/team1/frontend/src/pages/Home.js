import { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import SearchForm from "../components/SearchForm";
import Chat from "../components/Chat";
import ListForm from "../components/ListForm";
import ResizableMap from "../components/ResizableMap";
import { findShops } from "../api/shop";
const Home = () => {
  const [inputText, setInputText] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
  });
  const [history, setHistory] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("balance"); // map, balance, list

  const containerRef = useRef(null);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText || inputText.trim() === "") {
      alert("질문을 입력해주세요.");
      return;
    }

    if (!filters.category || !filters.location) {
      alert("카테고리와 지역을 선택해주세요.");
      return;
    }

    try {
      const data = {
        question: inputText,
        indutyType: filters.category,
        emdType: filters.location,
      };
      setIsLoading(true);
      const res = await findShops(data);
      const message = res.message;
      console.log(res);

      const rawData = res.data;
      const mergedData = Object.values(
        rawData.reduce((acc, item) => {
          // Title + Address + LAT + LNG까지 key로 사용
          const lat = item.LAT ?? 0;
          const lng = item.LNG ?? 0;
          const key = `${item.Title}-${item.Address}-${lat}-${lng}`;

          if (!acc[key]) {
            acc[key] = { ...item };
            if (!acc[key].TEL) delete acc[key].TEL;
          } else {
            // TEL 처리
            if (item.TEL) acc[key].TEL = item.TEL;

            // prdlstCn 합치기 (중복 제거)
            const existingProducts = acc[key].prdlstCn
              .split(", ")
              .map((p) => p.trim());
            const newProducts = item.prdlstCn.split(", ").map((p) => p.trim());
            const mergedProducts = Array.from(
              new Set([...existingProducts, ...newProducts])
            );
            acc[key].prdlstCn = mergedProducts.join(", ");
          }

          return acc;
        }, {})
      );
      setSearchedData(mergedData);
      const now = new Date();

      setHistory([
        ...history,
        { user: inputText, time: now },
        { ai: message, time: now },
      ]);
    } catch (err) {
      console.log(err);

      if (err?.response?.status === 429) {
        alert("API 사용량을 초과하였습니다. 1~2분 후 다시 시도해주십시오.");
        return;
      }
      alert("API 요청에 실패하였습니다.");
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar>
        <div className="border-bottom" style={{ padding: "24px" }}>
          <h1>제주시 혼자 옵서예~</h1>
          <p>제주시에 있는 착한 업소를 간편히 찾아보세요.</p>
          <br />
          <SearchForm
            filters={filters}
            inputText={inputText}
            isLoading={isLoading}
            setInputText={setInputText}
            handleSubmit={handleSubmit}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <Chat history={history} isLoading={isLoading} />
      </Sidebar>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "hidden",
        }}
      >
        <ResizableMap
          containerRef={containerRef}
          viewMode={viewMode}
          setViewMode={setViewMode}
          viewData={searchedData}
        />
        {/* 리스트 영역 */}
        <div style={{ flex: 1, overflowY: "auto", zIndex: 20 }}>
          <ListForm viewData={searchedData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
