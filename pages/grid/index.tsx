import React from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import { Row, Col, Slider } from "antd";
// import './index.css';

class Config {
  @observable gutters = [8, 16, 24, 32, 40, 48]
  @observable colCounts = [2, 3, 4, 6, 8, 12]
  @observable gutterKey = 1
  @observable colCountKey = 2
  @computed get colCount() {
    return this.colCounts[this.colCountKey]
  }
  @computed get gutterNum() {
    return this.gutters[this.gutterKey]
  }
  @action gutterChange(key) {
    this.gutterKey = key
  }
  @action colCountChange(key) {
    this.colCountKey = key
  }
}

const store = new Config()

@observer
export default class App extends React.Component {
  render() {
    const cols = []
    for (let i = 0; i < store.colCount; i++) {
      cols.push(
        <Col key={i} span={24/store.colCount}>
          <div>Column</div>
        </Col>
      )
    }
    function onGutterChange(e) {
      store.gutterChange(e)
    }
    function onColCountChange(e) {
      store.colCountChange(e)
    }
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 6 }}>Gutter (px): </span>
          <div style={{ width: '50%' }}>
            <Slider
              min={0}
              max={Object.keys(store.gutters).length - 1}
              value={store.gutterKey}
              onChange={onGutterChange.bind(this)}
              marks={store.gutters}
              step={null}
            />
          </div>
          <span style={{ marginRight: 6 }}>Column Count:</span>
          <div style={{ width: '50%' }}>
            <Slider
              min={0}
              max={Object.keys(store.colCounts).length - 1}
              value={store.colCountKey}
              onChange={onColCountChange.bind(this)}
              marks={store.colCounts}
              step={null}
            />
          </div>
        </div>
        <Row gutter={store.gutterNum}>{cols}</Row>
      </div>
    )


  }
}