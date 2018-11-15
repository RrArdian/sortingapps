const axios = require('axios');
const readlineSync = require('readline-sync');

async function initialize() {
    try {
        const response = await axios.get('http://jsonplaceholder.typicode.com/comments');
        start(response.data);
    } catch (error) {
        console.log(error);
    }
}

function start(data) {
    let running = true;
    while (running) {
        console.log('----------------------');
        console.log('| THE DUMMY COMMENTS |');
        console.log('----------------------');
        console.log('=== Pilihan Menu ===');
        console.log('1. Tampilkan Data Asli');
        console.log('2. Urutkan Berdasar Nama (A-Z)');
        console.log('3. Urutkan Berdasar Nama (Z-A)');
        console.log('4. Urutkan Berdasar Email (A-Z)');
        console.log('5. Urutkan Berdasar Email (Z-A)');
        console.log('6. Cari Data');
        console.log('99. Keluar')
        const input = readlineSync.question('Masukkan input? ');
        
        switch(input) {
            case '1':
            askShowPagination(data, 'asli');
            break;
            case '2':
            const sortByNameAsc = sorting(data, 'name', 'asc');
            askShowPagination(sortByNameAsc, 'sorted by name (A-Z)');
            break;
            case '3':
            const sortByNameDesc = sorting(data, 'name', 'desc');
            askShowPagination(sortByNameDesc, 'sorted by name (Z-A)');
            break;
            case '4':
            const sortByEmailAsc = sorting(data, 'email', 'asc');
            askShowPagination(sortByEmailAsc, 'sorted by email (A-Z)');
            break;
            case '5':
            const sortByEmailDesc = sorting(data, 'email', 'desc');
            askShowPagination(sortByEmailDesc, 'sorted by email (Z-A)');
            break;
            case '6':
            const search = searching(data);
            askShowPagination(search, `hasil pencarian`);
            break;
            case '99':
            running = false;
            break;
            default:
            console.log('Oops! Perintah tidak ditemukan.');
        }
    }
}

function sorting(data, sortBy, orderBy) {
    let sortData;
    if (orderBy === 'asc') {
        sortData = data.slice().sort((a,b) => a[sortBy].localeCompare(b[sortBy]));
    } else {
        sortData = data.slice().sort((a,b) => b[sortBy].localeCompare(a[sortBy]));
    }
    return sortData;
}

function searching(data) {
    const query = readlineSync.question('Masukkan keyword pencarian? ');
    const result = data.filter(q => q.body.includes(query.toLowerCase()));

    return result;
}

function askShowPagination(data, name) {
    const input = readlineSync.question(`Tampilkan data ${name} dengan pagination? (y/n) `);
    if (input === 'y') {
        let keepAsking = true;
        while (keepAsking) {
            const askPaginate = readlineSync.question('Masukkan halaman dan jumlah data (eg: 1,10)? (Ketik 0 untuk kembali) ');
            if (askPaginate === '0') {
                keepAsking = false;
            } else {
                const pageNumber = askPaginate.split(',')[0];
                const pageSize = askPaginate.split(',')[1];
                const from = (pageNumber - 1) * pageSize + 1;
                const to = pageSize * pageNumber;
                const newPage = paginate(data, pageSize, pageNumber - 1);
                
                console.log(`\nMenampilkan data ${name} => (${from} sampai ${to} dari ${data.length} data)`);
                printData(newPage);
            }
        }
    } else {
        console.log(`\nMenampilkan data ${name} sebanyak ${data.length} data`);
        app.printData(data);
    }
}

function paginate(data, pageSize, pageNumber) {
    return data.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}

function printData(data) {
    if (data.length < 1) return console.log('Oops! Tidak ada data yang ditampilkan.\n');
    
    data.forEach(q => {
        console.log(`ID    : ${q.id}`);
        console.log(`Name  : ${q.name}`);
        console.log(`Email : ${q.email}`);
        console.log(`Body  : ${q.body}\n`);
    });
}

const app = { initialize, searching, askShowPagination, printData };
module.exports = app;