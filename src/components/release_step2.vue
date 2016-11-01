<!-- 发布第二步 -->
<template>
	<div id="rel_step2" class="aui-margin-t-15" >
            <ul class="aui-list aui-form-list aui-margin-b-15">
        		<li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                    名称<span class="required">*</span>
                </div>
                <div class="aui-list-item-input">
                    <input type="text" v-model='good_msg.name' placeholder="物品名称">
                </div>
            </div>
        		</li>
		
        		<li class="aui-list-item ">
                <div class="aui-list-item-inner flea-start">
                    <div class="aui-list-item-label">
                        描述<span class="required">*</span>
                    </div>
                    <div class="aui-list-item-input">
                        <textarea v-model='good_msg.description' placeholder="详细的描述，有助于其他人更快得检索到你的物品~"></textarea>
                        <p class='limit_count'><small>{{limit_count}}/200</small></p>
                    </div>
                </div>
        		</li>
            </ul>

            <ul class="aui-list aui-form-list aui-margin-b-15">

                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            数量<span class="required">*</span>
                        </div>
                        <div class="aui-list-item-input">
                            <input v-model='good_msg.number' type="number" placeholder="商品数量" value="1">
                        </div>
                    </div>
                </li>

                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            抛售价<span class="required">*</span>
                        </div>
                        <div class="aui-list-item-input">
                            <input v-model='good_msg.sellPrice' type="number" placeholder="合理的价格才能吸引别人购买哦">
                        </div>
                    </div>
                </li>

                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            原价
                        </div>
                        <div class="aui-list-item-input">
                            <input v-model='good_msg.originalPrice' type="text" placeholder="物品原价">
                        </div>
                    </div>
                </li>

            </ul>

            <ul class="aui-list aui-form-list add_pics">

                <li class="aui-list-item">
                    <div class="aui-list-item-inner flea-start">
                        <div class="aui-list-item-label">
                            物品图片<span class="required">*</span>
                        </div>
                        <div class="aui-list-item-input aui-padded-t-10 aui-padded-b-10 good_pics"  >
                           
                            <span v-for='img in good_msg.imgs_collect'>
                                <img :src="img" class="preview" alt="">
                                <img src="/assets/imgs/ic-close.svg" @click='remove_file($index)' class="close" alt="">
                            </span>

                            <div v-show='good_msg.imgs_collect.length < 6' class="flea_file" >
                                <input type="file" multiple="multiple" @change='get_file($event)' accept="image/png,image/jpg,image/jpeg,image/bmp">
                            </div>
                                
                        </div>
                    </div>
                </li>
                      
            </ul>
	</div>
</template>


<style lang='sass'>
	$black:#000;
	$base-color:#fc4766;
	%fixsize{
        display:inline-block;
        width:3.1rem;
        height:3.1rem;
        margin:0 0.4rem 0.4rem 0;
        position:relative;
        vertical-align: top;
    }

	#rel_step2{
		.aui-list.aui-form-list .flea-start{
			align-items:flex-start;
		}

        .limit_count{
            text-align:right;
        }

		.aui-list{
			&:before,&:after{
				content:none;
			}
			
		}

		.add_pics{
			margin-bottom:3rem;
		}

        textarea{
            margin-bottom:0;
        }

        .required{
            color:red;
        }

		.good_pics{
	font-size:0;

    span,.flea_file{
        @extend %fixsize;
    }
	.flea_file{
			border: 1px solid $base-color;
            overflow:hidden;
			&:before,&:after{
				content:'';
				position:absolute;
				background:$base-color;
				left:50%;
				top:50%;
				transform: translate3d(-50%,-50%,0);
			}

			&:before{
				width:1.8rem;
				height:2px;
			}

			&:after{
				width:2px;
				height:1.8rem;
			}
		}

	img,input{
		width: inherit;
		height:inherit;
	}

	.close{
		position:absolute;
		top:-0.4rem;
		right:-0.4rem;
		width:1.2rem;
		height:1.2rem;
        z-index:999 ;
	}
		
	input{
		opacity: 0;
	}}
	}

</style>


<script>
    
    
	export default{
		props:['good_msg'],
        data(){
            return{
                
            }
        },

        computed:{
            limit_count(){
                return this.good_msg.description.trim().length;
            }
        },

        methods:{
            geu_unique(file,arr){
                for(let i=0;i<arr.length;i++){
                    if(file.name === arr[i].name){
                       return true;
                    }
                }
                return false;
            },

            get_file(ev){
                for(var i=0;i< ev.target.files.length; i++)
                {
                   let file = ev.target.files[i];     
                    //if(!this.geu_unique(file,this.good_msg.files_collect)){
                        this.read_file(file,ev.target);
                    //}
                    ev.target.value='';
                }
            },

            read_file(file){
                let _this = this;

                let reader = new FileReader();
                    reader.onload = function(e) {
                        _this.good_msg.imgs_collect.push(e.target.result);
                        _this.good_msg.files_collect.push(file);
                        
                    };
                    reader.readAsDataURL(file);
            },

            remove_file(item){
                this.good_msg.imgs_collect.splice(item,1);
                this.good_msg.files_collect.splice(item,1);
            }
        },
        ready(){
            
        }
	}
</script>