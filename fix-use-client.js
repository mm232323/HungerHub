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

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  if (content.includes('"use client"') || content.includes("'use client'")) {
    // If it's not the first line
    const lines = content.split('\n');
    let useClientIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('"use client"') || lines[i].includes("'use client'")) {
        useClientIndex = i;
        break;
      }
    }

    if (useClientIndex > 0) {
      // It's not on the first line. Remove it and put it on top.
      const match = lines[useClientIndex].match(/['"]use client['"];?/);
      if (match) {
        lines[useClientIndex] = lines[useClientIndex].replace(match[0], '');
        lines.unshift('"use client";');
        content = lines.join('\n');
      }
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
});
