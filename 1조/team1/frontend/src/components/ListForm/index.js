import React, { useState } from "react";
import FilterList from "./FilterList";
const ListForm = ({ viewData = [] }) => {
  const [sortBy, setSortBy] = useState("distance");
  const [activeFilters, setActiveFilters] = useState([]);

  // 필터 적용
  const filteredData =
    activeFilters.length > 0
      ? viewData.filter((item) => activeFilters.includes(item.quickFilterId))
      : viewData;

  // 정렬 적용
  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return a.distance - b.distance;
      case "rating":
        return b.rating - a.rating;
      case "price":
        return a.price - b.price;
      case "popular":
        return b.popularity - a.popularity;
      default:
        return 0;
    }
  });

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <FilterList
          sortedData={sortedData}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div style={{ flex: 1, overflowY: "auto", gap: "16px" }}>
          {sortedData.length === 0 ? (
            <div className="flex-center">
              <div className="icon">🍽️</div>
              <h3>검색 결과가 없습니다</h3>
              <p>다른 조건으로 검색해보세요.</p>
            </div>
          ) : (
            sortedData.map((data) => (
              <div
                key={data.id}
                style={{
                  display: "flex",
                  margin: "20px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "8px",
                }}
              >
                <h3>{data.Title}</h3>
                <p>
                  {data.Address} {data.TEL}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
export default ListForm;
