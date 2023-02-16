import React from "react";

/* This component is used to display a notification to the user when they enter
a wrong letter that has already been used. It is called within the key event listener in the
gamePage component. If the showNotification hook is set to true, this component is activated.*/

const Notification = ({ showNotification }) => {
  return (
    <div className={`notification-container ${showNotification ? "show" : ""}`}>
      <p>Letter has already been played</p>
    </div>
  );
};

export default Notification;
