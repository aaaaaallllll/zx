<template>
  <div class="shop">
    <!--  -->
    <div class="flex" style="padding:1rem;">
      <div class="flex">
        <div class="flex top_left_left">
          <p style="padding-right:0.5rem;font-size:1.5rem;">&yen;</p>
          <p style="font-size:1.13rem;">0.01</p>
        </div>
        <div>
          <!-- text-decoration下划线CSS单词值参数：
                none : 　无装饰
                blink : 　闪烁
                underline : 　下划线
                line-through : 　贯穿线
                overline :   上划线
          -->
          <s style="font-size:0.88rem;color:#4E4E4E">&yen;0.02</s>
        </div>
      </div>
      <div class="flex top_right">
        <div class="top_rights top_right1">
          <img class="imgs" src="../../../common/images/1.jpg" alt />
        </div>
        <div class="top_rights top_right2">
          <img class="imgs" src="../../../common/images/1.jpg" alt />
        </div>
        <div class="top_rights top_right3">
          <img class="imgs" src alt />
        </div>
      </div>
    </div>

    <div class="flex_left">
      <p style="font-size:1rem;">「浴资券」</p>
    </div>
    <!-- 空线 -->
    <div class="none"></div>
    <!-- 购买须知 -->
    <div style="display:flex;padding:0.5rem 0;">
      <p style="font-size:0.88rem;">「购买须知」</p>
    </div>
    <!-- 细线 -->
    <div class="line"></div>
    <!-- 大标题 -->
    <div style="padding:0.5rem 1rem;">
      <p class="flex_left" style="font-size:1.13rem;">大标题</p>
      <p class="flex_left" style="font-size:1rem;">小标题</p>
      <p class="flex_left" style="font-size:0.88rem;text-align:left;">正文正文正文正文正文正文正文正文正文正文正文</p>
    </div>
    <!-- 空线 -->
    <div class="none"></div>
    <!-- 拼单尾部 -->
    <div class="flex" style="padding:0.5rem 1rem;">
      <p style="font-size:1.13rem;">1人正在拼单，可直接参与</p>
      <router-link style="font-size:1rem;" to>查看全部></router-link>
    </div>
    <!-- 细线 -->
    <div class="line" style="height:0.1rem;"></div>
    <!-- 拼单人员 -->
    <div class="flex" style="margin-bottom:3rem;">
      <div class="flex">
        <div class="bottom_left">
          <img class="imgs" src alt />
        </div>
        <p style="padding-left:0.3rem;font-size:1.13rem;">某某某</p>
      </div>
      <div class="flex" style="align-items:flex-start;padding:1rem;">
        <div class="flex" style="margin-top:-0.3rem;font-size:1rem;padding-right:0.4rem;">
          还差
          <p style="color:#DD3B2F;font-size:1rem;">1人</p>拼成
        </div>
        <button class="btn" @click="pintuan">去拼单</button>
      </div>
    </div>
    <!-- 点击 去拼团 弹框 -->
    <div class="pindanye" :style="pintuankuang">
      <div class="flex2">
        <div class="flex_right">
          <svg
            @click="pintuanclose"
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
        <div style="font-size:1.4rem;color:#000;text-align:center;">参与某某的拼单</div>
        <div
          style="font-size:1.2rem;color:#666;margin-top:1rem;text-align:center;"
        >仅剩1个名额，{{h}}:{{m}}:{{s}}后结束</div>
        <div class="pinpin">
          <div class="flexs">
            <div class="pindan_img">
              <img class="imgs" src="../../../common/images/1.jpg" alt />
            </div>
            <p class="pinzhu">拼主</p>
          </div>
          <div class="flexs" v-show="haveone1">
            <div class="pindan_img">
              <img class="imgs" src alt />
            </div>
            <p class="pinzhu">成员</p>
          </div>
          <div class="flexs" v-show="!haveone1">
            <div class="pindan_img">
              <svg
                t="1564197640750"
                class="icon pdsvg"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5719"
                width="30"
                height="30"
              >
                <path
                  d="M712.96 538.88c2.56-2.986667 4.693333-5.546667 6.826667-8.533333 0.853333-1.28 2.133333-2.56 2.986666-3.84 1.706667-2.133333 2.986667-4.266667 4.693334-6.4 0.853333-1.28 2.133333-2.986667 2.986666-4.266667 2.133333-3.413333 4.266667-6.4 6.4-9.813333 0-0.426667 0.426667-0.426667 0.426667-0.853334 25.6-41.813333 40.106667-91.733333 38.826667-145.066666-3.413333-140.8-119.466667-255.573333-260.266667-257.706667-148.053333-2.133333-268.8 116.906667-268.8 264.533333v2.986667c0.426667 18.773333 15.36 33.706667 34.133333 33.706667 19.2 0 34.133333-15.786667 34.133334-34.986667V366.933333c0-113.066667 96.426667-204.373333 211.2-195.84 96.853333 7.253333 174.933333 86.613333 180.906666 183.466667 4.693333 77.653333-35.84 146.346667-98.133333 182.186667-71.253333 38.826667-122.88 109.653333-135.253333 193.28-2.986667 20.48 13.226667 38.826667 33.706666 38.826666 16.64 0 31.146667-11.946667 33.706667-28.586666 8.96-61.44 46.506667-113.493333 98.56-142.933334 6.826667-3.84 13.226667-7.68 19.626667-11.946666l3.84-2.56c2.133333-1.28 3.84-2.986667 5.973333-4.266667 1.706667-1.28 3.413333-2.56 5.12-4.266667 2.56-2.133333 5.12-4.266667 8.106667-6.4 1.28-1.28 2.986667-2.56 4.266666-3.84 1.706667-1.28 3.413333-2.986667 5.12-4.693333 2.56-2.133333 4.693333-4.693333 7.253334-6.826667l4.693333-4.693333c1.706667-1.706667 2.986667-3.413333 4.693333-5.12 1.706667-0.853333 2.986667-2.133333 4.266667-3.84z"
                  fill="#8a8a8a"
                  p-id="5720"
                />
                <path
                  d="M499.2 878.933333m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
                  fill="#8a8a8a"
                  p-id="5721"
                />
              </svg>
            </div>
            <p class="pinzhu"></p>
          </div>
          <div class="flexs" v-show="haveone2">
            <div class="pindan_img">
              <img class="imgs" src alt />
            </div>
            <p class="pinzhu">成员</p>
          </div>
          <div class="flexs" v-show="!haveone2">
            <div class="pindan_img">
              <svg
                t="1564197640750"
                class="icon pdsvg"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5719"
                width="30"
                height="30"
              >
                <path
                  d="M712.96 538.88c2.56-2.986667 4.693333-5.546667 6.826667-8.533333 0.853333-1.28 2.133333-2.56 2.986666-3.84 1.706667-2.133333 2.986667-4.266667 4.693334-6.4 0.853333-1.28 2.133333-2.986667 2.986666-4.266667 2.133333-3.413333 4.266667-6.4 6.4-9.813333 0-0.426667 0.426667-0.426667 0.426667-0.853334 25.6-41.813333 40.106667-91.733333 38.826667-145.066666-3.413333-140.8-119.466667-255.573333-260.266667-257.706667-148.053333-2.133333-268.8 116.906667-268.8 264.533333v2.986667c0.426667 18.773333 15.36 33.706667 34.133333 33.706667 19.2 0 34.133333-15.786667 34.133334-34.986667V366.933333c0-113.066667 96.426667-204.373333 211.2-195.84 96.853333 7.253333 174.933333 86.613333 180.906666 183.466667 4.693333 77.653333-35.84 146.346667-98.133333 182.186667-71.253333 38.826667-122.88 109.653333-135.253333 193.28-2.986667 20.48 13.226667 38.826667 33.706666 38.826666 16.64 0 31.146667-11.946667 33.706667-28.586666 8.96-61.44 46.506667-113.493333 98.56-142.933334 6.826667-3.84 13.226667-7.68 19.626667-11.946666l3.84-2.56c2.133333-1.28 3.84-2.986667 5.973333-4.266667 1.706667-1.28 3.413333-2.56 5.12-4.266667 2.56-2.133333 5.12-4.266667 8.106667-6.4 1.28-1.28 2.986667-2.56 4.266666-3.84 1.706667-1.28 3.413333-2.986667 5.12-4.693333 2.56-2.133333 4.693333-4.693333 7.253334-6.826667l4.693333-4.693333c1.706667-1.706667 2.986667-3.413333 4.693333-5.12 1.706667-0.853333 2.986667-2.133333 4.266667-3.84z"
                  fill="#8a8a8a"
                  p-id="5720"
                />
                <path
                  d="M499.2 878.933333m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
                  fill="#8a8a8a"
                  p-id="5721"
                />
              </svg>
            </div>
            <p class="pinzhu"></p>
          </div>
        </div>
        <button class="btn pindanbtn">参与拼单</button>
      </div>
    </div>
    <!-- 底部按钮固定样式 -->
    <button class="btn_last">确认拼团</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pintuan1: false,
      pintuankuang: "display:none;",
      clocktime: null,
      time: 86400,
      h: 23,
      m: 59,
      s: 60,
      haveone1: true,
      haveone2: false
    };
  },
  mounted() {
    this.clock();
  },
  methods: {
    // 一天的计时器
    clock() {
      const that = this;
      var t = that.time;
      var hours = that.h;
      var minute = that.m;
      var second = that.s;
      that.clocktime = setInterval(() => {
        if (hours == 0 && (minute == 0) & (second == 0)) {
          that.clocktime = null;
        } else {
          second--;
          if (minute < 0) {
            --hours;
            minute = 59;
            second = 59;
          }
          if (second < 0) {
            second = 59;
            minute--;
          }
          //  else if(minute==0){
          //     minute=0;
          //    }else if(minute==0&&second<0){
          //    --hours;
          //    minute=59;
          //    second=59;
          //  }
        }
        that.s = second < 10 ? "0" + second : second;
        that.m = minute < 10 ? "0" + minute : minute;
        that.h = hours < 10 ? "0" + hours : hours;
      }, 1000);
    },
    pintuan() {
      const that = this;
      if (that.pintuan1 == false) {
        that.pintuankuang = "display:block";
        that.pintuan1 = true;
      } else {
        that.pintuankuang = "display:none;";
        that.pintuan1 = false;
      }
    },
    pintuanclose() {
      const that = this;
      if (that.pintuan1 == true) {
        that.pintuankuang = "display:none;";
        that.pintuan1 = false;
      } else {
        that.pintuankuang = "display:block";
        that.pintuan1 = true;
      }
    }
  }
};
</script>

