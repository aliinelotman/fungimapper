import { HostListener, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

declare var ol: any;
@Component({
  selector: 'app-fungi-map',
  templateUrl: './fungi-map.component.html',
  styleUrls: ['./fungi-map.component.css'],
})
export class FungiMapComponent {
  private map!: L.Map;
  private centroid: L.LatLngExpression = [
    58.375759610207155, 26.669222616313476,
  ]; //tartu Ossu

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 10,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      this.addMarkerToMap(latitude, longitude);
    });

    tiles.addTo(this.map);
  }

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  addMarkerToMap(latitude: number, longitude: number): void {
    const marker = L.marker([latitude, longitude], {
      icon: this.fungiIcon,
    }).addTo(this.map);
    // Optionally, you can add the marker to a list or array for further use.
  }

  fungiIcon = L.icon({
    iconUrl: '/mushroom-icon.png', //EI TÖÖTA, 404?
    iconSize: [38, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
}
