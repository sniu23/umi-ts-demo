
import React from "react";
import {  Button, Input, Icon } from "antd";
import FormGrid, { IFormGridField } from "../../components/form/FormGrid";

const fields: Array<IFormGridField> = [
  {
    label: '姓名 ',
    id: 'username',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your username!' }],
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    label: '密码 ',
    id: 'password',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your Password!' }],
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    label: '姓名1',
    id: 'username1',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your username!' }],
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    label: '密码1',
    id: 'password1',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your Password!' }],
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    label: '姓名2',
    id: 'username2',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your username!' }],
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    label: '密码2',
    id: 'password2',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your Password!' }],
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    label: '姓名3',
    id: 'username3',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your username!' }],
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    label: '密码3',
    id: 'password3',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your Password!' }],
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    label: '姓名4',
    id: 'username4',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your username!' }],
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    label: '密码4',
    id: 'password4',
    initialValue: '',
    required: true,
    rules: [{ required: true, message: 'Please input your Password!' }],
    view: () => { return <Input placeholder="placeholder" /> },
    times: 2,
  },
]

export default () => {
  return (
    <div>
      <FormGrid 
        layout='horizontal' 
        response 
        fields={fields} 
        lableSpan={6}
      >{
        (form) => {
          function onSave() {
            form.validateFields((err, values) => {
              if (err) {
                console.log('Received error of form: ', err);
              } else {
                console.log('Received values of form: ', values);
              }
              form.resetFields();
            });
          }
          return (
            <Button onClick={onSave} > save </Button>
          )
        }
      }
      </FormGrid>
    </div>
  )
}

