//Resource used for google map api search location: 
//https://developers.google.com/maps/documentation/javascript/examples/places-searchbox#maps_places_searchbox-javascript

import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component{
function initMap() {
  //initialize our google map.
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 45.523, lng: -122.676 }, //Map for Portland Oregon.
    zoom: 13,
    mapTypeId: "roadmap"
  });

  const input = document.getElementById("pac-input");
  const searchbox = new google.maps.places.Searchbox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); //Bias the searchbox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchbox.setBounds(map.getBounds());
  });
  let markers = []; //listen for the event fired when the user selects a prediction and retrieve more details for that place.
  searchbox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return; //an error occured.
    }

    markers.forEach(place => {
      if (!place.geometry) {
        console.log("Returned place that contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        siz: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      //Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location
        })
      );

      if (place.geometry.viewport) {
        //only geocodes have viewports.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
}
