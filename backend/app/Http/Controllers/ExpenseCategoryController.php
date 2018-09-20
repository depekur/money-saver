<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Laravel\Lumen\Routing\Controller as BaseController;

class ExpenseCategoryController extends BaseController
{

  public function add(Request $request)
  {
    $validator = Validator::make($request->all(),[
      'category' => 'required|unique:expense_category'
    ]);

    if ($validator->fails()) {
      return response()->json(["error" => true, "errors" => $validator->errors()]);
    }

    $id = DB::table('expense_category')->insertGetId(['category' => $request->category]);

    return response()->json(['id' => $id, 'category' => $request->category]);
  }

  public function get()
  {
    $results = DB::select("SELECT * FROM expense_category");

    return response()->json($results);
  }

  public function delete($id)
  {
    $isIn = DB::table('expense')->where('expense_category_id', $id)->first();

    if ($isIn) {
      return response()->json(["error" => "Can't delete category because it contain expenses"]);
    } else {
      $test = DB::table('expense_category')->where('id', $id)->delete();

      return response()->json(["status" => $test]);
    }
  }
}