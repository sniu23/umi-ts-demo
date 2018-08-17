import React from "react";
import { Select, Pagination, Spin } from "antd";
import { SelectProps } from "antd/lib/select";
import './SelectPaged.css';

const Option = Select.Option

interface DictProps {
  key?: string,
  label?: string,
}

interface FetchProps {
  data?: Array<DictProps>,
  total?: number,
}

interface SearchProps {
  v?: string,
  p?: number,
}

interface SelectPagedProps extends SelectProps {
  fetch?: (searh:SearchProps, callback?:(err:Error, value:Array<DictProps>)=>void) => Promise<FetchProps>,
  pageSize?: number,
}

interface SelectPagedState {
  readonly dict?: Array<DictProps>,
  readonly current?: number,
  readonly total?: number,
  readonly loading?: boolean,
}

export default class SelectPaged extends React.Component<SelectPagedProps, SelectPagedState> {
  state: SelectPagedState = {
    dict: [],
    total: 0,
    current: 1,
    loading: false,
  }
  handleFocus = async () => {
    this.setState({ loading: true })
    const remote = await this.props.fetch({ p:1 })
    this.setState({ dict: remote.data, total: remote.total, current: 1, loading: false })
    // console.log(`onFocus`)
  }
  handleBlur = () => {
    this.setState({ dict: [], total: 0, current: 1, loading: false })
    // console.log(`onBlur`)
  }
  timeout
  handleSearch = (val) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null
    }
    const curr = val
    const searching = async () => {
      if (curr === val) {
        this.setState({ loading: true })
        const remote = await this.props.fetch({ v:val })
        this.setState({ dict: remote.data, total: remote.total, current: 1, loading: false })
      }
    }
    this.timeout = setTimeout(searching, 300)
    // console.log(`onSearch: ${val}`)
  }
  handlePageChange = async (val) => {
    this.setState({ loading: true })
    const remote = await this.props.fetch({ v:val })
    this.setState({ dict: remote.data, total: remote.total, current: val, loading: false })
    // console.log(`Page Change: ${val}`)
  }
  render() {
    const size = this.props.pageSize || 10
    const options = (this.state.total > size) ?
      this.state.dict.map((opt) => {
        return (
          <Option key={opt.key} value={opt.key} >
            {opt.label}
            <span className="select-paged-item-desc" >{opt.key}</span>
          </Option>
        )
      }).concat([
        <Option disabled key="all">
          <Pagination 
            size="small"
            pageSize={this.props.pageSize || 10}
            current={this.state.current}
            total={this.state.total}
            onChange={this.handlePageChange} 
            style={{ float: 'right' }}
          />
        </Option>,
      ])
    : this.state.dict.map((opt, idx) => {
        return (
          <Option key={idx} value={opt.key} >
            {opt.label}
            <span className="select-paged-item-desc" >{opt.key}</span>
          </Option>
        )
      })

    return (
      <Select
          showSearch
          dropdownClassName="select-paged-dropdown"
          dropdownMatchSelectWidth={true}
          optionLabelProp="value"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onSearch={this.handleSearch}
          defaultActiveFirstOption={false}
          filterOption={false}
          notFoundContent={this.state.loading ? <Spin size="small" /> : null}
          style={{ width: '100%' }}
          {...this.props}
        >
          {options}
        </Select>
    )
  }
}