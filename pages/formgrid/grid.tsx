import React from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import { Radio, Input } from "antd";
import FormGrid, { IFormGridField } from "../../components/form/FormGrid";

declare type FormLayoutHV = 'horizontal' | 'vertical'
declare type ColNum = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24 
declare type LblNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
declare type TimNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24

class Config {  
  @observable layout:FormLayoutHV = 'horizontal'
  @observable response:boolean = false
  @observable gutter:number = 8
  @observable colSpan:ColNum = 6
  @observable lableSpan:LblNum = 12
  @observable times:TimNum = 1
  
  @observable layouts = [
    { label: 'horizontal', value: 'horizontal' }, { label: 'vertical', value: 'vertical' },
  ]
  @observable responses = [
    { label: 'true', value: true }, { label: 'false', value: false },
  ]
  @computed get gutters() {
    return (
      (this.layout==='vertical') ? [
        {label:'0',value:0},{label:'8',value:8},{label:'16',value:16},{label:'32',value:32},
      ] : [
        {label:'0',value:0}
      ]
    )
  }
  @computed get colSpans() {
    return (
      (this.response) ? [
        {label:'6',value:6},
      ] : [
        {label:'24',value:24},{label:'12',value:12},{label:'8',value:8},{label:'6',value:6},
        {label:'4',value:4},{label:'3',value:3},{label:'2',value:2},{label:'1',value:1},
      ]
    )
  }
  @computed get lableSpans() {
    return (
      (this.layout==='horizontal') ? (
        (this.response) ? [
          {label:'6',value:6},{label:'12',value:12},{label:'18',value:18},
        ] : (
          [
            {label:'0',value:0,disabled:(0%(24/this.colSpan)!==0)},{label:'1',value:1,disabled:(1%(24/this.colSpan)!==0)},{label:'2',value:2,disabled:(2%(24/this.colSpan)!==0)},{label:'3',value:3,disabled:(3%(24/this.colSpan)!==0)},
            {label:'4',value:4,disabled:(4%(24/this.colSpan)!==0)},{label:'5',value:5,disabled:(5%(24/this.colSpan)!==0)},{label:'6',value:6,disabled:(6%(24/this.colSpan)!==0)},{label:'7',value:7,disabled:(7%(24/this.colSpan)!==0)},
            {label:'8',value:8,disabled:(8%(24/this.colSpan)!==0)},{label:'9',value:9,disabled:(9%(24/this.colSpan)!==0)},{label:'10',value:10,disabled:(10%(24/this.colSpan)!==0)},{label:'11',value:11,disabled:(11%(24/this.colSpan)!==0)},
            {label:'12',value:12,disabled:(12%(24/this.colSpan)!==0)},{label:'13',value:13,disabled:(13%(24/this.colSpan)!==0)},{label:'14',value:14,disabled:(14%(24/this.colSpan)!==0)},{label:'15',value:15,disabled:(15%(24/this.colSpan)!==0)},
            {label:'16',value:16,disabled:(16%(24/this.colSpan)!==0)},{label:'17',value:17,disabled:(17%(24/this.colSpan)!==0)},{label:'18',value:18,disabled:(18%(24/this.colSpan)!==0)},{label:'19',value:19,disabled:(19%(24/this.colSpan)!==0)},
            {label:'20',value:20,disabled:(20%(24/this.colSpan)!==0)},{label:'21',value:21,disabled:(21%(24/this.colSpan)!==0)},{label:'22',value:22,disabled:(22%(24/this.colSpan)!==0)},{label:'23',value:23,disabled:(23%(24/this.colSpan)!==0)},
          ]
        )
      ) : []
    )
  }
  @computed get timess() {
    let timess = []
    if (this.response) {
      if (this.layout==='horizontal') {
        timess = [
          {label:'1',value:1},{label:'2',value:2},{label:'3',value:3},
        ]
      } else {
        timess = [
          {label:'1',value:1},{label:'2',value:2},{label:'3',value:3},{label:'4',value:4},
          {label:'6',value:6},{label:'7',value:7},{label:'8',value:8},
        ]
      }
    } else {
      switch (this.colSpan) {
        case 24:
          timess = [
            {label:'1',value:1},
          ]
          break;
        case 12:
          timess = [
            {label:'1',value:1},{label:'2',value:2},
          ]
          break;
        case 8:
          timess = [
            {label:'1',value:1},{label:'3',value:3},
          ]
          break;
        case 6:
          timess = [
            {label:'1',value:1},{label:'2',value:2},{label:'4',value:4},
          ]
          break;
        case 4:
          timess = [
            {label:'1',value:1},{label:'2',value:2},{label:'3',value:3},{label:'6',value:6},
          ]
          break;
        case 3:
          timess = [
            {label:'1',value:1},{label:'2',value:2},{label:'4',value:4},{label:'8',value:8},
          ]
          break;
        case 2:
          timess = [
            {label:'1',value:1},{label:'2',value:2},{label:'3',value:3},{label:'4',value:4},
            {label:'6',value:6},{label:'12',value:12},
          ]
          break;
        case 1:
          timess = [
            {label:'1',value:1},{label:'2',value:2},{label:'3',value:3},{label:'4',value:4},
            {label:'5',value:5},{label:'6',value:6},{label:'7',value:7},{label:'8',value:8},
            {label:'9',value:9},{label:'10',value:10},{label:'11',value:11},{label:'12',value:12},
            {label:'13',value:13},{label:'14',value:14},{label:'15',value:15},{label:'16',value:16},
            {label:'17',value:17},{label:'18',value:18},{label:'19',value:19},{label:'20',value:20},
            {label:'21',value:21},{label:'22',value:22},{label:'23',value:23},{label:'24',value:24},
          ]
          break;  
        default:
          break;
      }
    }
    return timess
  }

