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
    // Define Estonia's boundaries
    const maxBounds = L.latLngBounds(
      L.latLng(57.5163, 21.0213), // Southwest corner of Estonia
      L.latLng(59.675, 28.2096) // Northeast corner of Estonia
    );

    this.map = L.map('map', {
      center: this.centroid,
      zoom: 8,
      maxBounds, // Set the maxBounds property
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 8,
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
          type: result.type,
          description: result.description,
          coordinates: [result.latitude, result.longitude],
        };

        // Use service to send data to the backend
        this.fungiLocationService.addLocation(fungiLocation).subscribe(
          (response) => {
            console.log('Location added:', response);
          },
          (error) => {
            console.error('Error adding location:', error);
          }
        );
      }
    });
  }

  loadFungiLocations(): void {
    this.fungiLocationService
      .getAllLocations()
      .subscribe((locations: FungiLocation[]) => {
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
    iconUrl: 'assets/favicon.png',
    iconSize: [15, 15],
  });
}
