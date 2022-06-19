import React from "react";

function ChatLogin() {
  return (
    <>
      <div id="room-container">
        {/* {Object.keys(rooms).forEach((room) => {
          <a href="/">Join</a>;
        })} */}
      </div>
      <form action="/room" method="POST">
        <input name="room" type="text" required />
        <button type="submit">New Room</button>
      </form>
    </>
  );
}

export default ChatLogin;
