import React from "react";
import Icon from "@ant-design/icons";
import { ReactComponent as TrashIcon } from "../../img/trash.svg";
import { ReactComponent as EditIcon } from "../../img/edit.svg";
import { ReactComponent as EyeIcon } from "../../img/eye.svg";
import { Tooltip } from "antd";

const styles = { fontSize: "16px", cursor: "pointer" };

export const Delete = ({ title = "delete this item", ...other }) => {
  return (
    <Tooltip title={title} mouseEnterDelay={1}>
      <Icon style={styles} component={TrashIcon} {...other} />
    </Tooltip>
  );
};
export const Edit = ({ title = "delete this item", ...other }) => {
  return (
    <Tooltip title={title} mouseEnterDelay={1}>
      <Icon style={styles} component={EditIcon} {...other} />{" "}
    </Tooltip>
  );
};
export const Eye = ({ title = "edit this item", ...other }) => {
  return (
    <Tooltip title={title} mouseEnterDelay={1}>
      <Icon style={styles} component={EyeIcon} {...other} />
    </Tooltip>
  );
};
