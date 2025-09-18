import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import "../css/QnA.css";

const QnA = () => {
  // 기존 게시물 데이터
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  // 게시물 작성 폼을 보여줄지 여부를 결정(true: 게시물 작성폼 / false: 게시물 목록)
  const [isItEdited, setBeingEdited] = useState(false);

  const BACKEND_URL = "http://localhost:5000"; // 백엔드 주소
  const [searchQuery, setSearchQuery] = useState(""); // 25.09.15. 추가. 검색어 상태

  // ----------------- 게시물 불러오기 -----------------
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/posts`, {
        withCredentials: true, // 세션 쿠키 포함
      });
      // 날짜 기준 내림차순(최신글 먼저). 25.9.15 추가
      const list = Array.isArray(res.data) ? res.data : []; // [SAFE] 비배열 방어
      const sorted = [...list].sort(
        (a, b) =>
          new Date(b?.queCreatedAt || 0) - new Date(a?.queCreatedAt || 0)
      );
      setPosts(sorted);
    } catch (err) {
      console.error("게시물 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ----------------- 게시물 작성 -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title: newPostTitle,
      content: newPostContent,
      isPublic, // 프론트 변수 유지, 백엔드에선 현재 미사용
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/posts`, newPost, {
        withCredentials: true, // 세션 쿠키 포함
      });

      // 백엔드 응답에서 documentId, userUid, date 받음
      // ★ 수정: 새 글을 맨 위에 추가(기존 [...posts, res.data] → 앞에 넣기)
      setPosts((prev) => [res.data, ...prev]); // ★ 수정

      setNewPostTitle("");
      setNewPostContent("");
      setIsPublic(true);
      setBeingEdited(false);
    } catch (err) {
      console.error("게시물 작성 실패:", err);
    }
  };

  // ----------------- [ADD] 검색 로직 (클라이언트 필터) -----------
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) => {
      const title = (post.title || "").toLowerCase();
      const content = (post.content || "").toLowerCase();
      const author = (post.username || post.userUid || "").toLowerCase();
      return title.includes(q) || content.includes(q) || author.includes(q);
    });
  }, [posts, searchQuery]);
  // ---------------- [ADD] Enter로 검색, ESC로 초기화 (선택적 UX 향상) ----
  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearchQuery("");
    }
  };

  return (
    <div>
      {isItEdited ? (
        <>
          <div className="qna-form">
            <h2 className="qna-form__title">게시물 작성</h2>

            <form onSubmit={handleSubmit} className="qna-form__body">
              {/* 제목 */}
              <div className="qna-form__group">
                <label htmlFor="title" className="qna-form__label">
                  제목
                </label>
                <input
                  type="text"
                  id="title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  required
                  className="qna-form__input"
                  placeholder="제목을 입력하세요"
                />
              </div>

              {/* 내용 */}
              <div className="qna-form__group">
                <label htmlFor="content" className="qna-form__label">
                  내용
                </label>
                <textarea
                  id="content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  required
                  className="qna-form__textarea"
                  placeholder="내용을 입력하세요"
                ></textarea>
              </div>

              {/* 공개 여부 */}
              <div className="qna-form__checkbox">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <label htmlFor="isPublic">공개 게시물</label>
              </div>

              {/* 버튼 영역 */}
              <div className="qna-form__actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setBeingEdited(false)}
                >
                  취소
                </button>
                <button type="submit" className="btn btn--primary">
                  SEND
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div>
          <h1 className="qna-title">Q&A</h1>
          {/* ----------------- [ADD] 검색 바 UI. 25.9.15. 추가 ----------------- */}
          <div className="qna-search">
            <input
              type="text"
              className="qna-search__input"
              placeholder="제목 / 내용 / 게시자 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button
              className="btn btn--primary qna-search__button"
              onClick={() => setSearchQuery((v) => v.trim())}
              aria-label="검색"
            >
              검색
            </button>
          </div>

          <button onClick={() => setBeingEdited(true)}>게시물 작성</button>
          {filteredPosts.length > 0 ? ( // 25.9.15. 추가 [FIX] 조건 대상 교체
            <div className="qna-table-wrapper">
              <table className="qna-table">
                <thead>
                  <tr>
                    <th className="col-index">순서</th>
                    <th className="col-title">제목</th>
                    <th className="col-author">게시자</th>
                    <th className="col-date">게시일자</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post, index) => (
                    // [FIX] 불필요한 단항 + 연산자 제거(이전 NaN 원인)
                    <tr
                      key={
                        post.documentId ||
                        `${post.userUid || "anon"}-${
                          post.queCreatedAt || index
                        }-${index}`
                      }
                    >
                      <td className="col-index">{index + 1}</td>
                      <td className="col-title">{post.title}</td>
                      <td className="col-author">
                        {post.username || post.userUid}
                      </td>
                      <td className="col-date">
                        {post.queCreatedAt
                          ? new Date(post.queCreatedAt).toLocaleDateString()
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // [MOD] 검색 결과 없는 경우 문구 개선
            <p>
              {searchQuery
                ? "검색 결과가 없습니다."
                : "아직 게시물이 없습니다."}
            </p>
          )}
          {/* ===== [ADDED FROM #2] 게시판 프레임(테이블) 끝 ===== */}
          {/* (참고) 기존 1번 코드의 카드형 목록은 테이블로 대체됨 */}
        </div>
      )}
    </div>
  );
};

export default QnA;
