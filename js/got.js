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
    },
    showOneRow(user) {
        let row = `<div data-id="${user.id}">`;
        for (let k in user) {
            if (user.hasOwnProperty(k)) {
                row += `<td>${user[k]}</td>`;
            }
        }
        row += `<td><button onclick ="userController.remove(${user.id})">Töröl</button></td> <td><button onclick ="userController.edit(${user.id})">Semmisejó</button></td></div>`;
        return row;
    },
}

members.init();

