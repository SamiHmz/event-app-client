import React from "react";
import Avatar from "../Avatar/Avatar.component";
import moment from "moment";
import img from "../../img/avatar.jpg";
import { notificationClicked } from "../../redux/notifications/notifications.actions";
import {
  NotificationItemContainer,
  NotificationItemTextContainer,
  BoldText,
  TimeText,
} from "./NotificationItem.styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const NotificationItem = React.forwardRef(
  ({ src, nom, details, createdAt, is_clicked, id, lien }, ref) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleNotificationClick = (id, lien) => {
      console.log(id);
      dispatch(notificationClicked(id));
      history.push(lien);
    };
    return (
      <NotificationItemContainer
        is_clicked={is_clicked}
        ref={ref}
        onClick={() => handleNotificationClick(id, lien)}
      >
        <Avatar src={src ? src : img} />
        <NotificationItemTextContainer>
          <div>
            <BoldText>{nom}</BoldText>
            &nbsp;
            {details}
          </div>
          <TimeText>{moment(createdAt).fromNow()}</TimeText>
        </NotificationItemTextContainer>
      </NotificationItemContainer>
    );
  }
);
export default NotificationItem;
