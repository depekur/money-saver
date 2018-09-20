<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Laravel\Lumen\Routing\Controller as BaseController;


class MoneyController extends BaseController
{
  public function add(Request $request)
  {
    $validator = Validator::make($request->all(),[
      'date' => 'required|integer',
      'category' => 'required|integer',
      'amount' => 'required',
      'body' => 'nullable|max:160'
    ]);

    if ($validator->fails()) {
      return response()->json(["error" => true, "errors" => $validator->errors()]);
    }

    $expense = [
      'date' => $request->date,
      'expense_category_id' => $request->category,
      'amount' => $request->amount,
      'body' => $request->body ? $request->body : false
    ];


    $results = DB::table('expense')->insert($expense);


    return response()->json(['status' => $results]);
  }

  public function get()
  {
    //todo from - to filtering
//    $from = Input::get('from');
//    $to =    Input::get('to');

    $results = DB::table('expense')
      ->join('expense_category', 'expense.expense_category_id', '=', 'expense_category.id')
      ->select('expense.id', 'expense.date', 'expense.amount', 'expense.body', 'expense_category.category')
      ->get();

    $totals = array();
    $totals['all'] = ["name" => "Total", "sum" => 0, "count" => count($results->toArray())];

    foreach ($results->toArray() as $result) {
      //$result->date = date("jS \of F Y",  intval($result->date));
      if ($result->body == '0') {
        $result->body = false;
      }

      if (isset($totals[$result->category])) {
        $totals[$result->category]["sum"] += $result->amount;
        $totals[$result->category]["count"] += 1;
      } else {
        $totals[$result->category] = [
          "name" => ucfirst($result->category),
          "sum" => $result->amount,
          "count" => 1
        ];
      }

      $totals['all']["sum"] += $result->amount;

      $totals[$result->category]["sum"] = round($totals[$result->category]["sum"], 2);
      $totals['all']["sum"] = round($totals['all']["sum"], 2);
    }

    $_total = [];
    foreach ($totals as $total) {
      $_total[] = $total;
    }

    return response()->json(["expenses" => $results, "total" => $_total]);
  }
}