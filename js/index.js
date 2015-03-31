"use strict";


$(document).ready(function(){

  // Hide unused button when it starts to load the page 
  $("#save").hide();
  $("#signout").hide();
  $("#resetPass").hide();
  $("#loginFailText").hide();
  $("#updateSuccessText").hide();
  $("#updateFailText").hide();

  // load annoucements and links saved previously
  $("#announcement").load("php/content.txt");
  $("#announcement").attr("contenteditable",false);

  $("#signin").click(function(){
    var action = $("#loginForm").attr("action");
    var form_data = {
      username: $("#username").val(),
      password: $("#password").val(),
      is_ajax: 1
  };

    $.ajax({
      type: "POST",
      url: action,
      data: form_data,
      
      success: function(response){
        if(response === "success"){
          // alert("login success");
          $("#loginFailText").hide();
          // Display text editor 
          tinymce.init({
            selector: "#announcement",
            //inline: true,
            theme: "modern",
                  
            plugins: [
                "advlist autolink lists link charmap preview hr",
                "searchreplace wordcount visualblocks visualchars code",
                "nonbreaking table contextmenu directionality",
                "template paste textcolor colorpicker textpattern"
            ],
          
            toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            toolbar2: "preview forecolor backcolor",
            image_advtab: true,

          });

          // show buttons for authorized user
          // hide unused button
          $("#signout").show();
          //$("#resetPass").show();
          // Show "save" button after finishing tinymce.init  
          $.when(tinymce.init).done(function(){
            $("#save").show();
            $("#username").hide();
            $("#password").hide();
          });

          $("#signin").hide();

          // remove user inputs
          $("#username").val("");
          $("#password").val("");


        } else {
          $("#loginFailText").show();
         // alert("login fails");

        }
        }
      });
        return false;
  });

  $("#signout").click(function(){

      var action = $("#loginForm").attr("action");
      var form_data = {
          username: $("#username").val(),
          password: $("#password").val(),
          is_ajax: 0
      };

      $.ajax({

        type: "POST",
        url: action,
        data: form_data,
        success: function(response){

          // alert("logout");
          // Remove text editor 
          $("#announcement").attr("contenteditable",false);
          tinymce.remove("#announcement");

          // Show sign in button and hide unused buttons
          $("#signin").show();
          $("#username").show();
          $("#password").show();

          $("#updateSuccessText").hide();
          $("#updateFailText").hide();
          $("#save").hide();
          $("#resetPass").hide();
          $("#signout").hide();
        }
      });
      return false;
  });

  $("#save").click(function(){

      var data = tinyMCE.activeEditor.getContent();
      var form_data = {
        annoucement:data
      };

      $.ajax({

        type: "POST",
        url: "php/colUpdate.php",
        data:form_data,
        success:function(response){
          if(response === "update") {
            // alert("Update success");
            $("#updateFailText").hide();
            $("#updateSuccessText").show();
          }
          else {
            // alert("The content is the same");
            $("#updateSuccessText").hide();
            $("#updateFailText").show();
          }
        }

      });
      
    });

  $("a.colorbox").colorbox({rel:"colorbox", maxWidth:'95%', maxHeight:'95%'});

  $("a.videoAptus").colorbox({
    inline:true, 
    maxWidth:"%50",
    maxHeight:"%50",
  });

  // Change the size of the video player inside frame
  $("a.videoAptus").click(function(){
    $(".video").attr("width", ($("#cboxOverlay").width())*0.50);
    $(".video").attr("height", ($("#cboxOverlay").height())*0.50);
    //$("#video").attr("autoplay", "1");
  });
});
