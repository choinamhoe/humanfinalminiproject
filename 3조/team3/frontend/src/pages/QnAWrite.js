const QnAWrite = () => {
  return (
    <>
      <form className="qa-form" style={{ width: "400px" }}>
        <h1>게시물 작성</h1>
        <label>제목</label>
        <input type="text" placeholder="제목을 입력하세요" />
        <label>내용</label>
        <textarea placeholder="내용을 입력하세요" />
        <div>
          <button>취소</button>
          <button>저장</button>
        </div>
      </form>
    </>
  );
};

export default QnAWrite;
