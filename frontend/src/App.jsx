import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const url = "http://localhost:8002/api/new_message/";
  const [message, setMessage] = useState("");

  // const getWelcomeMessage = async () => {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const response = await fetch("/api/test", requestOptions);
  //   const data = await response.json();

  const submit = (e) => {
    e.preventDefault();
    Axios.post(url, { message: message }).then((res) => {
      console.log("ok");
    });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <div class="flex justify-center">
        <div class="mb-3 xl:w-96">
          <label class="form-label inline-block mb-2 text-gray-700">
            Enter an anonymous message for your boss!
          </label>
          <textarea
            onChange={handleMessageChange}
            class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Your message"
          ></textarea>
        </div>
      </div>
      <div class="flex space-x-2 justify-center">
        <button
          onClick={submit}
          type="button"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
