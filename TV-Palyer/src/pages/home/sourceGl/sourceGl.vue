<template>
  <div id="change" @click="channel">
    <div class="title">
      <span>Channels</span>
      <div class="handle">
        <div class="search">
          <input type="text" placeholder="Country" v-model="countrySs" />
          <i id="GJ" class="iconfont" @click="showGJ">&#xe600;</i>
          <div class="xlk" v-show="showGj">
            <ul>
              <li v-for="(item,index) in listenter" :key="index" @click="geiSs(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="search">
          <input type="text" placeholder="Language" v-model="languageSs" />
          <i class="iconfont" @click="showLan=!showLan">&#xe600;</i>
          <div class="xlk" v-show="showLan">
            <ul>
              <li v-for="(item,index) in listenters" :key="index" @click="geiSs2(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="search">
          <input type="text" placeholder="Channel Name" v-model="channelSsName" />
          <i class="iconfont" @click="showChal=!showChal">&#xe600;</i>
          <div id="shrinkBox" class="xlk" v-show="showChal">
            <ul>
              <li v-for="(item,index) in listenters2" :key="index" @click="geiSs3(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="search">
          <input type="text" placeholder="Channel Type" v-model="channelType" />
          <i class="iconfont" @click="showChaltp=!showChaltp">&#xe600;</i>
          <div class="xlk" style="text-align:center;" v-show="showChaltp">
            <ul>
              <li v-for="(item,index) in listenters3" :key="index" @click="geiSs4(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="seaBtn" @click="getData()">search</div>
        <button class="btn_top" @click="addAlert">Add</button>
      </div>
    </div>
    <div class="block">
      <ul>
        <li
          :style="active==i?blue:''"
          @click="fenye(i)"
          v-for="(pages,i) in pagenum"
          :key="i"
        >{{pages}}</li>
      </ul>
    </div>
    <div class="content">
      <el-table :data="list" border style="width:100%;margin-top:1rem;">
        <el-table-column fixed prop="guojia" label="Country:"></el-table-column>
        <el-table-column prop="dianshitaiming" label="Channel Name:"></el-table-column>
        <el-table-column prop="leibie" label="Language: "></el-table-column>
        <el-table-column prop="dianshitaiurl" label="Channel Url:"></el-table-column>
        <el-table-column prop="vodtype" label="Type:"></el-table-column>
        <el-table-column prop="logourl" label="Logo Url:"></el-table-column>
        <el-table-column fixed="right" label="Actions">
          <template slot-scope="scope">
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
              @click="toggerAlert2(scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加-->
    <div class="redact" v-if="showAdd" :key="223466">
      <div class="redact_x">
        <h6>{{msg}} Agents</h6>
        <!-- <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <div>I can change it here from :Country,Language,Channel Name,Sort,Channel logoUrl and Sourse Url!</div>
          </el-collapse-item>
        </el-collapse>-->
        <div class="redact-hang" style="padding:0 1rem;">
          <div class="redact-ge">
            <span style="color:#f00;">Country*：</span>
            <input type="text" v-model="guojia" />
          </div>
          <div class="redact-ge">
            <span style="color:#f00;">Language*：</span>
            <input type="text" v-model="leibie" />
          </div>
          <div class="redact-ge">
            <span style="color:#f00;">Channel Name*：</span>
            <input type="text" v-model="dianshitaiming" />
          </div>
        </div>
        <div style="padding:1rem;" class="redact-hang">
          <div class="redact-ge">
            <span>Sort：</span>
            <input type="text" v-model="paiXu" />
          </div>
          <div class="redact-ge" style="margin-left:10rem;">
            <span style="text-align:center;">Channel Type：</span>
            <div style="display:flex;justify-content:center;align-items:center;">
              <label>
                <input
                  @click="i1"
                  style="width:1.5rem;height:1.5rem;margin-right:1rem;"
                  :checked="vodtype=='live'?'live':''"
                  type="radio"
                  value="1"
                  name="kill"
                />
                <span style="margin-right:1rem;">live</span>
              </label>
              <label>
                <input
                  @click="i2"
                  style="width:1.5rem;height:1.5rem;"
                  :checked="vodtype=='vod'?'vod':''"
                  type="radio"
                  value="0"
                  name="kill"
                />
                <span style="margin-left:0.3rem;">vod</span>
              </label>
            </div>
          </div>
        </div>
        <div style="padding:0 1rem;" class="redact-hang">
          <div class="redact-ge redact-url">
            <span>logoUrl：</span>
            <input type="text" style="width:300%;" v-model="logourl" />
          </div>
        </div>
        <div style="padding:1rem;" class="redact-hang">
          <div class="redact-ge">
            <span style="color:#f00;">Sourse Url*：</span>
            <input style="width:300%;" type="text" v-model="dianshitaiurl" />
          </div>
        </div>
        <div class="btn">
          <div @click="addItem1">Confirm</div>
          <div @click="gbAdd">Cancel</div>
        </div>
      </div>
    </div>

    <!--弹窗-->
    <div class="msg" v-if="showMsg">{{cmsg}}</div>
    <!--删除-->
    <div class="delectBox" v-if="showAlert" :key="123466">
      <i class="iconfont">&#xe624;</i>
      <span>Delect selected？</span>
      <div class="btn">
        <div style="margin-right: 2.2rem;" @click="toggerAlert">Cancel</div>
        <div style="margin-left: 2.2rem;" @click="deleteItem">Confirm</div>
      </div>
    </div>
  </div>
