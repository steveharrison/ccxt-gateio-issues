import fs from 'fs';
import ccxt from 'ccxt';

const exchangeInfo = JSON.parse(fs.readFileSync('.credentials.json'));

const gateio = new ccxt.gateio({
  apiKey: exchangeInfo.apiKey,
  secret: exchangeInfo.secret,
  enableRateLimit: true
});

gateio.verbose = true;

(async function() {
  // Issue #1: Market orders don't work with CCXT.
  await gateio.createMarketBuyOrder('GRT/USDT', 20);

  // Issue #2: Stop loss orders don't work with CCXT.
  const sellOrder = await gateio.createLimitSellOrder('ALGO/USDT', 2, 4, {
    'trigger': {
      'price': '100',
      'rule': '>=',
      'expiration': 3600
    },
    'put': {
      'type': 'limit',
      'side': 'sell',
      'price': '2.15',
      'amount': '2.00000000',
      'account': 'normal',
      'time_in_force': 'gtc'
    },
    'market': 'ALGO_USDT'
 });
})();
