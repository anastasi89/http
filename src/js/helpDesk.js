import Card from './card';

export default class CardManager {
  constructor() {
    this.container = null;
    this.actualElement = null;

    this.btnCardDelete = this.btnCardDelete.bind(this);
    this.btnCardEdit = this.btnCardEdit.bind(this);
    this.btnCardNotDone = this.btnCardNotDone.bind(this);
    this.btnCardDone = this.btnCardDone.bind(this);

    this.addNewCard = this.addNewCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.cansel = this.cansel.bind(this);
    this.canselEdit = this.canselEdit.bind(this);
    this.canselDel = this.canselDel.bind(this);
    this.btnText = this.btnText.bind(this);
    this.cardDelete = this.cardDelete.bind(this);
    this.cardEdit = this.cardEdit.bind(this);
  }

  bindToDOM(container) {
    this.container = container;
    this.container.querySelector('.card_add').addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.addNewCard();
    });
  }

  addNewCard() {
    const popover = this.container.querySelector('.popover');
    const addTiket = this.container.querySelector('.container_add_tiket');
    addTiket.classList.remove('hidden');
    popover.classList.remove('hidden');

    const btnOk = addTiket.querySelector('.popover_control_ok');
    const btnCansel = addTiket.querySelector('.popover_control_cancel');

    btnOk.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.addCard(addTiket);
      this.cansel(addTiket);
    });

    btnCansel.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.cansel(addTiket);
    });
  }

  addCard(tiket) {
    const text = tiket.querySelector('.tiket_text').value;
    const description = tiket.querySelector('.tiket_description').value;

    if (text === '') {
      this.cansel(tiket);
      return;
    }
    const newcard = new Card(text, description);
    newcard.createCard();

    const { card } = newcard;

    const btnDelete = card.querySelector('.card_delete');
    const btnEdit = card.querySelector('.card_edit');
    const btnNotDone = card.querySelector('.card_not_done');
    const btnDone = card.querySelector('.card_done');
    const btnText = card.querySelector('.card_text');

    btnDelete.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnCardDelete(card);
    });

    btnEdit.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnCardEdit(card);
    });

    btnNotDone.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnCardNotDone(card);
    });

    btnDone.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnCardDone(card);
    });

    btnText.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnText(card);
    });
  }

  btnCardDelete(card) {
    const popover = this.container.querySelector('.popover');
    const delTiket = this.container.querySelector('.container_delete_tiket');
    delTiket.classList.remove('hidden');
    popover.classList.remove('hidden');

    const btnOk = delTiket.querySelector('.popover_control_ok');
    const btnCansel = delTiket.querySelector('.popover_control_cancel');

    btnOk.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.cardDelete(card);
      this.canselDel(delTiket, card);
    });

    btnCansel.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.canselDel(delTiket, card);
    });
  }

  cardDelete(card) {
    const btnDelete = card.querySelector('.card_delete');
    const btnEdit = card.querySelector('.card_edit');
    const btnNotDone = card.querySelector('.card_not_done');
    const btnDone = card.querySelector('.card_done');
    const btnText = card.querySelector('.card_text');

    btnDelete.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnCardDelete(card);
    });
    btnEdit.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnCardEdit(card);
    });
    btnNotDone.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnCardNotDone(card);
    });
    btnDone.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnCardDone(card);
    });
    btnText.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.btnText(card);
    });
    card.remove();
  }

  btnCardNotDone(card) {
    this.actualElement = card;
    const btnNotDone = card.querySelector('.card_not_done');
    btnNotDone.classList.add('hidden');
    const btnDone = card.querySelector('.card_done');
    btnDone.classList.remove('hidden');
  }

  btnCardDone(card) {
    this.actualElement = card;
    const btnNotDone = card.querySelector('.card_not_done');
    btnNotDone.classList.remove('hidden');
    const btnDone = card.querySelector('.card_done');
    btnDone.classList.add('hidden');
  }

  btnText(card) {
    this.actualElement = card;
    const description = card.querySelector('.card_description');
    if (description.classList.contains('hidden')) {
      description.classList.remove('hidden');
    } else {
      description.classList.add('hidden');
    }
  }

  btnCardEdit(card) {
    const popover = this.container.querySelector('.popover');
    const editTiket = this.container.querySelector('.container_edit_tiket');
    editTiket.classList.remove('hidden');
    popover.classList.remove('hidden');

    editTiket.querySelector('.tiket_text').value = card.querySelector('.card_text').textContent;
    editTiket.querySelector('.tiket_description').value = card.querySelector('.card_description').textContent;

    const btnOk = editTiket.querySelector('.popover_control_ok');
    const btnCansel = editTiket.querySelector('.popover_control_cancel');

    btnOk.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.cardEdit(card, editTiket);
      this.canselEdit(editTiket, card);
    });

    btnCansel.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.canselEdit(editTiket, card);
    });
  }

  cardEdit(card, editTiket) {
    this.cardDelete(card);
    this.addCard(editTiket);
  }

  canselEdit(popup, card) {
    popup.classList.add('hidden');
    const popover = this.container.querySelector('.popover');
    popover.classList.add('hidden');

    const editTiket = this.container.querySelector('.container_edit_tiket');
    editTiket.querySelector('.tiket_text').value = '';
    editTiket.querySelector('.tiket_description').value = '';
    const btnOk = editTiket.querySelector('.popover_control_ok');
    const btnCansel = editTiket.querySelector('.popover_control_cancel');

    btnOk.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.cardEdit(card, editTiket);
      this.canselEdit(editTiket, card);
    });
    btnCansel.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.canselEdit(editTiket, card);
    });
  }

  cansel(popup) {
    popup.classList.add('hidden');
    const popover = this.container.querySelector('.popover');
    popover.classList.add('hidden');

    const addTiket = this.container.querySelector('.container_add_tiket');
    addTiket.querySelector('.tiket_text').value = '';
    addTiket.querySelector('.tiket_description').value = '';

    const btnOk = addTiket.querySelector('.popover_control_ok');
    const btnCansel = addTiket.querySelector('.popover_control_cancel');
    btnOk.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.addCard(addTiket);
      this.cansel(addTiket);
    });
    btnCansel.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.cansel(addTiket);
    });
  }

  canselDel(popup, card) {
    popup.classList.add('hidden');
    const popover = this.container.querySelector('.popover');
    popover.classList.add('hidden');

    const delTiket = this.container.querySelector('.container_delete_tiket');
    const btnOk = delTiket.querySelector('.popover_control_ok');
    const btnCansel = delTiket.querySelector('.popover_control_cancel');

    btnOk.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.cardDelete(card);
      this.canselDel(delTiket, card);
    });
    btnCansel.removeEventListener('mousedown', (e) => {
      e.preventDefault();
      this.canselDel(delTiket, card);
    });
  }
}
