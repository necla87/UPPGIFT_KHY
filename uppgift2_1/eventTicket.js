export default class EventTicket {
  constructor(id, eventName, price, eventTime, buyerId) {
    this.id = id;
    this.eventName = eventName;
    this.price = price;
    this.eventTime = eventTime;
    this.buyerId = buyerId;
  }
}