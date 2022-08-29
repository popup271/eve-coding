import { json } from 'express';
import sqlite3 from 'sqlite3';

const REGIONS_URL = "https://esi.evetech.net/latest/universe/regions/?datasource=tranquility"

async function getEsiURL(url: string) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function getEsiURLHeader(url: string) {
  const response = await fetch(url);
  const headers = response.headers.get('x-pages');

  return headers;

}

async function getContracts(region: string) {
  const url = "https://esi.evetech.net/latest/contracts/public/" + region + "/?datasource=tranquility&page=1"
  const pageCount = getEsiURLHeader(url);
  const pageInt = parseInt(await pageCount);

  for (let i = 1; i <= pageInt; i++) {
    const urlPages = "https://esi.evetech.net/latest/contracts/public/" + region + "/?datasource=tranquility&page=" + i
    console.log(urlPages)
    const respone = await fetch(urlPages);
    const json = await respone.json();
    console.log(json);
    console.log(i);
  }
}



async function main() {
  const regions: number[] = await getEsiURL(REGIONS_URL);
  console.log(regions);
  await getContracts("10000043");

}

main();
