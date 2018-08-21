import React from "react";
import { RouteProps } from 'react-router-dom';
import { observer } from "mobx-react";
import withRouter from "umi/withRouter";
import Redirect from "umi/redirect";
import fakeAuth from "components/route/FakeStore";

interface FakeLoginState {
  readonly redirectToReferrer: boolean,
}

// https://reacttraining.com/react-router/web/example/auth-workflow
@observer
class Login extends React.Component<RouteProps, FakeLoginState> {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate()
    this.setState({ redirectToReferrer: true })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/layout2" } };
    // console.log('redirect from:', from)
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default withRouter(Login)