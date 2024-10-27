// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://devfolio.co/hackathons');

//   const hackathons = await page.evaluate(() => {
//     const data = [];
//     document.querySelectorAll('.hackathon-card').forEach((card) => {
//       const title = card.querySelector('.hackathon-title').innerText;
//       const date = card.querySelector('.hackathon-date').innerText;
//       data.push({ title, date });
//     });
//     return data;
//   });

//   console.log(hackathons);
//   await browser.close();
// })();

// // let a = document.querySelectorAll(".sc-hKMtZM.sc-gKXOVf.fjJOrc.buNDEE")
// let a = document.querySelectorAll(".sc-edUIhV.sc-jmnVvD.lkMfDp.iWXUkB")
// const b =[...a]
// b.map(h=>h.innerText)