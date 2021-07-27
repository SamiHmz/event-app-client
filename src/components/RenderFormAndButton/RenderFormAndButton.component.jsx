import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { typeUtilisateur } from "../../util/magic_strings";

const RenderFormAndButton = ({ children, visible, setVisible }) => {
  const user = useSelector(userSelector);

  return (
    <>
      {user.type === typeUtilisateur.ADMINISTRATEUR ? null : (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => {
            setVisible(true);
          }}
        >
          Ajouter itervenant
        </Button>
      )}
      {visible ? children : null}
    </>
  );
};
export default RenderFormAndButton;
