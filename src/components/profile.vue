<template>
  <div class="root ">
      <div class="head text-align full-width">
      <img v-bind:src="this.avatar_url" class="avatar">
  
      <div class="intro text-align min-font">
        <div class="username">{{this.username}}</div>
        <div>{{this.email}}</div>
        <div>{{this.info}}</div>
      </div>
      </div>
      <div class="parent margin">
        <div class="tags min-font">
            <span class="tag">{{this.group}}</span>
            <span class="tag">HOME/{{this.hometown}}</span>
            <span class="tag">BIRTH/{{this.birthday}}</span>
            <div class="urls">
                <a v-bind:href="this.personal_blog"><img src="../pictures/home.png" class="url"></a>
                <a v-bind:href="this.github"><img src="../pictures/github.png" class="url"></a>
                <a v-bind:href="this.zhihu"><img src="../pictures/zhihu.png" class="url"></a>
                <a v-bind:href="this.weibo"><img src="../pictures/weibo.png" class="url"></a>
            </div>
        </div>  

        <!-- <div class="blog" v-for = "article in articles" :key="article.id">
            <span>{{article.title}}</span>
            <div class="text">{{article.text}}</div>
        </div> -->

        <div class="blog" v-for = "share in shares" :key="share.id">
            <span>{{share.title}}</span>
            <div class="text">{{share.share}}</div>
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
          shares: [],
        
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
          this.hometown = res.hometown;
          this.group = res.group;
      }),

      fetch("/getShare/",{
          method: 'GET',
          headers: {
              "Content-Type":"application/json"
          }
      }).then(res => {
          if(res.ok)
          return res.json()
      }).then(res => {
          this.shares = res.shares;
        console.log(res.shares)
      })
  }
}
</script>
<style lang="scss">
@import "../utility.scss";

.root{
    background-color: #f5f5f5;
    padding-bottom: 30px;
    min-height: 100%;
}

.head{
    background-image: url(../pictures/head.png);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100% ;
    padding-top: 17%;
}

.avatar{
    // padding-top: 18%;
    width: 8%;
    border-radius: 50%;
}
.intro{
    color: #666666;
}
.username{
    font-size: 24px;
    color: black;
}
.parent{
    // text-align: center;
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
    color: #666666;
    font-size: 14px;
    padding-top: 10px;
    overflow: hidden;
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
    line-height: 30px;
    color: #ffffff;
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
