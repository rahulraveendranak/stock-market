<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StockMarket;
use App\Http\Controllers\ApiBaseController as ApiBaseController;

class StockMarketController extends ApiBaseController
{
    public function allStockMarketDetails()
    {
        $company = StockMarket::get();
        return $this->sendOk($company, 'Company fetched Successfully', '200');
    }
}
