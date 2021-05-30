export const initCurrencyWidget = () => {
  const currency = document.getElementById('rates');

  fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .then(res => res.json())
    .then(data => {
      data.forEach(i => {
        const el = document.createTextNode(`${i.ccy}: ${i.buy} / ${i.sale}`);
        const elWrapper = document.createElement('div');
        elWrapper.appendChild(el);
        currency.appendChild(elWrapper);
      })
    });
}