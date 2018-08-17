import * as React from "react";
import { Pagination, Select } from "antd";
import SelectPaged from "components/select/SelectPaged2";

import axios from 'axios';

const fetch = async ({v, p}) => {
  const resp = await axios.get(`http://localhost:8000/suggest2?v=${v}&p=${p}`)
  return resp.data
}

const select = () => {
  return (
    <SelectPaged 
      fetch={fetch} 
      pageSize={10}
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: 250 }}
      style={{ width: 200 }}
    />
  )
}


import { Form, Input, Button } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { FormField, IFieldProps } from "components/form/formextend";

const fields: Array<IFieldProps> = [
  {
    item: {
      label: '姓名',
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
      label: '身份证',
      id: 'cnid',
      required: true,
    },
    opts: {
      initialValue: '',
      rules: [{ required: true, message: 'Please input your cn id!' }],
      validateTrigger: ['onSearch, onSelect'],
    },
    view: () => { return <SelectPaged placeholder="placeholder" fetch={fetch} /> },
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