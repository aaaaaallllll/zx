<!--agentname添加第一次无响应，看下方法-->


<template>
  <div id="agent" @click="agent1">
    <div class="title">
      <el-row>
        <el-col :span="4">
          <span>Agents</span>
        </el-col>

        <el-col :span="6">
          <div class="search">
            <input type="text" placeholder="search for name" v-model="search" />
            <i class="iconfont">&#xe645;</i>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="handle">
            <button class="btn_top" @click="addAlert">Add</button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-table :data="xsList" border style="width:100%;margin-top:1rem;">
        <el-table-column fixed prop="name" label="UserId:"></el-table-column>
        <el-table-column prop="agent" label="Agent Name:"></el-table-column>
        <el-table-column prop="add" label="Add:"></el-table-column>
        <el-table-column prop="country" label="Country:"></el-table-column>
        <el-table-column prop="telephone" label="Telephone:"></el-table-column>
        <el-table-column prop="remark" label="Remark:"></el-table-column>
        <el-table-column fixed="right" label="Actions">
          <template slot-scope="scope">
            <el-button
              class="xiahuaxian"
              type="text"
              size="small"
              @click="alterItem(scope.$index, scope.row)"
            >Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加-->
    <div class="redact" v-if="showAdd" :key="223466">
      <div class="redact_x">
        <h6>New Agents</h6>
        <!-- <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <div>I can add it here from :UserId,Country,Agent Name,Telephone,Address and Remark!</div>
          </el-collapse-item>
        </el-collapse>-->
        <div class="redact-hang" style="padding:1rem 0;margin-top:1rem;">
          <div class="redact-ge">
            <span class="red">UserId*：</span>
            <input type="text" v-model="name" />
          </div>
          <div class="redact-ge">
            <span class="red">Country*：</span>
            <input type="text" v-model="country" />
          </div>
          <div class="redact-ge">
            <span class="red">Agent Name*：</span>
            <input type="text" @click="input" v-model="agent" />
          </div>
        </div>
        <div class="redact-hang">
          <div class="redact-ge">
            <span class="red">Telephone*：</span>
            <input type="text" v-model="phone" />
          </div>
          <div class="redact-ge">
            <span class="red">Address*：</span>
            <input class="address" type="text" v-model="add" />
          </div>
          <div class="redact-ge" style="opacity:0;">
            <span class="red">Telephone*：</span>
            <input type="text" />
          </div>
        </div>
        <div class="redact-hang">
          <div class="redact-ge">
            <span>Remark：</span>
            <input type="text" style="width:203%;" v-model="remark" />
          </div>
          <!-- 这是僵尸div，无用，只为撑空间 -->
          <div style="opacity:0;" class="redact-ge">
            <span>Remark：</span>
            <input type="text" style="width:200%;" />
          </div>
          <!-- 这是僵尸div，无用，只为撑空间 -->
          <div style="opacity:0;" class="redact-ge">
            <span>Remark：</span>
            <input type="text" style="width:200%;" />
          </div>
        </div>
        <div class="btn" style="padding:1rem 0;">
          <div @click="addItem">Confirm</div>
          <div @click="gbAdd">Cancel</div>
        </div>
      </div>
    </div>
    <!-- 编辑 -->
    <div class="redact" v-if="Addshow" :key="223466">
      <div class="redact_x">
        <h6>Edit Agents</h6>
        <!-- <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <div>I can change it here from :UserId,Country,Agent Name,Telephone,Address and Remark!</div>
          </el-collapse-item>
        </el-collapse>-->
        <div class="redact-hang" style="padding:2rem 0;">
          <div class="redact-ge">
            <span>UserId：</span>
            <input type="text" style="color:#aaa;" disabled v-model="name" />
          </div>
          <div class="redact-ge">
            <span>Country：</span>
            <input type="text" v-model="country" />
          </div>
          <div class="redact-ge">
            <span>Agent Name：</span>
            <input type="text" style="margin-top:-.1rem;" v-model="agent" />
          </div>
          <div style="background:#fff;padding:1rem 0;" class="redact-hang">
            <div class="redact-ge">
              <span>Telephone：</span>
              <input type="text" v-model="phone" />
            </div>
            <div class="redact-ge">
              <span>Address：</span>
              <input class="address" type="text" v-model="add" />
            </div>
            <div class="redact-ge" style="opacity:0;">
              <span>Telephone：</span>
              <input type="text" v-model="phone" />
            </div>
          </div>
          <div style="background:#fff;" class="redact-hang">
            <div class="redact-ge">
              <span>Remark：</span>
              <input type="text" style="width:200%;" v-model="remark" />
            </div>
            <div style="opacity:0;" class="redact-ge">
              <span>Remark：</span>
              <input type="text" style="width:10%;" v-model="remark" />
            </div>
            <div style="opacity:0;" class="redact-ge">
              <span>Remark：</span>
              <input type="text" style="width:10%;" v-model="remark" />
            </div>
          </div>
          <div class="btn" style="background:#fff;padding-bottom:1rem;">
            <div style="margin-left: 10px" @click="addItems">Confirm</div>
            <div style="margin-left: 40px" @click="gbAdds">Cancel</div>
          </div>
        </div>
      </div>
      <!--弹窗-->
      <div class="msg" v-if="showMsg">{{cmsg}}</div>
    </div>
  </div>
