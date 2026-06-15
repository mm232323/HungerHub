const fs = require('fs');

const files = [
  'shared/components/pages/auth/merchant-setup/MerchantSetupClient.tsx',
  'shared/components/pages/auth/merchant-setup/StepFour.tsx',
  'shared/components/pages/dashboard/MarketingActionHeader.tsx',
  'shared/components/pages/dashboard/ProductActionHeader.tsx',
  'shared/components/pages/dashboard/ProductTabBody.tsx',
  'shared/components/pages/discover/ArticleActions.tsx',
  'shared/components/pages/discover/ArticleCard.tsx',
  'shared/components/pages/discover/FeedAdCard.tsx',
  'shared/components/pages/merchant/MerchanBody.tsx',
  'shared/components/pages/merchant/MerchantInfo.tsx',
  'shared/components/pages/product/product-detail-view.tsx',
  'shared/components/pages/product/ProductActions.tsx',
  'shared/components/pages/dashboard/OrderStage.tsx',
  'shared/components/pages/dashboard/order-details-modal.tsx',
  'app/[locale]/contact/page.tsx'
];

const replacers = [
  { from: /"Upload Failed"/g, to: 'toastT("uploadFailed")' },
  { from: /"Upload Error"/g, to: 'toastT("uploadError")' },
  { from: /"Promotion created successfully"/g, to: 'toastT("promoCreated")' },
  { from: /"Failed to create promotion"/g, to: 'toastT("promoFailed")' },
  { from: /"Please fill all required fields"/g, to: 'toastT("fillFields")' },
  { from: /"Order updated"/g, to: 'toastT("orderUpdated")' },
  { from: /"Product updated successfully!"/g, to: 'toastT("productUpdated")' },
  { from: /"Product deleted"/g, to: 'toastT("productDeleted")' },
  { from: /"Sharing not supported on this browser"/g, to: 'toastT("shareNotSupported")' },
  { from: /"Comment posted!"/g, to: 'toastT("commentPosted")' },
  { from: /"Follow updated"/g, to: 'toastT("followUpdated")' },
  { from: /"Setup completed successfully!"/g, to: 'toastT("setupSuccess")' },
  { from: /"Setup failed"/g, to: 'toastT("setupFailed")' },
  { from: /"Missing required fields"/g, to: 'toastT("fillFields")' }
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  replacers.forEach(r => {
    content = content.replace(r.from, r.to);
  });

  if (content !== original) {
    if (!content.includes('useTranslations')) {
      content = 'import { useTranslations } from "next-intl";\n' + content;
    }
    
    if (!content.includes('toastT')) {
      content = content.replace(
        /const\s+\{\s*toast\s*\}\s*=\s*useToast\(\)\s*;/g,
        'const toastT = useTranslations("Toasts");\n  const { toast } = useToast();'
      );
      // For OrderStage.tsx and MarketingActionHeader.tsx which don't have useToast explicitly sometimes:
      if (!content.includes('toastT')) {
         content = content.replace(
            /const t = useTranslations\([^)]+\);/,
            '$&\n  const toastT = useTranslations("Toasts");'
         );
      }
    }
    fs.writeFileSync(file, content);
    console.log('Processed ' + file);
  }
});
