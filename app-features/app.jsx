import React from 'react';
import ReactDOM from 'react-dom';
import ol from 'openlayers';
import {addLocaleData, IntlProvider} from 'react-intl';
import App from './node_modules/boundless-sdk/js/components/app.js';
import HomeButton from './node_modules/boundless-sdk/js/components/HomeButton.jsx';
import LayerList from './node_modules/boundless-sdk/js/components/LayerList.jsx';
import Toolbar from './node_modules/boundless-sdk/js/components/Toolbar.jsx';
import EditPopup from './node_modules/boundless-sdk/js/components/EditPopup.jsx';
import WFST from './node_modules/boundless-sdk/js/components/WFST.jsx';
import enLocaleData from './node_modules/react-intl/locale-data/en.js';
import enMessages from './node_modules/boundless-sdk/locale/en.js';

addLocaleData(
  enLocaleData
);

var map = new ol.Map({
  layers: [
    new ol.layer.Group({
      type: 'base-group',
      title: 'Base maps',
      layers: [
        new ol.layer.Tile({
          type: 'base',
          title: 'OpenStreetMap',
          visible: false,
          source: new ol.source.OSM()
        }),
        new ol.layer.Tile({
          type: 'base',
          title: 'MapQuest Street Map',
          source: new ol.source.MapQuest({layer: 'osm'})
        }),
        new ol.layer.Tile({
          type: 'base',
          visible: false,
          title: 'None'
        })
      ]
    })
  ],
  view: new ol.View({
    center: [-10764594.758211, 4523072.3184791],
    zoom: 3
  })
});

class MyApp extends App {
  render() {
    var options = [{
      exclude: true,
      pullRight: false,
      jsx: (<article><img src="resources/logo.svg" width="30" height="30"></img><span className='app-title'>Features</span></article>)
    }];
    return (
      <article>
        <Toolbar options={options} />
        <div ref='map' id='map'></div>
        <div><LayerList allowStyling={true} showOnStart={true} showZoomTo={true} allowEditing={true} allowReordering={true} addLayer={{url: '/geoserver/wfs?', asVector: true}} expandOnHover={false} map={map} /></div>
        <div id='home-button' className='ol-unselectable ol-control'><HomeButton map={map} /></div>
        <div id='popup' className='ol-popup'><EditPopup map={map} /></div>
        <div id='wfst'><WFST layerSelector={false} visible={false} map={map} /></div>
      </article>
    );
  }
}

ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><MyApp useHistory={false} map={map} /></IntlProvider>, document.getElementById('main'));
