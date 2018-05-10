<template>
  <div class="root">
    <div class="side">
        <div class="user">
        <img src="../pictures/favicon.png" class="avatar">
        <span>{{this.username}}</span>
        </div>
        <div class="edit">
            <span class="item">用户名</span><input>
            <span class="item">头像链接</span><input>
            <span class="item">入组时间</span><input>
            <span class="item">生日</span><input>
            <span class="item">家乡</span><input>
            <span class="item">github链接</span><input>
            <span class="item">知乎链接</span><input>
            <span class="item">微博链接</span><input>
            <span class="item">博客链接</span><input>
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
    // background-position: top center;
    background-size: 100% ;
    // text-align: center;
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
    font-size: 14px;
    color: #666666;
    text-align: center;

}
.avatar{
    width:100%;
    margin-bottom: 20px;
}
.edit{
    padding-left: 30%;
}
.item{
    width: 100px;
    // padding: 10px;
    display: inline-block;
}
input{
    width:60%;
    margin-left: 5%;
    margin-right: 20%;
    

}
</style>
