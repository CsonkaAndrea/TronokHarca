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
        row += `<div class="small__pictures" id="${[i]}"><div><img src="${this.data[i].portrait} " alt="" class="images" id="${[i]}" onclick="members.showDetails()"></div>
                <div class="image__names">${this.data[i].name}</div></div>`;
      }
    }
    document.querySelector('.pictures__container').innerHTML = row;
    return row;
  },

  showDetails(result) { //nemműxik :()
    console.log("fasza");
    let details = [];
    for (i = 0; i < this.data.length; i += 1) {
      if (this.data.hasOwnProperty(i)) {
        details = `<div><img src="${this.data[i].picture}"></div>`;
      }
    }
    document.querySelector('#details').innerHTML = details;
  },

  searchIn() {
    const nodeSearchBarInput = document.querySelector('#searchBar').value;
    document.querySelector('#searchBar').value = '';
    console.log(nodeSearchBarInput);
    result = '';
    for (i = 0; i < this.data.length; i += 1) {
      if (nodeSearchBarInput.toLowerCase() === this.data[i].name.toLowerCase()) {
        result += this.data[i];
        console.log(result);
        break;
      }
    }
    console.log(result);
    return result;
  },

  serachDecide() {
    if (result == false) {
      this.noResult
    }
  },

  noResult() {
    let noResult = `<div><p>Character not found</p></div>`;
    document.querySelector('#showNoResult').innerHTML = noResult;
    setTimeout(() => {
      document.querySelector('#showNoResult').innerHTML = '';
    }, 10000);
  },

}

members.init();

