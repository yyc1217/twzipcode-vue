<template>

<select class="twzipcode__county" v-model="selected" :id="id">
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
        }
    },
    data () {
        return {
            counties: data.counties,
            selected: data.counties[0]
        }
    },
    methods: {
        emitChange (county) {

            if (this.$root.bus) {
                let id = this.$props.id
                console.log('emity', `${id}:change:county`)
                this.$root.bus.$emit(`${id}:change:county`, {
                    county
                })
            }
        }
    },
    watch: {
        selected: function(county) {
            this.emitChange(county)
        }
    },
    mounted () {
        this.emitChange(this.$data.selected)
    }
}

</script>

<style>
</style>