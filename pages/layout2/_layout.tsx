
import React from "react";
import router from "umi/router";
import { observer } from "mobx-react";
import withRouter from 'umi/withRouter';
import Redirect from "umi/redirect";
import fakeAuth from "components/route/FakeStore";

const AuthButton = observer((props) =>
    fakeAuth.isAuthenticated ? (
      <button
        onClick={() => {
          fakeAuth.signout()
          // router.push("/layout2")
        }}
      >
        Sign out
      </button>
    ) : (
      <p>You are not logged in.</p>
    )
  )

export default withRouter(observer((props) => {
  const to = {
    pathname: "/fakelogin",
    state: { from: props.location },
    hash: '',
    search: '',
  }
  return (
    <>
      <h1>Header from _layout </h1>
      <AuthButton />
      {
        fakeAuth.isAuthenticated ? props.children : <Redirect to={to} />
      }
    </>
  )
}))