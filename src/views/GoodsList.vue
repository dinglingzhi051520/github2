<template>
  <div class="">
    <nav-header></nav-header> <!--头部组件-->
    <nav-bread>
      <span>Goods</span>   <!--面包学-->
    </nav-bread>

    <div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default cur">Default</a>
      <a @click="sortGoods" href="javascript:;" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
      <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked=all">All</a></dd><!--动态的绑定class,让他定义的数等于All,绑定点击事件使得点击的时候让定义的数和All相等-->
          <dd v-for="(price,index) in priceFilter" :key="index"> <!--循环价格渲染到页面-->
            <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}}-{{price.endPrice}}</a><!--动态绑定class是的定义的数等于它的下标，绑定一个店家事件 使得电击的时侯让定义的数等于他的下标-->
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item,index) in goodsList" :key="index">
              <div class="pic">
                <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a> <!--利用v-lazy的方式来绑定图片从而实现图片懒加载，必须下载插件+-->
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-Footer></nav-Footer>    <!-- 底部组件-->
  </div>
  
</template>

<script>
import "./../assets/css/base.css"
import "./../assets/css/product.css"
import NavHeader from "@/components/NavHeader.vue"//将头部标签导入到根组件
import NavFooter from "@/components/NavFooter.vue" //将尾部部标签导入到根组件
import NavBread from "@/components/NavBread.vue"//面包徐标签导入到根组件
import axios from "axios"  //引入axios文件引入json文件
export default {
  name: '',
  data() { 
    //  定义data，对应的就是object，但是组件必须是一个函数，返回一个object
    // 这样做的目的：因为vue官网讲解不允许组件之间的状态进行共享，所以每个组件都是独立的
    // 所以data必须是一个函数里面return一个obect
    return {
      goodsList:[],    //定义一个空的数组
      // 使排序为true
      sortFlag:true, //定义排序
      page:1,          //页数
      pageSize:8,  //一页显示多少条数据

      priceFilter:[  //定义一个数组用来循环价格
        {startPrice:'0.00',endPrice:'500.00'},
        {startPrice:'500.00',endPrice:'1000.00'},
        {startPrice:'1000.00',endPrice:'2000.00'}
      ],
        priceChecked:'all'
    }
  },
  components:{
    NavHeader,
    NavFooter,
    NavBread
  },
  methods:{
       showFilterPop(){
          this.filterBy=true;
          this.overLayFlag=true;
    },
    closePop(){
        this.filterBy=false;

        this.overLayFlag=false;
    },
    setPriceFilter(index){
      this.priceChecked=index;
      this.closePop();
    },
    filterBy(){

    },
    overLayFlag(){

    },
    // 将axios请求填写到methods中，方法名为getGoodsList
    getGoodsList(){
      var param = {               //获取一个参数
        page:this.page,            //获取页数
        pageSize:this.pageSize,   
        sort:this.sortFlag?1:-1    //获取排序,如果是升序，就是1，如果是降序，就是-1
      }
        axios.get("/goods",{
          params:param         //将定义的对象放入axios中
        }).then((response)=>{
      console.log(response);
        let res = response.data;
       if(res.status=='0'){
         this.goodsList = res.result.list;  //否则的话就是以前的状态 也就是填充数据
       }else{
         this.goodsList = [];    //请求失败,就会不显示，变成了一个空的数组
       }
      }) 
    },
    // 排序进行取反，绑定到上面
    sortGoods(){
      this.sortFlag = !this.sortFlag;//点击的时候默认升序取反
      this.page = 1;                  //点击时默认第一页
      this.getGoodsList()             //重新获取getGoodsList
    }
  },
  //排序定义方法getGoodsList ，模板渲染完毕生命周期
  mounted(){
     this.getGoodsList()//定义一个方法
  },
 
 }

</script>

<style  scoped>
</style>