const fs = require('fs');

const updateJson = (file, additions) => {
  const content = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(content);
  
  if (data.Dashboard && data.Dashboard.Home) {
    data.Dashboard.Home = {
      ...data.Dashboard.Home,
      ...additions
    };
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Updated ' + file);
};

updateJson('./messages/en.json', {
  quickTips: "Quick Tips",
  tipPromotions: "Promotions:",
  tipPromotionsDesc: "Create a discount campaign to attract new customers this week.",
  tipPhotos: "Photos:",
  tipPhotosDesc: "High quality photos can increase your order volume by up to 30%."
});

updateJson('./messages/ar.json', {
  quickTips: "نصائح سريعة",
  tipPromotions: "العروض:",
  tipPromotionsDesc: "قم بإنشاء حملة خصم لجذب عملاء جدد هذا الأسبوع.",
  tipPhotos: "الصور:",
  tipPhotosDesc: "الصور عالية الجودة يمكن أن تزيد من حجم طلباتك بنسبة تصل إلى 30%."
});