<style scoped>
.pinzhu {
  font-size: 1.2rem;
  margin-top: 1rem;
}
.flexs {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.router-link-active {
  text-decoration: none;
  font-size: 1.2rem;
  color: #969696;
}
/* 流式布局 */
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex_left {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.flex_right {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
/* 空线粗 */
.none {
  margin-top: 1rem;
  width: 100%;
  height: 0.7rem;
  background: #f0f0f0;
}
/* 空线细 */
.line {
  width: 95%;
  height: 0.2rem;
  background: #f0f0f0;
  margin: 0 auto;
}
.top_left_left {
  color: #d13a3b;
  align-items: baseline;
  margin-right: 1rem;
}
.top_right {
  position: relative;
}
.top_rights {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.top_right1 {
  position: absolute;
  right: 2.7rem;
  background: #d8d8d8;
  z-index: 4;
}
.top_right2 {
  position: absolute;
  background: #b9b9b9;
  right: 1.5rem;
  z-index: 3;
}
.top_right3 {
  position: absolute;
  background: #969696;
  right: 0.2rem;
  z-index: 2;
}
.imgs {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.bottom_left {
  background: #d8d8d8;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: 0.5rem;
}
.btn {
  width: 6rem;
  height: 2.2rem;
  background: #de3b2f;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  color: #fff;
}
.btn_last {
  display: block;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  font-size: 1.13rem;
  line-height: 3rem;
  font-weight: normal;
  border: none;
  outline: none;
  background: #2352ba;
  color: #fff;
}
.pinpin {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.pindanye {
  width: 100%;
  height: 100%;
}
.flex2 {
  width: 90%;
  height: 50%;
  display: flex;
  background: #d8d8d8;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  top: 24%;
  left: 5%;
  border-radius: 0.6rem;
}
.pindan_img {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #d8d8d8;
  border: 1px solid #979797;
}
.pdsvg {
  /* margin-top: 1rem; */
  padding: 0.75rem;
}
.pindanbtn {
  width: 90%;
  height: 3rem;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: 100;
}
</style>
