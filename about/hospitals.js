const tableBody = document.getElementById('tableBody');
const searchBar = document.getElementById('searchBar');
const statusFilter = document.getElementById('statusFilter');
const cityFilter = document.getElementById('cityFilter');
const countSpan = document.getElementById('count');

function init() {
    const cities = [...new Set(hospitalData.map(h => h.address))].sort();
    cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.innerText = city;
        cityFilter.appendChild(opt);
    });

    renderData(hospitalData);
}

function renderData(data) {
    tableBody.innerHTML = '';
    data.forEach(h => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${h.id}</td>
            <td><strong>${h.name}</strong></td>
            <td>${h.address}</td>
            <td>${h.owner}</td>
            <td>${h.type}</td>
            <td><span class="status-tag ${h.status}">${h.status}</span></td>
        `;
        tableBody.appendChild(row);
    });
    countSpan.innerText = data.length;
}

function filterData() {
    const searchVal = searchBar.value.toLowerCase();
    const statusVal = statusFilter.value;
    const cityVal = cityFilter.value;

    const filtered = hospitalData.filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(searchVal) || 
                             h.owner.toLowerCase().includes(searchVal);
        const matchesStatus = (statusVal === 'all') || h.status === statusVal;
        const matchesCity = (cityVal === 'all') || h.address === cityVal;

        return matchesSearch && matchesStatus && matchesCity;
    });

    renderData(filtered);
}

searchBar.addEventListener('input', filterData);
statusFilter.addEventListener('change', filterData);
cityFilter.addEventListener('change', filterData);

window.onload = init;