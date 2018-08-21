import React from "react";
import { Route } from 'react-router-dom';

export default (args) => {
  const { render, ...rest } = args;
  return (
    <Route
      {...rest}
      render={props =>
        <div>
          <h1>PrivateRoute Header</h1>
          {
            render(props)
          }
        </div>
      }
    />
  )
}
