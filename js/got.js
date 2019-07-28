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
    this.data.forEach((item, i) => {
      row += `<div class="small__pictures" id="${[i]}"><div><img src="${this.data[i].portrait} " alt="${i}" class="images" id="${[i]}" onclick="members.showDetails(${i})"></div>
                <div class="image__names" onclick="members.showDetails(${i})">${this.data[i].name}</div></div>`;
    });
    document.querySelector('.pictures__container').innerHTML = row;
    return row;
  },

  showDetails(i) {
    let details = [];

    details += `<div><img src="${this.data[i].picture}"></div>
    <div class="names__indetails">${this.data[i].name}</div>`;

    if (this.data[i].house != null) {
      details += ` <img class="personsHousePhoto" src="/assets/houses/${this.data[i].house}.png"></div>`;
    }

    details += `<div class="bio__indetails">${this.data[i].bio}</div>`;

    document.querySelector('#details').innerHTML = details;
  },

  searchIn() {
    const nodeSearchBarInput = document.querySelector('#searchBar').value;
    document.querySelector('#searchBar').value = '';
    this.searchResult(nodeSearchBarInput);
  },

  searchResult(inputvalue) {
    let result = false;
    for (i = 0; i < this.data.length; i += 1) {
      if (inputvalue.toLowerCase() === this.data[i].name.toLowerCase()) {
        result = this.data[i];
        break;
      }
    }
    if (result === false) {
      this.noResult();
    }
    this.showDetails(i);
  },

  noResult() {
    let noResult = `<p>Character not found</p>`;
    document.querySelector('#details').innerHTML = '';
    document.querySelector('#showNoResult').innerHTML = noResult;
    setTimeout(() => {
      document.querySelector('#showNoResult').innerHTML = '';
    }, 10000);
  },

}

members.init();

