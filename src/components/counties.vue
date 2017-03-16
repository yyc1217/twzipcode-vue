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
    watch: {
        selected: function(counties) {
            if (this.$root.bus) {
                let id = this.$props.id
                console.log(`emit ${id}:change:county`) 
                this.$root.bus.$emit(`${id}:change:county`, {
                    counties
                })
            }
        }
    }
}

</script>

<style>
</style>