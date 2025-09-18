const QnA = () => {
  return (
    <>
      <form style={{ flexDirection: "column" }}>
        <h1>Q & A</h1>
        <div style={{ display: "flex" }}>
          <input
            type="search"
            placeholder="검색어를 입력하세요"
            aria-label="검색"
          />
          <button type="submit">검색</button>
        </div>
      </form>
    </>
  );
};

export default QnA;
