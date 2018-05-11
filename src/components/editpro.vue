<template>
  <div class="root">
    <div class="side">
        <div class="user">
        <img src="../pictures/favicon.png" class="avatar">
        <span>用户名{{this.username}}</span>
        </div>
        <div class="edits">
            <div class="edit"><span class="item">用户名</span><input></div>
            <div class="edit"><span class="item">头像链接</span><input></div>
            <div class="edit"><span class="item">组别</span><input></div>
            <div class="edit"><span class="item">入组时间</span><input></div>
            <div class="edit"><span class="item">生日</span><input></div>
            <div class="edit"><span class="item">家乡</span><input></div>
            <div class="edit"><span class="item">github链接</span><input></div>
            <div class="edit"><span class="item">知乎链接</span><input></div>
            <div class="edit"><span class="item">微博链接</span><input></div>
            <div class="edit"><span class="item">博客链接</span><input></div>
        </div>
    </div>
      
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
      })
  }
}
</script>
<style lang="scss">
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
    text-align: center;
    float: left;

}
.avatar{
    width:100%;
    margin-bottom: 20px;
    
}
.edits{
    padding-top: 40px;
    // padding-left: 100px;
    // width: 800px;
}
.edit{
     
}
.item{
    width: 200px;
    padding-top: 40px;
    display: inline-block;
    color: #666666;
    text-align: right;
    
}
input{
    width: 30%;
    height:30px;
    margin-left: 2%;
    border: solid 1px;
    border-color: #666666;
    border-radius: 15px;
    

}
</style>
