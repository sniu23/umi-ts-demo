import * as React from "react";
import { Pagination, Select } from "antd";
import SelectPaged from "components/select/SelectPaged2";

import axios from 'components/axios';

const fetch = async ({v, p}) => {
  const resp = await axios.get(`suggest2Err?v=${v}&p=${p}`)
  return resp.data
}

export default () => {
  return (
    <SelectPaged 
      fetch={fetch} 
      pageSize={10}
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: 250 }}
      style={{ width: 200 }}
    />
  )
}
