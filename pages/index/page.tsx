import React, { Component } from 'react';
import Link from 'umi/link';
import styles from './page.css';

class index extends React.Component {
  render() {
    return (
      <div className = {styles.normal}>
        <h2> index page </h2><br/>
        <Link to="/todos">Go to todos.html</Link><br/>
        <Link to="/todos2">Go to todos2.html</Link><br/>
        <Link to="/addNum">Go to addNum.html</Link><br/>
        <Link to="/addNum2">Go to addNum2.html</Link><br/>
        <Link to="/grid">Go to grid.html</Link><br/>
        <Link to="/enhance">Go to enhance.html</Link><br/>
        <Link to="/exmany">Go to exmany.html</Link><br/>
        <br/>
        <Link to="/formorigin">Go to formorigin.html</Link><br/>
        <Link to="/formbase/FormVertical">Go to FormVertical.html</Link><br/>
        <Link to="/formbase/FormHorizontal">Go to FormHorizontal.html</Link><br/>
        <Link to="/formbase/FormInline">Go to FormInline.html</Link><br/>
        <Link to="/formbase/FormCustom">Go to FormCustom.html</Link><br/>
        <br/>
        <Link to="/formgrid/grid">Go to FormGrid/grid.html</Link><br/>
        <Link to="/formgrid/trigger">Go to FormGrid/trigger.html</Link><br/>
        <Link to="/formgrid/modal">Go to FormGrid/modal.html</Link><br/>

      </div>
    )
  }
}

export default index;