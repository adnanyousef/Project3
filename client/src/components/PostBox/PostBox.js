import React from "react";
import "./PostBox.css";

const PostBox = () => (
  <form className="post">
    <div className="userInput">
      <input
        type="text"
        className="form-control"
        placeholder="What would you like to share?"
        id="userPost"
      />
    </div>
  </form>
);

export default PostBox;
