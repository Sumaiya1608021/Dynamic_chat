<x-app-layout>
<div class="container mt-4">
<div class="row">
    @if(count($users)>0)

<div class='col-md-3'>
    <ul class="list-group">
        @foreach ($users as $user)
            @php
                if($user->image != ''&& $user->image != null){
                    $image= $user->image;
                }
                else{
                    $image='images/dummy.png';
                }
            @endphp
            <li class="list-group-item list-group-item-dark cursor-pointer user-list" data-id="{{$user->id}}">
            <img src="{{$user->image}}" alt="" class="user-image">
                {{$user->name}}
                <b><sup id="{{$user->id}}-status" class="offline-status">Offline</sup></b>
            </li>
        @endforeach
    </ul>

</div>

   <div class="col-md-9">
    <h3 class="start-head">Click to start the chat</h3>
    <div class="chat-section">
        <div id="chat-container">
           
        </div>
        <form action=""id="chat-form">
            <input type='text' name='message'  placeholder='Enter Message'id='message' class='border' required>
            <input type='submit' value='Send Message' class='btn btn-primary'>


        </form>
    </div>
   </div>
    
@else
   <div class='col-md-12'>
    <h6>User not found</h6>
</div> 
@endif




</div>
</div>
</x-app-layout>
