import * as React from "react";
import { observable, action, runInAction, autorun } from "mobx";
import { observer } from "mobx-react";
import { Icon, Input, AutoComplete, Pagination, Select } from "antd";
import './complate.css'
import axios from 'axios';

interface Iopt {
  key: string,
  label: string,
}

class Store {
  @observable opts:Array<Iopt> = [];
  @action find = async () => {
    const resp = await axios.get('http://localhost:8000/suggest2')
    runInAction(() => {
      this.opts = resp.data.data
      this.pgTotal = resp.data.total
    })
  }
  // print = autorun(() => {
  //   this.opts.map((o) => {
  //     console.log(o.key, o.label)
  //   })
  // })
  @observable pgCurr = 1;
  @observable pgTotal= 0;
  @action pgChange = async(pgCurr) => {
    await this.find()
    runInAction(() => {
      this.pgCurr = pgCurr
    })
  }
}

const store = new Store();

store.find().then(() => {
  console.log('async axios action finish.')
})

const Option = AutoComplete.Option

@observer
export default class Page extends React.Component {
  render() {
    const handlePageChange = async (val) => {
      await store.pgChange(val)
      console.log(`Page Change: ${val}`)
    }
    const options = store.opts.map((opt, idx) => {
      return (
        <Option key={idx} value={opt.key} >
          {opt.label}
          <span className="complate-demo-item-desc" >{opt.key}</span>
        </Option>
      )
    }).concat([
      <Option disabled key="all">
        <Pagination 
          size="small" 
          current={store.pgCurr} 
          total={store.pgTotal}
          onChange={handlePageChange} 
          style={{ float: 'right' }}
        />
      </Option>,
    ])
    const handleFocus = () => {
      console.log(`onFocus`)
    }
    const handleBlur = () => {
      console.log(`onBlur`)
    }
    const handleSelect = (val) => {
      console.log(`onSelect: ${val}`)
    }
    const handleSearch = (val) => {
      console.log(`onSearch: ${val}`)
    }
    return (
      <div>
        <Select
          showSearch
          dropdownClassName="complate-demo-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 250 }}
          style={{ width: 200 }}
          optionLabelProp="value"
          placeholder="input here"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSelect={handleSelect}
          onSearch={handleSearch}
          defaultActiveFirstOption={false}
          filterOption={false}
        >
          {options}
        </Select>
      </div>
    )
  }
}


