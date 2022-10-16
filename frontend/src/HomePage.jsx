import React from "react";
import Axios from "axios";
import { useState } from "react";

function HomePage() {
  const url = "http://localhost:8000/api/new_message/";
  const [message, setMessage] = useState("");

  let config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const submit = (e) => {
    e.preventDefault();
    Axios.post(url, { message: message }, config).then((res) => {
      console.log(res);
    });
    setMessage("");
    alert("Your message has been succesfully sent!");
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <div>
      <div class="bg-white-100 h-screen overflow-hidden flex items-center justify-center flex-col">
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <label class="form-label inline-block mb-2 text-gray-700">
              Enter an anonymous message for your boss!
            </label>
            <textarea
              onChange={handleMessageChange}
              value={message}
              class="
        form-control
        block
        w-full
        h-48
        resize-none
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
        <div class="flex space-x-2 justify-center"></div>

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

export default HomePage;
