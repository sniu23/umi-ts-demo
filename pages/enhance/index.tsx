import React from "react";

const config = 'I config a title...';

const enhanceComponent = (Component) => 
  class Enhance extends React.Component {
    render() {
      return (
        <Component
          {...this.props}
          title={ config }
        />
      )
    }
  };
    
const OriginTitle  = ({ title }) => <h1>{ title }</h1>;
const EnhancedTitle = enhanceComponent(OriginTitle);

export default class App extends React.Component {
  render() {
    return <EnhancedTitle />;
  }
};