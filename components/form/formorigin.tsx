import React from "react";
import { Form, Button } from "antd";
import { FormProps, FormItemProps, FormComponentProps } from "antd/lib/form";

export interface IXFormProps extends FormComponentProps {
  fields: Array<IField>,
  formProps?: FormProps,
  itemProps?: FormItemProps,
  btnsProps?: FormItemProps,
}

export interface IField {
  label: string,
  required?: boolean,
  id: string,
  initialValue: any,
  rules?: object[],
  view: ()=>JSX.Element,
  selfProps?: FormItemProps,
}

/**
 * 尽可能保持包装前的属性名
 */

function XForm(props: IXFormProps) {
  const FormItem = Form.Item;
  const { fields, form, formProps, itemProps, btnsProps } = props;
  const { getFieldDecorator } = form;
  return (
    <Form {...formProps} >
      {
        fields.map((field, index) => {
          return (
            <FormItem {...itemProps} {...field.selfProps} key={index} label={field.label} required={field.required || false} >
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
        })
      }
      <FormItem {...btnsProps}>
        <Button type="primary" htmlType="submit"> save </Button>
      </FormItem>
    </Form>
  )
}

const FormOrigin = Form.create<IXFormProps>()(XForm);

export default FormOrigin;
