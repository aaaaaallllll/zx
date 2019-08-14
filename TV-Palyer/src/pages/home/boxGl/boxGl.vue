<template>
  <div id="box" @click="box">
    <div class="title">
      <el-row>
        <el-col :span="7">
          <span>Boxes</span>
        </el-col>
        <el-col :span="17">
          <div class="search">
            <input v-focus type="text" placeholder="search for lD" v-model="search" />
            <i class="iconfont" @click="search1">&#xe645;</i>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-table :data="xsList" border style="width:100%;margin-top:1rem;">
        <el-table-column fixed prop="id" label="ID:"></el-table-column>
        <el-table-column prop="createtime" label="Latest:"></el-table-column>
        <el-table-column prop="deviceId" label="Deviceld:"></el-table-column>
        <el-table-column prop="dueDate" label="DueDate:"></el-table-column>
        <el-table-column prop="agent" label="Agent Name:"></el-table-column>
        <el-table-column prop="remark" label="Remark:"></el-table-column>
        <el-table-column fixed="right" label="Actions">
          <template
            slot-scope="scope"
            style="display:flex;flex-direction: column;align-items:center;"
          >
            <el-button
              class="xiahuaxian"
              type="text"
              size="small"
              @click="alterItem(scope.$index, scope.row)"
            >Edit</el-button>
            <el-button
              class="xiahuaxian"
              type="text"
              size="small"
              @click="arter1(scope.row)"
            >Config country</el-button>
            <el-button
              class="xiahuaxian"
              type="text"
              size="small"
              @click="arter2(scope.row)"
            >Config language</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑-->
    <div class="redact" v-if="showAdd" :key="223466">
      <div class="redact_flex">
        <h6>Edit Box</h6>
        <!-- <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <div>I can change it here from :DeviceId,Agent Name,DueDate,VodPwd,UpdateAllowed and Remark!</div>
          </el-collapse-item>
        </el-collapse>-->
        <div class="redact-hang">
          <div class="redact-ge">
            <span>DeviceId：</span>
            <input type="text" disabled v-model="deviceId" />
          </div>
          <div class="redact-ge">
            <span>Agent Name：</span>
            <input
              class="fontcolor"
              id="inputs"
              type="text"
              @click="clickme"
              style="position:relative;top:2px;"
              v-model="agent"
            />

            <div class="xlk" style="width:30%;height:10rem;left:15rem;" v-if="shos">
              <ul>
                <li v-for="(item,index) in listss" :key="index" @click="geiSs(item)">{{item.agent}}</li>
              </ul>
            </div>
          </div>
          <div class="redact-ge block">
            <span style="margin-left:0.2rem;padding-bottom:0.5rem;">DueDate：</span>
            <el-date-picker v-model="dueDate" type="date" placeholder="Select Date"></el-date-picker>
          </div>
        </div>
        <div class="redact-hang">
          <div class="redact-ge">
            <span style="margin-right:5rem;">VodPwd：</span>
            <input type="text" class="fontcolor" v-model="vodpwd" />
          </div>
          <div class="redact-ge" style="opacity:0;">
            <span style="margin-right:5rem;">VodPwd：</span>
            <input type="text" class="fontcolor" v-model="vodpwd" />
          </div>
          <div class="redact-ge">
            <span style="text-align:left;">UpdateAllowed：</span>
            <div
              style="display:flex;justify-content:flex-start;align-items:center;height:2rem;padding-top:1rem;"
            >
              <label>
                <!--  :checked="upShow==true?true:false" -->
                <input
                  @click="i1"
                  style="width:1.5rem;margin-right:1rem;"
                  :checked="upShow"
                  type="radio"
                  value="1"
                  name="kill"
                />
                <span style="margin-right:1rem;margin-top:-1rem;">Yes</span>
              </label>
              <label>
                <!-- :checked="upShow==false?true:false" -->
                <input
                  @click="i2"
                  style="width:1.5rem;"
                  :checked="!upShow"
                  type="radio"
                  value="0"
                  name="kill"
                />
                <span style="margin-top:-1rem;">No</span>
              </label>
            </div>
          </div>
        </div>
        <div class="redact-hang" style="padding-top:1rem;">
          <div class="redact-ge">
            <span>Remark：</span>
            <input class="fontcolor" style="width:200%;" type="text" v-model="remark" />
          </div>
          <div class="redact-ge" style="opacity:0;">
            <span>Remark：</span>
            <input class="fontcolor" type="text" v-model="remark" />
          </div>
          <div class="redact-ge" style="opacity:0;">
            <span>Remark：</span>
            <b class="fontcolor"></b>
          </div>
        </div>
        <div style="display:flex;justify-content:center;margin-top:2rem;">
          <div class="btn1" @click="addItem">Confirm</div>
          <div style="opacity:0;">111111</div>
          <div class="btn1" @click="gbAdd">Cancel</div>
        </div>
      </div>
    </div>
    <!-- 这是修改隐藏的国家 -->
    <div class="aaaa" v-show="guojia">
      <div class="yc">Config country</div>
      <div class="bkyj">
        <!-- 两个框之左边的 -->
        <div class="allgj1">
          <div class="jz">All country</div>
          <div class="allgjliebiao">
            <ul>
              <li
                :style="active1 == i ? reds : ''"
                @click="tianjia1(i)"
                v-for="(guojia,i) in newList1"
                :key="i"
              >{{guojia}}</li>
            </ul>
          </div>
        </div>
        <div class="middlebtn">
          <button @click="sc1">←</button>
          <button @click="tj1">→</button>
        </div>
        <!-- 两个框之右边的 -->
        <div class="allgj1">
          <div class="jz">Select hidden country</div>
          <div class="allgjliebiao">
            <ul>
              <li
                :style="active2==i?reds:''"
                v-for="(havegj,i) in nulllist1"
                @click="shanchu1(i)"
                :key="i"
              >{{havegj.channelval}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div style="text-align:center;">
        <button class="configs" style="margin-right:1rem;" @click="config1">Config</button>
        <button class="configs" style="margin-left:1rem;" @click="quxiao1">Cancel</button>
      </div>
    </div>
    <!-- 这是修改隐藏的语言 -->
    <div class="aaaa" v-show="yuyan">
      <div class="yc">Config language</div>
      <div class="bkyj">
        <!-- 两个框之左边的 -->
        <div class="allgj1">
          <div class="jz">All language</div>
          <div class="allgjliebiao">
            <ul>
              <li
                :style="active3==i?reds:''"
                @click="tianjia2(i)"
                v-for="(lan,i) in newList2"
                :key="i"
              >{{lan}}</li>
            </ul>
          </div>
        </div>
        <div class="middlebtn">
          <button @click="sc2">←</button>
          <button @click="tj2">→</button>
        </div>
        <!-- 两个框之右边的 -->
        <div class="allgj1">
          <div class="jz">Select hidden language</div>
          <div class="allgjliebiao">
            <ul>
              <li
                :style="active4==i?reds:''"
                @click="shanchu2(i)"
                v-for="(lan,i) in nulllist2"
                :key="i"
              >{{lan.channelval}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div style="text-align:center;">
        <button class="configs" style="margin-right:1rem;" @click="config2">Config</button>
        <button class="configs" style="margin-left:1rem;" @click="quxiao2">Cancel</button>
      </div>
    </div>
    <!--弹窗-->
    <div class="msg" v-if="showMsg">{{cmsg}}</div>
  </div>
</template>

<script>
// const ajaxUrl = "http://192.168.1.234:999/haotian/xcx.do";
const ajaxUrl = "http://47.110.228.20:89/haotian/xcx.do";
// const ajaxUrl= 'http://192.168.1.15:999/com_pangu_tang_web_war_exploded/xcx.do'
export default {
  name: "agentGl",
  data() {
    return {
      active1: -1,
      active2: -1,
      active3: -1,
      active4: -1,
      reds: "background:#f00;",
      guojia: false,
      yuyan: false,
      list: [],
      checkAll: false,
      showAlert: false,
      dIndex: -1,
      showIndex: -1,
      showAdd: false,
      dailishangid: "",
      vodpwd: "",
      agent: "",
      remark: "",
      deviceId: "",
      dueDate: "",
      afterIndex: -1,
      msg: "", //弹窗信息
      userId: "", //缓存id
      id: "",
      createtime: "",
      createTime: "",
      cmsg: "",
      search: "", //搜索框内容
      showMsg: false, //弹窗控制
      upShow: true,
      xsList: [],
      agentname: [],
      listss: [],
      shos: false,
      // 存放所有国家和语言
      newList1: [],
      newList2: [],
      // 两个空的数据，用来存放用户选择的国家和语言
      nulllist1: [],
      nulllist2: [],
      ids: ""
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {},
  methods: {
    i1() {
      if (this.upShow == false) {
        this.upShow = true;
      } else {
        return;
      }
    },
    i2() {
      if (this.upShow == true) {
        this.upShow = false;
      } else {
        return;
      }
    },
    // 获取用户自己选择的国家显示
    hqgj(id) {
      const that = this;
      that.nulllist1 = [];
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "jsonp",
        data: {
          operationType: "shiBoBoxHideService",
          type: "query",
          boxId: id
        },
        success: function(data) {
          let datas = data.result.country;
          console.log(datas);
          let zanshi = that.newList1;
          console.log(zanshi);
          for (let i = zanshi.length - 1; i >= 0; i--) {
            for (let j = datas.length - 1; j >= 0; j--) {
              if (zanshi[i] == datas[j].channelval) {
                that.newList1.splice(i, 1);
              }
            }
          }
          console.log(that.newList1);
          for (let dat of datas) {
            that.nulllist1.push(dat);
          }
          console.log(that.nulllist1);
        }
      });
    },
    // 获取用户自己选择的语言列表
    hqyy(id) {
      const that = this;
      that.nulllist2 = [];
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "jsonp",
        data: {
          operationType: "shiBoBoxHideService",
          type: "query",
          boxId: id
        },
        success: function(data) {
          let datas = data.result.langs;
          for (let i = that.newList2.length - 1; i >= 0; i--) {
            for (let j = datas.length - 1; j >= 0; j--) {
              if (that.newList2[i] == datas[j].channelval) {
                that.newList2.splice(i, 1);
              }
            }
          }
          for (let dat of datas) {
            that.nulllist2.push(dat);
          }
        }
      });
    },
    // 点击li，将当前的i值更新；(国家左侧下标)
    tianjia1(i) {
      const that = this;
      if (i == that.active1) {
        that.active1 = -1;
      } else {
        that.active1 = i;
      }
    },
    tianjia2(i) {
      const that = this;
      if (i == that.active3) {
        that.active3 = -1;
      } else {
        that.active3 = i;
      }
    },
    //点击li，将当前i值更新；（国家右侧下标）;
    shanchu1(i) {
      const that = this;
      if (i == that.active2) {
        that.active2 = -1;
      } else {
        that.active2 = i;
      }
    },
    //点击li，将当前i值更新；（国家右侧下标）;
    shanchu2(i) {
      const that = this;
      console.log(i);
      if (i == that.active4) {
        that.active4 = -1;
      } else {
        that.active4 = i;
      }
    },
    // 点击add按钮，将左侧的选中的国家添加到右侧；
    tj1() {
      const that = this;
      let id = that.ids;
      let gj = that.newList1[that.active1];
      let ber = true;
      for (let sz of that.nulllist1) {
        if (sz.channelval == gj) {
          ber = false;
        }
      }
      if (that.active1 != -1) {
        if (!ber) {
          that.$message.error("errors,can't repeat!");
        } else {
          $.ajax({
            type: "POST",
            url: ajaxUrl,
            dataType: "jsonp",
            data: {
              operationType: "shiBoBoxHideService",
              type: "add",
              boxId: id,
              channelType: "Country",
              channelVal: gj
            },
            success: function(data) {
              console.log(data);
              if (data.success) {
                that.newList1.splice(that.active1, 1);
                // that.repeatsc1();
                that.nulllist1.push({
                  boxid: id,
                  channeltype: "Country",
                  channelval: gj
                });
                that.active1 = -1;
              } else {
                that.$message.error(data.errorDesc);
              }
            }
          });
        }
      } else {
        that.$message.error("errors,not country");
      }
    },
    tj2() {
      const that = this;
      let id = that.ids;
      let lang = that.newList2[that.active3];
      let buer = true;
      console.log(lang);
      for (let sz of that.nulllist2) {
        if (sz.channelval == lang) {
          buer = false;
        }
      }
      if (that.active3 != -1) {
        if (!buer) {
          that.$message.error("errors,can't repeat!");
        } else {
          $.ajax({
            type: "POST",
            url: ajaxUrl,
            dataType: "jsonp",
            data: {
              operationType: "shiBoBoxHideService",
              type: "add",
              boxId: id,
              channelType: "Language",
              channelVal: lang
            },
            success: function(data) {
              if (data.success) {
                that.newList2.splice(that.active3, 1);
                that.nulllist2.push({
                  boxid: id,
                  channeltype: "Language",
                  channelval: lang
                });
                that.active3 = -1;
              } else {
                that.$message.error(data.errorDesc);
              }
            }
          });
        }
      } else {
        that.$message.error("errors,not Language");
      }
    },
    sc1() {
      const that = this;
      let i = that.active2;
      if (i != -1) {
        let id = that.ids;
        let gj = that.nulllist1[that.active2].channelval;
        $.ajax({
          type: "POST",
          url: ajaxUrl,
          dataType: "jsonp",
          data: {
            operationType: "shiBoBoxHideService",
            type: "delete",
            boxId: id,
            channelType: "Country",
            channelVal: gj
          },
          success: function(data) {
            if (data.success) {
              that.newList1.unshift(gj);
              that.nulllist1.splice(i, 1);
              that.active2 = -1;
            } else {
              that.$message.error(data.errorDesc);
            }
          }
        });
      } else {
        that.$message.error("errors,not country");
      }
    },
    sc2() {
      const that = this;
      let i = that.active4;
      if (i != -1) {
        let id = that.ids;
        let lang = that.nulllist2[that.active4].channelval;
        $.ajax({
          type: "POST",
          url: ajaxUrl,
          dataType: "jsonp",
          data: {
            operationType: "shiBoBoxHideService",
            type: "delete",
            boxId: id,
            channelType: "Language",
            channelVal: lang
          },
          success: function(data) {
            if (data.success) {
              that.newList2.unshift(lang);
              that.nulllist2.splice(i, 1);
              that.active4 = -1;
            } else {
              that.$message.error(data.errorDesc);
            }
          }
        });
      } else {
        that.$message.error("errors,not country");
      }
    },

    // 点击设置将当前id传进
    arter1(row) {
      const that = this;
      that.ids = row.id;
      let idss = that.ids;
      that.hqgj(idss);
      that.yuyan = false;
      that.guojia = true;
    },
    arter2(row) {
      const that = this;
      this.ids = row.id;
      let idss = that.ids;
      that.hqyy(idss);
      that.guojia = false;
      this.yuyan = true;
    },
    // 隐藏国家和语言
    quxiao1() {
      this.guojia = false;
    },
    config1() {
      this.guojia = false;
    },
    quxiao2() {
      this.yuyan = false;
    },
    config2() {
      this.yuyan = false;
    },
    clickme() {
      if (this.shos == true) {
        this.shos = false;
        return;
      }
      this.shos = true;
    },
    box(e) {
      let inputs = document.getElementById("inputs");
      let me = e.target;
      if (this.shos == true && me != inputs) {
        this.shos = false;
      }
    },
    geiSs(item) {
      console.log(item, item.id, item.agent);
      this.agent = item.agent;
      this.dailishangid = item.id;
      // this.dailishangid=item.agent;
      if (this.shos == false) {
        this.shos = false;
      } else {
        this.shos = false;
      }
    },
    search1() {
      var search = this.search;
      var lists = [];
      console.log(this.list);
      console.log(this.list[0].remark);
      console.log(search);
      if (search !== "") {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].remark != undefined) {
            if (
              this.list[i].id.toString().indexOf(search) != -1 ||
              this.list[i].remark.toUpperCase().indexOf(search.toUpperCase()) !=
                -1
            ) {
              lists.push(this.list[i]);
            } else if (this.list[i].agent != undefined) {
              if (this.list[i].agent.toUpperCase().indexOf(search.toUpperCase()) != -1) {
                lists.push(this.list[i]);
              }
            }
          } else {
            if (this.list[i].id.toString().indexOf(search) != -1) {
              lists.push(this.list[i]);
            } else if (this.list[i].agent != undefined) {
              if (this.list[i].agent.toUpperCase().indexOf(search.toUpperCase()) != -1) {
                lists.push(this.list[i]);
              }
            }
          }
        }
        this.xsList = lists;
      } else {
        this.xsList = this.list;
      }
    },
    gbAdd() {
      const that = this;
      that.showAdd = false;
      (that.id = ""),
        (that.dailishangid = ""),
        (that.vodpwd = ""),
        (that.remark = ""),
        (that.deviceid = ""),
        (that.dueDate = ""),
        (that.upShow = true);
      that.agent = "";
    },
    //添加
    addAlert() {
      this.showAdd = true;
      this.msg = "New";
    },
    addItem() {
      const that = this;
      const xIndex = that.afterIndex;
      if (xIndex == -1) {
        that.msg = "New";
        // 添加请求
      } else {
        // 编辑请求
        var nowdata = "";
        var duedatenow = "";
        let duedates = that.dueDate;
        if (typeof duedates == "object") {
          let year = duedates.getFullYear();
          let mon = duedates.getMonth() + 1;
          let day = duedates.getDate();
          // let day = date.getDay(); //获取当前星期几
          let h = duedates.getHours(); //获取小时
          let m = duedates.getMinutes(); //获取分钟
          let s = duedates.getSeconds(); //获取秒
          mon = mon < "10" ? "0" + mon : mon;
          day = day < "10" ? "0" + day : day;
          h = h < "10" ? "0" + h : h;
          m = m < "10" ? "0" + m : m;
          s = s < "10" ? "0" + s : s;
          console.log(h, m, s);
          duedatenow = nowdata =
            year + "-" + mon + "-" + day + " " + h + ":" + m + ":" + s;
          console.log(duedatenow);
          that.dueDate = duedatenow;
        } else {
          duedatenow = duedates;
        }
        console.log(that.upShow);
        // return;
        // return;
        $.ajax({
          type: "POST",
          url: ajaxUrl,
          dataType: "jsonp",
          // data: "name=garfield&age=18",
          data: {
            operationType: "shiBoDianShiTaiService",
            type: "updateHeZi",
            data: JSON.stringify({
              daiLiShangId: that.dailishangid,
              deviceId: that.deviceId,
              dueDate: duedatenow,
              yunXuUpdate: that.upShow,
              vodPwd: that.vodpwd,
              remark: that.remark,
              modifyTime: that.modifyTime,
              createTime: that.createtime,
              id: that.id,
              agent: that.agent
            })
          },
          success: function(data) {
            if (!data.errorDesc) {
              console.log(data);
              that.list[xIndex].id = that.id;
              that.list[xIndex].dailishangid = that.dailishangid;
              that.list[xIndex].agent = that.agent;
              that.list[xIndex].vodpwd = that.vodpwd;
              that.list[xIndex].remark = that.remark;
              that.list[xIndex].deviceId = that.deviceId;
              that.list[xIndex].dueDate = that.dueDate;
              that.list[xIndex].upShow = that.upShow;
              that.afterIndex = -1;
              that.gbAdd();
              // let list=eval('('+data.result+')')
              // let list=data.result
              // console.log(list)
              // let son={
              //   name:list.userid,
              //   password:list.pwd,
              //   agent:list.dailishangming,
              //   telephone:list.tel,
              //   add:list.addr,
              //   country:list.country,
              //   remark:list.remark,
              //   ck: false,
              //   id:list.id,
              //   createtime:list.createtime,
              //   modifytime:list.modifytime
              // }
              // that.list.unshift(son)
            } else {
              that.altShow(data.errorDesc);
            }
          }
        });
      }
    },
    //更改
    alterItem(i, row) {
      const that = this;
      const list = that.list;
      let index = null;
      let id = row.id;
      for (let i = 0; i < list.length; i++) {
        if (id == list[i].id) {
          index = i;
        }
      }
      console.log(list);
      that.id = that.list[index].id;
      that.dailishangid = that.list[index].dailishangid;
      that.agent = that.list[index].agent;
      that.vodpwd = that.list[index].vodpwd;
      that.remark = that.list[index].remark;
      that.deviceId = that.list[index].deviceId;
      that.dueDate = that.list[index].dueDate;
      that.upShow = that.list[index].upShow;
      that.showAdd = true;
      that.afterIndex = index;
      that.msg = "Edit";
      // that.id=id
      that.createtime = row.createtime;
      that.modifyTime = row.modifyTime;
    },
    // 获取数据
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
    // 获取盒子列表
    getData() {
      const that = this;
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "jsonp",
        // data: "name=garfield&age=18",
        data: {
          operationType: "shiBoDianShiTaiService",
          type: "queryHeZi",
          userId: this.getCookie("userid"),
          data: JSON.stringify({
            // daiLiShangMing:that.userId
          })
        },
        success: function(data) {
          that.getcountryandyuyan();
          if (!data.errorDesc) {
            let list = eval("(" + data.result + ")");
            console.log(list);
            let list2 = [];
            for (let i = 0; i < list.length; i++) {
              that.agentname.push(list[i].agentname);
              let son = {
                dailishangid: list[i].dailishangid,
                id: list[i].id,
                vodpwd: list[i].vodpwd,
                remark: list[i].remark,
                createtime: list[i].createtime,
                deviceId: list[i].deviceid,
                dueDate: list[i].duedate,
                upShow: list[i].yunxuupdate,
                modifyTime: list[i].modifytime,
                agent: list[i].agentname
              };
              list2.push(son);
            }
            that.list = list2;
            that.xsList = list2;
            // that.listss=list4;
            // console.log(list3);
            // console.log(that.xsList, that.list);
          } else {
            that.altShow(data.errorDesc);
          }
          that.getData2();
        }
      });
    },
    // 弹窗
    altShow(err) {
      const that = this;
      that.showMsg = true;
      that.cmsg = err;
      console.log(err);
      setTimeout(() => {
        that.showMsg = false;
        that.cmsg = "";
      }, 1500);
    },
    // 获取代理商列表
    getData2() {
      const that = this;
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "jsonp",
        // data: "name=garfield&age=18",
        data: {
          operationType: "shiBoDianShiTaiService",
          type: "queryAgent",
          userId: this.getCookie("userid"),
          data: JSON.stringify({
            // daiLiShangMing:that.userId
          })
        },
        success: function(data) {
          console.log(data);
          if (!data.errorDesc) {
            let list = eval("(" + data.result + ")");
            console.log(list);
            let list2 = [];
            let list3 = [];
            let list4 = [];
            for (let i = 0; i < list.length; i++) {
              let son = {
                agent: list[i].dailishangming,
                id: list[i].id
              };
              list2.push(son);
            }
            for (var key of list2) {
              // list3.push(key.agent)
              // console.log(key)
              if (list3.indexOf(key.agent) == -1) {
                list3.push(key.agent);
                list4.push(key);
              }
              that.listss = list4;
            }
          } else {
            that.altShow(data.errorDesc);
          }
        }
      });
    },
    getcountryandyuyan() {
      const that = this;
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "jsonp",
        data: {
          operationType: "shiBoZhiBoService"
        },
        success: function(data) {
          var datas = eval("(" + data.result + ")");
          var datas1 = eval("(" + datas.countries + ")");
          var datas2 = eval("(" + datas.leibies + ")");
          var datas3 = eval("(" + datas.source + ")");
          console.log(datas1); //国家
          console.log(datas2); //语言
          console.log(datas3);
          that.newList1 = datas1;
          that.newList2 = datas2;
        }
      });
    }
  },
  mounted() {
    var abs = document.getElementsByClassName("el-date-picker__header-label");
    console.log(abs);
    this.userId = this.getCookie("userId");
    console.log(this.userId);
    this.getData();
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.search1(); // 登录方法名
        return false;
      }
    };
  }
};
</script>

