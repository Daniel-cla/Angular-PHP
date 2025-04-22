import { Injectable } from '@angular/core';
import { HousingLocation } from '../interfaces/housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingLocationService {
  private url = 'http://localhost/api_php_angular/backend/controllers/Locations.php';

  constructor() {}

  // GET: 
  async getAllHousingLocation(): Promise<HousingLocation[]> {
    try {
      const data = await fetch(this.url);
      if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
      }
      const response = await data.json();
      return response.datos;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return [];
    }
  }

  // GET:
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const url = `${this.url}/${id}`;
    console.log('URL de la API:', url);
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
      }
      const response = await data.json();
      return response.datos.find((item: HousingLocation) => item.id === id);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return undefined;
    }
  }

  // POST:
  async createHousingLocation(housingLocation: HousingLocation): Promise<HousingLocation> {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(housingLocation),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data.datos;  // Devuelve la ubicación creada
    } catch (error) {
      console.error('Error al crear la ubicación:', error);
      throw error;
    }
  }

  // PUT:
  async updateHousingLocation(id: number, housingLocation: HousingLocation): Promise<HousingLocation> {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(housingLocation),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data.datos;  // Devuelve la ubicación actualizada
    } catch (error) {
      console.error('Error al actualizar la ubicación:', error);
      throw error;
    }
  }

  // DELETE:
  async deleteHousingLocation(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      console.log('Ubicación de vivienda eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la ubicación:', error);
      throw error;
    }
  }

  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(`FirstName: ${firstName} - LastName: ${lastName} - Email: ${email}`);
  }
}
