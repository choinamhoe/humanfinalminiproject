const Chat = ({ history, isLoading }) => {
  return (
    <div
      style={{
        gap: "16px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      <h2>AI 상담 기록 ({history.length}개)</h2>
      {history.length === 0 ? (
        <>
          <div className="flex-center">
            <div className="icon">🤖</div>
            <h3>아직 질문이 없습니다.</h3>
            <p> 질문을 입력하고 전송해보세요.</p>
          </div>
        </>
      ) : (
        <div style={{ margin: "10px" }}>
          {history.map((item, idx) => {
            const date = new Date(item.time);
            const hour = date.getHours();
            const minute = date.getMinutes();
            const ampm = hour >= 12 ? "오후" : "오전";
            const displayHour = hour % 12 || 12;
            const formattedTime = `${ampm} ${displayHour}:${minute
              .toString()
              .padStart(2, "0")}`;

            return (
              <div key={idx} style={{ marginBottom: "12px" }}>
                {item.user && (
                  <div>
                    <div>{item.user}</div>
                    <div style={{ fontSize: "0.8em", color: "#666" }}>
                      {formattedTime}
                    </div>
                  </div>
                )}

                {item.ai && item.ai.trim() !== "" && (
                  <div>
                    <div>🤖 {item.ai}</div>
                    <div style={{ fontSize: "0.8em", color: "#666" }}>
                      {formattedTime}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div>
              <div>🤖 답변 생성 중...</div>
              <div style={{ fontSize: "0.8em", color: "#666" }}>지금</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
