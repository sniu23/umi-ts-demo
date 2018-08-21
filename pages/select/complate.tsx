import * as React from "react";
import { observable, action, runInAction, autorun } from "mobx";
import { observer } from "mobx-react";
import { Icon, Input, AutoComplete } from "antd";
import './complate.css'
import axios from 'axios';

interface Iopt {
  key: string,
  label: string,
}

class Store {
  @observable opts:Array<Iopt> = [];
  @action find = async () => {
    const resp = await axios.get('http://localhost:8000/suggest')
    runInAction(() => {
      this.opts = resp.data.data
    })
  }
  // print = autorun(() => {
  //   this.opts.map((o) => {
  //     console.log(o.key, o.label)
  //   })
  // })
}

const store = new Store();

store.find().then(() => {
  // console.log('async fn finish.')
})

const Option = AutoComplete.Option

@observer
export default class Page extends React.Component {
  render() {
    const options = store.opts.map((opt, idx) => {
      return (
        <Option key={opt.key} value={opt.key} >
          {opt.label}
          <span className="complate-demo-item-desc" >{opt.key}</span>
        </Option>
      )
    }).concat([
      <Option disabled key="all">
        <span>
          <a
            style={{ float: 'right' }}
            href="https://www.baidu.com"
            target="_blank"
          >
            百度一下
          </a>
        </span>
      </Option>,
    ])
    const handleChange = (val) => {
      console.log(val)
    }
    return (
      <div>
        <AutoComplete
          dropdownClassName="complate-demo-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 250 }}
          style={{ width: 200 }}
          dataSource={options}
          optionLabelProp="value"
          placeholder="input here"
          onChange={handleChange}
          defaultActiveFirstOption={false}
          filterOption={false}
        >
          <Input suffix={<Icon type="search" />} />
        </AutoComplete>
      </div>
    )
  }
}


