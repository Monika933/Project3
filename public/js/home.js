
$(document).ready(function () {

    var modal1 = document.getElementById("myModal");
    // var modalComment = document.getElementById('commentModal');

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
      modal1.style.display = "none";
    };

    window.onclick = function(event) {
      if (event.target == modal1) {
        modal1.style.display = "none";
      }
    };

var userNameOk = false;
var userNamesArray = [];

  //Start of user login ========================================================================================================

    $("#loginSubmit").on("click", function(event){
        event.preventDefault();
        sessionStorage.clear();

        if ($("#username").val().length > 0 && $("#userPassword").val().length > 0) {
          var submittedPassword = $("#userPassword").val();
          var username = $("#username")
            .val()
            .toLowerCase();
          console.log("LINE 15" + username);
          console.log("LINE 15" + submittedPassword);
          $("#username").val("");
          $("#userPassword").val("");

            // query clients for username and password and check if they match
            $.ajax("/api/clients/"+ username, {
                type: "GET",
                data: username
            }).then(function(dbClient) {
                if (dbClient === null) {
                    $("#modal1Body").empty();
                    modal1.style.display = "block";
                    $("#modal1Body").append(`
                    <div class="text-center">
                            
                    </div>
                    <h4 class="text-center"><font color="red">Invalid Username or Password!</h4>
                     
                    `);
                    setTimeout(() => {
                        modal1.style.display = "none";
                    }, 5000)
                } else {
                    console.log("LINE 25" + dbClient);
                    console.log("My password is" + dbClient.password);
                    var dbPassword = dbClient.password;
                    var userDbID = dbClient.id;

                // Store username and password to sessionStorage
                    sessionStorage.setItem("username", dbClient.username);
                    sessionStorage.setItem("id", dbClient.id);

                        if (submittedPassword !== dbPassword){
                            $("#modal1Body").empty();
                            modal1.style.display = "block";
                            $("#modal1Body").append(`
                            <div class="text-center">
                            
                            </div>
                            <h4 class="text-center"><font color="red">Invalid Username or Password!</h4>
                            `);
                            setTimeout(() => {
                                modal1.style.display = "none";
                            }, 5000)
                        } else{
                            // AJax Put to update LoggedIn to True
                            var login = {
                                loggedIn: true,
                                id: sessionStorage.getItem("id")
                            };

                            $.ajax("/api/login",
                            {
                                type: "PUT",
                                data: login
                            }
                            ).then(function(dbClient) {
                                location.href = "/home";

                            });
                        }
                    }
                });
        } else {
          $("#modal1Body").empty();
          modal1.style.display = "block";
          $("#modal1Body").append(`
          <div class="text-center">
                            
          </div>
          <h4 class="text-center"><font color="red">Invalid Username or Password!</h4>
                `);
          setTimeout(() => {
            modal1.style.display = "none";;
          }, 4000);
        }//end of if statement
    })

//End of user login ========================================================================================================


//Start of Logout ========================================================================================================
    $("#logoutSubmit").on("click", function(event){
        event.preventDefault();
          // AJax Put to update LoggedIn to False
            var logout = {
                loggedIn: false,
                id: sessionStorage.getItem("id")
            };
            $.ajax("/api/logout",
                {
                    type: "PUT",
                    data: logout
                }
            ).then(function(dbClient) {         
        //end of if statement
                sessionStorage.clear();
            // Redirect to Login Page
            location.href="/";
            });
    })
//End of Logout ========================================================================================================

$("#userNameCreate").on("keyup", function() {
    $("#userNameOk").empty();
    if ($("#userNameCreate").val().length > 2) {
      $.ajax("/api/clients", {
        type: "GET",
        data: username
      }).then(function(dbClient) {
        console.log(dbClient);
        for (let i = 0; i < dbClient.length; i++) {
          userNamesArray.push(dbClient[i].username);
        }
  
        if (userNamesArray.includes($("#userNameCreate").val())) {
          $("#userNameOk").html("<h5 style=color:red;>x</h5>");
              userNameOk=false;
  
        } else if (!userNamesArray.includes($("#userNameCreate").val())) {
          $("#userNameOk").html( "<h5 style=color:green;> √</h5>");
              userNameOk = true;
  
        }
      });
    }
    console.log(userNamesArray);
  });



//Start of create user account ========================================================================================================
    $("#signupSubmit").on("click", function (event) {
        event.preventDefault();
        if ($("#userNameCreate").val().length>0 && $("#userPasswordCreate").val().length>0 && $("#userPasswordCreate2").val().length>0
             ) {


            if (userNameOk === true) {
                if($("#userPasswordCreate").val() === $("#userPasswordCreate2").val()){
                        var createUser = {
                            username: $("#userNameCreate").val().toLowerCase(),
                            password: $("#userPasswordCreate").val(),
                           
                            loggedIn: true 
                        }

                            console.log(createUser)
                            //query clients for username and password and check if they match
                            $.ajax("/api/clients", {
                                type: "POST",
                                data: createUser
                            }).then(
                                function () {
                                    $("#modal1Body").empty();
                                        modal1.style.display = "block";
                                    $("#modal1Body").append(`
                                   
                                    <h4 class="text-center"><font color="green">Welcome to Spa Relax</h4>
                                    `);
                                    setTimeout(() => {
                                        location.href = "/";}, 3000);  
                                });


                                $("#userNameCreate").val("");
                                $("#userPasswordCreate").val("");
                                $("#userPasswordCreate2").val("");
                               
                } else{
                        $("#modal1Body").empty();
                        modal1.style.display = "block";
                        $("#modal1Body").append(`
                        <div class="text-center">
                            
                        </div>
                        <h4 class="text-center"><font color="red">Passwords are not matching!</h4>
                        `);
                            setTimeout(() => {
                        modal1.style.display = "none";
                        }, 4000)
                    } 
            }  
            else{
                        $("#modal1Body").empty();
                        modal1.style.display = "block";
                        $("#modal1Body").append(`
                        <div class="text-center">
                            
                        </div>
                        <h4 class="text-center"><font color="red">Username is already in use!</h4>
                        `);
                            setTimeout(() => {
                        modal1.style.display = "none";
                        }, 4000)
                    } 

        }//if any boxes left empty
        else{
            $("#modal1Body").empty();
            modal1.style.display = "block";
            $("#modal1Body").append(`
            <div class="text-center">
                            
            </div>
            <h4 class="text-center"><font color="red">Something is missing!</h4>
            `);
            setTimeout(() => {
                modal1.style.display = "none";
            }, 4000);   
        }
    })

//End of create user account ========================================================================================================


// Start of schedule Appointment ========================================================================================================
    $("#appointmentSubmit").on("click", function(event) {
      event.preventDefault();


      if ( $("#appointmentDuration").val() && $("#appointmentTreatments").val() && $("#appointmentPhoneNumber").val()&& $("#appointmentDay").val()) {
          
                var appointmentCreate = {
                    duration: $("#appointmentDuration").val(),
                    treatment: $("#appointmentTreatments").val(),
                    phoneNumber: $("#appointmentPhoneNumber").val(),
                    day: $("#appointmentDay").val(),
                    ClientId: sessionStorage.getItem("id"),
                    Name: sessionStorage.getItem("username"),
                };

            // }
            $("#appointmentDuration").val(""),
            $("#appointmentTreatments").val(""),
            $("#appointmentPhoneNumber").val(""),
            $("#appointmentDay").val(""),

        console.log(appointmentCreate);
        //query clients for username and password and check if they match
        $.ajax("/api/appointments", {
            type: "POST",
            data: appointmentCreate
            }).then(function(dbClient) {

            console.log(dbClient);

            $("#modal1Body").empty();
            modal1.style.display = "block";
            $("#modal1Body").append(`
                
                 <h4 class="text-center"><font color="green">Appoitment successfully booked!</h4>
            `);
            setTimeout(() => {
                location.href = "/home";
            }, 2000);  
        });
      } else {
        //end of if statement
            $("#modal1Body").empty();
            modal1.style.display = "block";
            $("#modal1Body").append(`
                
                <h4 class="text-center"><font color="red">Something is missing, please fill out the missing fields! </h4>
            `);
            setTimeout(() => {
              modal1.style.display = "none";
            }, 4000);   
      }
    });
// End of create Appointment ========================================================================================================


// Delete Acct ========================================================================================================
    $("#deleteSubmit").on("click", function(event) {
      event.preventDefault();
        console.log("user delete");
            $("#modal1Body").empty();
                modal1.style.display = "block";
                $("#modal1Body").append(`
                    <div class="text-center modal-content-head-img-bottom-space2">
                        <img class="model-content-head-img" src="images/client.png" alt="">
                    </div>
                    <div class="container">
                        <div class="jumbotron">
                            <h1 class="text-center">Client Account Deletion</h1>
                        </div>
                        <div class="row modal-content-button-space">
                            <div class="col-md-12">
                                <h5><span style="color:red">Warning: </span>Clicking the "Confirm" Button below will delete your account and all associated Appointments. This action is final!</h5>         
                            </div>
                        </div>
                        <div class="row">
                            <div class=" offset-md-4 col-md-2">
                                <button id="deleteConfirm" class="btn btn-danger">Submit</button>
                            </div>
                            <div class=" col-md-2">
                                <a class="btn btn-primary" href="/home">Cancel</a>
                            </div>
                        </div>
                    </div>
               `);
            });

    $("#myModal").on("click", "#deleteConfirm", function(event) {
     event.preventDefault();     
      var id = sessionStorage.getItem("id");
      console.log(id);

            $.ajax("/api/appointments/delete/" + id, {
            type: "DELETE",
            }).then(function(dbClient) {
                deleteUser(id);
                setTimeout(() => {
                }, 4000);  
            })


            function deleteUser(id){
                $.ajax("/api/clients/" + id, {
                type: "DELETE",
                }).then(function(dbClient) {
                    $("#modal1Body").empty();
                    modal1.style.display = "block";
                    $("#modal1Body").append(`
                        <div class="text-center modal-content-head-img-bottom-space2">
                            <img class="model-content-head-img" src="images/client.png" alt="">
                        </div>
                        <h4 class="text-center">Client Account Deleted!</h4>
                        <h4 class="text-center">We're Sorry to see You go.</h4>
                    `);
                    setTimeout(() => {
                        location.href = "/";
                    }, 6000);  
                });
            }
    });

    
// End of Delete ========================================================================================================

// Update Acct ========================================================================================================
let username = $("#usernameAccountSettings");
let password = $("#userPasswordUp1");
let password2 = $("#userPasswordUp2");
let id = $("#accountID");
    


$("#editAccountSubmit").on("click", function(event) {
      event.preventDefault();

      var id = sessionStorage.getItem("id");
      console.log(id);

      $.ajax("/api/clients1/" + id, {
        type: "GET",
        data: id
      }).then(function(dbClient) {
        console.log("LINE 25", dbClient);
 
        $("#modal1Body").empty();
        modal1.style.display = "block";
        $("#modal1Body").append(`
            <div class="text-center modal-content-head-img-bottom-space2">
                <img class="model-content-head-img" src="images/client.png" alt="">
            </div>
            <div class="container">
            <div id="accountID"></div>
                <div class="jumbotron">
                    <h1 class="text-center">Edit Your Account Settings</h1>
                </div>
                <div class="row">
                    <div class="offset-md-3 col-md-6">
                        <form>
                            <div class="form-group">
                                <label for="password">Password <span style="color: red">*</span></label>
                                <input id="userPasswordUp1" type="text" class="form-control text-center">
                                <small class="form-text text-muted">Must be at least 3 characters min</small>
                            </div>
                            <div class="form-group">
                                <label for="password">Password <span style="color: red">*</span></label>
                                <input id="userPasswordUp2" type="text" class="form-control text-center">
                                <small class="form-text text-muted">Must be at least 3 characters min</small>
                            </div>
                            <div class="form-group">
                                <label for="img">User Image (Not Required but Welcomed!)</label>
                                <input id="#userPic" type="text" class="form-control text-center" maxlength='500' >
                                <small class="form-text text-muted">Enter a Link to Your Profile Photo</small>
                            </div>
                            <div class="form-group">
                                <label for="secQuestionOne">Security Question 1 <span style="color: red">*</span></label>
                                <select class="form-control" id="secQuestionOneUp">
                                    <option>What is you mothers maiden name?</option>
                                    <option>Name of your childhood best friend?</option>
                                    <option>Make of your first car?</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="secQuestionOneAnswer">Security Question 1 Answer <span style="color: red">*</span></label>
                                <input id="secQA1" type="text" class="form-control text-center">
                            </div>
                            <div class="form-group">
                                <label for="secQuestionTwo">Security Question 2 <span style="color: red">*</span></label>
                                <select class="form-control" id="secQuestionTwoUp">
                                    <option>Name of your first pet?</option>
                                    <option>Name of your high school mascot?</option>
                                    <option>City of your birth?</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="secQuestionTwoAnswer">Security Question 2 Answer <span style="color: red">*</span></label>
                                <input id="secQA2" type="text" class="form-control text-center">
                            </div>
                            <div class="form-group">
                                <label for="secQuestionThree">Security Question 3 <span style="color: red">*</span></label>
                                <select class="form-control" id="secQuestionThreeUp">
                                    <option>What is your favorite color?</option>
                                    <option>Name of the street you grew up on?</option>
                                    <option>Apple or Samsung?</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="secQuestionThreeAnswer">Security Question 3 Answer <span style="color: red">*</span></label>
                                <input id="secQA3" type="text" class="form-control text-center">
                            </div>
                            <div class="form-group">
                                <label for="text"> <span style="color: red">*</span> Indicates a Required Field</label>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class=" col-md-2">
                        <button id="accountUpdateSubmit" class="btn btn-primary">Submit</button>
                    </div>
                    <div class=" col-md-2">
                        <a class="btn btn-primary" href="/home">Cancel</a>
                    </div>
                </div>
            </div>
        `);


username = $("#usernameAccountSettings");
password = $("#userPasswordUp1");
password2 = $("#userPasswordUp2");
id = $("#accountID");
    


        password.val(dbClient.password);
        password2.val(dbClient.password);
        id.val(dbClient.id);
        username.val(dbClient.username);
        
      }); 

})


    $("#myModal").on("click", "#accountUpdateSubmit", function (event) {
        event.preventDefault();
        if ($("#userPasswordUp1").val() && $("#userPasswordUp2").val() && $("#secQA1").val() && $("#secQA2").val() && $("#secQA3").val() ) {

                if($("#userPasswordUp1").val() === $("#userPasswordUp2").val()){

                        var updateUser = {
                            username: $("#usernameAccountSettings").val(),
                            password: $("#userPasswordUp1").val(),
                        
                            id: $("#accountID").val(),
                            loggedIn: true  
                        }

                            //query clients for username and password and check if they match
                            $.ajax("/api/updateAcct", {
                                type: "PUT",
                                data: updateUser
                            }).then(
                                function () {
                                    console.log("user updated");
                                        $("#modal1Body").empty();
                                            modal1.style.display = "block";
                                        $("#modal1Body").append(`
                                            <div class="text-center modal-content-head-img-bottom-space2">
                                                <img class="model-content-head-img" src="images/client.png" alt="">
                                            </div>
                                            <h4 class="text-center">Account Successfully Updated!</h4>
                                        `);
                                        setTimeout(() => {
                                            location.href = "/home";
                                        }, 3000);  
                                     });                                               
                            } else
                                $("#modal1Body").empty();
                                    modal1.style.display = "block";
                                    $("#modal1Body").append(`
                                        <div class="text-center modal-content-head-img-bottom-space2">
                                            <img class="model-content-head-img" src="images/client.png" alt="">
                                        </div>
                                    <h4 class="text-center">Your Passwords Do Not Match!</h4>
                                `);
                                setTimeout(() => {
                                    modal1.style.display = "none";
                                }, 2000); 

                     }//end of if statement
                    else{
                        $("#modal1Body").empty();
                            modal1.style.display = "block";
                            $("#modal1Body").append(`
                                <div class="text-center modal-content-head-img-bottom-space2">
                                    <img class="model-content-head-img" src="images/client.png" alt="">
                                </div>
                            <h4 class="text-center">Please Fill Out all Boxes marked with <span style="color: red">*</span></h4>
                        `);
                        setTimeout(() => {
                            modal1.style.display = "none";
                        }, 2000); 
                    } 
                })    



// End of Update Acct ========================================================================================================

});
