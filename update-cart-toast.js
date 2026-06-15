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
  "addedToCart": "Added to cart",
  "addedToCartDesc": "{quantity}x {productName} added to your cart."
});

updateJson('./messages/ar.json', {
  "addedToCart": "تمت الإضافة للسلة",
  "addedToCartDesc": "تمت إضافة {quantity}x {productName} إلى سلتك."
});
