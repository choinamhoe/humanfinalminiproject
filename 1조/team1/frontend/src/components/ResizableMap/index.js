import { useState, useRef, useEffect } from "react";

import Button from "./Button";
import LeftletMap from "./LeftletMap";

const ResizableMap = ({ containerRef, viewMode, setViewMode, viewData }) => {
  const [mapHeight, setMapHeight] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef(null);

  // 드래그 시작
  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // 드래그 중
  const onDrag = (e) => {
    if (!isDragging || !containerRef.current) return;

    const containerTop = containerRef.current.getBoundingClientRect().top;
    let newHeight = e.clientY - containerTop;

    const minHeight = 100;
    const maxHeight = containerRef.current.parentElement.clientHeight - 100;

    if (newHeight < minHeight) newHeight = minHeight;
    if (newHeight > maxHeight) newHeight = maxHeight;

    setMapHeight(newHeight);
  };

  // 드래그 끝
  const stopDrag = () => setIsDragging(false);

  // viewMode 변경 시 기본 높이(px 단위로 통일)
  useEffect(() => {
    const containerHeight =
      containerRef.current?.parentElement?.clientHeight || window.innerHeight;

    const defaultHeight =
      viewMode === "map"
        ? Math.floor(containerHeight * 0.7)
        : viewMode === "balance"
        ? Math.floor(containerHeight * 0.5)
        : Math.floor(containerHeight * 0.3);

    setMapHeight(defaultHeight);
  }, [viewMode]);

  // mapHeight 변경될 때마다 지도 invalidate
  useEffect(() => {
    if (mapRef.current && mapRef.current.invalidateSize) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, [mapHeight]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", stopDrag);
    } else {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    }
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [isDragging]);
  return (
    <>
      <Button viewMode={viewMode} setViewMode={setViewMode} />
      <div ref={containerRef}>
        <div
          className="border-bottom"
          style={{
            height: `${mapHeight}px`,
            padding: "20px",
            transition: isDragging ? "none" : "height 0.3s",
            position: "relative",
          }}
        >
          <LeftletMap ref={mapRef} viewData={viewData} />
          <div className="resizer" onMouseDown={startDrag} />
        </div>
      </div>
    </>
  );
};

export default ResizableMap;
