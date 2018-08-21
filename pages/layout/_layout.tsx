
import React from "react";

export default (props) => {
  return (
    <>
      <h1>Header from _layout </h1>
      {
        props.children
      }
    </>
  )
}