</template>

<script>
// const ajaxUrl = "http://192.168.1.234:999/haotian/xcx.do";
const ajaxUrl = "http://47.111.134.168:89/haotian/xcx.do";
// const ajaxUrl= 'http://192.168.1.15:999/com_pangu_tang_web_war_exploded/xcx.do'
export default {
  name: "agentGl",
  data() {
    return {
      activeNames: ["1"],
      list: [],
      checkAll: false,
      showAlert: false,
      dIndex: -1,
      showIndex: -1,
      showAdd: false,
      Addshow: false,
      name: "",
      password: "8888",
      agent: "",
      phone: "",
      country: "",
      add: "",
      remark: "",
      afterIndex: -1,
      search: "",
      // msg: "",
      userId: "",
      id: "",
      createtime: "",
      cmsg: "",
      showMsg: false,
      shos: false,
      pwdupdate: true,
      // parent: "",
      parentid: ""
    };
  },
  computed: {
    xsList() {
      const that = this;
      let list = that.list;
      if (that.search == "") {
        return list;
      } else {
        let list2 = [];
        for (let i = 0; i < list.length; i++) {
          if (
            list[i].name.toLowerCase().indexOf(that.search.toLowerCase()) != -1
          ) {
            list2.push(list[i]);
          }
        }
        return list2;
      }
    }
  },
  methods: {
    resetpwd() {
      this.$alert("The password has been reseted to 8888 succcessfully", {
        confirmButtonText: "确定",
        callback: action => {
          this.password = "8888";
        }
      });
    },
    agent1(e) {
      let nodename = e.target;
      if (nodename.nodeName === "DIV") {
        this.pwdupdate = false;
      }
    },
    updatepwd() {
      this.pwdupdate = false;
      this.parent = "8888";
    },
    enterpwd() {
      this.pwdupdate = true;
    },
    input(e) {
      let me = e.target;
      if (this.shos == true) {
        this.shos = false;
        return;
      }
      this.shos = true;
      if (!me) {
        this.shos = false;
      }
    },
    geiSs(item) {
      const that = this;
      that.id = item.id;
      console.log(that.agent);
      that.agent = item.agent;
      console.log(that.agent);
      if (that.shos == false) {
        that.shos = false;
      } else {
        that.shos = false;
      }
    },
    choose(id) {
      // console.log(id)
      const list = this.list;
      // console.log(list)
      let index = null;
      for (let i = 0; i < list.length; i++) {
        if (id == list[i].id) {
          index = i;
        }
      }
      this.list[index].ck = !this.list[index].ck;
    },
    checkAllShow() {
      const that = this;
      that.checkAll = !that.checkAll;
      for (let i = 0; i < that.list.length; i++) {
        that.list[i].ck = that.checkAll;
      }
    },
    toggerAlert() {
      this.showAlert = !this.showAlert;
    },
    // toggerAlert2(id) {
    //   let index = null;
    //   const list = this.list;
    //   for (let i = 0; i < list.length; i++) {
    //     if (id == list[i].id) {
    //       index = i;
    //     }
    //   }
    //   this.showAlert = !this.showAlert;
    //   this.dIndex = index;
    // },
    deleteItem() {
      const that = this;
      const index = that.dIndex;
      console.log(index);
      let list = that.list;
      let list2 = [];
      if (that.dIndex === -1) {
        console.log("1");
        for (let i = 0; i < list.length; i++) {
          if (!list[i].ck) {
            list2.push(list[i]);
          }
        }
        that.list = list2;
      } else {
        console.log("2");
        that.dIndex = -1;
        that.list.splice(index, 1);
        // that.list=list
      }
      that.showAlert = false;
    },
    gbAdd() {
      const that = this;
      that.showAdd = false;
      that.name = "";
      that.password = "8888";
      that.agent = "";
      that.phone = "";
      that.add = "";
      that.country = "";
      that.remark = "";
    },
    gbAdds() {
      const that = this;
      that.Addshow = false;
      that.name = "";
      that.password = "8888";
      that.agent = "";
      that.phone = "";
      that.add = "";
      that.country = "";
      that.remark = "";
    },
    //添加
    addAlert() {
      const that = this;
      that.showAdd = true;
      that.Addshow = false;
      that.name = "";
      that.password = "";
      that.country = "";
      that.agent = "";
      that.phone = "";
      that.add = "";
      that.country = "";
      that.remark = "";
      that.afterIndex = -1;
      that.id = "";
      that.createtime = "";
      that.msg = "New";
    },
    addItem() {
      const that = this;
      // const xIndex = that.afterIndex;
      // const index = that.list.length + 1;
      if (!that.name) {
        that.$message({
          message: "Warning，UserId Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.country) {
        that.$message({
          message: "Warning，country Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.agent) {
        that.$message({
          message: "Warning，Agent Name Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.phone) {
        that.$message({
          message: "Warning，Telephone Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.add) {
        that.$message({
          message: "Warning，Address Name Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      // 添加请求
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "jsonp",
        // data: "name=garfield&age=18",
        data: {
          operationType: "shiBoDianShiTaiService",
          type: "updateAgent",
          data: JSON.stringify({
            daiLiShangMing: that.agent,
            tel: that.phone,
            country: that.country,
            addr: that.add,
            userId: that.name,
            pwd: that.pwd,
            remark: that.remark,
            id: that.id,
            parentid:that.getCookie("id")
          })
        },
        success: function(data) {
          console.log(data);//47
          if (data.success) {
            let list = data.result;
            let son = {
              name: list.userid,
              password: list.pwd,
              agent: list.dailishangming,
              telephone: list.tel,
              add: list.addr,
              country: list.country,
              remark: list.remark,
              ck: false,
              id: list.id,
              createtime: list.createtime,
              modifytime: list.modifytime
            };
            that.list.unshift(son);
            that.gbAdd();
          } else {
            // that.altShow(data.errorDesc);
            that.$message({
              message: "Warning，Agent Name already exist!",
              type: "warning"
            });
          }
        }
      });
    },
    addItems() {
      const that = this;
      const xIndex = that.afterIndex;
      if (!that.name) {
        that.$message({
          message: "Warning，UserId Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.country) {
        that.$message({
          message: "Warning，country Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.agent) {
        that.$message({
          message: "Warning，Agent Name Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.phone) {
        that.$message({
          message: "Warning，Telephone Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.add) {
        that.$message({
          message: "Warning，Address Name Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (xIndex == -1) {
        const index = that.list.length + 1;
        // that.msg = "New";
        // 添加请求
        $.ajax({
          type: "POST",
          url: ajaxUrl,
          dataType: "jsonp",
          // data: "name=garfield&age=18",
          data: {
            operationType: "shiBoDianShiTaiService",
            type: "updateAgent",
            data: JSON.stringify({
              daiLiShangMing: that.agent,
              tel: that.phone,
              country: that.country,
              addr: that.add,
              userId: that.name,
              pwd: that.pwd,
              remark: that.remark,
              id: that.id
              // agent:that.agent,
            })
          },
          success: function(data) {
            if (!data.errorDesc) {
              // let list=eval('('+data.result+')')
              let list = data.result;
              console.log(list);
              console.log(list.id);
              let son = {
                name: list.userid,
                password: list.pwd,
                agent: list.dailishangming,
                telephone: list.tel,
                add: list.addr,
                country: list.country,
                remark: list.remark,
                ck: false,
                id: list.id,
                createtime: list.createtime,
                modifytime: list.modifytime
              };
              that.list.unshift(son);
              that.gbAdds();
            } else {
              that.altShow(data.errorDesc);
            }
          }
        });
      } else {
        console.log(that.agent, that.id);
        // 编辑请求
        $.ajax({
          type: "POST",
          url: ajaxUrl,
          dataType: "jsonp",
          // data: "name=garfield&age=18",
          data: {
            operationType: "shiBoDianShiTaiService",
            type: "updateAgent",
            data: JSON.stringify({
              daiLiShangMing: that.agent,
              tel: that.phone,
              country: that.country,
              addr: that.add,
              userId: that.name,
              // pwd:that.password,
              id: that.id,
              createTime: that.createtime,
              remark: that.remark
              // agent:that.agent,
            })
          },
          success: function(data) {
            if (!data.errorDesc) {
              console.log(data.result.dailishangming);
              that.list[xIndex].name = that.name;
              that.list[xIndex].password = that.password;
              that.list[xIndex].agent = that.agent;
              that.list[xIndex].telephone = that.phone;
              that.list[xIndex].add = that.add;
              that.list[xIndex].country = that.country;
              that.list[xIndex].remark = that.remark;
              // that.list[xIndex].id = that.id;
              that.afterIndex = -1;
              that.gbAdds();
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
      that.showAdd = false;
      const list = that.list;
      let index = null;
      let id = row.id;
      for (let i = 0; i < list.length; i++) {
        if (id == list[i].id) {
          index = i;
        }
      }
      that.name = that.list[index].name;
      that.password = that.list[index].password;
      that.agent = that.list[index].agent;
      that.phone = that.list[index].telephone;
      that.add = that.list[index].add;
      that.country = that.list[index].country;
      that.remark = that.list[index].remark;
      that.Addshow = true;
      that.afterIndex = index;
      that.id = id;
      that.createtime = row.createtime;
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
    // 获取代理商列表
    getData() {
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
          if (!data.errorDesc) {
            let list = eval("(" + data.result + ")");
            console.log(list);
            let list2 = [];
            for (let i = 0; i < list.length; i++) {
              let son = {
                name: list[i].userid,
                password: list[i].pwd,
                agent: list[i].dailishangming,
                telephone: list[i].tel,
                add: list[i].addr,
                country: list[i].country,
                remark: list[i].remark,
                ck: false,
                id: list[i].id,
                createtime: list[i].createtime,
                modifytime: list[i].modifytime
              };
              list2.push(son);
            }
            that.list = list2;
          } else {
            that.altShow(data.errorDesc);
          }
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
    }
  },
  mounted() {
    console.log(document.cookie);
    this.userId = this.getCookie("userId");
    console.log(this.userId);
    this.getData();
  }
};
</script>

<style scoped>
@import "../../../common/css/style.css";
.btn_top {
  width: 3rem;
  height: 3rem;
  border: none;
  background: #4598ff;
  color: #fff;
  border-radius: 50%;
  margin-left: 2rem;
  cursor: pointer;
  outline: none;
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
  font-size: 20px;
  position: fixed;
  top: 50%;
  left: 40%;
  z-index: 10;
  color: #fff;
}
#agent {
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
  padding-top: 0.8rem;
}
.title .search {
  display: inline-block;
  width: 20rem;
  height: 3rem;
}
.title span {
  height: 3rem;
  line-height: 3rem;
}
.title .search input {
  height: 3rem;
  box-sizing: border-box;
  border-radius: 2rem;
  border: 2px solid #bbd5f6;
  padding: 0 1rem 0 1rem;
  line-height: 3rem;
  color: #5c5c5c;
  font-size: 1rem;
  background-color: #e0f1ff;
  outline: none;
}
.title .search i {
  font-size: 2rem;
  color: #fff;
  position: relative;
  right: 4rem;
  top: 0.4rem;
  cursor: pointer;
}
/*内容*/
.content {
  width: 100%;
  height: 100%;
  background-color: #f3f9fe;
  box-shadow: inset 0 0 6px rgba(166, 177, 187, 0.5);
  box-sizing: border-box;
  padding: 0 2rem;
  overflow: auto;
  overflow-y: scroll;
}
.content .handle i {
  width: 3rem;
  color: #acd1ff;
  font-size: 1rem;
  cursor: pointer;
}
/*添加*/
.redact {
  width: 36%;
  height: 45%;
  background: #fff;
  box-shadow: 1px 1px 4px 2px rgba(199, 206, 214, 1);
  border-radius: 1rem;
  position: fixed;
  z-index: 9;
  top: 25%;
  left: 35%;
  text-align: center;
}
.redact_x {
  background: #fff;
}
.redact h6 {
  background: #4598ff;
  color: #fff;
  font-size: 1rem;
  line-height: 3rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
}
.redact .redact-hang {
  height: 5rem;
  width: 100%;
  text-align: center;
}
.redact .redact-hang .redact-ge {
  width:30%;
  height: 100%;
  display: inline-block;
}
.redact .redact-hang .redact-ge span {
  font-size: 1rem;
  color: rgba(32, 95, 172, 1);
  line-height: 1rem;
  display: block;
  text-align: left;
}
.redact .redact-hang .redact-ge input {
  width: 100%;
  height: 3rem;
  border: 1px solid rgba(183, 191, 199, 1);
  box-sizing: border-box;
  color: #000;
  font-size: 1rem;
  background: rgba(245, 250, 254, 1);
}
.redact .redact-hang .redact_parentid span {
  font-size: 1rem;
  color: rgba(32, 95, 172, 1);
  line-height: 2rem;
  display: block;
  text-align: left;
}
.redact .redact-hang .redact_parentid input {
  width: 30%;
  height: 3rem;
  border: 1px solid rgba(183, 191, 199, 1);
  box-sizing: border-box;
  color: #000;
  padding-left: 1.2rem;
  font-size: 1rem;
  background: rgba(245, 250, 254, 1);
}

.redact .btn {
  padding: 1rem auto;
}
.redact .btn > div {
  width: 20%;
  height: 3rem;
  background: rgba(69, 152, 255, 1);
  border-radius: 0.9rem;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
  display: inline-block;
  cursor: pointer;
}
/*输入框提示文字*/
input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #bcbcbc;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #bcbcbc;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #bcbcbc;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #bcbcbc;
}
/*过渡动画*/
/* 定义进入动画的初始状态*/
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
  z-index: 4;
  background-color: #aec0cf;
  border-radius: 4px;
  overflow-y: scroll;
}
.xlk li {
  width: 100%;
  overflow: hidden;
  height: 2.75rem;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
  line-height: 2.75rem;
  color: #fff;
}
.redact .redact-hang .redact-ge .address {
  width: 202%;
}
.redact .redact-hang .redact-ge .red {
  color: red;
}

.czmm {
  display: inline-block;
  width: 8rem;
  margin-left: 1rem;
  background: rgba(69, 152, 255, 1);
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid rgba(183, 191, 199, 1);
}
</style>
<style>
.cell {
  padding: 1rem 0;
}
</style>