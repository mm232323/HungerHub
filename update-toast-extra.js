const fs = require('fs');

const updateJson = (file, translations) => {
  const content = fs.readFileSync(file, 'utf8');
  let data = JSON.parse(content);
  
  if (!data.Toasts) data.Toasts = {};
  
  data.Toasts = {
    ...data.Toasts,
    ...translations
  };
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Updated ' + file);
};

updateJson('./messages/en.json', {
  "enterAddress": "Please enter a delivery address",
  "orderId": "Your order ID is {id}",
  "somethingWentWrong": "Something went wrong."
});

updateJson('./messages/ar.json', {
  "enterAddress": "يرجى إدخال عنوان التوصيل",
  "orderId": "رقم طلبك هو {id}",
  "somethingWentWrong": "حدث خطأ ما."
});
