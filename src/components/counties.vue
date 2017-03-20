<template>

<select class="twzipcode__county" v-model="value" :id="id">
    <option v-for="county in counties" :value="county.value">{{ county.text }}</option>
</select>

</template>

<script>
import mixin from './mixin'

export default {
    mixins: [mixin],
    props: {
        textTemplate: {
            type: String,
            default: ':name'
        },
        valueTemplate: {
            type: String,
            default: ':id'
        },
        id: {
            type: String,
            default: 'twzipcode__county'
        }
    },
    data () {

        let dataName = 'counties'
        let counties = this.getData({
            dataName
        })

        return {
            counties: counties,
            value: this.selected || counties[0].value
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