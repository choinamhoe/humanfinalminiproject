import { categoryOptions, regionOptions } from "../constants/options";
import { Search } from "lucide-react";
const SearchForm = ({
  filters,
  inputText,
  setInputText,
  isLoading,
  handleSubmit,
  handleFilterChange,
}) => {
  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="AI에게 물어볼 질문 입력"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">업종</option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          >
            <option value="">지역</option>
            {regionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "전송 중..." : "질문 전송"}
        </button>
      </form>
    </>
  );
};

export default SearchForm;
