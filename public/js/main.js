$(document).ready(function() {
    // Initialize variables
    var $window = $(window);
    var socket = io();
    //console.log("Document Ready");
    //Attach Eventlistener
    $( "#sendIotaBtn" ).click(function() {
        //alert(getDataFromForm());
        //TODO Clean Input Data of unwanted Stuff?
        var address = getDataFromForm()
        //Add Response for Iota is Sending
        swal({
      title: 'is your address correct? ' + address,
      confirmButtonText: 'Confirm Address',
      showLoaderOnConfirm: true,
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
            // Socket events
            socket.emit('send', getDataFromForm());
            socket.on('response', function (errorMsg) {
                console.log(errorMsg);
                if (errorMsg === 'Successfully sent 1 IOTA') {
                    resolve()
                } else {
                    reject(errorMsg)
                }
            });
        })
      },
      allowOutsideClick: false
    }).then(function () {
      swal({
        type: 'success',
        title: 'IOTA successfully sent!',
        html: 'Check your Wallet'
      })
    })

    });
    // Whenever the server emits 'balance', show the actual balance
      socket.on('balance', function (balance) {
          console.log(balance);
          // Update total balance
          $("#iota__balance").html(balance);
      });

    //GetDataFromForm
    function getDataFromForm(){
        return $("#sendIotaInput").val();
    }
    });
