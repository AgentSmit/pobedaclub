// var MyApp = angular.module('pobeda-app',['ngRoute',]);
// MyApp.config(['$routeProvider', '$locationProvider',
//   function($routeProvider, $locationProvider) {
//     $locationProvider.hashPrefix('');
//     $routeProvider
//     .when('/main',{
//     	templateUrl:'/main.html',
//     	controller: 'mainCtrl'
//     })
//     .when('/pay',{
//     	templateUrl:'/pay.html',
//     	controller: 'payCtrl'
//     })
//     .otherwise({
//     	templateUrl:'/main.html',
//     })
// }]);

function payForm(ex){
    $('#payPopupForm').dialog({
        dialogClass: "no-close",
        resizable: false,
        width: 400,
        hide: {
            effect: "fadeOut",
            duration: 300
        },
        show: {
            effect: "fadeIn",
            duration: 300
        },
        buttons:[
        {
            text: "Оплатить",
            click: function(){
                sendPayData(ex);
            }
        },{
            text: "Отмена",
            click: function(){
                $(this).dialog("close");
            }
        }]
    });
}

function sendPayData(ex){
    fname = $('#payPopupForm :input')[0].value.toUpperCase();
    sname = $('#payPopupForm :input')[1].value.toUpperCase();
    phone = $('#payPopupForm :input')[2].value;

    var isOk = true;
    if(!checkInput(0)){
        isOk = false;
    }
    if(!checkInput(1)){
        isOk = false;
    }
    if(!checkInput(2)){
        isOk = false;
    }

    if(!isOk){
        return 0;
    }

    var sum = 0;
    param = 'get_sum=1&fname='+fname+'&sname='+sname+'&phone='+phone+'&ex='+ex;
    $.get('getData.php?'+param, function(data){
        sum = parseInt(data);
    });
    param = 'prepare_once=1&l='+ex+'8&oa='+sum;
    $.get('getData.php?'+param, function(data){
        var jsonData = $.parseJSON(data);
        params = "m="+jsonData.merchant+"&oa="+sum+"&s="+jsonData.hash+"&o="+ex;
        // location.href="http://www.free-kassa.ru/merchant/cash.php?"+params
    });
// $("#container").load('/confirm.php',
//     {'exp':value,
//     'fname':fname,
//     'sname':sname,
//     'phone':phone});

}

function checkInput(id){
    val = $('#payPopupForm :input')[id].value;
    if(val==''||val==undefined){
        $('#payPopupForm :input')[id].style = 'background-color: #ec7777 !important;';
        return false;
    }else{
         $('#payPopupForm :input')[id].style = 'background-color: white ;';
         return true;
    }
}