import React from 'react';

import Salons from 'containers/Salons';

export default class Main extends React.PureComponent {
  render() {
    return (
      <div key="Private" className="app__private app__route">
        <div className="app__container">
            <Salons />
        </div>
      </div>
    );
  }
}
