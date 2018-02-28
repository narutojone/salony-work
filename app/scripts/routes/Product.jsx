import React from 'react';

import ProductContainer from 'containers/Product';

export default class Product extends React.PureComponent {
  constructor (props) {
    super(props);    
  } 
  
  render() {
    return (
      <div key="Private" className="app__private app__route">
        <div className="app__container">
            <ProductContainer id={this.props.match.params.id}/>
        </div>
      </div>
    );
  }
}
