const fs = require('fs');

const updateJson = (file, additions) => {
  const content = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(content);
  
  if (data.HomePage && data.HomePage.trendingMerchants) {
    data.HomePage.trendingMerchants = {
      ...data.HomePage.trendingMerchants,
      ...additions
    };
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Updated ' + file);
};

updateJson('./messages/en.json', {
  nearbyTitle: "Nearby Local Gems",
  findingNearby: "Finding nearby gems...",
  noMerchants: "No merchants found."
});

updateJson('./messages/ar.json', {
  nearbyTitle: "أماكن مميزة قريبة",
  findingNearby: "جاري البحث عن أماكن قريبة...",
  noMerchants: "لم يتم العثور على مطاعم."
});
