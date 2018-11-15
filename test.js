const readlineSync = require('readline-sync');
const app = require('./index');
const data = require('./mockdata');

test('Testing searching function if keyword empty', () => {
    const readlineSpy = jest.spyOn(readlineSync, 'question');
    readlineSpy.mockImplementation(() => '');
    const result = app.searching(data);
    expect(result).toEqual(data);
    readlineSpy.mockRestore();
});

test('Testing pagination invalid command', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    const readlineSpy = jest.spyOn(readlineSync, 'question');
    const printdataSpy = jest.spyOn(app, 'printData');
    readlineSpy.mockImplementation(() => 'x');
    app.askShowPagination(data, 'asli');
    expect(consoleSpy).toHaveBeenCalledWith(`\nMenampilkan data asli sebanyak 3 data`);
    expect(printdataSpy).toHaveBeenCalledTimes(1);
    readlineSpy.mockRestore();
});

test('Testing searching if result not found', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    const readlineSpy = jest.spyOn(readlineSync, 'question');
    readlineSpy.mockImplementation(() => 'bayu');
    const result = app.searching(data);
    readlineSpy.mockImplementation(() => 'n');
    app.askShowPagination(result, 'hasil pencarian');
    expect(consoleSpy).toHaveBeenCalledWith('\nMenampilkan data hasil pencarian sebanyak 0 data');
    expect(consoleSpy).toHaveBeenCalledWith('Oops! Tidak ada data yang ditampilkan.\n');
    readlineSpy.mockRestore();
});
