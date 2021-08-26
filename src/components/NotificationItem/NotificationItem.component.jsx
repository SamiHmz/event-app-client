import React from "react";
// import Avatar from "../Avatar/Avatar.component";
import { Avatar } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import { baseUrl } from "../../config";

const NotificationItem = React.forwardRef(
  (
    { details, createdAt, is_clicked, id, lien, initiateur, administrateur },
    ref
  ) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    var photo = null,
      nom = null;

    if (user.type === typeUtilisateur.ADMINISTRATEUR) {
      photo = initiateur.photo;
      nom = initiateur.nom;
    } else {
      photo = administrateur.photo;
      nom = administrateur.nom;
    }

    const handleNotificationClick = () => {
      if (!is_clicked) {
        dispatch(notificationClicked(id));
      }
      history.push(lien);
    };

    const avatartOptions = photo
      ? {
          src: baseUrl + photo,
        }
      : { style: { color: "#f56a00", backgroundColor: "#fde3cf" } };

    return (
      <NotificationItemContainer
        is_clicked={is_clicked}
        ref={ref}
        onClick={() => handleNotificationClick()}
      >
        <Avatar {...avatartOptions}>{nom[0]}</Avatar>
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
