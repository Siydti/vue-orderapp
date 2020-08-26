import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

export default new vuex.Store({
    state:{
        goodlist: [], //商品数据
    },
    mutations:{
        initgoodlist( state , newarr ) {
            state.goodlist = newarr
        },
        setfoodsnum( state , {optionid,newnum} ) {
            for( let i of state.goodlist ) {
                for( let y of i.foods )  {
                    if( y.id == optionid ){
                        y.num = newnum
                    }
                }
            } 
        },
        removenum(state) {
            state.goodlist.forEach( item => {
                item.foods.forEach( items => {
                    items.num = 0
                } )
            } )
        }
    },
    getters:{
        getoptionfoods(state) {
            let arr = []
            for( let i of state.goodlist ) {
                for( let y of i.foods )  {
                    if( y.num > 0 ){
                        arr.push( y )
                    }
                }
            } 
            return arr
        }
    }
})
