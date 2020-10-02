import React, { Component } from 'react';
import * as Constants from './Const';
import { Button, DatePicker } from 'antd';

class TickerPicker extends Component {
  selectTicker = () => {
    console.log('sup');
  };
  render() {
    return (
      <div className="main">
        <form>
          <label htmlFor="ticker">Ticker</label>
          <input
            type="text"
            name="ticker"
            value="FAKE"
            onChange={this.selectTicker}
          />
          <input type="button" value="submit" onClick={this.submitForm} />
        </form>
        <div>
          <h1>Microsoft</h1>
          <h2>{Constants.API_PRICES['MSFT'][0]['close']}</h2>
          +$4.63 (+2.28%) Today
          <br />
          -$0.77 (-0.37%) After Hours
          <table>
            <tbody>
              <tr>
                <td>za charto</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TickerPicker;
