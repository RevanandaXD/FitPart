async function brandseries() {
  try {
    const res = await fetch('../assets/script/data/data.json');
    const data = await res.json();

    const brandSelect = new Choices('#input-brand', {
      searchEnable: true,
      placeholder: true,
      itemSelectText: '',
      shouldSort: false
    });

    const brandMap = {
      "1": "Asus",
      "2": "Acer",
      "3": "Lenovo",
      "4": "HP",
      "5": "Dell",
      "6": "MSI"
    };

    const seriesSelect = new Choices('#input-series', {
      searchEnable: true,
      placeholder: true,
      itemSelectText: '',
      shouldSort: false
    })

    const brandOption = Object.keys(data).map(key => ({
      value: key,
      label: brandMap[key]
    }));

    brandSelect.setChoices([{value: '', label: 'Choose Brand Laptop', disable: true, selected: true}, ...brandOption],'value', 'label', true);

    brandSelect.passedElement.element.addEventListener('change', () => {
      const brandValue = brandSelect.getValue(true)
      seriesSelect.clearStore();

      if (data[brandValue]) {
          const seriesOptions = Object.keys(data[brandValue]).map(series => ({
          value: series,
          label: series
        }));
        seriesSelect.setChoices(seriesOptions, 'value','label', true);
        seriesSelect.enable();
      } else {
        seriesSelect.disable();
      }
    })
  } catch (err) {
    console.log(err)
  }
}

brandseries()


