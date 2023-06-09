class TicketManager {
  events = [];
  participants = [];
  basePrice = 5;

  getEvents(){
    return this.events;
  };

  addEvent(events){
    events.price = this.basePrice + events.price;
    this.events.push(events);
  };

  addUser(user){
    let find = false;
    this.events.forEach((index) => {
      if (user.eventId === index) {
        this.participants.push(user);
        find = true;
      }
    });

    const error = { error: 'event not found', code: 404 };

    return find ? this.participants : error; 
  };
}

let ticketManager = new TicketManager();
let events = {
  name: 'Festa Junina',
  place: 'SP',
  price: 20,
  capacity: 15, 
  date: new Date(),
};
let userOne = {eventId: 0, user: 1}; //success
let userTwo = {eventId: 1, user: 2}; //error


ticketManager.addEvent(events);
console.log(ticketManager.getEvents());

const users =  ticketManager.addUser(userOne) && ticketManager.addUser(userTwo);
console.log(users);