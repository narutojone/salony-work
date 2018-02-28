import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import LazyLoad from 'react-lazy-load';
import { getProduct } from 'actions/index';


import Loader from 'components/Loader';

export class Salons extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      query: 'react',
      pageNum: 1,
      salonsData: [],
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  };

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll, false);
  };

  handleScroll = (event) =>  {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      let pageNum = this.state.pageNum;
      this.props.dispatch(getProduct(pageNum + 1));
      this.setState({
        pageNum: pageNum+1,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    let salonsData = this.state.salonsData;
    let product = nextProps.app.app.data.products;    
    if (product.length > 1 && salonsData.filter(e => e[0].name === product[0].name).length <= 0) {
      salonsData.push(nextProps.app.app.data.products);
      this.setState({salonsData: salonsData});
    }    
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.setState({pageNum: 1, salonsData: []});
    this.props.dispatch(getProduct(1));
  }   

  render() {
    return (
      <div>
        { this.state.salonsData.map((salonsData, index) => (
          <LazyLoad key={index} className={index == 1 ? 'lazysecond' : 'lazyother'}>
            <BootstrapTable className={index == 0 ? 'table' : 'secondtable'} data={salonsData} striped={true} hover={true}>
              <TableHeaderColumn dataField="name" dataSort={true} width="400">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="website" dataSort={true} width="400">Website</TableHeaderColumn>
              <TableHeaderColumn dataField="images" dataFormat={ cell => (
                      cell[0] != undefined && cell[0].hasOwnProperty('image_urls') ?                  
                        <img src={cell[0].image_urls.thumb} className="image" /> :
                        <img src="http://www.cmp-cyprus.org/sites/all/modules/media_gallery/images/empty_gallery.png" className="image" />
                    )}
                >
                    Image
                </TableHeaderColumn>
              <TableHeaderColumn dataField="id" width="150" isKey={true} dataFormat={ cell => (
                    <Link to={`/product/${cell}`} onClick={ e => e.stopPropagation() }>Details</Link>
                    )}
                >                
                </TableHeaderColumn>
            </BootstrapTable>
          </LazyLoad>
        ))         
        }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {app: state.app};
}

export default connect(mapStateToProps)(Salons);
