import React from 'react';
import PropTypes from 'prop-types';

export default class HourTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      hourData: {},
    };
  }

  static propTypes = {
    data: PropTypes.any,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ hourData: nextProps.data, load: true });
  }

  render() {
    const hourdata = this.state.hourData;
    return (
      (this.state.load &&
      <div>
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
              <td>{Object.prototype.hasOwnProperty.call(hourdata, 'sun') ? `${hourdata.sun.from}-${hourdata.sun.to}` : ''}</td>
              <td>{Object.prototype.hasOwnProperty.call(hourdata, 'mon') ? `${hourdata.mon.from}-${hourdata.mon.to}` : ''}</td>
              <td>{Object.prototype.hasOwnProperty.call(hourdata, 'tue') ? `${hourdata.tue.from}-${hourdata.tue.to}` : ''}</td>
              <td>{Object.prototype.hasOwnProperty.call(hourdata, 'wed') ? `${hourdata.wed.from}-${hourdata.wed.to}` : ''}</td>
              <td>{Object.prototype.hasOwnProperty.call(hourdata, 'thu') ? `${hourdata.thu.from}-${hourdata.thu.to}` : ''}</td>
              <td>{Object.prototype.hasOwnProperty.call(hourdata, 'fri') ? `${hourdata.fri.from}-${hourdata.fri.to}` : ''}</td>
              <td>{Object.prototype.hasOwnProperty.call(hourdata, 'sat') ? `${hourdata.sat.from}-${hourdata.sat.to}` : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
      ));
  }
}
