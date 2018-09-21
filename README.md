# Money Saver

Test task for [Cygnati](https://cygnati.com/) company. Simple app for recording expenses

## Stack

Backend: 
[Lumen](https://lumen.laravel.com/) | 
`SQLite`

Frontend: 
[Angular](https://angular.io/) | 
[Angular Material](https://material.angular.io/)  


## Requirements
`Apache with mod_rewrite All`

`PHP >= 7.1.3`

`Angular CLI >= 6.0.0`

`Nodejs >= 8.11.1`

## Setup

```bash
git clone git@github.com:depekur/money-saver.git
cd money-saver/backend
composer install
cd ../frontend
npm i
ng build --prod

make your server look in folder money-saver/public
```

## Tests

```bash
cd frontend
ng test
```