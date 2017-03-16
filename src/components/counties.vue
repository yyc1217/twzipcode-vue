<template>

<select class="twzipcode__county" v-model="value" :id="id">
    <option v-for="county in counties" :value="county">{{ county }}</option>
</select>

</template>

<script>
import data from 'twzipcode-data'

export default {
    props: {
        id: {
            type: String,
            default: 'twzipcode__county'
        },
        selected: {
            type: String,
        },
        locale: {
            type: String,
            default: 'zh-tw'
        }
    },
    data () {
        return {
            counties: data(this.locale).counties,
            value: this.selected || data(this.locale).counties[0]
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