const fs = require('fs');

const updateJson = (file, translations) => {
  const content = fs.readFileSync(file, 'utf8');
  let data = JSON.parse(content);
  
  if (!data.Toasts) {
    data.Toasts = {};
  }
  
  data.Toasts = {
    ...data.Toasts,
    ...translations
  };
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Updated ' + file);
};

updateJson('./messages/en.json', {
  "orderPlaced": "Order placed successfully!",
  "orderWhatsApp": "Order submitted via WhatsApp (Demo Fallback)",
  "orderFailed": "Failed to place order",
  "uploadFailed": "Upload Failed",
  "uploadError": "Upload Error",
  "promoCreated": "Promotion created successfully",
  "promoFailed": "Failed to create promotion",
  "fillFields": "Please fill all required fields",
  "orderUpdated": "Order updated",
  "productUpdated": "Product updated successfully!",
  "productDeleted": "Product deleted",
  "shareNotSupported": "Sharing not supported on this browser",
  "commentPosted": "Comment posted!",
  "followUpdated": "Follow updated",
  "setupSuccess": "Setup completed successfully!",
  "setupFailed": "Setup failed"
});

updateJson('./messages/ar.json', {
  "orderPlaced": "تم تقديم الطلب بنجاح!",
  "orderWhatsApp": "تم إرسال الطلب عبر واتساب (نسخة تجريبية)",
  "orderFailed": "فشل في تقديم الطلب",
  "uploadFailed": "فشل الرفع",
  "uploadError": "خطأ في الرفع",
  "promoCreated": "تم إنشاء العرض بنجاح",
  "promoFailed": "فشل في إنشاء العرض",
  "fillFields": "يرجى ملء جميع الحقول المطلوبة",
  "orderUpdated": "تم تحديث الطلب",
  "productUpdated": "تم تحديث المنتج بنجاح!",
  "productDeleted": "تم حذف المنتج",
  "shareNotSupported": "المشاركة غير مدعومة في هذا المتصفح",
  "commentPosted": "تم نشر التعليق!",
  "followUpdated": "تم تحديث المتابعة",
  "setupSuccess": "تم الإعداد بنجاح!",
  "setupFailed": "فشل الإعداد"
});
