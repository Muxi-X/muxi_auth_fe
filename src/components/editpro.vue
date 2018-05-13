<template>
  <div class="root">
    <div class="side">
        <div class="user text-align">
        <img src="../pictures/favicon.png" class="avatar full-width">
        <span>用户名{{this.username}}</span>
        </div>
        <div class="edits">
            <div class="edit"><span class="item">用户名</span><input class="editinfo min-font" v-model="username"></div>
            <div class="edit"><span class="item">头像链接</span><input class="editinfo min-font" v-model="avatar_url"></div>
            <div class="edit"><span class="item">组别</span>
                <select class="date" v-model="group">
                    <option value="frontend">木犀前端组</option> 
                    <option value="backend" >木犀后台组</option>
                    <option value="android">木犀安卓组</option>
                    <option value="production">木犀产品组</option>
                    <option value="design">木犀设计组</option>
                </select>
            </div>
            <div class="edit"><span class="item">入组时间</span>
                <select class="date" v-model="jointime[0]">
                    <option >2014</option> 
                    <option >2015</option>
                    <option >2016</option>
                    <option >2017</option>
                    <option >2018</option>
                </select>
                <span class="text">年</span>
                 <select class="date" v-model="jointime[1]">
                    <option >1</option> 
                    <option >2</option>
                    <option >3</option>
                    <option >4</option>
                    <option >5</option>
                    <option >6</option> 
                    <option >7</option>
                    <option >8</option>
                    <option >9</option>
                    <option >10</option>
                    <option >11</option>
                    <option >12</option>
                </select>
                 <span class="text">月</span>
            
            </div>
            <div class="edit"><span class="item">生日</span>
                <select class="date" v-model="birthday[0]">
                    <option >1</option> 
                    <option >2</option>
                    <option >3</option>
                    <option >4</option>
                    <option >5</option>
                    <option >6</option> 
                    <option >7</option>
                    <option >8</option>
                    <option >9</option>
                    <option >10</option>
                    <option >11</option>
                    <option >12</option>
                </select>

                <!-- <input type="month"> -->
                <span class="text">月</span>
                <select class="date min-font" v-model="birthday[1]">
                    <option v-for = "n in day[birthday[0]]" :key="n.id">{{n}}</option>
                </select>
                 <span class="text">日</span>
            </div>
            <div class="edit"><span class="item">家乡</span><input class="editinfo min-font" v-model="hometown"></div>
            <div class="edit"><span class="item">github链接</span><input class="editinfo min-font" v-model="github"></div>
            <div class="edit"><span class="item">知乎链接</span><input class="editinfo min-font" v-model="zhihu"></div>
            <div class="edit"><span class="item">微博链接</span><input class="editinfo min-font" v-model="weibo"></div>
            <div class="edit"><span class="item">博客链接</span><input class="editinfo min-font" v-model="personal_blog"></div>
            <div class="save">
                <button class="savebut" v-on:click="saveinfo">保存</button>
                <button class="savebut cancel" v-on:click="cancel" >取消</button>
            </div>
        </div>
    </div>
    <a v-bind:href="this.personal_blog"><div class="return">返回首页</div></a>
      
  </div>
</template>
<script>
export default {
  data() {
      return {
          username: "",
          id: 1,
          email: "",
          info: "",
          birthday: "",
          hometown: "",  
          group: "",
          avatar_url: "",     //url
          personal_blog: "",  //url
          github: "",         //url
          weibo: "",          //url
          zhihu: "",          //url
          jointime: [2017,9], //加入时间
          day: [,31,28,31,30,31,30,31,31,30,31,30,31],

        //   birthday: [3,5], //array
        //   group: "frontend",
      }
  },
  mounted() {
      this.id = window.location.pathname.split('/')[2];
      fetch("/api/show_profile/" + this.id  + "/", {
          method: 'GET',
          headers: {
              "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ODF9.2qVoAYnT-cwHr1eJdXc_u8FrhlfFTbQSrB-JVizHf5w" ,
              "Content-Type":"application/json"
          }
      }).then(res => {
          if (res.ok)
          return res.json()
      }).then(res => {
          this.username = res.username;
          this.email = res.email;
          this.info = res.info;
          this.birthday = res.birthday;
          this.avatar_url = res.avatar_url;
          this.personal_blog = res.personal_blog;  
          this.github = res.github;         
          this.weibo = res.weibo;          
          this.zhihu = res.zhihu;
      })
  },
  method: {
      save() {
          var data = {
              
          };
          fetch("/api/edit_profile/", {
              methon: 'POST',
              body: JSON.stringify(data),
              headers: {
                "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ODF9.2qVoAYnT-cwHr1eJdXc_u8FrhlfFTbQSrB-JVizHf5w" ,
                "Content-Type":"application/json"   
              }
          }).then(res => {
              if (res.ok) {
		        return res.json()
              } else {
                this.failed = true
	          }
            }).then(value => {
	            // do something
            })
      }

  }
}
</script>
<style lang="scss">
@import "../utility.scss";
body{
    background-color: #f5f5f5;

}
.root{
    width:65%;
    margin: 2% auto;
    background-image: url(../pictures/side.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.side{
    background-color: #ffffff;
    width: 88%;
    height: 1000px;
    margin-left: 12%;
    

}
.user{
    padding-left: 10%;
    padding-top: 5%;
    width: 130px;
    height: 1000px;
    font-size: 14px;
    color: #666666;
    float: left;

}
.avatar{
    margin-bottom: 20px;
    
}
.edits{
    padding-top: 40px;
    // padding-left: 100px;
    // width: 800px;
}
.edit{
    color: #666666;
}
.item{
    width: 15%;
    padding-top: 40px;
    display: inline-block;
    text-align: right;  
}
.editinfo{
    width: 30%;
    height:30px;
    margin-left: 2%;
    padding: 0 10px;
    border: solid 1px #666666;
    border-radius: 15px;
    color: #666666;
}
.date{

    margin-left: 2%;
    min-width: 80px;
    height: 30px;
    padding: 0 20px;
    border: solid 1px #666666;
    border-radius: 15px;
    background-color: #ffffff;
    color: #666666;
    background:url() no-repeat right center;  
	// appearance:none;
	-moz-appearance:none;
    -webkit-appearance:none;
    outline: none;
    text-align-last: center;
}
.text{
    margin-left: 20px;
}
.savebut{
    font-size: 16px;
    padding: 10px 45px;
    border: solid 1px #666666;
    border-radius: 10px;
    margin: 8% 3%;
    color: white;
    background-color: #666666;
    cursor: pointer;
    
}
.cancel{
    color: black;
    background-color: #ffffff;
}
.save{
    padding-left: 37%;
    // padding-top: 50px;
}
.return{
    position: absolute;
    right:7%;
    top: 7%;
    color: #666666;
    font-size: 16px;
}

</style>