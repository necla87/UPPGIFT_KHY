import fs from 'fs';

export default class Musician {
  constructor(name, info, birthYear) {
    this.name = name;
    this.info = info;
    this.birthYear = birthYear;
    this.bands = [];
    this.previousBands = [];
    this.instruments = [];
  }

  addBand(band, yearJoined, instrumentsPlayed) {
    this.bands.push({ band, yearJoined, instrumentsPlayed });
  }

  addPreviousBand(band, yearLeft) {
    this.previousBands.push({ band, yearLeft });
  }

  addInstrument(instrument) {
    this.instruments.push(instrument);
  }

  toJSON() {
    return {
      name: this.name,
      info: this.info,
      birthYear: this.birthYear,
      bands: this.bands,
      previousBands: this.previousBands,
      instruments: this.instruments,
    };
  }

  static fromJSON(data) {
    const musician = new Musician(data.name, data.info, data.birthYear);
    musician.bands = data.bands;
    musician.previousBands = data.previousBands;
    musician.instruments = data.instruments;
    return musician;
  }

  static loadMusiciansFromJSON(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
    return data.map((musicianData) => Musician.fromJSON(musicianData));
  }

  static saveMusiciansToJSON(filename, musicians) {
    const data = JSON.stringify(musicians.map((musician) => musician.toJSON()), null, 2);
    fs.writeFileSync(filename, data);
  }
}

