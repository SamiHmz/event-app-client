import React from "react";
import Icon from "@ant-design/icons";
import { ReactComponent as TrashIcon } from "../../img/trash.svg";
import { ReactComponent as EditIcon } from "../../img/edit.svg";
import { ReactComponent as EyeIcon } from "../../img/eye.svg";
import { ReactComponent as FileIcon } from "../../img/file.svg";
import { ReactComponent as CheckIcon } from "../../img/checked.svg";
import { Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";

const styles = { fontSize: "16px", cursor: "pointer" };

export const Delete = ({ title = "delete this item", ...other }) => {
  return (
    <Tooltip title={title} mouseEnterDelay={1}>
      <Icon style={styles} component={TrashIcon} {...other} />
    </Tooltip>
  );
};
export const Valide = ({ title = "valider le bilan", ...other }) => {
  return (
    <Tooltip title={title} mouseEnterDelay={1}>
      <Icon style={styles} component={CheckIcon} {...other} />
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

export const Eye = ({ title = "edit this item", to, ...other }) => {
  const history = useHistory();
  return (
    <Link
      to={`${history.location.pathname}/${to}`}
      style={{ color: "rgba(0, 0, 0, 0.85)" }}
    >
      <Tooltip title={title} mouseEnterDelay={1}>
        <Icon style={styles} component={EyeIcon} {...other} />
      </Tooltip>
    </Link>
  );
};

export const File = ({ title = "voir le fichier", to, ...other }) => {
  return (
    <a href={to} style={{ color: "rgba(0, 0, 0, 0.85)" }} target="_blank">
      <Tooltip title={title} mouseEnterDelay={1}>
        <Icon style={styles} component={FileIcon} {...other} />
      </Tooltip>
    </a>
  );
};
