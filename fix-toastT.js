const fs = require('fs');

const files = [
  'shared/components/pages/auth/merchant-setup/StepFour.tsx',
  'shared/components/pages/dashboard/MarketingActionHeader.tsx',
  'shared/components/pages/dashboard/ProductActionHeader.tsx',
  'shared/components/pages/dashboard/ProductTabBody.tsx',
  'shared/components/pages/discover/ArticleActions.tsx',
  'shared/components/pages/discover/ArticleCard.tsx',
  'shared/components/pages/discover/FeedAdCard.tsx',
  'shared/components/pages/merchant/MerchanBody.tsx',
  'shared/components/pages/merchant/MerchantInfo.tsx',
  'shared/components/pages/dashboard/OrderStage.tsx',
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  if (content.includes('toastT') && !content.includes('const toastT =')) {
    // try to insert after useToast()
    if (content.includes('const { toast } = useToast()')) {
      content = content.replace(
        /const\s+\{\s*toast\s*\}\s*=\s*useToast\(\);/g,
        'const toastT = useTranslations("Toasts");\n  const { toast } = useToast();'
      );
    } else {
      // Find the first occurrence of `function` or `=> {` and insert inside
      content = content.replace(
        /function\s+\w+\s*\([^)]*\)\s*\{/,
        '$&\n  const toastT = useTranslations("Toasts");'
      );
      content = content.replace(
        /const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{/,
        '$&\n  const toastT = useTranslations("Toasts");'
      );
    }
  }

  // Double check OrderStage.tsx and MarketingActionHeader.tsx since they might have it inserted multiple times
  // or not at all. Let's just do it securely.
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  } else {
    console.log('No fix needed or failed to find injection point for ' + file);
  }
});
