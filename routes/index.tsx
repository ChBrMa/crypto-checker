/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps} from "$fresh/server.ts"

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

export interface Root {
  time: Time
  disclaimer: string
  chartName: string
  bpi: Bpi
}

export interface Time {
  updated: string
  updatedISO: string
  updateduk: string
}

export interface Bpi {
  USD: Usd
  GBP: Gbp
  EUR: Eur
}

export interface Usd {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

export interface Gbp {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

export interface Eur {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

export const handler: Handlers<Root | null> = {
  async GET(_, ctx) {
    const resp = await fetch(url);

    if (resp.status === 200) {
      const price:Root = await resp.json();

      return ctx.render(price)
    }

    return ctx.render(null)
  }
}

export default function Home({data}: PageProps<Root | null>) {
  if(!data) {
    return <h1>Data is not available</h1>
  }
  const date = new Date();

  return (

    <div class={tw`w-screen h-screen bg-gray-900`}>

    <div class={tw`p-8 mx-auto max-w-screen-md bg-gray-900`}>
      <img
        src="/btc64.svg"
        width="200px"
        class="mx-auto"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-10 text(center 3xl white)`}>
       Bitcoin price checker
      </p>

      <p class={tw`my-10 text(center 2xl white)`}>
       EUR: {data.bpi.EUR.rate}€
      </p>
      <p class={tw`my-10 text(center 2xl white)`}>
       USD: ${data.bpi.USD.rate}
      </p>
      <p class={tw`my-10 text(center 2xl white)`}>
       GBP: ${data.bpi.GBP.rate}
      </p>
      <p class={tw`my-10 text(center md white)`}>
       Last Fetched at {data.time.updated}
       
      </p>
    </div>
    </div>
  );
}
