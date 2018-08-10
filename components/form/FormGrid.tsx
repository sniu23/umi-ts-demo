
import React, { Children } from "react";
import { Form, Row, Col } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ColProps } from "antd/lib/grid/col";

declare type FormLayoutHV = 'horizontal' | 'vertical'

declare type ColNum = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24 
declare type LblNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
declare type TimNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24

export interface IFormGridProps extends FormComponentProps {
  fields: Array<IFormGridField>,
  layout?: FormLayoutHV,
  response?: boolean,
  classForm?: string,
  classItem?: string,
  gutter?:number,
  colSpan?:ColNum,
  lableSpan?:LblNum,
  children?: (form: any) => React.ReactNode;
}

export interface IFormGridField {
  label?: string,
  required?: boolean,
  id: string,
  initialValue: any,
  rules?: object[],
  view: Function,
  className?: string,
  times?:TimNum,
}

const fnFixCol = (span:ColNum, times:TimNum=1):ColProps => {
  return {
    span: (span*times)>24 ? 24: (span*times)
  }
}

const fnFixLabel = (span:LblNum, times:TimNum=1):ColProps => {
  return {
    span: span/times,
  }
}

const fnFixWrapper = (span:LblNum, times:TimNum=1):ColProps => {
  return {
    span: 24-span/times,
  }
}

const fnRespCol = (xs:ColNum, sm:ColNum, md:ColNum, lg:ColNum, xl:ColNum, xxl:ColNum, times:TimNum=1):ColProps => {
  return {
    xs: {span: (xs*times)>24 ? 24: xs*times},
    sm: {span: (sm*times)>24 ? 24: sm*times},
    md: {span: (md*times)>24 ? 24: md*times},
    lg: {span: (lg*times)>24 ? 24: lg*times},
    xl: {span: (xl*times)>24 ? 24: xl*times},
    xxl: {span: (xxl*times)>24 ? 24: xxl*times},
  }
}

const fnRespLable = (span:LblNum, times:TimNum=1):ColProps => {
  if (times>3) times = 3
  return {
    xs: {span: span},
    sm: {span: span},
    md: {span: span/times},
    lg: {span: span/times},
    xl: {span: span/times},
    xxl: {span: span/times},
  }
}

const fnRespWrapper = (span:LblNum, times:TimNum=1):ColProps => {
  if (times>3) times = 3
  return {
    xs: {span: 24-span},
    sm: {span: 24-span},
    md: {span: 24-span/times},
    lg: {span: 24-span/times},
    xl: {span: 24-span/times},
    xxl: {span: 24-span/times},
  }
}

const FormItem = Form.Item

/**
 * 使用Grid包裹的表单
 * fields: 表单项内容
 * layout: 标签垂直/水平布局
 * response: 格栅是否支持响应式(默认支持)
 * gutter: 格栅间距(标签水平布局下：默认为0)
 * colSpan: 非响应式格栅下指定列宽(响应式格栅无需指定)
 * lableSpan: 标签水平布局下指定标签占列(标签垂直布局无需指定)
 * times: 个别表单项列宽加倍的倍数
 * 
 * A.响应式格栅
 *    1.标签垂直布局
 *        列数随视图自动转换为： 1/2/3/4/6/8列，可指定个别列列宽加倍：2/3/4/6/8倍
 *    2.标签水平布局
 *        列数随视图自动转换为： 1/2/3列，可指定个别列列宽加倍：2/3倍，标签占列宽可指定为：6/12/18（即:分别占比1/4,1/2,3/4）
 * B.非响应式格栅
 *    a.需指定列宽： 24/12/8/6/4/3/2/1, 对应视图列数为：1/2/3/4/6/8/12/24
 *    b.标签水平布局下默认标签占列宽12, 允许值为列数的倍数，且不大于列宽
 *    c.个别列列宽加倍，允许值为：1/2/3/4/6/8/12，且不能大于列数
 * 
 *    指定列宽    对应列数    允许标签占列宽                  列宽加倍允许倍数
 *    24        1          0-24                          1
 *    12        2          0/2/4/6/8/12/14/16/18/20/22   1/2
 *    8         3          0/3/6/9/12/15/18/21           1/3
 *    6         4          0/4/8/12/16/20                1/2/4
 *    4         6          0/6/12/18                     1/2/3/6
 *    3         8          0/8/16                        1/2/4/8
 *    2         12         0/12                          1/2/3/4/6/12 
 *    1         24         0                             1-24 
 *
 */

export class GridForm extends React.Component<IFormGridProps> {
  constructor(props) {
    super(props)
  }
  render() {
    const { form, fields, response=false, layout='horizontal', classForm, classItem, children} = this.props
    const { getFieldDecorator, validateFields } = form
    
    let { gutter=8, colSpan=6, lableSpan=12 } = this.props
    if (layout === 'horizontal') gutter = 0
    let xs:ColNum, sm:ColNum, md:ColNum, lg:ColNum, xl:ColNum, xxl:ColNum
    if (response) {
      if (layout === 'horizontal') {
        xs = 24
        sm = 24
        md = 12
        lg = 12
        xl = 8
        xxl= 8
      } else {
        xs = 24
        sm = 12
        md = 8
        lg = 6
        xl = 4
        xxl= 3
      }
    }
    
    return (
      <Form layout={layout} className={classForm} >
        <Row gutter={gutter} >
          {
            fields.map((field, index) => {
              let colCol:ColProps, labelCol:ColProps, wrapperCol:ColProps
              if (layout === 'horizontal') {
                labelCol = (response) ? fnRespLable(lableSpan, field.times) : fnFixLabel(lableSpan, field.times)
                wrapperCol = (response) ? fnRespWrapper(lableSpan, field.times) : fnFixWrapper(lableSpan, field.times)
              }
              colCol = (response) ? fnRespCol(xs, sm, md, lg, xl, xxl, field.times) : fnFixCol(colSpan, field.times)
              return (
                <Col key={index} {...colCol} >
                  <FormItem
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    className={field.className || classItem }
                    label={field.label}
                    required={field.required}
                  >
                    {
                      getFieldDecorator(field.id, {
                        initialValue: field.initialValue,
                        rules: field.rules || [],
                      })(
                        field.view()
                      )
                    }
                  </FormItem>
                </Col>
              )
            })
          }
        </Row>
          { children && children(form) }
      </Form>
    )
  }
}

const FormGrid = Form.create<IFormGridProps>()(GridForm)

export default FormGrid

export const FormHorizontalResp = props => <FormGrid layout="horizontal" response {...props} />
export const FormVerticalResp = props => <FormGrid layout="vertical" response {...props} />
export const FormCol1 = props => <FormGrid colSpan={24} {...props} />
export const FormCol2 = props => <FormGrid colSpan={12} {...props} />
export const FormCol3 = props => <FormGrid colSpan={8} {...props} />
export const FormCol4 = props => <FormGrid colSpan={6} {...props} />
export const FormCol6 = props => <FormGrid colSpan={4} {...props} />
export const FormCol8 = props => <FormGrid colSpan={3} {...props} />
export const FormCol12 = props => <FormGrid colSpan={2} {...props} />
export const FormCol24 = props => <FormGrid colSpan={1} {...props} />