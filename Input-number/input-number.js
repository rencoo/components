function isValueNumber (value) {
    value = Number(value)
    return !isNaN(value) && (typeof value) === 'number'
}
Vue.component('input-number', {
    template: `
    <div class="input-number">
        <input 
            v-bind:value="currentValue"
            v-on:change="handleChange">
        <button 
            @click="handleUp"
            :disabled="currentValue >= max">+</button>
        <button 
            @click="handleDown"
            :disabled="currentValue <= min">-</button>
    </div>
    `,
    // props: [
    //     'value',
    //     'max',
    //     'min'
    // ],
    props: {
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        }
    },
    data () {
        // 对父组件初始传入的值进行检测(也可在props进行最大最小值的校验)
        var val = this.value
        if (val > this.max) {
            val = this.max
        }
        if (val < this.min) {
            val = this.min
        }
        return {
            currentValue: val
        }
    },
    methods: {
        handleUp () {
            if (this.currentValue >= this.max) return;
            this.currentValue += 1;
        },
        handleDown () {
            if (this.currentValue <= this.min) return;
            this.currentValue -= 1;
        },
        updateValue (val) {
            if (val > this.max) {
                val = this.max
            }
            if (val < this.min) {
                val = this.min
            }
            this.currentValue = val
        },
        handleChange (event) {
            var val = event.target.value.trim()
            if (isValueNumber(val)) {
                val = Number(val)
                this.updateValue(val)    
            } else { // 将输入内容重置为之前的currentValue
                event.target.value = this.currentValue
            }
        }
    },
    watch: {
        value: function (val) { //  父组件传入值改变时, vm.value = ...
            this.updateValue(val)
        },
        currentValue (val) { // 子组件数据改变时, 抛给父组件数据
            // handlerUp/handlerDown/handlerChange 都会引起currentValue改变
            // 使用watch可以减少冗余(否则需要在这三个方法里每次currentValue改变都需要抛出值)
            console.log(typeof (this.currentValue))
            this.$emit('myinput', val)
        }
    },
    mounted: function () {
        // 对父组件初始传入的值进行修正; 也可以在data() {}里做
        this.updateValue(this.value)
    }
})