import { useRef, useState } from "react";
import { imageUpload } from "../api/image";
import Loading from "../modal/Loading";
const Home = () => {
  const fileInputRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      handleUpload(file);
    }
  };
  const handleOnClick = () => {
    fileInputRef.current.click();
  };
  const handleUpload = async (file) => {
    try {
      setIsLoading(true);
      const res = await imageUpload(file);
      console.log(res);
      setApiMessage(res?.data?.message);
    } catch (err) {
      alert("파일 업로드 실패");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(apiMessage);
  return (
    <>
      <div>
        <div className="drop-zone" onClick={handleOnClick}>
          <p>여기에 텍스트를 적으세요!</p>
          {isLoading && <Loading />}
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        {apiMessage && (
          <div
            style={{ marginTop: "20px", textAlign: "center", color: "#333" }}
          >
            {apiMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
