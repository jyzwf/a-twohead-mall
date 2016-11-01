<!-- 各种类型商品展示 -->
<template>
	<div class="classify_type">
        <header-nav :title="title"></header-nav>
		<commodity-dis :detail_commodity='page_type'></commodity-dis>
	</div>
</template>

<script>
	import commodityDis from './commodity_display';
    import headerNav from './header_nav';
	import {flea_get} from '../js/components/get';

	export default{
		data(){
			return{
				type:'',
				page:1,
				type_goods:[],
				page_type:[],
                'title':''
			}
		},
		computed:{
			page_type(){
				return this.type_goods.slice(0,this.page*6);
			}
		},
		components:{commodityDis,headerNav},
		methods:{
			format_query(str){
      		  let str_arr = str.slice(1).split('&'),
      		    json = {};
      		    if(!str_arr[0]){
      		      return false;
      		    }
      		    str_arr.map((k)=>{
      		      k = k.split('=');
      		      json[k[0]] = k[1];
      		    })
                var types = ['书籍教材','电脑数码','衣服鞋饰','其他分类'];
                this.title = types[json.type-1];
      		    return json.type;
      		}
		},
		ready(){
			let _this = this;
			this.type = this.format_query(location.search);
			if(this.type){
				flea_get({
            	  url:'http://api.tiaozaoj.com/commodity/categories?category_id='+this.type,
            	  cb(data){
            	   	if(data.retMsg=='ok'){
            	   		_this.type_goods = data.retData;
            	   		window.addEventListener('scroll',scrollFn,false);
					}
            	  }
            	})
			}
			


			let container_h ,
				window_h = window.innerHeight,
				diff_h,
				len = Math.ceil(this.type_goods.length/6);
				let old_scroll = 0,
				flag = false;

			let scrollFn = ()=>{
				if(!flag){
					container_h = document.querySelector('.classify_type').offsetHeight;
					diff_h = container_h - window_h;
					flag = true;
				}
				let scroll_h = window.scrollY;
				if(old_scroll > scroll_h ){
					return false;
				}	


				
					if(scroll_h >= diff_h){
						window.removeEventListener('scroll', scrollFn);
						console.log(scroll_h,diff_h)
						this.page += 1 ;
						flag = false;
						window.addEventListener('scroll',scrollFn,false);
					}

					if(this.page>=len){
						  window.removeEventListener('scroll', scrollFn);
					}

					old_scroll = scroll_h;
			};

			
			
		}
	}
</script>

<style lang='sass'>
	.classify_type{
		overflow: hidden;
	}
</style>