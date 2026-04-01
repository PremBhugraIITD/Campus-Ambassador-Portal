import puppeteer from "puppeteer";

const defaultOptions = {
  format: "A4",
  printBackground: true,
};

async function htmlToPdf(html, options = defaultOptions) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );
  await page.setContent(html, { waitUntil: "load" });

  const pdf = await page.pdf(options);
  await browser.close();

  return Buffer.from(pdf);
}

export default htmlToPdf;
