# FastFeet

## About 
 - In this challenge we will develop an API to control orders for a fictitious carrier, FastFeet. 

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### Functional

 [ ] The application must have two types of users, delivery personnel and/or admin.
 [ ] It must be possible to login with CPF and password.
 [x] CRUD operations must be possible for delivery personnel.
 [ ] CRUD operations must be possible for orders.
 [x] CRUD operations must be possible for recipients.
 [ ] It must be possible to mark an order as awaiting pickup (available for retrieval).
 [ ] It must be possible to pick up an order.
 [ ] It must be possible to mark an order as delivered.
 [ ] It must be possible to mark an order as returned.
 [ ] It must be possible to list orders with delivery addresses near the delivery personnel's location.
 [ ] It must be possible to change a user's password.
 [ ] It must be possible to list a user's deliveries.
 [ ] Recipients must be notified of every status change in their order.

### Non-Functional

 [ ] Only admin users can perform CRUD operations on orders.
 [ ] Only admin users can perform CRUD operations on delivery personnel.
 [ ] Only admin users can perform CRUD operations on recipients.
 [ ] Uploading a photo is mandatory to mark an order as delivered.
 [ ] Only the delivery personnel who picked up the order can mark it as delivered.
 [ ] Only admin users can change a user's password.
 [ ] Delivery personnel cannot list orders of other delivery personnel.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

