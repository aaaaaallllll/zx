<template>
  <div id="home">
    <!--头部-->
    <div class="title">
      <div class="title-left">
        <img src="../../common/images/WechatIMG295.png" />
      </div>
      <div class="title-right">
        <h4>TV Player Background Management System</h4>
        <span @click="myGoto('/login')">Exit</span>
      </div>
    </div>
    <!--内容-->
    <div class="content">
      <!--导航栏-->
      <div class="content-left">
        <!--用户信息-->
        <div class="userInfo">
          <!-- <img src="../../common/images/user.png" /> -->
          <div style="width:4rem;height:4rem;border-radius:50%;background:#e6dadaed;text-align:center;">
            <svg
              t="1564658569178"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4758"
              width="50"
              height="50"
              style="margin-top:0.2rem;"
            >
              <path
                d="M357.353238 279.350496a278.594155 278.594155 0 0 0 93.216025 208.303966 216.636124 216.636124 0 0 0 62.144016 9.063702c119.836775 0 217.33047-97.493695 217.330471-217.330471S632.550054 61.995228 512.713279 61.995228a216.636124 216.636124 0 0 0-62.181213 9.051303 278.594155 278.594155 0 0 0-93.178828 208.303965z"
                fill="#91B4FF"
                p-id="4759"
              />
              <path
                d="M511.969336 61.995228c119.836775 0 217.33047 97.493695 217.330471 217.33047s-97.493695 217.318071-217.330471 217.318072-217.33047-97.481296-217.33047-217.293274 97.493695-217.355269 217.33047-217.355268m0-61.995228C357.712811 0.024798 232.668436 125.069173 232.668436 279.350496S357.712811 558.626598 511.969336 558.626598s279.3009-125.044374 279.300901-279.276102S666.275458 0.024798 511.969336 0.024798z"
                fill="#3778FF"
                p-id="4760"
              />
              <path
                d="M918.075275 870.784969a424.208546 424.208546 0 0 0-16.961894-46.397228q-5.405984-12.399046-11.580708-24.512913a426.675956 426.675956 0 0 0-125.453543-148.007407 420.935198 420.935198 0 0 0-252.618154-83.321586 430.246881 430.246881 0 0 0-48.356278 2.715391c-166.14721 67.921972-283.181801 231.167805-283.181802 421.741135h756.007005a425.113676 425.113676 0 0 0-17.854626-122.217392z"
                fill="#91B4FF"
                p-id="4761"
              />
              <path
                d="M238.694372 659.641623a30.997614 30.997614 0 0 1-18.598568-55.795705 482.335271 482.335271 0 0 1 35.275285-24.16574 31.001334 31.001334 0 1 1 32.73348 52.658746c-10.588785 6.583893-20.954387 13.63895-30.799229 21.078378a30.836426 30.836426 0 0 1-18.610968 6.224321zM56.527595 1023.999975a30.997614 30.997614 0 0 1-30.997614-30.997614A486.042586 486.042586 0 0 1 146.011507 672.549029a30.997614 30.997614 0 1 1 46.620411 40.854855A424.047358 424.047358 0 0 0 87.537608 993.01476a30.997614 30.997614 0 0 1-31.010013 30.985215zM967.411078 1023.999975a30.997614 30.997614 0 0 1-30.997614-30.997614 422.113107 422.113107 0 0 0-34.804121-168.627019q-5.405984-12.399046-11.580709-24.512913a426.688355 426.688355 0 0 0-125.453543-147.995008 425.287263 425.287263 0 0 0-407.035867-54.357416 30.997614 30.997614 0 1 1-22.553864-57.717557 487.146101 487.146101 0 0 1 466.514089 62.305204 487.877644 487.877644 0 0 1 143.754534 169.494953q7.067456 13.800138 13.279378 28.096237a484.319118 484.319118 0 0 1 39.912528 193.276322 30.997614 30.997614 0 0 1-31.034811 31.034811z"
                fill="#3778FF"
                p-id="4762"
              />
            </svg>
          </div>
          <div class="user">
            <span>{{userId}}</span>
            <p>Agent</p>
          </div>
        </div>
        <!--管理页面-->
        <div class="manage">
          <!--代理商后台-->
          <div class="box">
            <h5>Agent System</h5>
            <ul>
              <li
                style="display:flex;align-items:center;"
                @click="myGoto('/box')"
                :class="{on:this.$route.path=='/box'}"
              >
                <i class="iconfont">
                  <svg
                    t="1564625258312"
                    class="icon"
                    viewBox="0 0 2048 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2134"
                    width="40"
                    height="40"
                  >
                    <path
                      d="M1474.965 701.033c34.618 0 62.695-28.198 62.695-63.026 0-34.783-28.075-63.023-62.694-63.023s-62.694 28.198-62.694 63.023c-0.041 34.826 28.035 63.026 62.694 63.026zM440.216 606.533h658.444v63.026h-658.444zM1255.444 701.033c34.615 0 62.693-28.198 62.693-63.026 0-34.783-28.075-63.023-62.693-63.023-34.618 0-62.698 28.198-62.698 63.023 0 34.826 28.080 63.026 62.698 63.026z"
                      fill="#1296db"
                      p-id="2135"
                    />
                    <path
                      d="M1689.703 432.299l-166.020-266.854h-1005.078l-197.532 264.65-6.294 18.882v315.078c0 52.115 42.18 94.498 94.047 94.498h1191.494c51.864 0 94.047-42.381 94.047-94.498v-315.077l-4.662-16.68zM549.957 228.43h938.987l117.587 189.033h-1197.665l141.091-189.033zM1631.747 764.055c0 17.375-14.058 31.515-31.348 31.515h-1191.532c-17.29 0-31.351-14.14-31.351-31.515v-283.567h1254.231v283.567z"
                      fill="#1296db"
                      p-id="2136"
                    />
                  </svg>
                </i>
                <span :class="{in:this.$route.path=='/box'}">Boxes</span>
              </li>
            </ul>
          </div>
          <!--系统人员后台-->
          <div class="box">
            <h5>Manager System</h5>
            <ul>
              <li
                style="display:flex;align-items:center;"
                @click="myGoto('/source')"
                v-if="isActive"
                :class="{on:this.$route.path=='/source'}"
              >
                <i class="iconfont" style="font-size: 32px">
                  <svg
                    t="1564625723630"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2353"
                    width="40"
                    height="40"
                  >
                    <path
                      d="M180.8 192h662.4a52.8 52.8 0 0 1 52.8 52.8v534.4a52.8 52.8 0 0 1-52.8 52.8H180.8A52.8 52.8 0 0 1 128 779.2V244.8a52.8 52.8 0 0 1 52.8-52.8z m-17.888 71.104v71.12h69.808v-71.12h-69.808z m0 142.24v71.104h69.808v-71.12h-69.808z m0 142.208v71.12h69.808v-71.12h-69.808z m0 142.24v71.104h69.808V689.76h-69.808z m628.368-426.688v71.12h69.808v-71.12h-69.808z m0 142.24v71.104h69.808v-71.12h-69.808z m0 142.208v71.12h69.808v-71.12h-69.808z m0 142.24v71.104h69.808V689.76h-69.808z m-375.2-340.704a17.6 17.6 0 0 0-26.256 15.312v295.2a17.6 17.6 0 0 0 26.256 15.312l247.312-139.936a26.4 26.4 0 0 0 0-45.952l-247.312-139.936z"
                      p-id="2354"
                      fill="#1296db"
                    />
                  </svg>
                </i>
                <span :class="{in:this.$route.path=='/source'}" style="position: relative;">Channels</span>
              </li>
              <li
                style="display:flex;align-items:center;"
                @click="myGoto('/agent')"
                :class="{on:this.$route.path=='/agent'}"
              >
                <i class="iconfont" style="font-size: 32px;">
                  <svg
                    t="1564625951523"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2525"
                    width="35"
                    height="35"
                  >
                    <path
                      d="M610.743 508.343c73.143-36.572 120.686-109.714 120.686-197.486C731.429 190.171 632.686 91.43 512 91.43c-65.829 0-124.343 29.257-164.571 73.142-18.286 21.943-32.915 47.543-43.886 73.143-7.314 21.943-10.972 47.543-10.972 73.143 0 47.543 14.629 87.772 40.229 124.343 21.943 29.257 51.2 54.857 84.114 73.143-36.571 10.971-69.485 25.6-102.4 43.886-69.485 43.885-124.343 117.028-149.943 197.485-7.314 21.943-10.971 47.543-14.628 73.143 0 10.972-3.657 25.6-3.657 36.572v73.142h731.428V859.43c0-168.229-113.371-310.858-266.971-351.086zM394.97 402.286c-18.285-25.6-29.257-58.515-29.257-91.429 0-18.286 3.657-40.228 10.972-54.857 10.971-21.943 25.6-43.886 43.885-58.514C446.171 179.2 475.43 164.57 512 164.57c80.457 0 146.286 65.829 146.286 146.286S592.457 457.143 512 457.143c-21.943 0-40.229-3.657-58.514-10.972-21.943-10.971-40.229-25.6-58.515-43.885zM219.43 859.429c0-10.972 0-25.6 3.657-36.572 3.657-25.6 10.971-51.2 18.285-73.143 32.915-80.457 102.4-146.285 190.172-171.885 25.6-7.315 54.857-10.972 80.457-10.972h21.943C683.886 577.83 804.57 705.83 804.57 859.43H219.43z"
                      fill="#1296db"
                      p-id="2526"
                    />
                    <path
                      d="M277.943 552.229c14.628-21.943 10.971-117.029 7.314-117.029-54.857 0-98.743-43.886-98.743-98.743 0-47.543 36.572-87.771 80.457-98.743 7.315-25.6 21.943-51.2 43.886-73.143h-25.6c-95.086 0-171.886 76.8-171.886 171.886 0 65.829 36.572 124.343 95.086 153.6C87.771 519.314 0 629.03 0 757.03v65.828h113.371c3.658-25.6 7.315-51.2 14.629-73.143H73.143C76.8 640 168.229 552.23 277.943 552.23z m537.6-62.172c54.857-29.257 95.086-84.114 95.086-153.6 0-95.086-76.8-171.886-171.886-171.886h-25.6c18.286 21.943 32.914 43.886 43.886 73.143 43.885 7.315 80.457 47.543 80.457 98.743 0 54.857-43.886 98.743-98.743 98.743-3.657 0-7.314 95.086 7.314 117.029 109.714 0 201.143 87.771 204.8 197.485H896c7.314 21.943 10.971 47.543 14.629 73.143H1024V757.03c0-128-87.771-237.715-208.457-266.972z"
                      fill="#1296db"
                      p-id="2527"
                    />
                  </svg>
                </i>
                <span :class="{in:this.$route.path=='/agent'}" style="position: relative;">Agents</span>
              </li>
            </ul>
          </div>
          <!--系统设置-->
          <div class="box">
            <h5>System Settings</h5>
            <ul>
              <li @click="myGoto('/changepass')" :class="{on:this.$route.path=='/changepass'}">
                <i class="iconfont">
                  <svg
                    t="1564626167594"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2134"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M522.437 561.034c-46.67 0-84.677 37.81-84.677 84.677 0 33.674 19.89 62.424 48.246 76.012v92.948c0 20.086 16.345 36.234 36.234 36.234 20.086 0 36.234-16.345 36.234-36.234v-92.948c28.554-13.588 48.246-42.338 48.246-76.012 0.197-46.868-37.612-84.677-84.283-84.677z m350.326-169.157H147.89c-39.975 0-72.467 32.492-72.467 72.468v483.249c0 39.975 32.492 72.468 72.467 72.468h724.874c39.975 0 72.468-32.493 72.468-72.468v-483.25c0-40.172-32.493-72.467-72.468-72.467z m0 507.274c0 39.975-8.27 48.246-48.246 48.246H196.332c-39.975 0-48.246-8.27-48.246-48.246V512.59c0-39.976 8.27-48.246 48.246-48.246h628.185c39.975 0 48.246 8.27 48.246 48.246v386.56zM167.778 355.446c20.087 0 36.431-15.95 37.022-36.037C237.49 180.972 361.748 77.785 510.228 77.785c115.987 0 217.009 63.212 271.36 156.75 5.71 12.8 18.51 21.662 33.28 21.662 20.086 0 36.43-16.345 36.43-36.43 0-7.878-2.56-15.164-6.695-21.072C777.846 83.298 653.391 5.12 510.228 5.12c-187.077 0-342.646 128.394-378.683 304.64-0.197 0.788-0.394 1.378-0.394 2.166-0.197 0.788-0.394 1.772-0.591 2.56h0.197c-0.197 1.182-0.197 2.363-0.197 3.545 0.197 20.677 16.738 37.415 37.218 37.415z"
                      fill="#1296db"
                      p-id="2135"
                    />
                  </svg>
                </i>
                <span :class="{in:this.$route.path=='/changepass'}">Password</span>
              </li>
            </ul>
          </div>
          <!--Logo-->
          <img src="../../common/images/logo.png" class="loge" />
        </div>
      </div>
      <div class="content-right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userId: "",
      id: "",
      isTrue: false,
      isActive: true,
      isLogin: "false"
    };
  },
  methods: {
    setCookie(key, value, iDay) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + iDay);
      document.cookie = key + "=" + value + ";expires=" + oDate;
    },
    getCookie(key) {
      var cookieArr = document.cookie.split("; ");
      for (var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split("=");
        if (arr[0] === key) {
          return arr[1];
        }
      }
      return false;
    },
    removeCookie(key) {
      this.setCookie(key, "", -1); //这里只需要把Cookie保质期退回一天便可以删除
    },
    myGoto(path) {
      this.$router.replace(path);
    }
  },
  mounted() {
    console.log(document.cookie)
    this.userId = this.getCookie("userid");
    this.id = this.getCookie("id");
    this.isTrue = this.getCookie("isSystem");
    if (this.isTrue == "false") {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
    // if(this.isLogin=="false"){
    //   this.set
    // }
    if (this.getCookie("y") !== this.userId) {
      this.$confirm("Reset password？", {
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
        type: "info"
      }).then(() => {
        this.$router.replace("/changepass");
      });
      this.setCookie("y", this.userId, 1);
    }
  }
  // console.log(this.getCookie('isSystem'))
  // this.userId=this.$route.params.userId
};
</script>

