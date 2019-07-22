const members = {
  data: [],
  init() {
    this.findAll();
  },
  findAll() {
    const request = new XMLHttpRequest(); // ez egy szinkron művelet
    request.onload = () => {
      this.setData(request.responseText); // innéttől kezdve lesz benne adat
    };
    request.onerror = () => {
      alert('hiba a mátrixban');
    };
    request.open('GET', '/json/got.json');
    request.send();
  },
  setData(userData) {
    this.data = JSON.parse(userData);
    this.filterAliveMembers();
  },

  filterAliveMembers() {
    for (i = 0; i < this.data.length; i += 1) {
      if (this.data[i].dead === true) {
        this.data.splice(i, 1);
      }
    }
    this.showOneRow();
  },

  showOneRow(data) {
    let row = '';
    for (i = 0; i < 48; i += 1) {
      if (this.data.hasOwnProperty(i)) {
        row += `<div class="small__pictures" id="${[i]}"><div><img src="${this.data[i].portrait} " alt="" class="images"></div>
                <div class="image__names">${this.data[i].name}</div></div>`;
      }
    }
    document.querySelector('.pictures__container').innerHTML = row;
    return row;
  },
}

members.init();

