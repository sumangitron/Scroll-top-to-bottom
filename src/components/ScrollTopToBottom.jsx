import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const ScrollTopToBottom = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    (async function getData() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );
        const result = await response.json();

        setApiData(result.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleScrollBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="main">
      <h1>Scroll top to bottom</h1>
      <button onClick={handleScrollBottom}>Click to scroll bottom</button>
      {apiData?.map((item, index) => {
        return <p key={index}>{item.title}</p>;
      })}
      <button onClick={handleScrollTop}>Click to scroll top</button>
      <h3 ref={bottomRef}>This is the bottom of the page</h3>
    </div>
  );
};

export default ScrollTopToBottom;
