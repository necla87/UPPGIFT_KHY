export default class EventTicket {
  constructor(id, name, price, time, buyerId) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.time = time;
    this.buyerId = buyerId;
  }

  static fromJSON(json) {
    return new EventTicket(json.id, json.name, json.price, json.time, json.buyerId);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      time: this.time,
      buyerId: this.buyerId,
    };
  }
}
