import { Component, OnInit } from '@angular/core';
import { FungiLocation } from '../fungi-location.model';
import { FungiLocationService } from '../fungi-location.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';


@Component({
  selector: 'app-fungi-map',
  templateUrl: './fungi-map.component.html',
  styleUrls: ['./fungi-map.component.css'],
})
export class FungiMapComponent implements OnInit {
  private map!: L.Map;
  private centroid: L.LatLngExpression = [
    58.375759610207155, 26.669222616313476,
  ]; //tartu Ossu
  private markers: L.Marker[] = [];

  constructor(
    private fungiLocationService: FungiLocationService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.initMap();
    this.loadFungiLocations();
  }

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

    tiles.addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      this.openMarkerDialog(latitude, longitude);
    });
  }

  openMarkerDialog(latitude: number, longitude: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { latitude, longitude },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const marker = L.marker([result.latitude, result.longitude], {
          icon: this.fungiIcon,
        }).addTo(this.map);

        // Create a FungiLocation object based on dialog data
        const fungiLocation: FungiLocation = {
          type: result.type, // Mushroom type from the dialog
          description: result.description, // Description from the dialog
          coordinates: [result.latitude, result.longitude],
        };

        // Use the service to send the data to the backend
        this.fungiLocationService.addLocation(fungiLocation).subscribe(
          (response) => {
            // Handle the response from the backend as needed
            console.log('Location added:', response);
          },
          (error) => {
            // Handle any errors that occur during the request
            console.error('Error adding location:', error);
          }
        );
      }
    });
  }


  loadFungiLocations(): void {
    this.fungiLocationService.getAllLocations().subscribe((locations: FungiLocation[]) => {
      locations.forEach((location) => {
        this.addMarkerToMap(location.coordinates[0], location.coordinates[1]);
      });
    });
  }


  addMarkerToMap(latitude: number, longitude: number): void {
    const marker = L.marker([latitude, longitude], {
      icon: this.fungiIcon,
    }).addTo(this.map);
    this.markers.push(marker);
  }




  fungiIcon = L.icon({
    iconUrl: '../mushroom-icon.png', //EI TÖÖTA, 404?
    iconSize: [38, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });



}
