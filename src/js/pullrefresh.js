/**
 * Created by hb on 2018/6/20.
 */
import '../scss/pullrefresh.scss'


window.__mfwPage = {
    components: ['PullRefresh'],
    mounted () {
        new this.PullRefresh(document.getElementById('pdContainer'), document.getElementById('pullLoading'), this.onLoading.bind(this))
    },

    loadData () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 3000);
        } )
    },

    async onLoading () {
        console.log('loading')
        let res = await this.loadData()
        console.log(res)
    }
}