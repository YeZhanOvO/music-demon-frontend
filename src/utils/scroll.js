const scroll = {
    isEnd: false,
    start(callback) {
        let timer = null
        // 只有当数据存在的时候，才触发滚动事件监听
        callback&&window.addEventListener('scroll', (res) => {
            // 浏览器向上滚动的高度
            if (timer) {
                clearTimeout(timer)
            }
            // 函数防抖
            timer = setTimeout(() => {
                // 浏览器向上滚动的高度
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                // 文档的真实高度
                const scrollHeight = document.documentElement.scrollHeight
                // 浏览器窗口（文档）的可视高度,就是肉眼可见的那部分全屏高度
                const clientHeight = document.documentElement.clientHeight
                if(!this.isEnd&&scrollHeight==scrollTop+clientHeight){
                    window.scrollTo(0, scrollTop - 100)
                   callback()
                }
            }, 300)
        })
    },
    end(){
        this.isEnd=true
    }
    
}

export default scroll