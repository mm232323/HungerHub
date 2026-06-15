const fs = require('fs');

const updateJson = (file, additions) => {
  const content = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(content);
  
  if (data.MerchantSetup && data.MerchantSetup.Steps && data.MerchantSetup.Steps.step3) {
    data.MerchantSetup.Steps.step3 = {
      ...data.MerchantSetup.Steps.step3,
      ...additions
    };
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Updated ' + file);
};

updateJson('./messages/en.json', {
  locationSaved: "Location Saved!",
  useMyLocation: "Use My Location",
  locationHelpText: "Allow location access to appear in \"Nearby Local Gems\" for customers."
});

updateJson('./messages/ar.json', {
  locationSaved: "تم حفظ الموقع!",
  useMyLocation: "استخدام موقعي",
  locationHelpText: "السماح بالوصول إلى الموقع للظهور في \"أماكن مميزة قريبة\" للعملاء."
});
