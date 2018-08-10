import React from "react";
import { Form, Col } from 'antd';
import { FormItemProps } from "antd/lib/form/FormItem";
import { ColProps, ColSize } from "antd/lib/grid/col";

declare type GetFieldDecoratorOptions = {
  /** 子节点的值的属性，如 Checkbox 的是 'checked' */
  valuePropName?: string;
  /** 子节点的初始值，类型、可选值均由子节点决定 */
  initialValue?: any;
  /** 收集子节点的值的时机 */
  trigger?: string;
  /** 可以把 onChange 的参数转化为控件的值，例如 DatePicker 可设为：(date, dateString) => dateString */
  getValueFromEvent?: (...args: any[]) => any;
  /** 校验子节点值的时机 */
  validateTrigger?: string | string[];
  /** 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) */
  rules?: ValidationRule[];
  /** 是否和其他控件互斥，特别用于 Radio 单选控件 */
  exclusive?: boolean;
  /** Normalize value to form component */
  normalize?: (value: any, prevValue: any, allValues: any) => any;
  /** Whether stop validate on first rule of error for this field.  */
  validateFirst?: boolean;
};

declare type ValidationRule = {
  /** validation error message */
  message?: string;
  /** built-in validation type, available options: https://github.com/yiminghe/async-validator#type */
  type?: string;
  /** indicates whether field is required */
  required?: boolean;
  /** treat required fields that only contain whitespace as errors */
  whitespace?: boolean;
  /** validate the exact length of a field */
  len?: number;
  /** validate the min length of a field */
  min?: number;
  /** validate the max length of a field */
  max?: number;
  /** validate the value from a list of possible values */
  enum?: string | string[];
  /** validate from a regular expression */
  pattern?: RegExp;
  /** transform a value before validation */
  transform?: (value: any) => any;
  /** custom validate function (Note: callback must be called) */
  validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any;
};

