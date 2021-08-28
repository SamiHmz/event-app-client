import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const RenderFormAndButton = ({
  content,
  type,
  children,
  visible,
  setVisible,
  buttonStyles,
}) => {
  const user = useSelector(userSelector);

  return (
    <>
      {user.type === type ? (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          style={buttonStyles}
          onClick={() => {
            setVisible(true);
          }}
        >
          Ajouter {content}
        </Button>
      ) : null}
      {visible ? children : null}
    </>
  );
};
export default RenderFormAndButton;