<style scoped>
#as {
  position: relative; /*定位*/
  top: 10px;
  left: 10px;
  width: 200px;
  height: 200px;
  background: #666; /*设置一下背景*/
}
@import "../../../common/css/style.css";
/* 标题 */
.bkyj {
  padding: 1rem 0 0 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.yc {
  box-sizing: border-box;
  text-align: center;
  font-size: 2rem;
  background: #4598ff;
  line-height: 4rem;
  color: #fff;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
}
/* 居中字体 */
.jz {
  text-align: center;
  font-size: 1.5rem;
  line-height: 3rem;
  background-color: #4598ff;
  color: #fff;
}
/* 列表详情 */
.allgj1 {
  width: 40%;
  height: 18rem;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border: 2px solid #4598ff;
}
.allgjliebiao {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  text-align: center;
}
.allgjliebiao li {
  color: #000;
  font-size: 1.1rem;
  padding: 0.8rem;
}
.allgjliebiao li:hover {
  background: #45e3ff !important;
  cursor: pointer;
}
.middlebtn {
  display: flex;
  flex-direction: column;
}
.middlebtn button {
  color: #fff;
  width: 4rem;
  height: 2.5rem;
  margin-top: 1rem;
  background-color: #4598ff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 2rem;
  padding-bottom: 0.2rem;
}

.xiahuaxian {
  text-decoration: underline;
}
.msg {
  width: 25rem;
  min-height: 2.8rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  text-align: center;
  line-height: 2.8rem;
  font-size: 1rem;
  position: fixed;
  top: 50%;
  left: 40%;
  z-index: 10;
  color: #fff;
}
#box {
  width: 100%;
  height: 100%;
}
/*头部*/
.title {
  height: 5rem;
  width: 100%;
  font-size: 1rem;
  padding-left: 5rem;
  color: #5c5c5c;
  box-sizing: border-box;
  padding-top: 1rem;
}
.title .search {
  display: inline-block;
  width: 25rem;
  height: 3rem;
}
.title span {
  display: inline-block;
  width: 8rem;
  height: 3rem;
  line-height: 3rem;
}
.title .search input {
  height: 3rem;
  box-sizing: border-box;
  border-radius: 2rem;
  border: 2px solid #bbd5f6;
  padding: 0 2rem 0 2rem;
  line-height: 3rem;
  color: #5c5c5c;
  font-size: 1rem;
  background-color: #e0f1ff;
  outline: none;
}
.title .search i {
  font-size: 1.5rem;
  color: #fff;
  position: relative;
  right: 3rem;
  top: 0.2rem;
  cursor: pointer;
}
/*内容*/
.content {
  width: 100%;
  height: 100%;
  background-color: #f3f9fe;
  box-shadow: inset 0 0 6px rgba(166, 177, 187, 0.5);
  box-sizing: border-box;
  padding: 0 1rem;
  overflow-y: scroll;
}
/*卡片信息*/
.content .box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
  color: #181818;
  display: flex;
  justify-content: space-between;
}

