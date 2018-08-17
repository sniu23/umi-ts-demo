import React from "react";
import { notification, Button } from "antd";

const send = () => {
  notification.open({
    message: 'server info',
    description: <div><b>详情：</b>阿布阿布</div>,
    duration: 0,
  })
}

export default () => {
  return (
    <Button onClick={send} > notification </Button>
  )
}