import React from "react";
import { useDispatch } from "react-redux";
import { Space, Popconfirm } from "antd";
import { Delete, Edit } from "../Icons/icons";

const Actions = ({ onDelete, onEdit, title, id }) => {
  const dispatch = useDispatch();

  return (
    <Space size="middle">
      <Popconfirm
        title={`Êtes-vous sûr de supprimer cette ${title} ?`}
        okText="Oui"
        cancelText="Non"
        onConfirm={() => dispatch(onDelete(id))}
      >
        <Delete title={`Suprimer  ${title} `} />
      </Popconfirm>
      <Edit title={`Modifier  ${title}`} onClick={() => onEdit(id)} />
    </Space>
  );
};
export default Actions;