.content .box .box-right {
  color: #bbd9fe;
}
.content .box .box-right * {
  cursor: pointer;
}
.content .box .in {
  color: #fff;
}
.content .box .box-right .iconfont {
  font-size: 1rem;
  font-weight: normal;
}
.content .box .box-left {
  flex: 1;
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
}
.content .box .box-left .box_left_top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.content .box .box-left p {
  color: #181818;
  font-size: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*编辑*/
.redact {
  width: 36%;
  height: 45%;
  background: #fff;
  box-shadow: 1px 1px 4px 2px rgba(199, 206, 214, 1);
  border-radius: 1rem;
  position: absolute;
  z-index: 9;
  top: 25%;
  left: 35%;
  text-align: center;
}
.redact_flex {
  background: #fff;
  line-height: 2rem;
}
.redact_flex span {
  text-align: left;
}
.redact h6 {
  color: #fff;
  font-size: 1rem;
  background: #4598ff;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  line-height: 3rem;
}
.block {
  position: relative;
}
.block > span {
  font-size: 1rem;
  color: rgba(32, 95, 172, 1);
}
.redact .redact-hang {
  height: 5rem;
  width: 100%;
  text-align: center;
}
.redact .redact-hang .redact-ge {
  width: 30%;
  height: 3rem;
  display: inline-block;
}
.redact .redact-hang .redact-ge span {
  font-size: 1rem;
  color: rgba(32, 95, 172, 1);
  display: block;
}
.redact .redact-hang .redact-ge input {
  width: 100%;
  height: 3rem;
  border: 1px solid rgba(183, 191, 199, 1);
  box-sizing: border-box;
  color: #aaa;
  font-size: 1rem;
  background: rgba(245, 250, 254, 1);
}
.redact .redact-hang .redact-ge .fontcolor {
  width: 100%;
  color: #000;
}
.redact .redact-hang .redact-ge p {
  display: inline-block;
  width: 7rem;
  height: 2rem;
  background: rgba(148, 194, 252, 1);
  border-radius: 1rem;
  box-sizing: border-box;
  line-height: 1rem;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
}
.redact .redact-hang .redact-ge .active {
  background-color: #4598ff;
}
.redact .btn div {
  width: 10rem;
  height: 1rem;
  background: rgba(69, 152, 255, 1);
  border-radius: 1rem;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  line-height: 1rem;
  cursor: pointer;
}
/*输入框提示文字*/
input::-webkit-input-placeholder {
  color: #000;
}

input:-moz-placeholder {
  color: #000;
}

input::-moz-placeholder {
  color: #000;
}

input:-ms-input-placeholder {
  color: #000;
}
/*过渡动画*/
.fade-enter {
  opacity: 0;
}

/* 定义进入动画的结束状态*/
.fade-enter-to {
  opacity: 1;
}
/* 定义离开动画的初始状态*/
.fade-leave {
  opacity: 1;
}

/* 定义离开动画的结束状态*/
.fade-leave-to {
  opacity: 0;
}
.xlk {
  position: absolute;
  top: 8rem;
  border: 1px solid #4598ff;
  z-index: 4;
  background-color: #fff;
  border-radius: 4px;
  overflow-y: scroll;
  transition: width 1s linear;
}
.xlk li {
  width: 100%;
  overflow: hidden;
  height: 2rem;
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  line-height: 2rem;
  color: #000;
  text-align: center;
}
.xlk li:hover {
  background: #4598ff;
}
/* 弹框的按钮，修改语言和国家 */
.configs {
  width: 10%;
  height: 2rem;
  border-radius: 0.3rem;
  border: none;
  background: #4598ff;
  color: #fff;
  cursor: pointer;
  margin-top: 2rem;
}
.btn1 {
  width: 30%;
  height: 3rem;
  line-height: 3rem;
  border-radius: 1.3rem;
  background-color: #4598ff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

/* 可编辑的国家和语言 */
.aaaa {
  width: 40%;
  height: 50%;
  background: #fff;
  position: fixed;
  z-index: 100;
  top: 25%;
  left: 30%;
  bottom: 0;
  right: 0;
  border-radius: 0.6rem;
  border: 1px solid #aaa;
}
.cccc {
  background-color: #4598ff;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  font-size: 1.5rem;
  line-height: 3rem;
  text-align: center;
  color: #fff;
}
.country1 {
  box-sizing: border-box;
  width: 100%;
}
.country2 {
  box-sizing: border-box;
  width: 100%;
}
</style>
<style>
.el-transfer {
  text-align: center;
}
.el-transfer-panel {
  text-align: left;
}
.el-input__inner {
  height: 3rem;
  width: 200%;
  border: 1px solid rgba(183, 191, 199, 1);
  border-radius: 0;
  background: #f5fafe;
}
.el-input__suffix {
  left: 7rem;
}
.ivu-input-group .ivu-input {
  display: block;
  width: 100%;
  padding: 1.43rem 0;
  margin-bottom: 0;
  position: relative;
  left: 1rem;
  z-index: 2;
  top: 1.97rem;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 50%;
}
.el-input--prefix .el-input__inner {
  padding-left: 2rem;
}
.el-date-picker {
  width: 20rem;
}
.el-date-picker .el-picker-panel__content {
  width: 18rem;
}
.el-date-table th {
  margin-right: 1rem;
}
.el-date-table td span {
  padding: 0.2rem;
}

.cell {
  padding: 1rem 0;
}
.el-collapse-item__content {
  font-size: 1rem;
}
.el-collapse-item__arrow {
  margin: 0;
}
.el-collapse-item__header {
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
}
.el-input--suffix .el-input__inner {
  position: absolute;
  top: -1.8rem;
  left: -3rem;
}

.el-input__icon {
  opacity: 0;
}
.el-popper[x-placement^="bottom"] {
  left: 1110px !important;
  top: 355px !important;
}
</style>
