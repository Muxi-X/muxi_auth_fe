<template>
    <div class="root full-height">
        <div class="head text-align full-width">
            <!-- <img src="../pictures/head.png" class = "head"> -->
            <img src="../pictures/favicon.png" class="avatar">
    
            <div class="intro text-align min-font">
                <div class="username">{{this.username}}</div>
                <div>{{this.email}}</div>
                <div>个人介绍{{this.info}}</div>
            </div>
        </div>
        <div class="parent margin">
            <div class="tags min-font">
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
    
            <div class="blog" v-for="share in shares" :key="share.id">
                <span>{{share.title}}</span>
                <div class="text">{{share.share}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Service from "../service.js";
    export default {
        data() {
            return {
                username: "",
                authID: 1,
                email: "",
                info: "",
                birthday: "",
                hometown: "",
                group: "",
                avatar_url: "", //url
                personal_blog: "", //url
                github: "", //url
                weibo: "", //url
                zhihu: "", //url
                shares: [],
                token: "",
                shareID: 1,
                blogID: 1
            }
        },
        mounted() {
            this.authID = window.location.pathname.split('/')[1].split("=")[1];
            this.token = window.location.pathname.split("/")[1].split("=")[2];
            if (this.shareID = window.location.pathname.split("/")[1].split("=")[3]) {
                Promise.all([Service.getProfile(this.authID, this.token), Service.getShare(this.shareID)])
                .then(res => {
                    this.username = res[0].username;
                    this.email = res[0].email;
                    this.info = res[0].info;
                    this.birthday = res[0].birthday;
                    this.avatar_url = res[0].avatar_url;
                    this.personal_blog = res[0].personal_blog;
                    this.github = res[0].github;
                    this.weibo = res[0].weibo;
                    this.zhihu = res[0].zhihu;
                    this.shares = res[1].shares;
                })
            } else {
                Service.getProfile(this.authID, this.token).then(res => {
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
            }
        }
    }
</script>

<style lang="scss">
    @import "../utility.scss";
    .root {
        background-color: #f5f5f5;
    }
    
    .head {
        background-image: url(../pictures/head.png);
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100%;
    }
    
    .avatar {
        padding-top: 18%;
        width: 8%;
    }
    
    .intro {
        color: #666666;
    }
    
    .username {
        font-size: 24px;
        color: black;
    }
    
    .parent {
        // text-align: center;
        width: 950px;
    }
    
    .blog {
        width: 600px;
        font-size: 18px;
        background-color: #ffffff;
        margin: 30px auto;
        padding: 30px;
    }
    
    .text {
        color: #666666;
        font-size: 14px;
    }
    
    .tags {
        float: right;
        width: 120px;
        // display: flex;
        // flex-direction: column;
    }
    
    .tag {
        background-color: #cccccc;
        padding: 4px 10px;
        height: 30px;
        border-radius: 15px;
        line-height: 30px;
        color: #ffffff;
    }
    
    .urls {
        padding-top: 30px;
        width: 50px;
    }
    
    .url {
        width: 30px;
        height: 30px;
        margin-top: 5px;
    }
</style>
