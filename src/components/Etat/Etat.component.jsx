import React from "react";
import { Tag } from "antd";
import { etat, colors } from "../../util/magic_strings";

const Etat = ({ value }) => {
  if (value === etat.ATENTE) return <Tag color={colors.orange}>{value}</Tag>;
  if (value === etat.APROUVER) return <Tag color={colors.green}>{value}</Tag>;
  return <Tag color={colors.red}>{value}</Tag>;
};

export default Etat;
