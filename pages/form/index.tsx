
import React from "react";
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { FormFieldList, FieldProps } from "components/form/Field";

const fields: Array<FieldProps> = [
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
  },
]

const MyForm: React.SFC<FormComponentProps> = (props) => {
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
    <Form >
      <FormFieldList fields={fields} form={form} />
      <Button type="primary" onClick={handleSubmit} > save </Button>
    </Form>
  )
}

const Page = Form.create()(MyForm)

export default Page