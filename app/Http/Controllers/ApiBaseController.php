<?php

namespace App\Http\Controllers;

/*
--------------------------------------------
Validation Message Functions  for API's
--------------------------------------------
*/

class ApiBaseController extends Controller
{

    //Send Response as Okay with data
    public function sendOk($result, $message,$code)
    {
    $response = [
            'status' => 'ok',
            'statuscode'    => $code,
            'message' => $message,
            'data'    => $result, 
        ];

        return response()->json($response, 200);
    }

    //Send Response as Okay without data
    public function sendResponse( $message,$code)
    {
    $response = [
            'status' => 'ok',
            'statuscode'    => $code,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    //Send Response as not Okay without data
    public function sendNotOk( $message,$code)
    {
    $response = [
            'status' => 'notok',
            'statuscode'    => $code,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    //Send error message
    public function sendError($error, $errorMessages = [])
    {
        $response = [
            'status' => "notok",
            'message' => $error,
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response);
    }

    //Send custom status message with data
    public function sendStatus($status,$result, $message,$code)
    {
    $response = [
            'status' => $status,
            'statuscode'    => $code,
            'message' => $message,
            'data'    => $result, 
        ];

        return response()->json($response, 200);
    }
}
