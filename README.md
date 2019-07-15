# Poppy Link

## Getting started

Import the library to your HTML document:

```javascript
https://raw.githack.com/sesame-seed/poppy-link/master/dist/poppy.js
```

Once has been imported, you will get a `PoppyLink` instance in window object `window.PoppyLink`

## Methods

- `PoppyLink.requestPayment(toAddress: string, amount: number, description: string)`

Will return a JSON with the following fields:

- `id`
- `address` where should be deposited the cryptos
- `currency`, only TRX supported at this moment (TRX = 0)
- `created_at`
- `expires_at`, time until the payment is valid
- `status`: PENDING | COMPLETE | EXPIRED
- `description` of the payment
- `amount`

In case of error will response with a 500.

**Response example**

```json
{
  "id": 18,
  "address": "TVxZJvKAUavyyg52XTPyt5c2cbgxQw8hbV",
  "currency": 0,
  "created_at": "2019-07-15T18:53:26.100Z",
  "expires_at": "2019-07-16T18:53:26.100Z",
  "address_target": "TUU7cGfEHwLtm6boViCWzFcjP7ZmTCD6pj",
  "status": "PENDING",
  "description": "Hola",
  "amount": 100
}
```

- `PoppyLink.getPaymentStatus(id: number)`

Get the status of a payment. The response output is the same that the described before for the `requestPayment` method.

- `PoppyLink.paymentSubscribe(id: number, callback: (status: PaymentStatusResponse) => void)`

Giving a `payment id` and a callback that will receive a Payment Status until the payment has the `COMPLETE` status.

## Live example

- [DEMO](https://raw.githack.com/sesame-seed/poppy-link/master/dist/poppy.html) | [Source Code](https://github.com/sesame-seed/poppy-link/blob/master/dist/poppy.html)

## Credits

Sesameseed &copy; 2019
