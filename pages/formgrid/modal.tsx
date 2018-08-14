import React from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import { Modal, Form, Button, Input, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import FormGrid, { IFormGridField, IFormGridProps } from "components/form/FormGrid";

class Config {
  @observable visible:boolean = false
  @action visibleChange(val:boolean) {
    this.visible = val
  }
}
const store = new Config()

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
  },
]

@observer
class Page extends React.Component {
  onModalOpen() {
    store.visibleChange(true)
  }
  onModalCancel() {
    store.visibleChange(false)
  }
  onModalOk = (e) => {
    store.visibleChange(false)
    const form:any = this.refs.myform;
    form.validateFields((err, values) => {
      if (err) {
        console.log('Received errors of form: ', err);
      } else {
        console.log('Received values of form: ', values);
      }
      form.resetFields();
    });
  }
  render() {
    return (
      <div>
        <Button onClick={this.onModalOpen} > Open Modal </Button>
        <Modal
          title="Basic Modal"
          visible={store.visible}
          onOk={this.onModalOk}
          onCancel={this.onModalCancel}
        >
          <FormGrid ref='myform' layout='horizontal' fields={fields} colSpan={24} lableSpan={6} />
        </Modal>
      </div>
    )
  }
}

export default Page