import React, { Component } from "react";
import { Form, Button, Row, Col } from "antd";
import { FormComponentProps } from "antd/lib/form";

declare type FormLayout = 'horizontal' | 'inline' | 'vertical';

export interface IFormBaseProps extends FormComponentProps {
  fields: Array<IField>,
  layout?: FormLayout,
  textSubmit?: string,
  textReset?: string,
  colItem?:any,
  layoutItem?: Object,
  layoutTail?: Object,
  classForm?: string,
  classItem?: string,
  classTail?: string,
  busness?: Function,
}

export interface IField {
  label?: string,
  required?: boolean,
  id: string,
  initialValue: any,
  rules?: object[],
  view: Function,
  colAttr?: any,
  className?: string;
}

const FormItem = Form.Item;

/**
 * 特征： FormItem 统一布局不支持单独处理; 预设 Submit & Reset 按钮; 
 */

function BaseForm(props: IFormBaseProps) {
  const { form, fields, layout, colItem, layoutItem, layoutTail, classForm, classItem, classTail, textSubmit, textReset, busness } = props;
  const { getFieldDecorator, validateFields } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (!busness) {
          console.log('Received values of form: ', values);
        } else {
          busness(values);
        }
      } else {
        console.log('Error happened of form: ', err);
      }
    });
  };

  const clearField = () => form.resetFields()

  const defRowAttr = {};

  const defLayoutItem =  (layout === 'horizontal') ? { labelCol: { xs: { span: 24 }, sm: { span: 8 },}, wrapperCol: { xs: { span: 24 }, sm: { span: 16 },},} : {};
  const defLayoutTail =  (layout === 'horizontal') ? ({ wrapperCol: { xs: {span: 24, offset: 0,}, sm: {span: 16, offset: 8,},}, }) : {};   
  
  const wrapRow = (Component, rowAttr) => <Row gutter={24} {...rowAttr} >{ Component }</Row>
  const wrapCol = (Component, key, colAttr) => <Col key={key} span={6} {...colItem} {...colAttr} >{ Component }</Col>

  const FieldView = (field, index) => {
    return (
      <FormItem 
        key={index} 
        {...defLayoutItem} {...layoutItem} 
        className={field.className || classItem}
        label={field.label || ''} 
        required={field.required || false} >
        {
          getFieldDecorator(field.id, {
            initialValue: field.initialValue,
            rules: field.rules || [],
          })(
            field.view()
          )
        }
      </FormItem>
    )
  }

  return (
    <Form layout={layout || 'inline'} className={classForm || ''} onSubmit={handleSubmit} >
      {
        (layout === 'vertical')
        ? wrapRow(fields.map((field, index) => {
            return (
              wrapCol(FieldView(field, index), index, field.colAttr)
            )
          }), defRowAttr)
        : fields.map((field, index) => {
            return (
              FieldView(field, index)
            )
          })
      }
      <FormItem {...defLayoutTail} {...layoutTail} className={classTail || ''} >
        <Button.Group >
          <Button type="primary" htmlType="submit"> {textSubmit || 'submit'} </Button>
          <Button htmlType="reset" onClick={clearField} > {textReset || 'reset'} </Button>
        </Button.Group>
      </FormItem>
    </Form>
  )
}

const FormBase = Form.create<IFormBaseProps>()(BaseForm);

export const FormInline = FormBase

export const FormHorizontal = props => <FormBase layout="horizontal" {...props} />  // layoutItem, layoutTail 定义统一FormItem布局

export const FormVertical = props => <FormBase layout="vertical" {...props} /> // colItem 定义统一FormItem布局, colAttr 定义个别FormItem布局。

export default FormBase;
