<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Chat;
use App\Events\MessageData;
class UserController extends Controller
{
    public function loadDashboard(){
      $users=   User::whereNotIn('id',[auth()->user()->id])->get();
        return view('dashboard', compact('users'));
    }

    public function saveChat(request $request){
      try{
        $chat=Chat::create([
          'sender_id'=>$request->sender_id,
          'receiver_id'=>$request->receiver_id,
          'message'=>$request->message

        ]);
        event(new MessageData($chat));
        return response()->json(['success'=>true,'data'=>$chat]);
      }
      catch(\Exception $e){
        return response()->json(['success'=>false,'message'=>$e->getMessage()]);
      }
    }
}