<style scoped>
@import "../../common/css/style.css";
.iconfont {
  width: 2rem;
  height: 2.6rem;
}
.iconfont1 {
  width: 2rem;
  height: 3rem;
}
#home {
  width: 100%;
  height: 100%;
}
/*标题*/
.title {
  width: 100%;
  height: 5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.title .title-left {
  padding-right: 2rem;
  background-color: #2d7fe4;
}
.title .title-left img {
  margin: 1.2rem 1.8rem 0 4rem;
}
.title .title-right {
  width: 100%;
  background-color: #4598ff;
  padding: 0 1rem;
  display: flex;
  align-items: center;
}
.title .title-right * {
  color: #fff;
}
.title .title-right h4 {
  width: 100%;
  font-size: 1.5rem;
  min-width: 50rem;
  overflow: hidden;
}
.title .title-right span {
  font-size: 1.5rem;
  cursor: pointer;
}
.content {
  height: 100%; /* 写给不支持calc()的浏览器   */
  /* height:-moz- calc(100% - 5.7rem );
  height:-webkit-calc(100% - 5.7rem );
  height: calc(100% - 5.7rem); */
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.content .content-left {
  height: 100%;
  width: 17.3rem;
  /*background-color: #4598FF;*/
  box-sizing: border-box;
}
.content .content-left .manage {
  margin-top: -2.5rem;
  width: 100%;
  height: calc(100% - 126px);
  box-sizing: border-box;
  padding: 2.5rem 1rem 0 1rem;
}
/*用户信息*/
.content .content-left .userInfo {
  /* width: 6rem; */
  height: 8rem;
  box-shadow: 0 0 7px #eaf0f3;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding-left: 2rem;
}
.content .content-left .userInfo img {
  width: 4rem;
  border-radius: 50%;
  background-color: #d8d8d8;
  box-sizing: border-box;
  padding: 0.5rem;
}
.content .content-left .userInfo .user {
  /* width: 100%; */
  height: 5rem;
  line-height: 2rem;
  font-size: 1.1rem;
  margin-left: 1rem;
  padding-top: 1rem;
}
.content .content-left .userInfo .user > span {
  color: #5c5c5c;
}
.content .content-left .userInfo .user > p {
  color: #4598ff;
  font-size: 1.2rem;
}
/*导航栏*/
.content .content-left .box {
  /* width: 100%; */
  /*padding-left: 34px;*/
  margin: 2rem 0 1rem;
  box-sizing: border-box;
}
.content .content-left .box * {
  /* width: 100%; */
  font-size: 1.1rem;
  box-sizing: border-box;
}
.content .content-left .box h5 {
  /* height: 68px; */
  color: #bcbcbc;
  line-height: 4rem;
  display: block;
  margin-left: 1rem;
  font-size: 1rem;
}
.content .content-left .box li {
  height: 3rem;
  line-height: 3rem;
  display: block;
  color: #4598ff;
  padding: 0 1.1rem;
  cursor: pointer;
  transition: background-color 1s;
  border-radius: 2rem;
  width: 13rem;
  /* width: 252px; */
  /*display: flex;*/
}
.content .content-left .box li i {
  margin-right: 0.5rem;
}
.content .content-left .box li span {
  color: #5c5c5c;
  transition: background-color 1s;
}
.content .content-left .loge {
  height: 3rem;
  margin: 2rem 3rem 0;
}
/*二级路由*/
.content .content-right {
  width: 100%;
  height: 100%;
}
#home .content .content-left .box .on {
  background-color: #4598ff;
  color: #fff;
}
#home .content .content-left .box .in {
  color: #fff;
}
</style>
