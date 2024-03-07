const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');
const dataPrinter = JSON.parse(localStorage.getItem('data_printer'));
const printer_name = 'receipt-printer';
let printer = new ThermalPrinter({
  type: PrinterTypes.epson,                                  // Printer type: 'star' or 'epson'
  interface: `//localhost/${printer_name}`,                    // Printer interface
  width: 32, // Number of characters in one line - default: 48
  characterSet: CharacterSet.SLOVENIA, // Character set - default: SLOVENIA
  breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
  removeSpecialCharacters: false, // Removes special characters - default: false
  lineCharacter: '-', // Use custom character for drawing lines - default: -
});
const rupiah = (amount) => {
  return amount.toLocaleString('ID', {
    style: 'decimal',
    // minimumFractionDigits: 0,
    // maximumFractionDigits: 3
  });

}
const run = (data) => {
  const dataPrinter = JSON.parse(localStorage.getItem('data_printer'));
  const store_name = data.store.store_name;
  const address = data.store.store_address;
  // Add receipt details
  printer.alignCenter();
  printer.bold(true);
  printer.setTextSize(1, 1);
  printer.println(store_name);
  printer.bold(false);
  printer.alignLeft();

  // Add date and time
  const currentDate = new Date(data.transaction.createdAt);
  // const formattedDate = `${data.transaction.createdAt.toLocaleDateString()} ${data.transaction.createdAt.toLocaleTimeString()}`;
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  printer.setTextNormal();
  printer.println(`Alamat : ${address}`);
  printer.println(`Tanggal : ${formattedDate}`);
  printer.println(`ID : ${data.transaction.id}`);
  printer.drawLine();
  // Add items to the receipt
  data.productList.map(obj => {
    printer.println(buatBaris4Kolom(obj.product_name.toString(), obj.qty.toString(), rupiah(obj.total).toString()))
  })

  // console.log(data)
  // Print total
  printer.drawLine();
  printer.alignRight();
  printer.bold(true);
  printer.println(`TOTAL: ${rupiah(data.transaction.total)}`);
  if (data.cash) {
    printer.bold(false);
    printer.println(`TUNAI: ${rupiah(data.cash)}`);
    printer.println(`KEMBALIAN: ${rupiah(data.change)}`);
  }
  printer.bold(false);
  printer.drawLine();

  // Additional details
  printer.alignLeft();
  printer.println('Terima kasih telah berbelanja!');
  printer.drawLine();
  printer.println('Barang yang telah dibeli tidak dapat dikembalikan');
  printer.drawLine();
  printer.cut();
  // Execute print job
  printer.execute(err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Printing completed.');
    }
  });
  printer.clear();
}
const test = () => {
  const dataPrinter = JSON.parse(localStorage.getItem('data_printer'));
  const store_name = dataPrinter.store_name;
  printer.alignCenter();
  printer.bold(true);
  printer.setTextSize(1, 1);
  printer.println(store_name);
  printer.bold(false);
  printer.alignLeft();
  printer.setTextNormal();
  printer.println(`Nama Printer : ${printer_name}`);
  printer.println('Printer terhubung...');
  printer.cut();
  // Execute print job
  printer.execute(err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Printing completed.');
    }
  });
  printer.clear();
}
function wordwrap(str, width, brk, cut) {
  brk = brk || '\n';
  width = width || 75;
  cut = cut || false;

  if (!str) {
    return str;
  }

  const regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');

  return str.match(new RegExp(regex, 'g')).join(brk);
}

function buatBaris4Kolom(kolom1, kolom2, kolom3) {
  const lebar_kolom_1 = 15;
  const lebar_kolom_2 = 4;
  const lebar_kolom_3 = 8;


  kolom1 = wordwrap(kolom1, lebar_kolom_1, "\n", true);
  kolom2 = wordwrap(kolom2, lebar_kolom_2, "\n", true);
  kolom3 = wordwrap(kolom3, lebar_kolom_3, "\n", true);


  const kolom1Array = kolom1.split("\n");
  const kolom2Array = kolom2.split("\n");
  const kolom3Array = kolom3.split("\n");


  const jmlBarisTerbanyak = Math.max(kolom1Array.length, kolom2Array.length, kolom3Array.length);
  const hasilBaris = [];

  for (let i = 0; i < jmlBarisTerbanyak; i++) {
    const hasilKolom1 = (kolom1Array[i] || "").padEnd(lebar_kolom_1, " ");
    const hasilKolom2 = (kolom2Array[i] || "").padEnd(lebar_kolom_2, " ");
    const hasilKolom3 = (kolom3Array[i] || "").padStart(lebar_kolom_3, " ");

    hasilBaris.push(`${hasilKolom1} ${hasilKolom2} ${hasilKolom3}`);
  }

  return hasilBaris.join("\n") + "\n";
}
export { test, run }

