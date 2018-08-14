import React from "react";
import {  Button, Input, Icon } from "antd";
import { FormVertical, FormHorizontal, FormInline, IField } from "components/form/formbase";
import PriceInput from "components/price";

export default () => {
  const checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  };
  const fields: Array<IField> = [
    {
      label: '自定义价格控件',
      id: 'customComponent',
      initialValue: { number: 0, currency: 'rmb' },
      required: true,
      rules: [{ validator: checkPrice }],
      view: () => { return <PriceInput /> },
    },
  ];
  const handleBusness = (val) => {
    console.log('Fn of busness get form of val: ', val)
  }
  return (
    <div>
      <FormInline fields={fields} busness={handleBusness} />
    </div>
  )
}
