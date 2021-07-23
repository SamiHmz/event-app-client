import React, { useEffect } from "react";
import { Popover, Badge, Spin } from "antd";
import { ReactComponent as Bell } from "../../img/bxs-bell.svg";
import Icon from "@ant-design/icons";
import NotificationsList from "../NotificationsList/NotificationsList.component";
import { userSelector } from "../../redux/user/user.selectors";
import { unviewedNotificationsCountSelector } from "../../redux/notifications/notifications.selectors";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../config.json";
import {
  startFetchUnviewedNotificationCount,
  setUnviewedNotificationCount,
  addNewNotification,
  setAllNotificationsToViewed,
} from "../../redux/notifications/notifications.actions";

const iconStyles = { fontSize: "20px", cursor: "pointer" };

const Notifications = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const unviewedNotificationsCount = useSelector(
    unviewedNotificationsCountSelector
  );
  useEffect(() => {
    // fetch notifications count
    dispatch(startFetchUnviewedNotificationCount());
    //subscribe to notifications socket
    const socket = io(baseUrl);
    socket.on("connect", () => {
      socket.emit("join", `${user.type}-${user.id}`);
    });

    socket.on("notifications", (notification) => {
      dispatch(addNewNotification(notification));
      console.log(notification);
    });
  }, []);

  const handleNotificationsCount = () => {
    if (unviewedNotificationsCount > 0) {
      dispatch(setAllNotificationsToViewed());
      console.log("excuted");
    }
  };
  return (
    <Popover
      content={<NotificationsList />}
      placement="bottom"
      title="Notifications"
      trigger="click"
      onClick={handleNotificationsCount}
    >
      <Badge count={unviewedNotificationsCount} size="small">
        <Icon component={Bell} style={iconStyles} />
      </Badge>
    </Popover>
  );
};

export default Notifications;
