<?php

namespace App\Http\Controllers;

use Auth;
use JWTAuth;
use Illuminate\Http\Request;
use App\User;
use JWTException;
use Validator;
use App\Http\Controllers\ApiBaseController as ApiBaseController;

class UserController extends ApiBaseController
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return  $this->sendError('Validation Failed', $validator->messages());
        }

        //valid credentials
        $credentials = [
            'username' => $request->username,
            'password' => $request->password,
        ];

        //JWT token validation
        $token = null;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return  $this->sendNotOk('Incorrect Username or Password', '302');
            }
        } catch (JWTException $e) {
            return  $this->sendNotOk('Failed to create a token', '303');
        }

        //Selecting datas of User
        $currentUser = Auth::user();
        $user = User::select('id', 'username')->find($currentUser->id);


        if ($request->get('token')) {
            $result = (new DeviceTokenController)->getDeviceToken($request->get('token'), $currentUser->id);
        }


        return response()->json([
            'status' => 'ok',
            'statuscode'    => '402',
            'message' => 'User logged in successfully',
            'token' => $token,
            'data'    => $user,
        ]);
    }



}
