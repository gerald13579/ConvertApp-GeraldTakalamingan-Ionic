import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  conversionType: 'length' | 'mass' | 'time' | null = null; // Tambahkan tipe "time" untuk waktu
  fromUnit: string | null = null;
  toUnit: string | null = null;
  inputValue: number | null = null;
  result: number | null = null;
  inputError: string | null = null;

  fromUnitOptions: string[] = [];
  toUnitOptions: string[] = [];

  // Pilihan satuan untuk panjang, massa, dan waktu
  lengthUnits = ['kilometer', 'meter', 'centimeter', 'millimeter'];
  massUnits = ['kilogram', 'gram', 'milligram'];
  timeUnits = ['detik', 'menit', 'jam', 'hari'];

  onMetricChange() {
    // Kosongkan dropdown ketika metrik berubah
    this.fromUnit = null;
    this.toUnit = null;
    this.result = null;
    this.inputError = null;

    // Set unit berdasarkan pilihan metrik
    if (this.conversionType === 'length') {
      this.fromUnitOptions = this.lengthUnits;
      this.toUnitOptions = this.lengthUnits;
    } else if (this.conversionType === 'mass') {
      this.fromUnitOptions = this.massUnits;
      this.toUnitOptions = this.massUnits;
    } else if (this.conversionType === 'time') {
      this.fromUnitOptions = this.timeUnits;
      this.toUnitOptions = this.timeUnits;
    }
  }

  // Validasi input, pastikan input berupa angka
  validateInput() {
    if (this.inputValue !== null && isNaN(+this.inputValue)) {
      this.inputError = 'Input harus berupa angka';
      this.result = null;
    } else {
      this.inputError = null;
      this.convert(); // Jika input valid, lakukan konversi
    }
  }

  // Fungsi konversi
  convert() {
    if (this.conversionType === 'length') {
      const conversionRatesLength: Record<string, number> = {
        kilometer: 1000,
        meter: 1,
        centimeter: 0.01,
        millimeter: 0.001,
      };
      this.result = this.convertUnits(conversionRatesLength);
    } else if (this.conversionType === 'mass') {
      const conversionRatesMass: Record<string, number> = {
        kilogram: 1000,
        gram: 1,
        milligram: 0.001,
      };
      this.result = this.convertUnits(conversionRatesMass);
    } else if (this.conversionType === 'time') {
      const conversionRatesTime: Record<string, number> = {
        detik: 1,
        menit: 60,
        jam: 3600,
        hari: 86400,
      };
      this.result = this.convertUnits(conversionRatesTime);
    }
  }

  // Logika konversi
  convertUnits(conversionRates: Record<string, number>): number | null {
    if (this.inputValue !== null && !isNaN(this.inputValue) && this.fromUnit && this.toUnit) {
      const valueInBaseUnit = this.inputValue * conversionRates[this.fromUnit];
      return valueInBaseUnit / conversionRates[this.toUnit];
    }
    return null;
  }
}
