
import React from "react";
import { Form, Input, Button, Row } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { FormGridFieldList, IFieldProps } from "components/form/formextend";

const fields: Array<IFieldProps> = [
  {
    item: {
      label: '姓名 ',
      id: 'username',
      required: true,
    },
    opts: {
      initialValue: '',
      rules: [{ required: true, message: 'Please input your username!' }],
    },
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    item: {
      label: '密码 ',
      id: 'password',
      required: true,
    },
    opts: {
      initialValue: '',
      rules: [{ required: true, message: 'Please input your Password!' }],
    },
    view: () => { return <Input placeholder="placeholder" /> },
    times: 2,
  },{
    item: {
      label: '姓名2 ',
      id: 'username2',
      required: true,
    },
    opts: {
      initialValue: '',
      rules: [{ required: true, message: 'Please input your username!' }],
    },
    view: () => { return <Input placeholder="placeholder" /> },
  },{
    item: {
      label: '姓名3 ',
      id: 'username3',
      required: true,
    },
    opts: {
      initialValue: '',
      rules: [{ required: true, message: 'Please input your username!' }],
    },
    view: () => { return <Input placeholder="placeholder" /> },
  },
]


function MyForm(props:FormComponentProps) {
  const colCol = {
    xs: 24,  
    sm: 12,  
    md: 8,  
    lg: 6,  
    xl: 4,  
    xxl: 3, 
  }
  
  // const lblCol = {
  //   xs: 12,  
  //   sm: 12,  
  //   md: 12,  
  //   lg: 12,  
  //   xl: 12,  
  //   xxl: 12, 
  // }
  const { form } = props
  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values)
      } else {
        console.log('error', error, values)
      }
      form.resetFields()
    })
  }
  return (
    <Form layout='vertical' >
      <Row gutter={8} >
        {
          FormGridFieldList({ fields, form, colCol })
        }
      </Row>
      <Button type="primary" onClick={handleSubmit} > save </Button>
    </Form>
  )
}

const Page = Form.create()(MyForm)
export default Page