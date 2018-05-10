<template>
  <div class="root">
      <div class="head">
      <!-- <img src="../pictures/head.png" class = "head"> -->
      <img src="../pictures/favicon.png" class="avatar">
  
      <div class="intro">
        <div class="username">{{this.username}}</div>
        <div>{{this.email}}</div>
        <div>个人介绍{{this.info}}</div>
      </div>
      </div>
      <div class="parent">
        <div class="tags">
            <span class="tag">木犀设计组{{this.group}}</span>
            <span class="tag">HOME/{{this.hometown}}</span>
            <span class="tag">BIRTH/{{this.birthday}}</span>
            <div class="urls">
                <a v-bind:href="this.personal_blog"><img src="../pictures/home.png" class="url"></a>
                <a v-bind:href="this.github"><img src="../pictures/github.png" class="url"></a>
                <a v-bind:href="this.zhihu"><img src="../pictures/zhihu.png" class="url"></a>
                <a v-bind:href="this.weibo"><img src="../pictures/weibo.png" class="url"></a>
            </div>
        </div>  

        <div class="blog" v-for = "article in articles" :key="article.id">
            <span>{{article.title}}</span>
            <div class="text">{{article.text}}</div>
            
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
          articles:[{
              title: 1,
              text: "lalllla"
          },{
              title: 2,
              text: "buwaejq"
          }]
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
    font-family:"Microsoft YaHei";
}
div{
    display: block;
}
.root{

}

.head{
    width:100%;
    margin: 0 auto;
    background-image: url(../pictures/head.png);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100% ;
    text-align: center;
}

.avatar{
    padding-top: 18%;
    width: 8%;
}
.intro{
    text-align: center;
    color: #666666;
    font-size: 12px;
}
.username{
    font-size: 24px;
    color: black;
}
.parent{
    // text-align: center;
    margin: 0 auto;
    width: 950px;
}
.blog{
    width: 600px;
    font-size: 18px;
    background-color: #ffffff;
    margin:30px auto;
    padding: 30px;
}
.text{
    // width:100%;
    color: #666666;
    font-size: 14px;
    
}

.tags{
    float: right;
    width: 120px;


    // display: flex;
    // flex-direction: column;

}
.tag{
    background-color:#cccccc;
    padding: 4px 10px;
    height: 30px;
    border-radius: 15px;  
    text-align: center;
    line-height: 30px;
    color: #ffffff;
    font-size: 12px;
    

}
.urls{
    padding-top: 30px;
    width:50px;
}
.url{
    width: 30px;
    height: 30px;
    margin-top: 5px;
}
</style>
