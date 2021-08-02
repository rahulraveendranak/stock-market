<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'user',
            'password' => bcrypt('202cb962ac59075b964b07152d234b70'),
        ]);
    }
}