  @action layoutChange(val) {
    this.layout = val
  }
  @action responseChange(val) {
    this.response = val
  }
  @action gutterChange(val) {
    this.gutter = val
  }
  @action colSpanChange(val) {
    this.colSpan = val
  }
  @action lableSpanChange(val) {
    this.lableSpan = val
  }
  @action timesChange(val) {
    this.times = val
  }
}

const store = new Config()
const RadioGroup = Radio.Group

@observer
export default class App extends React.Component {
  render() {
    function onlayoutChange(e) {
      store.layoutChange(e.target.value)
    }
    function onresponseChange(e) {
      store.responseChange(e.target.value)
    }
    function ongutterChange(e) {
      store.gutterChange(e.target.value)
    }
    function oncolSpanChange(e) {
      store.colSpanChange(e.target.value)
    }
    function onlableSpanChange(e) {
      store.lableSpanChange(e.target.value)
    }function ontimesChange(e) {
      store.timesChange(e.target.value)
    }
    const fields = []
    let t = 0;
    for (let i = 0; i < 24; i++) {

      const field:IFormGridField = {
        id: 'idx'+i.toString(),
        label: 'field'+i,
        initialValue: i+1,
        view: () => <Input />,
        times: ((i === 0) && (store.times !== 1)) ? store.times : 1
      }
      fields.push(field)
    }
    return (
      <div>
        <div>
          <span>layout:  </span>
          <RadioGroup options={store.layouts} onChange={onlayoutChange} value={store.layout} />
        </div>
        <div>
          <span>response:  </span>
          <RadioGroup options={store.responses} onChange={onresponseChange} value={store.response} />
        </div>
        <div>
          <span>gutter:  </span>
          <RadioGroup options={store.gutters} onChange={ongutterChange} value={store.gutter} />
        </div>
        <div>
          <span>colSpan:  </span>
          <RadioGroup options={store.colSpans} onChange={oncolSpanChange} value={store.colSpan} />
        </div>
        <div>
          <span>lableSpan:  </span>
          <RadioGroup options={store.lableSpans} onChange={onlableSpanChange} value={store.lableSpan} />
        </div>
        <div>
          <span>times:  </span>
          <RadioGroup options={store.timess} onChange={ontimesChange} value={store.times} />
        </div>
        <br/>
        <div style={{padding: 16, borderStyle: 'solid', borderWidth: '5px', }} >
          <FormGrid 
            fields={fields}
            layout={store.layout}
            response={store.response}
            gutter={store.gutter}
            colSpan={store.colSpan}
            lableSpan={store.lableSpan} 
          />
        </div>
      </div>
    )
  }
}