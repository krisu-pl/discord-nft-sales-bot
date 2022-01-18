import {add, isBefore} from "date-fns";
import fetch from "node-fetch";

// In minutes, time to cache the price
const MINUTES_CACHE = 60

class _EthPrice {
    price = 0;
    updatedAt: Date | undefined = undefined;

    async get(): Promise<number> {
        if (!this.price || this.isOutdated()) {
            return this.fetchPrice()
        }
        return this.price
    }

    isOutdated() {
        if (!this.updatedAt) return true;

        const minUpdateDate = add(this.updatedAt, {minutes: MINUTES_CACHE})

        // if minimum update date is before now, then should be updated
        return isBefore(minUpdateDate, new Date())

    }

    async fetchPrice(): Promise<number> {
        console.log('Fetching ETH price')
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
        const responseJson: { USD: number } = await response.json();
        const ethPrice = responseJson.USD

        this.price = ethPrice;
        this.updatedAt = new Date();

        console.log('New ETH Price:', ethPrice)
        return ethPrice
    }
}

export const EthPrice = new _EthPrice();
