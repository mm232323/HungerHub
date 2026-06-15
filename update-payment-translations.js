const fs = require('fs');

const updateJson = (file, additions) => {
  const content = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(content);
  
  if (data.Dashboard && data.Dashboard.Orders) {
    data.Dashboard.Orders.payment = additions;
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Updated ' + file);
};

updateJson('./messages/en.json', {
  cash: "Cash",
  card: "Card"
});

updateJson('./messages/ar.json', {
  cash: "نقدي",
  card: "بطاقة"
});
