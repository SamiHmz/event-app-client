import React from "react";
import { Tag } from "antd";
import { etat } from "../../util/magic_strings";

const Etat = ({ value }) => {
  if (value === etat.ATENTE) return <Tag color="#F89938">{value}</Tag>;
  if (value === etat.APROUVER) return <Tag color="#14B8A6">{value}</Tag>;
  return <Tag color="#E24C4B">{value}</Tag>;
};

export default Etat;
