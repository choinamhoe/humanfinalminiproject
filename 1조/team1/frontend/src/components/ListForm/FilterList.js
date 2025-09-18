import { Filter } from "lucide-react";

import { quickFilters } from "../../constants/options";

const FilterList = ({
  sortedData,
  activeFilters,
  setActiveFilters,
  sortBy,
  setSortBy,
}) => {
  const toggleQuickFilter = (id) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => setActiveFilters([]);
  return (
    <>
      <div className="border-bottom" style={{ padding: "24px" }}>
        <div className="flex-between" style={{ marginBottom: "4px" }}>
          <div
            className="flex-center"
            style={{ flexDirection: "row", gap: "5px" }}
          >
            <h3>검색결과 {sortedData.length}개</h3>
            {activeFilters.length > 0 && (
              <button onClick={clearAllFilters}>전체해제</button>
            )}
          </div>
          <div
            className="flex-center"
            style={{ flexDirection: "row", gap: "5px" }}
          >
            <Filter size={16} opacity={0.5} />
            <select
              style={{ padding: "4px 8px" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="distance">가까운순</option>
              <option value="rating">평점순</option>
              <option value="price">가격순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>

        {/* 퀵 필터 버튼 */}
        <div style={{ display: "flex", gap: "4px" }}>
          {quickFilters.map((filter) => {
            const isActive = activeFilters.includes(filter.id);
            return (
              <button
                key={filter.id}
                className="filter-btn"
                onClick={() => toggleQuickFilter(filter.id)}
                style={{
                  backgroundColor: isActive ? filter.color : "transparent",
                  color: isActive ? "white" : filter.color,
                  borderColor: filter.color,
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default FilterList;
