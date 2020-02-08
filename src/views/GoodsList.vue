<template>
  <div class="">
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
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
          <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked=all">All</a></dd>
          <dd v-for="(price,index) in priceFilter" :key="index">
            <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}}-{{price.endPrice}}</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item,index) in goodsList" :key="index">
              <div class="pic">
                <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
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
    <nav-Footer></nav-Footer> 
  </div>
  
</template>

<script>
import "./../assets/css/base.css"
import "./../assets/css/product.css"
import NavHeader from "@/components/NavHeader.vue"
import NavFooter from "@/components/NavFooter.vue"
import NavBread from "@/components/NavBread.vue"
import axios from "axios"
export default {
  name: '',
  data() { 
    //  定义data，对应的就是object，但是组件必须是一个函数，返回一个object
    // 这样做的目的：因为vue官网讲解不允许组件之间的状态进行共享，所以每个组件都是独立的
    // 所以data必须是一个函数里面return一个obect
    return {
      goodsList:[],
      // 使排序为true
      sortFlag:true,
      page:1,
      pageSize:8,

      priceFilter:[
        {
          startPrice:'0.00',
          endPrice:'500.00'
        },
        {
           startPrice:'500.00',
          endPrice:'1000.00'
        },
        {
           startPrice:'1000.00',
          endPrice:'2000.00'
        }
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
      var param = {
        page:this.page,
        pageSize:this.pageSize,
        sort:this.sortFlag?1:-1
      }
        axios.get("/goods",{
          param:param
        }).then((response)=>{
      console.log(response);
        let res = response.data;
       if(res.status=='0'){
         this.goodsList = res.result.list;
       }else{
         this.goodsList = [];
       }
      }) 
    },
    // 排序进行取反，绑定到上面
    sortGoods(){
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList()
    }
  },
  //排序定义方法getGoodsList
  mounted(){
     this.getGoodsList()
  },
 
 }

</script>

<style  scoped>
</style>