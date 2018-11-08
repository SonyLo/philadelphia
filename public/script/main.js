




// Для отправки данных на сервер
let order = []
function addOrder(idProd) {
   order.push(idProd)
    
    $.ajax({
        type: "POST",
        url: '/lending',
        data: JSON.stringify(
            {
                order
            }
        ),//
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
           
        },
        error: function (response) {

        }
    });
    $('#exampleModalCenter'+idProd).modal('hide');
}

function delInOrder(idProd){
      console.log(idProd)
    $.ajax({
        type: "DELETE",
        url: '/order',
        data: JSON.stringify(
            {
                idPro:idProd
            }
        ),//
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert(response.res)
            document.location.href = '/order';
        },
        error: function (response) {

        }
    });
}




function ErrDinamP(idElem, message, pos) {
    var tempId = idElem + "P";

    if (document.getElementById(tempId)) {

    }
    else {
        pp = document.createElement("p");
        pp.setAttribute("id", tempId);
        pp.className = "text-danger mb-0";
        document.getElementById(idElem).insertAdjacentHTML(pos, pp.outerHTML);
        $("#" + idElem).addClass("is-invalid");
        document.getElementById(tempId).innerHTML = message;
        document.getElementById(idElem).focus();
        setTimeout(function () {
            // document.getElementById('lastnameP').innerHTML = null; 
            document.getElementById(idElem).nextElementSibling.remove();
            $("#" + idElem).removeClass("is-invalid");
        }, 3000);
    }

}
function redirOrder(){
    document.location.href = '/order';
}
function redirMain(){
    document.location.href = '/lending';
}

function goZak(button){
    data = {
        firstname: document.getElementById('firstname').value,
        phone :  document.getElementById('phone').value,
        // idUser : getCookie(username) //вот тут с куки достать
    }
    $.ajax({
        type: "POST",
        url: '/order',
        data: JSON.stringify(
            {
                data
            }
        ),//
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            
            alert(response.st)
            // while(document.getElementsByClassName('btn_style')){
            //     document.getElementsByClassName('btn_style').setAttribute('style', 'display:none')
            // }
            document.getElementsByName('btnDel').forEach(e => {
                e.setAttribute('style', 'display:none')
            });
            button.setAttribute('disabled', 'true')
            
            document.getElementById('subButton').setAttribute('disabled', 'true')
        },
        error: function (response) {

        }
    });
    $('#exampleModalCenter').modal('hide');
    document.getElementById("firstname").value = "";
    document.getElementById("phone").value = "";
    
    
}
// function valEmail(str){
//     regExpEmail = "^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$"
//     var regex = new RegExp(regExpEmail)
//     return regex.test(str)
// }

// function Submit() {
    

//     data = {
//         email: document.getElementById('inputEmail').value,
//         password: document.getElementById('inputPassword').value,
//         cpassword: document.getElementById('inputConfirmPassword').value
//     }
//     // Валидация  
//     if (data.email === "" || data.password === "" || data.cpassword === "") {
//         ErrDinamP("inputConfirmPassword", 'Please enter e-mail and password', 'afterend')

//     }
//     if (data.password != data.cpassword) {
//         ErrDinamP("inputConfirmPassword", 'Passwords do not match!', 'afterend')
//     }
//     if (valEmail(data.email)) {
//     } else {
//         ErrDinamP("inputConfirmPassword", 'E-mail no valid!', 'afterend')
//     }
//     // Валидация 

//     $.ajax({
//         type: "POST",
//         url: '/reg',
//         data: JSON.stringify(
//             {
//                 data
//             }
//         ),//
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (response) {
//             console.log(response);
//             alert('Registr success')
//             document.location.href = '/login';
            
//         },
//         error: function (response) {
//             console.log(response)
//         }
//     });

// }

// аутентификация
// function SubmitLog(){
   
//     data = {
//         email: document.getElementById('inputEmailLog').value,
//         password: document.getElementById('inputPasswordLog').value     
//     }
//     if (data.email === "" || data.password === "" ) {
//         ErrDinamP("inputPasswordLog", 'Please enter e-mail and password', 'afterend')
//     }

//     if (valEmail(data.email)) {
//     } else {
//         ErrDinamP("inputPasswordLog", 'E-mail no valid!', 'afterend')
//     }

//     $.ajax({
//         type: "POST",
//         url: '/login',
//         data: JSON.stringify(
//             {
//                 data
//             }
//         ),//
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (response) {
//             document.location.href = '/lending';
            
//         },
//         error: function (response) {
//             console.log(response)
//         }
//     });



// }