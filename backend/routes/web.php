<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//$router->get('/', function () use ($router) {
//    return $router->app->version();
//});

$router->get('/', 'OrderController@show');


/**
 *  expense api
 */
$router->post('/expense', 'MoneyController@add');
$router->get('/expense', 'MoneyController@get');


/**
 *  expense category api
 */
$router->post('/expense-category', 'ExpenseCategoryController@add');
$router->get('/expense-category', 'ExpenseCategoryController@get');
$router->delete('/expense-category/{id}', 'ExpenseCategoryController@delete');
