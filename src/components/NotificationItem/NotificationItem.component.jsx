import React from "react";
import Avatar from "../Avatar/Avatar.component";
import moment from "moment";
import img from "../../img/avatar.jpg";

import {
  NotificationItemContainer,
  NotificationItemTextContainer,
  BoldText,
  TimeText,
} from "./NotificationItem.styles";

const NotificationItem = React.forwardRef(
  ({ src, nom, details, createdAt }, ref) => {
    return (
      <NotificationItemContainer ref={ref}>
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
