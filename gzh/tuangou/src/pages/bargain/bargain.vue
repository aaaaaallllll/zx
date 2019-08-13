<template>
  <div class="bargain">
      <div class="flex" style="background:#fff;">
      <div @click="toppage">
        <svg t="1564143866822" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5699" width="35" height="35"><path d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z" p-id="5700"></path></svg>
      </div>
      <div style="font-size:1.5rem;">梦泉商场</div>
      <div></div>
    </div>
    <div class="over">
      <!-- 标题 -->
      <div class="title">
        <div class="title_left">
          <img
            style="width:100%;height:100%;border-radius:50%;"
            src="../../common/images/1.jpg"
            alt
          />
        </div>
        <div class="title_right">
          <p style="font-size:1.1rem;color:#989898;margin-left:1rem;">某某:</p>
          <p class="zt">“和我一起来砍价，9.9元浴资券拿回家”</p>
        </div>
      </div>
      <!-- 中袋灰色 -->
      <div class="middle">
        <div class="middle_left">
          <img style="width:100%;height:100%;" src="../../common/images/1.jpg" alt />
        </div>
        <div class="middle_right">
          <p style="font-size:1.1rem;">59元浴资券砍价只要 9.9元</p>
          <div class="flex" style="margin-top:2rem;">
            <p class="red">¥59</p>
            <p class="red" style="font-size:1rem;">已送出10件</p>
          </div>
        </div>
      </div>
      <!-- 砍价进度 -->
      <div class="kanjia">
        已砍
        <p class="red">{{yikan}}</p>元，还差
        <p class="red">{{haicha}}</p>元
      </div>
      <!-- 进度条 -->
      <div class="progress">
        <mt-progress :value="value" :bar-height="13"></mt-progress>
      </div>
      <!-- 帮忙砍按钮 -->
      <div style="width:85%;margin:1rem auto;">
        <div class="kanwo">
          <button class="btn" @click="btn">帮好友砍一刀</button>
        </div>
      </div>
      <div class="last">还剩23:23:32过期，快来帮忙吧～</div>

      <!-- 弹框 -->
      <div class="surprise" v-show="istankuang">
        <div class="touxiang">
          <img
            style="width:100%;height:100%;border-radius: 50%;"
            src="../../common/images/1.jpg"
            alt
          />
        </div>
        <div class="flex_right">
            <svg @click="close1"
            t="1564197033216"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5186"
            width="30"
            height="30"
          >
            <path
              d="M851.416 217.84l-45.256-45.248L512 466.744l-294.152-294.16-45.256 45.256L466.744 512l-294.152 294.16 45.248 45.256L512 557.256l294.16 294.16 45.256-45.256L557.256 512z"
              fill="#bfbfbf"
              p-id="5187"
            />
          </svg>
        </div>
        <div class="flex2">感谢你帮我砍了1元</div>
        <div style="padding:1rem;text-align:center;">
          <span style="font-size:1.2rem;">自己砍价9.9元拿浴资券，第一 刀最多砍</span>
          <span class="red">10元</span>
          <span style="font-size:1.2rem;">哦</span>
        </div>
        <button class="djcy">点击参与</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bargain",
  data() {
    return {
      istankuang:false,
      yikan:5,
      haicha:100,
    };
  },
  computed:{
    // 计算砍价的总额和已砍金额的百分比
    value(){
      const that=this;
      var haicha=that.haicha;
      var yikan=that.yikan;
      return 100/haicha*yikan;
    }
  },
  methods: {
      btn(){
          const that=this;
          that.istankuang=true;
      },
      close1(){
          const that=this;
          that.istankuang=false;
      },
      toppage(){
          window.location.assign(-1)
      }
  }
};
</script>

<style scoped>
.surprise {
  width: 80%;
  height: 18rem;
  background: #dd8d18;
  position: fixed;
  top: calc(50% - 11rem);
  left: calc(50% - 40%);
  border-radius: 1rem;
}
.touxiang {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin: -2rem auto 0;
}
.flex2 {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin:1rem 0;color:#737373;
}
.djcy{
    width:80%;height:3.4rem;
    margin-left:10%;
    line-height: 3.4rem;
    margin-top:1rem;
    border-radius: .5rem;
    border:none;
    outline: none;
    background:#DE3B2F; 
    color:#fff;
    font-size:1.4rem;
}
.flex_right{
    display: flex;
    justify-content: flex-end;
    margin-top:-1.8rem;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.zt {
  font-size: 1rem;
}
.red {
  color: #de3b2f;
  font-size: 1.5rem;
}
.bargain {
  width: 100%;
  height: 100%;
  background: url(../../common/images/bg.png);
  background-size: 100% 100%;
  position: fixed;
}
.over {
  width: 90%;
  height: 70%;
  background: #fff;
  border-radius: 1rem;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
}

.progress {
  width: 90%;
  margin: 0 auto;
}

.title {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
}
.title_left {
  width: 3rem;
  height: 3rem;
  background: #aaa;
  border-radius: 50%;
  border: 1px solid #666;
}
.title_right {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.middle {
  width: 90%;
  height: 30%;
  background: #ededed;
  margin: 0.5rem auto;
  display: flex;
  justify-content: center;
  align-content: center;
}
.middle_left {
  width: 7rem;
  height: 6rem;
  margin: 1rem;
  background-color: #fff;
}
.middle_right {
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 1rem 0;
}
.kanjia {
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}
.kanwo {
  width: 100%;
  height: 4rem;
  background: #dd8d18;
  border-radius: 2rem;
}
.btn {
  width: 100%;
  height: 3.6rem;
  border-radius: 2rem;
  border: none;
  outline: none;
  background: #ffd32a;
  color: #ec3c37;
  font-size: 1.4rem;
}

.last {
  display: flex;
  justify-content: center;
  color: #000;
  font-size: 1rem;
}
</style>

<style>
.mt-progress-runway {
  border-radius: 5rem;
  background: #fff2bf;
}
.mt-progress-progress {
  border-radius: 5rem;
  background: #ffd32a;
}
</style>
