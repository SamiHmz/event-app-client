import React, { useEffect, useCallback, useRef } from "react";
import NotificationItem from "../NotificationItem/NotificationItem.component";
import {
  startNotificationsFetching,
  setNotificationsIsLoading,
  setCurrentPage,
} from "../../redux/notifications/notifications.actions";
import {
  notificationsSelector,
  notificationsIsLoadingSelector,
  currentNotificationsPageSelector,
  hasMoreSelector,
} from "../../redux/notifications/notifications.selectors";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner.component";

const NotificationsList = () => {
  const dispatch = useDispatch();
  const notifData = useSelector(notificationsSelector);
  const notificationsIsLoading = useSelector(notificationsIsLoadingSelector);
  const currentNotificationsPage = useSelector(
    currentNotificationsPageSelector
  );
  const hasMore = useSelector(hasMoreSelector);
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(setNotificationsIsLoading());
          dispatch(setCurrentPage());
        }
      });
      observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    dispatch(startNotificationsFetching(currentNotificationsPage));
  }, [currentNotificationsPage]);

  return (
    <div
      style={{
        minWidth: "300px",
        maxHeight: "70vh",
        minHeight: "70vh",
        overflowY: "scroll",
      }}
    >
      {notifData.map((item, index) => {
        if (notifData.length == index + 1)
          return (
            <NotificationItem ref={lastElementRef} key={item.id} {...item} />
          );
        else {
          return <NotificationItem key={item.id} {...item} />;
        }
      })}
      {notificationsIsLoading && <Spinner />}
    </div>
  );
};
export default NotificationsList;