declare type WrappedFormUtils = {
  /** 获取一组输入控件的值，如不传入参数，则获取全部组件的值 */
  getFieldsValue(fieldNames?: Array<string>): Object;
  /** 获取一个输入控件的值*/
  getFieldValue(fieldName: string): any;
  /** 设置一组输入控件的值*/
  setFieldsValue(obj: Object): void;
  /** 设置一组输入控件的值*/
  setFields(obj: Object): void;
  /** 校验并获取一组输入域的值与 Error */
  validateFields(fieldNames: Array<string>, options: Object, callback: ValidateCallback): void;
  validateFields(fieldNames: Array<string>, callback: ValidateCallback): void;
  validateFields(options: Object, callback: ValidateCallback): void;
  validateFields(callback: ValidateCallback): void;
  validateFields(): void;
  /** 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 */
  validateFieldsAndScroll(fieldNames?: Array<string>, options?: Object, callback?: ValidateCallback): void;
  validateFieldsAndScroll(fieldNames?: Array<string>, callback?: ValidateCallback): void;
  validateFieldsAndScroll(options?: Object, callback?: ValidateCallback): void;
  validateFieldsAndScroll(callback?: ValidateCallback): void;
  validateFieldsAndScroll(): void;
  /** 获取某个输入控件的 Error */
  getFieldError(name: string): Object[];
  getFieldsError(names?: Array<string>): Object;
  /** 判断一个输入控件是否在校验状态*/
  isFieldValidating(name: string): boolean;
  isFieldTouched(name: string): boolean;
  isFieldsTouched(names?: Array<string>): boolean;
  /** 重置一组输入控件的值与状态，如不传入参数，则重置所有组件 */
  resetFields(names?: Array<string>): void;
  getFieldDecorator(id: string, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
};

declare type ValidateCallback = (errors: any, values: any) => void;

const FormItem = Form.Item;

export interface IFieldProps {
  item?: FormItemProps,
  opts?: GetFieldDecoratorOptions,
  view?: () => React.ReactNode,
  times?: TimNum, 
}

export interface IFormFieldProps {
  field?: IFieldProps,
  form?: WrappedFormUtils,
  colCol?: ColProps,
  lblCol?: ColProps,
}

/** 字段数据对象生成 一个FormItem */
export const FormField = (props:IFormFieldProps) => {
  const { field, form } = props
  const { item, opts, view } = field
  const { getFieldDecorator } = form
  return (
    <FormItem {...item} >
    {
      getFieldDecorator(item.id, opts)(
        view()
      )
    }
    </FormItem>
  )
}

export interface IFormFieldListProps {
  fields?: Array<IFieldProps>
  form?: WrappedFormUtils,
  colCol?: ColProps,
  lblCol?: ColProps,
}

/** 字段数据数组 生成 多个FormItem */
export const FormFieldList = (props:IFormFieldListProps) => {
  const { fields, form } = props
  const children = []
  for (let i = 0; i < fields.length; i++) {
    children.push(
      <FormField key={i} field={fields[i]} form={form} />
    )
  }
  return children
}

declare type TimNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24

const fnCalc = (defCol?:ColProps, defLbl?:ColProps, times:TimNum=1):{calcCol:ColProps, calcLbl:ColProps, calcWrp:ColProps} => {
  let calcCol:ColProps = Object.assign({}, defCol)
  if (typeof defCol.span === 'number') calcCol.span = defCol.span*times>24 ? 24 : (defCol.span*times)
  if (typeof defCol.xs === 'number') calcCol.xs = (defCol.xs*times)>24 ? 24 : (defCol.xs*times)
  if (typeof defCol.sm === 'number') calcCol.sm = (defCol.sm*times)>24 ? 24 : (defCol.sm*times)
  if (typeof defCol.md === 'number') calcCol.md = (defCol.md*times)>24 ? 24 : (defCol.md*times)
  if (typeof defCol.lg === 'number') calcCol.lg = (defCol.lg*times)>24 ? 24 : (defCol.lg*times)
  if (typeof defCol.xl === 'number') calcCol.xl = (defCol.xl*times)>24 ? 24 : (defCol.xl*times)
  if (typeof defCol.xxl === 'number') calcCol.xxl = (defCol.xxl*times)>24 ? 24 : (defCol.xxl*times)

  let calcLbl:ColProps = Object.assign({}, defLbl)
  let calcWrp:ColProps = Object.assign({}, defLbl)
  if (defLbl) {
    if (typeof defLbl.span === 'number') {
      calcLbl.span = (defCol.span===24) ? defLbl.span : defLbl.span/times
      calcWrp.span = (24 - calcLbl.span)
    }
    if (typeof defLbl.xs === 'number') {
      calcLbl.xs = (defCol.xs===24) ? defLbl.xs : defLbl.xs/times
      calcWrp.xs = 24 - calcLbl.xs
    }
    if (typeof defLbl.sm === 'number') {
      calcLbl.sm = (defCol.sm===24) ? defLbl.sm : defLbl.sm/times
      calcWrp.sm = 24 - calcLbl.sm
    }
    if (typeof defLbl.md === 'number') {
      calcLbl.md = (defCol.md===24) ? defLbl.md : defLbl.md/times
      calcWrp.md = 24 - calcLbl.md
    }
    if (typeof defLbl.lg === 'number') {
      calcLbl.lg = (defCol.lg===24) ? defLbl.lg : defLbl.lg/times
      calcWrp.lg = 24 - calcLbl.lg
    }
    if (typeof defLbl.xl === 'number') {
      calcLbl.xl = (defCol.xl===24) ? defLbl.xl : defLbl.xl/times
      calcWrp.xl = 24 - calcLbl.xl
    }
    if (typeof defLbl.xxl === 'number') {
      calcLbl.xxl = (defCol.xxl  ===24) ? defLbl.xxl  : defLbl.xxl/times
      calcWrp.xxl = 24 - calcLbl.xxl
    }
  }
  return {calcCol, calcLbl, calcWrp}
}

/** 字段数据对象生成 一个 Col 包装的 FormItem */
export const FormGridField = (props:IFormFieldProps) => {
  const { colCol, lblCol, field, form } = props
  const { item, opts, view, times } = field
  const { getFieldDecorator } = form

  const {calcCol, calcLbl, calcWrp} = fnCalc(colCol, lblCol, times)

  return (
    <Col {...calcCol} >
      <FormItem labelCol={calcLbl} wrapperCol={calcWrp} {...item}  >
      {
        getFieldDecorator(item.id, opts)(
          view()
        )
      }
      </FormItem>
    </Col>
  )
}

/** 字段数据数组 生成 多个 Col 包装的 FormItem */
export const FormGridFieldList = (props:IFormFieldListProps) => {
  const { colCol, lblCol, fields, form } = props
  const children = []
  for (let i = 0; i < fields.length; i++) {
    children.push(
      <FormGridField key={i} field={fields[i]} form={form} colCol={colCol} lblCol={lblCol} />
    )
  }
  return children
}

/**========================================================================= */

/** 按列数来选择 */
export const COLS = {
  /** 响应式 */
  RESP: {
    /** 可变幻6列 */
    _6: {
      COL: {xs:24, sm:12, md:8, lg: 6, xl: 4, xxl: 3,},
      LBLS: {
        '0/24': {xs:0, sm:0, md:0, lg: 0, xl: 0, xxl: 0,},
      },
      TIMS: {
        X1: 1,
        X2: 2,
        X3: 3,
        X4: 4,
        X6: 6,
        X8: 8,
      },
    },
    /** 可变幻3列 */
    _3: {
      COL: {xs:24, sm:24, md:12,lg: 12,xl: 8, xxl: 8,},
      LBLS: {
        '0/24': {xs:0, sm:0, md:0, lg: 0, xl: 0, xxl: 0,},
        '6/24': {xs:6, sm:6, md:6,lg: 6,xl: 6, xxl: 6,},
        '12/24': {xs:12, sm:12, md:12,lg: 12,xl: 12, xxl: 12,},
        '18/24': {xs:18, sm:18, md:18,lg: 18,xl: 18, xxl: 18,},
      },
      TIMS: {
        X1: 1,
        X2: 2,
        X3: 3,
      },
    }
  },
  /** 固定列数 */
  FIX:  {
  /** 固定n列 */
    _1: {
      COL: {span:24},
      LBLS: {
        '0/24': {span:0},
        '1/24': {span:1},
        '2/24': {span:2},
        '3/24': {span:3},
        '4/24': {span:4},
        '5/24': {span:5},
        '6/24': {span:6},
        '7/24': {span:7},
        '8/24': {span:8},
        '9/24': {span:9},
        '10/24': {span:10},
        '11/24': {span:11},
        '12/24': {span:12},
        '13/24': {span:13},
        '14/24': {span:14},
        '15/24': {span:15},
        '16/24': {span:16},
        '17/24': {span:17},
        '18/24': {span:18},
        '19/24': {span:19},
        '20/24': {span:20},
        '21/24': {span:21},
        '22/24': {span:22},
        '23/24': {span:23},
      },
      TIMS: {
        X1: 1,
      },
    },
    _2: {
      COL: {span:12},
      LBLS: {
        '0/24': {span:0},
        '2/24': {span:2},
        '4/24': {span:4},
        '6/24': {span:6},
        '8/24': {span:8},
        '10/24': {span:10},
        '12/24': {span:12},
        '14/24': {span:14},
        '16/24': {span:16},
        '18/24': {span:18},
        '20/24': {span:20},
        '22/24': {span:22},
      },
      TIMS: {
        X1: 1,
        X2: 2,
      },
    },
    _3: {
      COL: {span:8},
      LBLS: {
        '0/24': {span:0},
        '3/24': {span:3},
        '6/24': {span:6},
        '9/24': {span:9},
        '12/24': {span:12},
        '15/24': {span:15},
        '18/24': {span:18},
        '21/24': {span:21},
      },
      TIMS: {
        X1: 1,
        X3: 3,
      },
    },
    _4: {
      COL: {span:6},
      LBLS: {
        '0/24': {span:0},
        '4/24': {span:4},
        '8/24': {span:8},
        '12/24': {span:12},
        '16/24': {span:16},
        '20/24': {span:20},
      },
      TIMS: {
        X1: 1,
        X2: 2,
        X4: 4,
      },
    },
    _6: {
      COL: {span:4},
      LBLS: {
        '0/24': {span:0},
        '6/24': {span:6},
        '12/24': {span:12},
        '18/24': {span:18},
      },
      TIMS: {
        X1: 1,
        X2: 2,
        X3: 3,
        X6: 6,
      },
    },
    _8: {
      COL: {span:3},
      LBLS: {
        '0/24': {span:0},
        '8/24': {span:8},
        '16/24': {span:16},
      },
      TIMS: {
        X1: 1,
        X2: 2,
        X4: 4,
        X8: 8,
      },
    },
    _12: {
      COL: {span:2},
      LBLS: {
        '0/24': {span:0},
        '12/24': {span:12},
      },
      TIMS: {
        X1: 1,
        X2: 2,
        X3: 3,
        X4: 4,
        X6: 6,
        X12: 12,
      },
    },
    _24: {
      COL: {span:1},
      LBLS: {
        '0/24': {span:0},
      },
      TIMS: {
        X1: 1,
        X2: 2,
        X3: 3,
        X4: 4,
        X5: 5,
        X6: 6,
        X7: 7,
        X8: 8,
        X9: 9,
        X10: 10,
        X11: 11,
        X12: 12,
        X13: 13,
        X14: 14,
        X15: 15,
        X16: 16,
        X17: 17,
        X18: 18,
        X19: 19,
        X20: 20,
        X21: 21,
        X22: 22,
        X23: 23,
        X24: 24,
      },
    },
  }
}

export default FormField
