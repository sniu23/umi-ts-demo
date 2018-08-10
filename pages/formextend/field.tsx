
import React from "react";
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { FormField, IFieldProps } from "../../components/form/formextend";

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
  },
]

function MyForm(props:FormComponentProps) {
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
      {
        fields.map((field, idx) => {
          return (
            <FormField key={idx} field={field} form={form} />
          )
        })
      }
      <Button type="primary" onClick={handleSubmit} > save </Button>
    </Form>
  )
}

const Page = Form.create()(MyForm)
export default Page