</template>

<script>
// const ajaxUrl='http://192.168.1.234:999/haotian/xcx.do'
// const ajaxUrl= 'http://192.168.1.15:999/com_pangu_tang_web_war_exploded/xcx.do'
const ajaxUrl = "http://47.110.228.20:89/haotian/xcx.do";
export default {
  name: "agentGl",
  data() {
    return {
      xuanzhong: "live",
      active: 0,
      blue: "background:#4598ff;color:#fff;",
      activeNames: ["1"],
      list: [],
      csList: [],
      checkAll: false,
      showAlert: false,
      dIndex: -1,
      showIndex: -1,
      showAdd: false,
      password: "8888",
      //新增编辑
      dianshitaiming: "",
      dianshitaiurl: "",
      guojia: "",
      isdeleted: "",
      leibie: "",
      logourl: "",
      modifytime: "",
      paixu: "",
      vodtype: "live",
      createtime: "",
      paiXu: "0",
      afterIndex: -1,
      msg: "", //编辑或者新增
      //搜索
      search: "",
      userId: "",
      id: "",
      //提示框
      cmsg: "",
      showMsg: false,
      //筛选框
      countrySs: "",
      languageSs: "",
      // channelSs: "",
      channelSsName: "",
      channelType:'',
      urlSs: "",
      lanList: [],
      gjList: [],
      cnlist: [],
      ctlist:[],
      twoList: ["Live", "Vod"],
      showLan: false,
      showGj: true,
      showtwo: false,
      showChal: false,
      showChaltp:false,
      //所有页面的总页数
      pagenum: 0
    };
  },
  computed: {
    listenters3() {
      if (this.channelType == "") {
        this.showChaltp = false;
        return this.ctlist;
      } else {
        let list3 = [];
        for (let i=0;i<this.ctlist.length;i++) {
          if (
            this.ctlist[i]
              .toLowerCase()
              .indexOf(this.channelType.toLowerCase()) != -1
          ) {
            list3.push(this.ctlist[i]);
          }
        }
        if (list3.length <= 1) {
          this.showChaltp = false;
        } else {
          this.showChaltp = true;
        }
        return list3;
      }
    },
    listenters2() {
      if (this.channelSsName == "") {
        this.showChal = false;
        return this.cnlist;
      } else {
        let list2 = [];
        for (let i=0;i<this.cnlist.length;i++) {
          if (
            this.cnlist[i]
              .toLowerCase()
              .indexOf(this.channelSsName.toLowerCase()) != -1
          ) {
            list2.push(this.cnlist[i]);
          }
        }
        if (list2.length <= 1) {
          this.showChal = false;
        } else {
          this.showChal = true;
        }
        return list2;
      }
    },
    listenters() {
      if (this.languageSs == "") {
        this.showLan = false;
        return this.lanList;
      } else {
        let list = [];
        for (let i = 0; i < this.lanList.length; i++) {
          if (
            this.lanList[i]
              .toLowerCase()
              .indexOf(this.languageSs.toLowerCase()) != -1
          ) {
            list.push(this.lanList[i]);
          }
        }
        if (list.length <= 1) {
          this.showLan = false;
        } else {
          this.showLan = true;
        }
        console.log(list);
        return list;
      }
    },
    listenter() {
      if (this.countrySs == "") {
        this.showGj = false;
        return this.gjList;
      } else {
        let list = [];
        for (let i = 0; i < this.gjList.length; i++) {
          if (
            this.gjList[i]
              .toLowerCase()
              .indexOf(this.countrySs.toLowerCase()) != -1
          ) {
            list.push(this.gjList[i]);
          }
        }
        if (list.length <= 1) {
          this.showGj = false;
        } else {
          this.showGj = true;
        }
        return list;
      }
    }
  },
  watch: {},
  created() {
    this.showGJ();
  },
  methods: {
    i1() {
      this.vodtype = "live";
    },
    i2() {
      this.vodtype = "vod";
    },
    fenye(i) {
      const that = this;
      if (that.active == i) {
        return;
      } else {
        that.active = i;
        let yeshu = that.active + 1;
        that.getDatas(yeshu);
      }
    },
    channel(e) {
      let n = e.target;
      if (n.nodeName !== "I") {
        this.showGj = false;
        this.showLan = false;
        this.showChal=false;
        this.showChaltp=false;
      }
    },
    showGJ() {
      if (this.showGj == false) {
        this.showGj = true;
      } else {
        this.showGj = false;
      }
    },
    showbottom() {
      if (this.showtwo == false) {
        this.showtwo = false;
      } else {
        this.showtwo = true;
      }
    },
    geiSs(item) {
      this.countrySs = item;
      this.showGj = false;
    },
    geiSs2(item) {
      this.languageSs = item;
      this.showLan = false;
    },
    geiSs3(item) {
      this.channelSsName = item;
      this.showChal = false;
    },
    geiSs4(item) {
      this.channelType = item;
      this.showChaltp = false;
    },
    choose(id) {
      const list = this.list;
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
    toggerAlert2(row) {
      const that = this;
      let index = null;
      const list = this.list;
      let id = row.id;
      for (let i = 0; i < list.length; i++) {
        if (id == list[i].id) {
          index = i;
        }
      }
      that.id = that.list[index].id;
      that.createtime = that.list[index].createtime;
      that.leibie = that.list[index].leibie;
      that.guojia = that.list[index].guojia;
      that.dianshitaiming = that.list[index].dianshitaiming;
      that.vodType = that.list[index].vodType;
      that.dianshitaiurl = that.list[index].dianshitaiurl;
      that.paiXu = that.list[index].paixu;
      that.logourl = that.list[index].logourl;
      that.showAlert = !that.showAlert;
      that.dIndex = index;
    },
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
        let id = parseInt(that.id);
        console.log(id);
        console.log(typeof id);
        $.ajax({
          type: "POST",
          url: ajaxUrl,
          dataType: "jsonp",
          // data: "name=garfield&age=18",
          data: {
            operationType: "shiBoDianShiTaiService",
            type: "delete",
            id: Number(id)
          },
          success: function(data) {
            console.log(data);
            if (!data.errorDesc) {
              // that.altShow('删除成功')
            } else {
              that.altShow(data.errorDesc);
            }
          }
        });
        that.dIndex = -1;
        that.list.splice(index, 1);
        // that.list=list
      }
      that.showAlert = false;
    },
    gbAdd() {
      const that = this;
      that.showAdd = false;
      that.leibie = "";
      that.guojia = "";
      that.dianshitaiming = "";
      that.vodtype = "live";
      that.dianshitaiurl = "";
      that.paiXu = "0";
      that.logourl = "";
    },
    //添加
    addAlert() {
      const that = this;
      that.guojia = "";
      that.leibie = "";
      that.dianshitaiming = "";
      that.paiXu = "0";
      that.logourl = "";
      that.dianshitaiurl = "";
      that.showAdd = true;
      that.msg = "New";
    },
    addItem1() {
      const that = this;
      if (!that.guojia) {
        this.$message({
          message: "Warning，Country Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.leibie) {
        this.$message({
          message: "Warning，Language Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.dianshitaiming) {
        this.$message({
          message: "Warning，Channel Name Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      if (!that.dianshitaiurl) {
        this.$message({
          message: "Warning，Sourse Url Can Not Be Empty",
          type: "warning"
        });
        return;
      }
      const xIndex = that.afterIndex;
      if (xIndex == -1) {
        const index = that.list.length + 1;
        that.msg = "New";
        console.log(that.guojia);
        if (!that.guojia) {
          this.$message({
            message: "Warning，Country Can Not Be Empty",
            type: "warning"
          });
          return;
        }
        if (!that.leibie) {
          this.$message({
            message: "Warning，Leibie Can Not Be Empty",
            type: "warning"
          });
          return;
        }
        if (!that.dianshitaiming) {
          this.$message({
            message: "Warning，Dianshitaiming Can Not Be Empty",
            type: "warning"
          });
          return;
        }
        if (!that.dianshitaiurl) {
          this.$message({
            message: "Warning，Dianshitaiurl Can Not Be Empty",
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
            type: "update",
            data: JSON.stringify({
              leiBie: that.leibie,
              guoJia: that.guojia,
              dianShiTaiMing: that.dianshitaiming,
              vodType: that.vodtype,
              dianShiTaiUrl: that.dianshitaiurl,
              paiXu: that.paiXu,
              logoUrl: that.logourl
              // agent:that.agent,
            })
          },
          success: function(data) {
            console.log(data);
            if (!data.errorDesc) {
              // let list=eval('('+data.result+')')
              let list = data.result;
              console.log(list);
              let son = {
                leibie: list.leibie,
                dianshitaiming: list.dianshitaiming,
                dianshitaiurl: list.dianshitaiurl,
                guojia: list.guojia,
                logourl: list.logourl,
                paixu: list.paixu,
                vodtype: list.vodtype,
                ck: false,
                id: list.id,
                createtime: list.createtime,
                modifytime: list.modifytime
              };
              that.list.unshift(son);
              that.gbAdd();
            } else {
              that.altShow(data.errorDesc);
            }
          }
        });
      } else {
        // 编辑请求
        $.ajax({
          type: "POST",
          url: ajaxUrl,
          dataType: "jsonp",
          // data: "name=garfield&age=18",
          data: {
            operationType: "shiBoDianShiTaiService",
            type: "update",
            data: JSON.stringify({
              leiBie: that.leibie,
              guoJia: that.guojia,
              dianShiTaiMing: that.dianshitaiming,
              vodType: that.vodtype,
              dianShiTaiUrl: that.dianshitaiurl,
              paiXu: that.paiXu,
              logoUrl: that.logourl,
              id: that.id,
              createTime: that.createtime
              // agent:that.agent,
            })
          },
          success: function(data) {
            console.log(data);
            if (!data.errorDesc) {
              const list = data.result;
              that.list[xIndex].leibie = list.leibie;
              that.list[xIndex].guojia = list.guojia;
              that.list[xIndex].dianshitaiming = list.dianshitaiming;
              that.list[xIndex].vodtype = list.vodtype;
              that.list[xIndex].dianshitaiurl = list.dianshitaiurl;
              that.list[xIndex].paixuu = list.paixu;
              that.list[xIndex].logourl = list.logourl;
              that.list[xIndex].createtime = list.createtime;
              that.list[xIndex].modifytime = list.modifytime;
              that.afterIndex = -1;
              that.gbAdd();
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
      that.id = that.list[index].id;
      that.createtime = that.list[index].createtime;
      that.leibie = that.list[index].leibie;
      that.guojia = that.list[index].guojia;
      that.dianshitaiming = that.list[index].dianshitaiming;
      that.vodtype = that.list[index].vodtype;
      that.dianshitaiurl = that.list[index].dianshitaiurl;
      that.paiXu = that.list[index].paixu;
      that.logourl = that.list[index].logourl;
      that.showAdd = true;
      that.afterIndex = index;
      that.msg = "Edit";
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
    // 获取播放源列表
    getDatas(yeshu) {
      const that = this;
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "jsonp",
        // data: "name=garfield&age=18",
        data: {
          operationType: "shiBoDianShiTaiService",
          type: "query",
          pageIndex: yeshu,
          data: JSON.stringify({
            leiBie: that.languageSs,
            guoJia: that.countrySs,
            // dianShiTaiMing: that.channelSs,
            dianShiTaiMing: that.channelSsName,
            dianShiTaiUrl: that.urlSs
            // agent:that.agent,
          })
        },
        success: function(data) {
          // console.log(data);
          if (!data.errorDesc) {
            let list = eval("(" + data.result + ")");
            console.log(list)
            that.pagenum = list.totalPages;
            let listdata = list.datas;
            let list2 = [];
            let list3 = [];
            let list4 = [];
            let list5 = [];
            let list6 = [];
            for (let i = 0; i < listdata.length; i++) {
              let son = {
                leibie: listdata[i].leibie,
                dianshitaiming: listdata[i].dianshitaiming,
                dianshitaiurl: listdata[i].dianshitaiurl,
                guojia: listdata[i].guojia,
                logourl: listdata[i].logourl,
                paixu: listdata[i].paixu,
                vodtype: listdata[i].vodtype,
                ck: false,
                id: listdata[i].id,
                createtime: listdata[i].createtime,
                modifytime: listdata[i].modifytime
              };
              list2.push(son);
              list3.push(listdata[i].leibie);
              list4.push(listdata[i].guojia);
              list5.push(listdata[i].dianshitaiming);
              list6.push(listdata[i].vodtype);
            }
            that.list = list2;
            that.csList = list2;
            // that.ctList = list2;
            // console.log(that.list);
            // console.log(that.ctList);
            if (
              (that.urlSs == "") &
              // (that.channelSs == "") &
              (that.countrySs == "") &
              (that.languageSs == "")&
              (that.channelSsName=="")&
              (that.channelType=="")
            ) {
              that.lanList = Array.from(new Set(list3));
              that.gjList = Array.from(new Set(list4));
              that.cnlist = Array.from(new Set(list5));
              that.ctlist = Array.from(new Set(list6));
              console.log(that.ctlist);
            }
          } else {
            that.altShow(data.errorDesc);
          }
        }
      });
    },
    // 获取播放源列表
    getData() {
      const that = this;
      // if(!that.yeshu){
      //   yeshu=1;
      // }
      console.log(that.channelSsName);
      console.log(that.channelType)
      console.log(that.languageSs)
      console.log(that.countrySs)
      let yeshu = 1;
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "jsonp",
        // data: "name=garfield&age=18",
        data: {
          operationType: "shiBoDianShiTaiService",
          type: "query",
          pageIndex: yeshu,
          data: JSON.stringify({
            leiBie: that.languageSs,
            guoJia: that.countrySs,
            dianShiTaiMing: that.channelSsName,
            dianShiTaiUrl: that.urlSs,
            vodType:that.channelType
            // agent:that.agent,
          })
        },
        success: function(data) {
          if (!data.errorDesc) {
            let list = eval("(" + data.result + ")");
            console.log(list);
            that.pagenum = list.totalPages;
            let listdata = list.datas;
            // console.log(listdata);
            let list2 = [];
            let list3 = [];
            let list4 = [];
            let list5 = [];
            let list6= [];
            for (let i = 0; i < listdata.length; i++) {
              let son = {
                leibie: listdata[i].leibie,
                dianshitaiming: listdata[i].dianshitaiming,
                dianshitaiurl: listdata[i].dianshitaiurl,
                guojia: listdata[i].guojia,
                logourl: listdata[i].logourl,
                paixu: listdata[i].paixu,
                vodtype: listdata[i].vodtype,
                ck: false,
                id: listdata[i].id,
                createtime: listdata[i].createtime,
                modifytime: listdata[i].modifytime
              };
              list2.push(son);
              list3.push(listdata[i].leibie);
              list4.push(listdata[i].guojia);
              list5.push(listdata[i].dianshitaiming);
              list6.push(listdata[i].vodtype);
            }
            that.list = list2;
            that.csList = list2;
            console.log(list)
            // console.log(that.list);
            // console.log(that.csList);
            if (
              (that.urlSs == "") &
              // (that.channelSs == "") &
              (that.countrySs == "") &
              (that.languageSs == "")&
              (that.channelType=="")&
              (that.channelSsName=="")
            ) {
              that.lanList = Array.from(new Set(list3));
              that.gjList = Array.from(new Set(list4));
              that.cnlist = Array.from(new Set(list5));
              that.ctlist = Array.from(new Set(list6));
              console.log(that.ctlist);
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
          // console.log(datas1); //国家
          // console.log(datas2); //语言
          // console.log(datas3);
          that.gjList = datas1;
          that.lanList = datas2;
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
    this.userId = this.getCookie("userId");
    console.log(this.userId);
    this.getData();
    this.getcountryandyuyan();
    // 做用户可拉伸的框
    let oBox = document.getElementById("shrinkBox");
    // 将鼠标的样式更改为可左右拉动样式
    oBox.style.cursor = "w-resize";
    let a = 0;
    let b = 0;
    let X, Y, oBoxW, oBoxH, oBoxL;
    //鼠标按下的事件
    oBox.onmousedown = function(ev) {
      // 获取到当前元素位置
      var oEvent = ev || event;
      // x轴的距离
      X = oEvent.clientX;
      // y轴的距离
      Y = oEvent.clientY;
      oBoxW = oBox.offsetWidth;
      oBoxH = oBox.offsetHeight;
      oBoxL = oBox.offsetLeft;
      if (X > oBox.offsetLeft + oBox.offsetWidth - 5) {
        a = "right";
      } else if (Y > oBox.offsetTop + oBoxH - 5) {
        a = "bottom";
      } else if (X < oBox.offsetLeft + 5) {
        a = "left";
      }
      // 鼠标移动
      document.onmousemove = function(ev) {
        var oEvent = ev || event;
        var XX = oEvent.clientX;
        var YY = oEvent.clientY;
        if (a == "right") {
          oBox.style.width = oBoxW + (XX - X) + "px";
        } else if (a == "bottom") {
          oBox.style.height = oBoxH + (YY - Y) + "px";
        } else if (a == "left") {
          oBox.style.width = oBoxW + (X - XX) + "px";
          oBox.style.left = XX - X + oBoxL - 5 + "px";
        }
      };
      // 鼠标移开
      document.onmouseup=function(){
        document.onmousedown=null;
        document.onmousemove=null;
      }
    };
  }
};
</script>

<style scoped>
@import "../../../common/css/style.css";
.block {
  width: 100%;
  text-align: center;
}
.block > ul {
  display: flex;
  justify-content: center;
  align-items: center;
}
.block > ul li {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 2rem;
  background: #fff;
  text-align: center;
  margin: 0.5rem;
  cursor: pointer;
}
.block > ul li:hover {
  background: #4598ff;
  color: #fff;
}

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
.red {
  color: #f00;
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
.search {
  position: relative;
}
#change {
  width: 100%;
  height: 100%;
}
/*头部*/
.title {
  /* height: 126px; */
  padding-top: 2rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  padding-left: 5rem;
  color: #5c5c5c;
  /* line-height:7.8rem; */
  box-sizing: border-box;
  display: flex;
  justify-content: last baseline;
}

.seaBtn {
  width: 10rem;
  height: 3rem;
  background: #4598ff;
  border-radius: 22px;
  text-align: center;
  font-size: 1rem;
  line-height: 3rem;
  margin-left: 5rem;
  color: #fff;
  /* position: relative; */
  cursor: pointer;
}
.title span {
  display: inline-block;
  width: 7rem;
  height: 3rem;
  line-height: 3rem;
}
.search input {
  width: 10rem;
  height: 3rem;
  box-sizing: border-box;
  border-radius: 1.6rem;
  border: 2px solid #bbd5f6;
  padding: 0 1.2rem;
  line-height: 3rem;
  color: #000;
  font-size: 1rem;
  background-color: #e0f1ff;
  outline: none;
  z-index: 2;
  margin-right: 1rem;
}
.search i {
  font-size: 0.5rem;
  color: #fff;
  position: absolute;
  right: 1rem;
  cursor: pointer;
  top: 0.5rem;
  z-index: 2;
}
.search .xlk {
  /* float: left; */
  height: 9rem;
  width: 10rem;
  z-index: 6;
  position: absolute;
  top: 3rem;
  left: 0rem;
  /*padding: 20px;*/
  background-color: #fff;
  border-radius: 0.2rem;
  border: 1px solid #4598ff;
  overflow-y: scroll;
  overflow-x: hidden;
}
.content .search .xlk li {
  width: 100%;
  overflow: hidden;
  height: 2rem;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
  line-height: 2rem;
  color: #000;
}
.content .search .xlk li:hover {
  background: #4598ff;
}
/*内容*/
.content {
  height: 100%;
  width: 100%;
  background-color: #f3f9fe;
  box-shadow: inset 0 0 6px rgba(166, 177, 187, 0.5);
  box-sizing: border-box;
  overflow-y: scroll;
}
/*功能按钮*/
.handle {
  height: 4rem;
  display: flex;
  justify-content: space-around;
  padding: 0;
}
.handle * {
  display: inline-block;
}
.iconfont-i {
  display: block;
  position: relative;
  width: 1.5rem;
  top: 1rem;
  left: 1.5rem;
  padding: 0.5rem;
  color: #acd1ff;
  font-size: 1.5rem;
  cursor: pointer;
}
.handle i {
  width: 3.8rem;
  color: #acd1ff;
  font-size: 2rem;
  cursor: pointer;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
}
.content .handle .active {
  background: rgba(148, 194, 252, 1);
  color: #fff;
}
.content .handle b {
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  width: 3.8rem;
  color: #acd1ff;
  font-size: 2rem;
  position: absolute;
  right: 3rem;
  font-weight: normal;
  cursor: pointer;
}
/*卡片信息*/
.content .box {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.5);
  margin: 1.1rem 0;
  color: #181818;
  display: flex;
  justify-content: space-between;
}
.content .box .box-left {
  flex: 1;
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
}
.content .box .box-right {
  width: 2.8rem;
  height: 6.8rem;
  line-height: 2.5rem;
  /*background-color: #4598FF;*/
  /*color: #ACD1FF;*/
  padding-top: 1rem;
  box-sizing: border-box;
  z-index: 3;
  color: #bbd9fe;
}
.content .box .box-right * {
  cursor: pointer;
}
.content .box .in {
  color: #fff;
}
.content .box .box-right .iconfont {
  font-size: 1.5rem;
  font-weight: normal;
}
.content .box .box-left {
  color: #181818;
  font-size: 1rem;
}
/* 整个页面的适配 */
.content .box .box-left .box-left-top {
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 0 0 1rem;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* .content .box .box-left p > span {
} */
/*删除*/
.delectBox {
  width: 40%;
  height: 18rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 1px 4px 2px rgba(199, 206, 214, 1);
  border-radius: 1rem;
  position: fixed;
  z-index: 9;
  top: 40%;
  left: 30%;
  text-align: center;
}
.delectBox i {
  color: #f7ba2a;
  font-size: 1rem;
  margin-top: 2rem;
  display: block;
}
.delectBox span {
  display: block;
  width: 16rem;
  height: 3rem;
  font-size: 1rem;
  color: rgba(92, 92, 92, 1);
  line-height: 3rem;
  margin: 2rem auto;
}
.delectBox .btn {
  margin: 0.8rem auto;
}
.delectBox .btn > div {
  width: 10rem;
  height: 3rem;
  background: rgba(69, 152, 255, 1);
  border-radius: 1rem;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
  display: inline-block;
  cursor: pointer;
}
/*添加*/
.redact {
  width: 36%;
  height: 50%;
  background: #fff;
  box-shadow: 1px 1px 4px 2px rgba(199, 206, 214, 1);
  border-radius: 1rem;
  position: fixed;
  z-index: 9;
  top: 20%;
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
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
}
.redact .redact-hang {
  margin-top: 1rem;
  height: 3rem;
  width: 100%;
  text-align: left;
}
.redact .redact-hang .redact-ge {
  width: 30%;
  height: 3rem;
  display: inline-block;
}
.redact .redact-hang .redact-ge span {
  font-size: 1rem;
  color: #4598ff;
  line-height: 2rem;
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
.redact .redact-hang .redact-ge div {
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
}
.redact .redact-hang .redact-ge p {
  display: inline-block;
  width: 6rem;
  height: 3rem;
  background: rgba(148, 194, 252, 1);
  border-radius: 1rem;
  box-sizing: border-box;
  text-align: center;
  line-height: 3rem;
  font-size: 1rem;
  color: #fff;
  margin-right: 0.5rem;
  cursor: pointer;
}
.redact .redact-hang .redact-ge .active {
  background-color: #4598ff;
}
.redact .btn {
  margin: 3rem auto;
}
.redact .btn > div {
  width: 10rem;
  height: 3rem;
  background: rgba(69, 152, 255, 1);
  border-radius: 0.9rem;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
  display: inline-block;
  cursor: pointer;
  margin: 0 1rem;
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
</style>

<style>
.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  height: 1rem;
  margin: 1rem 0;
}
.el-table .cell {
  display: flex;
}
</style>