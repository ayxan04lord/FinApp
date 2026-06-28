const clients = [
  { name: "Alice", phone: "+994 51 579 87 26", card: "8363 8453 9654 0263" },
  { name: "Tom", phone: "+994 55 839 78 40", card: "" },
  { name: "", phone: "+994 70 932 87 56", card: "9651 8632 9632 0763" },
  { name: "Kate", phone: "", card: "0765 4567 9234 9222" },
  { name: "", phone: "+994 77 974 97 31", card: "0742 7541 8765 6622" },
  { name: "Nik", phone: "+994 50 792 07 48", card: "0711 2239 9763 6263" },
  { name: "Sam", phone: "", card: "0711 2279 6389 6376" },
  { name: "Max", phone: "+994 51 456 43 33", card: "" },
  { name: "Bill", phone: "+994 55 753 83 23", card: "" },
  { name: "Helen", phone: "", card: "9653 7820 9765 7543" },
];

export const fetchClients = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(clients[Math.floor(Math.random() * clients.length)]);
    }, Math.random() * 2000 + 500)
  );
