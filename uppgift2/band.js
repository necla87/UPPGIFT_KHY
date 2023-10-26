import fs from 'fs';

export default class Band {
  constructor(name, info, formedYear, dissolvedYear) {
    this.name = name;
    this.info = info;
    this.formedYear = formedYear;
    this.dissolvedYear = dissolvedYear;
    this.members = [];
    this.previousMembers = [];
  }

  addMember(musician, yearJoined, instrumentsPlayed) {
    this.members.push({ musician, yearJoined, instrumentsPlayed });
  }

  addPreviousMember(musician, yearLeft) {
    this.previousMembers.push({ musician, yearLeft });
  }

  toJSON() {
    return {
      name: this.name,
      info: this.info,
      formedYear: this.formedYear,
      dissolvedYear: this.dissolvedYear,
      members: this.members,
      previousMembers: this.previousMembers,
    };
  }

  static fromJSON(data) {
    const band = new Band(data.name, data.info, data.formedYear, data.dissolvedYear);
    band.members = data.members;
    band.previousMembers = data.previousMembers;
    return band;
  }

  static loadBandsFromJSON(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
    return data.map((bandData) => Band.fromJSON(bandData));
  }

  static saveBandsToJSON(filename, bands) {
    const data = JSON.stringify(bands.map((band) => band.toJSON()), null, 2);
    fs.writeFileSync(filename, data);
  }
}


