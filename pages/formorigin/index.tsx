import React from "react";
import {  Button, Input, Icon } from "antd";
import FormOrigin, { IField } from "components/form/formorigin";
import { FormProps, FormItemProps, FormComponentProps } from "antd/lib/form";

export default () => {
  const fields: Array<IField> = [
    {
      label: '姓名',
      id: 'username',
      initialValue: '',
      required: true,
      rules: [{ required: true, message: 'Please input your username!' }],
      view: () => { return <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" /> },
    },{
      label: '密码确认',
      id: 'password',
      initialValue: '',
      required: true,
      rules: [{ required: true, message: 'Please input your Password!' }],
      view: () => { return <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" /> },
    }
  ]

  const formProps:FormProps = {
    layout: 'inline'
  }

  return (
    <FormOrigin fields={fields} formProps={formProps} />
  )
}
