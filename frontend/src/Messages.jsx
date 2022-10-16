import { useState } from "react";
import { useEffect } from "react";
import FlatList from "flatlist-react";
import { useNavigate } from "react-router-dom";

function Messages() {
  const token = localStorage.getItem("access_token");
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const submitLogin = async () => {
      const requestOptions = {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        }),
      };

      const response = await fetch(
        "http://localhost:8000/api/view_messages/",
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        console.log("error");
      } else {
        setData(data);
        localStorage.clear();
      }
    };

    submitLogin();
  }, []);

  const renderMessage = (messages, idx) => {
    return (
      <li key={idx}>
        {messages.id}.{messages.message}
      </li>
    );
  };

  return localStorage.getItem("access_token") === null ? (
    <div class="bg-white-100 h-screen overflow-hidden flex items-center justify-center flex-col">
      <h1>Please Login to View Messages</h1>
      <button
        onClick={() => {
          navigate("/login");
        }}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        LOGIN
      </button>
    </div>
  ) : (
    <div class="bg-white-100 h-screen overflow-hidden flex items-center justify-center flex-col">
      <ul>
        <h1>Here are the messages</h1>
        <FlatList
          list={data}
          renderItem={renderMessage}
          renderWhenEmpty={() => <div>List is empty!</div>}
          sortBy={["id", { key: "id", descending: true }]}
        />
      </ul>
    </div>
  );
}

export default Messages;
