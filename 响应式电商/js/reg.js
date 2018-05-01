// 验证用户名是否重复
$("#username").blur(nameCheck);

// 邮箱验证
$("#email").blur(emailCheck);

// 密码验证
$("#pwd").blur(pwdCheck);

//  确认密码验证
$("#pwdCon").blur(pwdConCheck);

$("#pwdCon").keydown(function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        reg();
    }
})

// 点击验证表单
$("#regBtn").click(reg);



function nameCheck() {
    var username = $("#username").val();
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "type": "POST",
        "dataType": "json",
        "data": {
            "status": "check",
            "username": username
        },
        "success": function (response) {
            console.log(response);
            if (response.code === 0) {
                $(".success").show();
                $(".error").hide();
                $(".error2").hide();
            } else if (response.code === 2001) {
                $(".success").hide();
                $(".error").show();
                $(".error2").hide();
                return
            } else if (response.code === 1000) {
                $(".success").hide();
                $(".error").hide();
                $(".error2").show();
                return
            } 

        }

    })
}

function emailCheck() {
    var username = $("#username").val();
    var email = $('#email').val();
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (username) {
        if (!email) {
            $(".email-error").html("邮箱不能为空").show();
            return;
        } else if (!reg.test(email)) {
            $(".email-error").html("邮箱格式不正确").show();
            return;
        } else {
            $(".email-error").css('color', '#18ba9b').html("邮箱填写正确").show();
        }
    }
}

function pwdCheck() {
    var username = $("#username").val();
    var email = $('#email').val();
    var pwd = $("#pwd").val();
    if (username && email) {
        if (pwd.length < 6 || pwd.length > 20) {
            $(".pw-error").show();
            return;
        } else {
            $(".pw-error").css('color', '#18ba9b').html("密码可用").show();
        }
    }
}

function pwdConCheck() {
    var username = $("#username").val();
    var email = $('#email').val();
    var pwd = $("#pwd").val();
    var pwdCon = $("#pwdCon").val();
    var success;
    if (username && email && pwd) {
        if (!pwdCon) {
            $(".pw-con-error").html("请确认密码是否正确").show();
            return
        } else if (pwdCon != pwd) {
            $(".pw-error").hide();
            $(".pw-con-error").html("与密码不一致，请重新填写").show();
            return;
        } else {
            $(".pw-con-error").css('color', '#18ba9b').html("密码确认").show();
            success = 'ok';
        }
    }
}

function reg() {   
    var username = $("#username").val();
    var email = $('#email').val();
    var pwd = $("#pwd").val();
    var pwdCon = $("#pwdCon").val();
    var rule = $("#rule");
    if(!username){
        $(".error2").show();
        return;
    }
    nameCheck();
    emailCheck();
    pwdCheck();
    pwdConCheck();
    if (!$("#rule")[0].checked) {
        layer.open({
            content: '请先阅读条款和条件',
            scrollbar: false
        });
        return
    }


    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "type": "POST",
        "dataType": "json",
        "data": {
            "status": "register",
            "username": username,
            "password": pwd
        },
        "success": function (response) {
            console.log(response);

            if (response.code === 0) {
                layer.open({
                    content: `${response.message}`,
                    btn: ["立即登录"],
                    btn1: function () {
                        window.location.href = "login.html";
                    },
                    scrollbar: false
                });

            } else {
                layer.open({
                    content: `${response.message}`,
                    scrollbar: false
                });
                return false;
            }

        }
    })

}