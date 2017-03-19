<template>

<select class="twzipcode__county" v-model="value" :id="id">
    <option v-for="county in counties" :value="county.value">{{ county.text }}</option>
</select>

</template>

<script>
import data from 'twzipcode-data'
import _ from 'lodash'

export default {
    props: {
        optionTextTemplate: {
            type: String,
            default: ':name'
        },
        optionValueTemplate: {
            type: String,
            default: ':id'
        },
        id: {
            type: String,
            default: 'twzipcode__county'
        },
        selected: {
            type: String,
        },
        textLocale: {
            type: String,
            default: 'zh-tw'
        },
        valueLocale: {
            type: String,
            default: 'zh-tw'
        }
    },
    data () {

        let ids = data().counties.map(county => county.id)
        let valueDict = _.keyBy(data(this.valueLocale).counties, 'id')
        let textDict = _.keyBy(data(this.textLocale).counties, 'id')
        let counties = this.toOptions(ids, valueDict, textDict)

        return {
            counties: counties,
            value: this.selected || counties[0].value
        }
    },
    methods: {
        optionText ({name, id}) {

            let text = this.optionTextTemplate
            text = text.replace(':name', name)
            text = text.replace(':id', id)

            return text
        },
        optionValue ({name, id}) {

            let text = this.optionValueTemplate
            text = text.replace(':name', name)
            text = text.replace(':id', id)

            return text
        },
        toOption: function (id, value, text) {
            return {
                id,
                value: this.optionValue(value),
                text: this.optionText(text)
            }
        },
        toOptions: function (ids, valueDict, textDict) {
            return ids.map(id => this.toOption(id, valueDict[id], textDict[id]))
        },
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