const { resolve } = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');

  const imgList = await page.evaluate(() => {
    // toda essa função será executada no browser;

    // vamos pegar todas as imagens que estão na parte de post;
    const nodeList = document.querySelectorAll('article img');

    // transformar o NodeList em array;
    const imgArray = [...nodeList];
    // pegando tudo que esta dentro da variavel nodeList e colocando dentro de uma Array.

    // transformar os nodes (elements html) em objetos JS;
    const imgList = imgArray.map(({ src }) => ({
      // estou pecorrendo a Array e retornando o src da imagem.
      src,
    }));

    // console.log(list);
    // la no console do navegador ele vai mostrar esse console.log.

    // colocar para fora da função;
    return imgList;
  });

  // escrever os dados em um arquivo local (JSON)
  fs.writeFile(
    resolve(__dirname, 'temp', 'instagram.json'),
    JSON.stringify(imgList, null, 2),
    (err) => {
      if (err) {
        throw new Error('Oops... Something went very wrong!');
      }

      return console.log('Done!');
    }
  );

  await browser.close();
})();
