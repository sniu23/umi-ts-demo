import * as React from "react";
import { observable, action, runInAction, autorun, reaction } from "mobx";
import { observer } from "mobx-react";
import { Select } from "antd";
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
      this.opts = resp.data
    })
  }
  print = autorun(() => {
    this.opts.map((o) => {
      console.log(o.key, o.label)
    })
  })
}

const store = new Store();

const Option = Select.Option

@observer
export default class Page extends React.Component {
  render() {
    const handleChange = (val) => {
      console.log(val)
    }
    const handleSearch = async (val) => {
      console.log(val)
      await store.find()
    }
    return (
      <div>
        <Select
          showSearch
          labelInValue
          style={{ width: 300 }}
          onChange={handleChange}
          onSearch={handleSearch}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
        >
        {
          store.opts.map((opt) => {
            return (
              <Option key={opt.key} >{opt.label}</Option>
            )
          })
        }
        </Select>
      </div>
    )
  }
}


