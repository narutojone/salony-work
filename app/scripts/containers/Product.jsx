import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';

import HourTable from 'components/HourTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getProductByID } from 'actions/index';
import { getServicesByID } from 'actions/index';

export class ProductContainer extends React.Component {
  state = {
    productData: {},
    service: {},
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.any,
  };

  componentWillMount() {
    this.props.dispatch(getProductByID(this.props.id));
    this.props.dispatch(getServicesByID(this.props.id));
  }

  render() {
    const app = this.props;
    const productData = app.app.data.product;
    const serviceData = app.app.data.services;

    const images = productData.images.map(image => {
      return image.image_urls;
    });

    if (images.length === 0) {
      const emptyImage = {
        original: 'http://www.cmp-cyprus.org/sites/all/modules/media_gallery/images/empty_gallery.png',
      };
      images.push(emptyImage);
    }

    return (
      <div className="container">
        <div>
          <h2>{productData.name}</h2>
        </div>
        <div className="slider margintop">
          <ImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            items={images}
            sizes="300"
          />
        </div>
        <div className="margintop">
          <h5>Working hours</h5>
          <HourTable data={productData.hours} />
        </div>
        <div className="margintop">
          <h5>Description</h5>
          <h5 className="description">{productData.description}</h5>
          <h5 className="margintop">Service</h5>
          <BootstrapTable
            className="table"
            printable data={serviceData}
            striped={true} hover={true}
          >
            <TableHeaderColumn dataField="name" isKey={true} dataSort={true} width="400">Name</TableHeaderColumn>
            <TableHeaderColumn dataField="duration" dataSort={true} width="400">Duration (Min)</TableHeaderColumn>
            <TableHeaderColumn dataField="price" dataSort={true} width="400">Price (KD)</TableHeaderColumn>               
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { product: state.product, app: state.app };
}

export default connect(mapStateToProps)(ProductContainer);
