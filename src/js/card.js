export default class Card {
  constructor(text, description) {
    this.container = document.querySelector('.container');

    this.id = null;
    this.card = null;
    this.cardText = text;
    this.cardDescription = description;
    this.btn = null;

    this.idReserv = [];
  }

  cardMaP(id, text, description) {
    this.id = id;
    return `<div class="card_content data-id_${id}">
    <button class="card_not_done"></button>
    <button class="card_done hidden">	&#10004;</button>
    <div class="card_input">
      <div class="card_text">${text}</div>
      <div class="card_description hidden">${description}</div>
    </div>
    <button class="card_edit">&#9998;</button>
    <button class="card_delete">&#10006;</button>
  </div>`;
  }

  createCard() {
    const element = this.container.querySelector('.cards');
    this.id = this.generateId();
    element.insertAdjacentHTML('beforeend', this.cardMaP(this.id, this.cardText, this.cardDescription));
    this.card = element.querySelector(`.data-id_${this.id}`);
  }

  generateId() {
    const id = Math.floor(Math.random() * 1000000);
    if (this.idReserv.includes(id)) {
      return this.generateId();
    }
    this.idReserv.push(id);
    return id;
  }
}