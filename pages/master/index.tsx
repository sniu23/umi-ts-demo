import React,{ Component } from 'react';
import NavLink from "umi/navlink";
import withRouter from "umi/withRouter";
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

const { Sider } = Layout;

interface SideMenuProps {
  pathname?: string,
  collapsed?: boolean,
}


class SideMenu extends Component<SideMenuProps>{
  
  render() {
    const { pathname, collapsed } = this.props;
    return (
        <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}>

        <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} selectedKeys={[pathname]}>
            <Menu.Item key="/">
              <NavLink to="/">
                <Icon type="user" />
                <span>master</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/css">
              <NavLink to="/css">
                 <Icon type="upload" />
                 <span>css</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
    )
  }
}

export default withRouter(SideMenu)