import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import './Contacts.sass';

class Contacts extends Component {
  static defaultProps = {
    center: {
      lat: 50.42825354,
      lng: -329.5238775
    },
    zoom: 18
  };

  render() {
    return (
      <div className="contacts">
        <address className="address">
          <h6 className="address__header">Contacts</h6>
          <p className="address__label">
            Telephone number:
            <a className="address__tel" href="tel:847-555-5555">
              847-555-5555
            </a>
          </p>
          <p className="address__label">Address: Lorem ipsum dolor.</p>
          <p className="address__label">Work hours: 9.30 - 6.30</p>
          <p className="address__label">
            E-mail:
            <a className="address__email" href="mailto:game1life1@gmail.com">
              game1life1@gmail.com
            </a>
          </p>
        </address>
        <div className="contacts__map-wrapper">
          <GoogleMapReact
            className="contacts__map"
            bootstrapURLKeys={{ key: 'AIzaSyDxK9QeYSK0YQf8J1CrkQgjvB5uqizksz0' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          />
        </div>
      </div>
    );
  }
}

export default Contacts;
