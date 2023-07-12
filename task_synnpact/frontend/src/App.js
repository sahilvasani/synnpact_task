import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const dateConverter = (data) => {
  const date = new Date(data * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate().toString();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minute = date.getMinutes().toString();
  const amOrpm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12;

  return `${month} ${day}, ${year} ${hours}:${minute} ${amOrpm} IST`;
};

export function App() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [buttonShow, setButtonShow] = useState(false);

  const fetchData = () => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  };

  const handleGetData = async () => {
    setLoading(true);
    try {
      await axios.get(`http://localhost:5000/api/${count}`).then((data) => {
        setItems([...items, ...data.data.nodes]);
        setLoading(false);
      });
    } catch (error) {
      setButtonShow(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [count]);

  return (
    <>
      <InfiniteScroll
        dataLength={items?.length || 0}
        next={fetchData}
        hasMore={true}
        loader={loading && <h4 className="task_loader">Loading...</h4>}
      >
        {items?.map((e, index) => {
          return (
            <div key={index} className="task_main_div">
              <img
                src={`${e.node.field_photo_image_section}`}
                alt="img"
                height={150}
                width={200}
                className="task_image"
              />
              <div>
                <p className="task_heading">{e.node.title}</p>
                <p className="task_date">{dateConverter(e.node.last_update)}</p>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
      {buttonShow && (
        <div className="task_button_main_div">
          <button
            className="task_button"
            onClick={() => {
              window.open(
                "http://www.pinkvilla.com/photo-gallery-feed-page/page/1"
              );
            }}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
