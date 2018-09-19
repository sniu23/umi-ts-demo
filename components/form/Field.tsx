import React from "react";
import { Form, Col, Row } from 'antd';
import * as F from "antd/lib/form/Form";
import * as E from "antd/lib/form/FormItem";
import * as C from "antd/lib/grid/col";
import * as R from "antd/lib/grid/row";

declare type TimNum =  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

/** 接口:字段属性 */
export interface FieldProps {
  item: E.FormItemProps, // 定义 FormItem 属性
  view: () => React.ReactNode, // 定义呈现的组件
  opts?: F.GetFieldDecoratorOptions, // 定义 GetFieldDecorator 中 Options 属性（参考Antd Form）
  times?: TimNum, // 定义字段占默认列的列宽倍数
}

/** 接口：表单字段属性 */
export interface FormFieldProps {
  field: FieldProps, // 定义字段的属性
  form: F.WrappedFormUtils, // 暴露的表单实例
  colCol?: C.ColProps, // 定义字段的默认列属性
  lblCol?: C.ColProps, // 定义字段中标签的列属性
}

/** 接口：多个表单字段属性 */
export interface FormFieldListProps {
  fields: Array<FieldProps>, // 定义多个字段的属性
  form?: F.WrappedFormUtils, // 暴露的表单实例
  colCol?: C.ColProps, // 定义字段的默认列属性
  lblCol?: C.ColProps, // 定义字段中标签的列属性
  rowAtt?: R.RowProps, // 定义行属性
}

const FormItem = Form.Item

/**
 * 组件：定义一个表单字段，生成一个 FormItem
 */
const FieldView: React.SFC<FormFieldProps> = (props) => {
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

/**
 * 组件：定义一个表单字段数组，生成多个 FormItem
 */
export const FormFieldList: React.SFC<FormFieldListProps> = (props) => {
  const { fields, form } = props
  return (
    <>
      {
        fields.map((field, idx) => {
          return <FieldView key={idx} field={field} form={form} />
        })
      }
    </>
  )
}

/**
 * 组件：定义一个以列布局的表单字段数组，生成多个包裹 FormItem 的 Col
 */
export const GridFieldList: React.SFC<FormFieldListProps> = (props) => {
  const { colCol, lblCol, fields, form, rowAtt } = props
  return (
    <Row {...rowAtt} >
      {
        fields.map((field, idx) => {
          const { item, opts, view, times } = field
          const { getFieldDecorator } = form
          const {calcCol, calcLbl, calcWrp} = fnCalc(colCol, lblCol, times)
          return (
            <Col key={idx} {...calcCol} >
              <FormItem labelCol={calcLbl} wrapperCol={calcWrp} {...item}  >
              {
                getFieldDecorator(item.id, opts)(
                  view()
                )
              }
              </FormItem>
            </Col>
          )
        })
      }
    </Row>
  )
}

/** 计算字段的列布局函数 */
const fnCalc = (defCol?:C.ColProps, defLbl?:C.ColProps, times:TimNum=1):{calcCol:C.ColProps, calcLbl:C.ColProps, calcWrp:C.ColProps} => {
  let calcCol:C.ColProps = Object.assign({}, defCol)
  if (typeof defCol.span === 'number') calcCol.span = defCol.span*times>24 ? 24 : (defCol.span*times)
  if (typeof defCol.xs === 'number') calcCol.xs = (defCol.xs*times)>24 ? 24 : (defCol.xs*times)
  if (typeof defCol.sm === 'number') calcCol.sm = (defCol.sm*times)>24 ? 24 : (defCol.sm*times)
  if (typeof defCol.md === 'number') calcCol.md = (defCol.md*times)>24 ? 24 : (defCol.md*times)
  if (typeof defCol.lg === 'number') calcCol.lg = (defCol.lg*times)>24 ? 24 : (defCol.lg*times)
  if (typeof defCol.xl === 'number') calcCol.xl = (defCol.xl*times)>24 ? 24 : (defCol.xl*times)
  if (typeof defCol.xxl === 'number') calcCol.xxl = (defCol.xxl*times)>24 ? 24 : (defCol.xxl*times)

  let calcLbl:C.ColProps = Object.assign({}, defLbl)
  let calcWrp:C.ColProps = Object.assign({}, defLbl)
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

/**
 * 常量：用来按每行的列数来定义表单字段的列布局样式
 */
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