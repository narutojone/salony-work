import React from 'react';

export default class HourTable extends React.PureComponent {
  constructor(props) {
      super(props);
      this.state = {
          load: false,
          hourData: {},
      }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({hourData: nextProps.data, load: true});
  }

  render() {
    const hourdata = this.state.hourData;
    return (
      (this.state.load && <div>
          <table className="hourtable">             
            <tbody>
                <tr>
                    <td>Sun</td>
                    <td>Mon</td>
                    <td>Tue</td>
                    <td>Wed</td>
                    <td>Thu</td>
                    <td>Fri</td>
                    <td>Sat</td>
                </tr>      
                <tr>
                    <td>{hourdata.hasOwnProperty('sun') ? hourdata.sun.from + '-' + hourdata.sun.to : ''}</td>
                    <td>{hourdata.hasOwnProperty('mon') ? hourdata.mon.from + '-' + hourdata.mon.to : ''}</td>
                    <td>{hourdata.hasOwnProperty('tue') ? hourdata.tue.from + '-' + hourdata.tue.to : ''}</td>
                    <td>{hourdata.hasOwnProperty('wed') ? hourdata.wed.from + '-' + hourdata.wed.to : ''}</td>
                    <td>{hourdata.hasOwnProperty('thu') ? hourdata.thu.from + '-' + hourdata.thu.to : ''}</td>
                    <td>{hourdata.hasOwnProperty('fri') ? hourdata.fri.from + '-' + hourdata.fri.to : ''}</td>
                    <td>{hourdata.hasOwnProperty('sat') ? hourdata.sat.from + '-' + hourdata.sat.to : ''}</td>
                </tr>
            </tbody>          
          </table>
      </div>
    ));
  }
}
