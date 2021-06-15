import React from "react";

const Notification = (props) => {
  if (!props.notification.message) {
    return null;
  }
  return (
    <div className={props.notification.status}>
      {props.notification.message}
    </div>
  );
};

export default Notification;
