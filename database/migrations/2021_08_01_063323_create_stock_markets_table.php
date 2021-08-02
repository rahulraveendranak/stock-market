<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockMarketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_markets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->double('current_market_price', 15, 8);
            $table->double('market_cap', 15, 8);
            $table->double('stock_p_e', 15, 8);
            $table->double('dividend_yield', 15, 8);
            $table->double('roce_percentage', 15, 8);
            $table->double('roe_previous_annum', 15, 8);
            $table->double('debt_to_equity', 15, 8);
            $table->double('eps', 15, 8);
            $table->double('reserves', 15, 8);
            $table->double('dedt', 15, 8);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_markets');
    }
}
