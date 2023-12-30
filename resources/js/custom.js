$.ajaxSetup({
headers:{
  'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
}

});

Echo.join('status-update')
.here((users)=>{
  for(let x=0 ; x < users.length; x++){
    if(sender_id != users[x]['id']){
        $('#'+users[x]['id']+'-status').removeClass('offline-status');
        $('#'+users[x]['id']+'-status').addClass('online-status');
        $('#'+users[x]['id']+'-status').text('Online');
    }
  }
})
.joining((user)=>{
    $('#'+user.id+'-status').removeClass('offline-status');
    $('#'+user.id+'-status').addClass('online-status');
    $('#'+user.id+'-status').text('Online');
})
.leaving((user)=>{
    $('#'+user.id+'-status').addClass('offline-status');
    $('#'+user.id+'-status').removeClass('online-status');
    $('#'+user.id+'-status').text('Offline');
})

.listen('UserStatusUpdate',(e)=>{
    
});
$(document).ready(function(){
  $('.user-list').click(function(){
    $('#chat-container').html('');

    var getUserId=$(this).attr('data-id');
    receiver_id=getUserId;

    $('.start-head').hide();
    $('.chat-section').show();
  });

//save chat work 
$('#chat-form').submit(function(e){
  e.preventDefault();
  var message=$('#message').val();

  $.ajax({
    url:"/save-chat",
    type:"POST",
    data:{sender_id:sender_id,receiver_id:receiver_id,message:message},
    success:function(response){
      if(response.success){
        $('#message').val('');
        let chat=response.data.message;
        let html=`<div class="current-user-chat">
        <h4> `+chat+`</h4>
      </div>`;
      $('#chat-container').append(html);
      }
      else{
        alert(response.msg);
      }
}
})
});
});
Echo.private('broadcast-message')
.listen('.getChatMessage',(data)=>{
  if(sender_id==data.chat.receiver_id && receiver_id==data.chat.sender_id){
  let html=`<div class="distance-user-chat">
        <h4> `+data.chat.message+`</h4>
      </div>`;
      $('#chat-container').append(html);
  }
});





























