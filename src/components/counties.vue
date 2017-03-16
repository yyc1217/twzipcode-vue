<template>

<select class="twzipcode__county" v-model="value" :id="id">
    <option v-for="county in counties" :value="county">{{ county }}</option>
</select>

</template>

<script>
import twzipcode from 'twzipcode-data'

let data = twzipcode('zh-tw')

export default {
    props: {
        id: {
            type: String,
            default: 'twzipcode__county'
        },
        selected: {
            type: String,
            default: data.counties[0]
        }
    },
    data () {
        return {
            counties: data.counties,
            value: this.selected
        }
    },
    methods: {
        emitChange (county) {

            if (this.$root.bus) {
                let id = this.$props.id
                this.$root.bus.$emit(`${id}:change:county`, {
                    county
                })
            }
        }
    },
    watch: {
        value: function(county) {
            this.emitChange(county)
        }
    },
    mounted () {
        this.emitChange(this.$data.value)
    }
}

</script>

<style>
</style>