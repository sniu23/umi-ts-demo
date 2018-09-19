
import React from "react";
import { Form, Input, Button, Radio, Row, Col, message } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { GridFieldList, FieldProps, COLS } from "components/form/Field";

import { observable, computed, action, autorun } from "mobx";
import { observer } from "mobx-react";

declare type TimNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24

class Store {
  @observable lays = [
    { label: '水平', value: 'horizontal' }, 
    { label: '垂直', value: 'vertical' },
  ]
  @observable reps = [
    { label: '流式', value: 'RESP' }, 
    { label: '固定列', value: 'FIX' },
  ]
  @computed get cols() {
    return (
      (this.response) ?
        Object.keys(COLS[this.response]).map(item => {
          return {label: item, value: item}
        })
      : []
    )
  }
  @computed get lbls() {
    return (
      ((this.layout === 'horizontal') && (this.response) && (this.colnum)) ? 
        Object.keys(COLS[this.response][this.colnum].LBLS).map(item => {
          return {label: item, value: item}
        })
      : []
    )
  }
  @computed get tims() {
    return (
      ((this.response) && (this.colnum)) ?
        Object.keys(COLS[this.response][this.colnum].TIMS).map(item => {
          return {label: item, value: COLS[this.response][this.colnum].TIMS[item]}
        })
      : []
    )
  }
  @computed get guts() {
    return (
      (this.layout === 'vertical') ? 
        [
          { label: '0px', value: 0 },
          { label: '8px', value: 8 },
          { label: '16px', value: 16 },
          { label: '32px', value: 32 },
        ]
      : [{ label: '0px', value: 0 }]
    )
  }

  @observable layout:'horizontal' | 'vertical' = 'horizontal'
  @observable response = 'RESP'
  @observable colnum = '_3'
  @observable lblnam = null
  @observable lblCol = null
  @observable times:TimNum = 1
  @observable gutter = 0
  @computed get colCol() {
    return (
      ((this.response) && (this.colnum) ) ?
        COLS[this.response][this.colnum].COL
      : null
    )
  }

  @action laysChange(val) {
    this.layout = val
    this.response = 'RESP'
    this.colnum = '_3'
    this.lblnam = null
    this.lblCol = null
    this.gutter = 0
    this.times = 1
  }
  @action repsChange(val) {
    this.response = val
    this.colnum = '_3'
    this.lblnam = null
    this.lblCol = null
    this.times = 1
  }
  @action colsChange(val) {
    this.colnum = val
    this.lblnam = null
    this.lblCol = null
    this.times = 1
  }
  @action lblsChange(val) {
    this.lblnam = val
    this.lblCol = COLS[this.response][this.colnum].LBLS[val]
    this.times = 1
  }
  @action timsChange(val) {
    this.times = val
  }
  @action gutsChange(val) {
    this.gutter = val
  }

  // printer = autorun(() => {
  //   console.log(this.times)
  //   console.log(this.tims)
  // })

}
const store = new Store()

const Control: React.SFC = observer(() => {
  const RadioGroup = Radio.Group
  function onlayoutChange(e) {
    store.laysChange(e.target.value)
  }
  function onresponseChange(e) {
    store.repsChange(e.target.value)
  }
  function oncolnumChange(e) {
    store.colsChange(e.target.value)
  }
  function onlblColChange(e) {
    store.lblsChange(e.target.value)
  }
  function ontimsChange(e) {
    store.timsChange(e.target.value)
  }
  function ongutsChange(e) {
    store.gutsChange(e.target.value)
  }
  return (
    <>
      <Row>
        <Col span={2} >表单布局：</Col>
        <Col span={22}><RadioGroup options={store.lays} onChange={onlayoutChange} value={store.layout} /></Col>
      </Row>
      <Row>
        <Col span={2} >格栅布局：</Col>
        <Col span={22}><RadioGroup options={store.reps} onChange={onresponseChange} value={store.response} /></Col>
      </Row>
      <Row>
        <Col span={2} >每行列数：</Col>
        <Col span={22}><RadioGroup options={store.cols} onChange={oncolnumChange} value={store.colnum} /></Col>
      </Row>
      <Row>
        <Col span={2} >标签占比：</Col>
        <Col span={22}><RadioGroup options={store.lbls} onChange={onlblColChange} value={store.lblnam} /></Col>
      </Row>
      <Row>
        <Col span={2} >field0 占行宽倍数：</Col>
        <Col span={22}><RadioGroup options={store.tims} onChange={ontimsChange} value={store.times} /></Col>
      </Row>
      <Row>
        <Col span={2} >栅格间隔：</Col>
        <Col span={22}><RadioGroup options={store.guts} onChange={ongutsChange} value={store.gutter} /></Col>
      </Row>
      <br/>
    </>
  )
})

const GridForm: React.SFC<FormComponentProps> = observer((props) => {
  const fields:Array<FieldProps> = []
  for (let i = 0; i < 24; i++) {
    fields.push(
      {
        item: {label: `字段${i}`, id: `field${i}`},
        view: () => <Input />,
        times: (i===0) ? store.times : 1,
      }
    )
  }
  const { form } = props
  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((error, values) => {
      if (!error) {
        message.success(JSON.stringify(values))
      } else {
        message.error(JSON.stringify(error))
        message.success(JSON.stringify(values))
      }
      form.resetFields()
    })
  }
  const rowAtt = {gutter: store.gutter}
  return (
    <Form layout={store.layout} >

        <GridFieldList fields={fields} form={form} colCol={store.colCol} lblCol={store.lblCol} rowAtt={rowAtt} />

      <Button type="primary" onClick={handleSubmit} > save </Button>
    </Form>
  )
})

const FormGrid = Form.create()(GridForm)

export default () => {
  return (
    <>
      <Control />
      <div style={{padding: 16, borderStyle: 'solid', borderWidth: '5px', }} >
        <FormGrid />
      </div>
    </>
  )
}