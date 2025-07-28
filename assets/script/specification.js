async function loadSpec() {
  const param = new URLSearchParams(window.location.search);
  const brand = param.get('brand-laptop');
  const series = param.get('series-laptop');
  const infospec = document.querySelector('.spec-info');
  const otherseries = document.querySelector('.series-other');

  // GSAP
  const loading = document.querySelector('.loading')
  const letters = document.querySelectorAll(".text span");
  const tl = gsap.timeline();
  tl.to(letters, {
    duration: 0.6,
    y: 0,
    stagger: 0.05,
    ease: "power2.out",
  })
  .to(letters, {
    "--clipPath": "inset(0% 0 0 0)",
    duration: 0.8,
    delay: 0.3,
    ease: "power1.inOut"
  })
  .to(letters, {
    duration: 0.6,
    y: 100,
    stagger: 0.05,
    delay: 0.5
  })

  try {
    console.log("URL Params:", brand, series);

    if (brand && series) {
      const res = await fetch("https://gist.githubusercontent.com/RevanandaXD/74507b813f28762cf6b6d9e9591fe588/raw/data.json");
      const data = await res.json();

      await new Promise(resolve => setTimeout(resolve, 3100));
      const result = data[brand]?.[series];

      loading.style.display = 'none';

      if (result) {
        const spec = result.specification;

        displaySpecData(result, spec, infospec);
        displayProductGrid(spec, result, brand, series);

        const memoryLink = document.querySelector('#memory');
        const type = document.querySelector('.memory')
        if (spec.Memory.includes("LPDDR")) {
          memoryLink.classList.add('disabled'); 
          memoryLink.removeAttribute('href'); 
          type.textContent = "Not Avaiable"
        }

      }
    } else {
      infospec.textContent = "No data found. Please select a product.";
    }

    displayOtherSeries(brand, otherseries);
  } catch (err) {
    infospec.textContent = "Error Loading Data Spec";
    console.log(err);
  }
}

function displaySpecData(result, spec, infospec) {
  infospec.innerHTML = `
    <h2 class="device-type">${result.deviceType}</h2>
    <h1 class="device-name">${result.deviceName}</h1>
    <h2 class="section-title">Specification</h2>
    <ul class="spec-list">
      <li><strong>Processor:</strong><span>${spec.Processor}</span></li>
      <li><strong>Graphics:</strong><span>${spec.Graphics}</span></li>
      <li><strong>Memory:</strong><span>${spec.Memory}</span></li>
      <li><strong>Storage:</strong><span>${spec.Storage}</span></li>
      <li><strong>Wireless:</strong><span>${spec.Wireless}</span></li>
      <li><strong>Battery:</strong><span>${spec.Battery}</span></li>
    </ul>
  `;
}

function displayProductGrid(spec, result, brand, series) {
  const category = document.querySelector('.product-grid');
  category.innerHTML = `
    <a class="product-card" data-aos="zoom-in" data-aos-delay="200" href="../product/product-page.html?brand-laptop=${brand}&series-laptop=${series}&specType=Battery&specValue=${spec.BatteryModel}&type=battery" data-type="battery">
      <div class="about">
        <h2 class="type">Battery</h2>
        <p class="value">${spec.BatteryModel}</p>
      </div>
    </a>
    <a class="product-card" data-aos="zoom-in" data-aos-delay="200" href="../product/product-page.html?brand-laptop=${brand}&series-laptop=${series}&specType=Power Adapter&specValue=${spec.PowerAdapter}&type=adapter" data-type="adapter">
      <div class="about">
        <h2 class="type">Power Adapter</h2>
        <p class="value">${spec.PowerAdapter}</p>
      </div>
    </a>
    <a class="product-card" data-aos="zoom-in" id="memory" data-aos-delay="200" href="../product/product-page.html?brand-laptop=${brand}&series-laptop=${series}&specType=Memory&specValue=${spec.SpeedRam}&type=ram" data-type="ram">
      <div class="about">
        <h2 class="type memory">Memory</h2>
        <p class="value">${spec.SpeedRam}</p>
      </div>
    </a>
    <a class="product-card" data-aos="zoom-in" data-aos-delay="200" href="../product/product-page.html?brand-laptop=${brand}&series-laptop=${series}&specType=Storage&specValue=${spec.Gen}&type=storage" data-type="storage">
      <div class="about">
        <h2 class="type">Storage</h2>
        <p class="value">${spec.Gen}</p>
      </div>
    </a>
    <a class="product-card" data-aos="zoom-in" data-aos-delay="200" href="../product/product-page.html?brand-laptop=${brand}&series-laptop=${series}&specType=Keyboard&specValue=${spec.Keyboard}&type=keyboard" data-type="keyboard">
      <div class="about">
        <h2 class="type">Keyboard</h2>
        <p class="value">${spec.Keyboard}</p>
      </div>
    </a>
    <a class="product-card" data-aos="zoom-in" data-aos-delay="200" href="../product/product-page.html?brand-laptop=${brand}&series-laptop=${series}&specType=Fan&specValue=${result.deviceName}&type=fan" data-type="fan">
      <div class="about">
        <h2 class="type">Fan</h2>
        <p class="value">${result.deviceName}</p>
      </div>
    </a>
    <a class="product-card" data-aos="zoom-in" data-aos-delay="200" href="../product/product-page.html?brand-laptop=${brand}&series-laptop=${series}&specType=Touch Pad&specValue=${result.deviceName}&type=touchpad" data-type="touchpad">
      <div class="about">
        <h2 class="type">Touch Pad</h2>
        <p class="value">${result.deviceName}</p>
      </div>
    </a>
    <a class="product-card" data-aos="zoom-in" data-aos-delay="200" href="../product/product-page.html?brand-laptop=${brand}&series-laptop=${series}&specType=Hinge&specValue=${result.deviceName}&type=hinge" data-type="hinge">
      <div class="about">
        <h2 class="type">Hinge</h2>
        <p class="value">${result.deviceName}</p>
      </div>
    </a>
  `;
}

function displayOtherSeries(brand, otherseries) {
  const brandSeries = {
    "1": ["Vivobook", "Zenbook", "ROG", "TUF", "ExpertBook"],
    "2": ["Aspire", "Swift", "Predator", "TravelMate", "Spin"],
    "3": ["IdeaPad", "ThinkPad", "Legion", "Yoga", "LOQ"],
    "4": ["Pavilion", "Spectre", "Envy", "Omen", "Victus"],
    "5": ["Inspiron", "XPS", "Alienware", "Latitude", "Vostro"],
    "6": ["Thin", "Katana", "Stealth", "Creator", "Modern"]
  };

  if (brand && brandSeries[brand]) {
    const showSeries = brandSeries[brand];
    otherseries.innerHTML = `<h2 class="series-title">Other Series</h2>`;

    for (let type of showSeries) {
      const a = document.createElement('a');
      a.href = `../search/search-page.html`;
      a.className = 'series-link';
      a.textContent = type;
      otherseries.appendChild(a);
    }
  }
}

window.addEventListener('DOMContentLoaded', loadSpec);
