//common function
var token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
// titles选中效果
function selected(h) {
    h.style.fontSize="21px";
    h.style.backgroundColor='blue';
}
// 非异步，fetch，get函数并且前端自动跳转到后台返回的url页面
function getNotAjaxJump(url) {
    fetch(url,{
            method:"GET",
            headers:{"X-CSRFToken":token}
    })
        .then(data =>{
            console.log(data)
            window.location.href = data["url"];
        })
}
// 退出登录
// console.log("6666")
document.querySelector("#logout-but").onclick = function () {
    var logoUrl = "/logout/";
    getNotAjaxJump(logoUrl);
}
//取消和关闭新增的输入弹框
var addWin = document.querySelector(".add-win");
function find(yuan) {
     document.querySelector(yuan).onclick= function () {
         addWin.style.display = 'none';
     }
}
find("#close-but");
find(".cancel-but");

// env配置
var envB= document.querySelector(".setting span");
document.querySelector(".setting").onclick = function(){
    //切换到主页，同时改变tab的属性
    window.location.href = '/home/';
};

<!-- 查询全部数据的函数-->
function allData(url){
    fetch(url,{method:"GET",
        headers:{"X-CSRFToken":token, "X-Requested-With":"XMLHttpRequest"},
            })
        .then(response => response.json())
        .then(data => {
            createList(data);
    })
        .catch((error)=>{
            console.error('Error:', error);
        })
}
//查询全部数据并创建数据列表
function createList(data) {
    var innerHTML= '';
    var envData = data["data"];
    for (let envs in data["data"]){
        let ds = envData[parseInt(envs)];
        let t = temp; //这里的赋值要保证每次循环数据的时候，t都是空的
        for ( let d in ds){
            t = t.split('{' + d + '}').join(ds[d]);
        }
        innerHTML += t;
    }
    document.querySelector('tbody').innerHTML = innerHTML;
}

//project项目

var projects = document.querySelector(".project span")
document.querySelector(".project").onclick = function () {
    let pro = "/home/autotest/project/";
    getNotAjaxJump(pro);
    //刷新了页面之后，页面的所有临时的效果都会被清空
}