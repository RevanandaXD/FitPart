document.addEventListener('DOMContentLoaded', () => {
  const urlParam = new URLSearchParams(window.location.search);
  const brand = urlParam.get('brand-laptop'); // brand laptop
  const series = urlParam.get('series-laptop');  // seri laptop
  const nameSparepart = urlParam.get('specType'); // tipe sparepart
  const value = urlParam.get('specValue');  // seri / code sparepart
  const productType = urlParam.get('type'); // data-set 

  const backBtn = document.getElementById('back-to-spec');

  if (brand && series) {
    backBtn.href = `../specification/laptop-specification.html?brand-laptop=${brand}&series-laptop=${series}`
  };

  let searchQuery = '';
  switch (productType) {
    case 'battery':
      searchQuery = value;
      break;
    case 'adapter':
      searchQuery = "adapter charger " + series;
      break
    case 'storage':
      searchQuery = value;
      break;
    case 'memory':
      searchQuery = value;
      break;
    case 'keyboard':
      searchQuery = series + productType;
      break;
    case 'fan':
      searchQuery = "fan " + series;
      break;
    case 'touchpad':
      searchQuery = "touchpad " + series;
      break;
    case 'hinge':
      searchQuery = "hinge " + series;
      break;
    default:
      searchQuery = series + value;
      break;
  }

  const encodeQuery = encodeURIComponent(searchQuery)

  document.querySelector('.category-pickup').innerHTML = `${nameSparepart} <span class="series-laptop">${series}</span>`;
  document.querySelector('.main-information').textContent = value;
  document.querySelector('.grid-marketplace').innerHTML = `
    <a class="marketplace" href="https://www.tokopedia.com/search?st=product&q=${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      Tokopedia 
    </a>

    <a class="marketplace" href="https://shopee.co.id/search?keyword=${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      Shopee 
    </a>

    <a class="marketplace" href="https://www.blibli.com/cari/${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      Blibli 
    </a>

    <a class="marketplace" href="https://www.lazada.co.id/tag/${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      Lazada 
    </a>

    <a class="marketplace" href="https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText=${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      Alibaba 
    </a>

    <a class="marketplace" href="https://www.aliexpress.com/wholesale?catId=0&initCountry=ID&SearchText=${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      Aliexpress 
    </a>

    <a class="marketplace" href="https://www.amazon.com/s?k=${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      Amazon 
    </a>

    <a class="marketplace" href="https://www.ebay.com/sch/i.html?_nkw=${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      eBay 
    </a>
    
    <a class="marketplace" href="https://www.newegg.com/p/pl?d=${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      newegg
    </a>
    
    <a class="marketplace" href="https://global.microless.com/search/?query=${encodeQuery}" data-aos="zoom-in" data-aos-delay="200">
      Microless
    </a>`
});

