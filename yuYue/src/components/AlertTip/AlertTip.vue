<template>
  <div class="alert_container" >
    <section class="tip_text_container" >
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="affirm" style="left: 0;bottom: 0;border-bottom-left-radius:5px;border-right: 1px solid #ffffff;">确认</div>
      <div class="confrim" @click="cancel" style="right: 0;bottom: 0;border-bottom-right-radius:5px;border-left: 1px solid #ffffff; ">取消</div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    alertText: String,
  },

  methods: {
    affirm () {
      // 分发自定义事件(事件名: closeTip)
      this.$emit('affirm')
    },
    cancel(){
      this.$emit('_cancel')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';

  @keyframes tipMove
    0%
      transform: scale(1)
    35%
      transform: scale(.8)
    70%
      transform: scale(1.1)
    100%
      transform: scale(1)

  .alert_container
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0, 0, 0, .5)
    .tip_text_container
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -90px
      margin-left: -110px
      width: 60%
      animation: tipMove .3s;
      background-color: rgba(255, 255, 255, 1);
      border: 1px;
      padding-top: 20px
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 5px
      height 160px
      .tip_icon
        width: 55px
        height: 55px
        border: 2px solid #007aff;
        border-radius: 50%;
        font-size 20px
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span:nth-of-type(1)
          width: 2px
          height: 30px
          background-color: #ff0000;
        span:nth-of-type(2)
          width: 2px
          height: 2px
          border: 1px;
          border-radius: 50%;
          margin-top: 2px
          background-color #ff0000
      .tip_text
        font-size 14px
        color #333
        line-height 20px
        text-align center
        margin-top 10px
        padding 0 5px
      .confrim
        font-size 18px
        font-weight bold
        margin-top 10px
        background-color #007aff
        width 50%
        text-align center
        line-height 35px
        border 1px
        color #fff
        /*border-bottom-left-radius 5px*/
        /*border-bottom-right-radius 5px*/
        position absolute
</style>
