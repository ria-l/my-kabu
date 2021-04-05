import React, { Component } from 'react';
import PortfolioSummary from './PortfolioSummary';
import StockList from './StockList';
import AddLot from './AddLot';
import 'antd/dist/antd.css';
import '../css/index.css';
import { Layout, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {};

  rerender = () => {
    this.setState({ rerender: true });
  };

  render() {
    return (
      <>
        <Layout className="layout">
          <Header>
            <div className="logo" />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
            <div className="site-layout-content">
              <div>
                <PortfolioSummary rerender={this.rerender} />
              </div>
              <div style={{ float: 'left' }}>
                <AddLot rerender={this.rerender} />
              </div>
              <StockList rerender={this.rerender} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </>
    );
  }
}

export default App;
