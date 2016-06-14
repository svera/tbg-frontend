import React from 'react';
import ClaimEnd from './claim_end.jsx';

class SellTrade extends React.Component {

  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleChangeSell = this.handleChangeSell.bind(this);
      this.handleChangeTrade = this.handleChangeTrade.bind(this);

      this.corps = {};
      for (var i = 0; i < this.props.corps.length; i++) {
          if (this.props.corps[i].def) {
            this.corps[i] = {};
            this.corps[i].sel = 0;
            this.corps[i].tra = 0;
          }
      }
  }

  handleChangeSell(event) {
    this.corps[event.target.name].sel = parseInt(event.target.value);
  }

  handleChangeTrade(event) {
    this.corps[event.target.name].tra = parseInt(event.target.value);
  }

  handleClick() {
    var message =  {"typ": "sel", "rom": this.props.gameID, "par": {"cor": this.corps}};
    this.props.conn.send(
        JSON.stringify(message)
    );
  }

  sellTradeCorpsMarkup() {
    var selectableCorps = [];
    for (var i = 0; i < this.props.corps.length; i++) {
        if (this.props.corps[i].def) {
          selectableCorps.push(
            <tr key={"sell-trade-"+i}>
              <td>{this.props.corps[i].nam}</td>
              <td><input type="number" min="0" max={this.props.playerInfo.own[i]} name={i} defaultValue="0" onChange={this.handleChangeSell} /></td>
              <td><input type="number" min="0" max={this.props.playerInfo.own[i]} name={i} defaultValue="0" onChange={this.handleChangeTrade} step="2" /></td>
            </tr>
          );
        }
    }
    return selectableCorps;
  }

  render() {
      return (
        <div>
          <p>Sell / Trade stock shares</p>
          <table>
              <thead><tr>
                  <th>&nbsp;</th><th>Sell</th><th>Trade</th>
              </tr></thead>
              <tbody>
                {this.sellTradeCorpsMarkup()}
              </tbody>
          </table>
          <input type="button" className="btn btn-primary" value="Sell / trade" onClick={this.handleClick} />
          <ClaimEnd conn={this.props.conn} />
        </div>
      );
  }

}

export default SellTrade;
