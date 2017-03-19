<template>

<select class="twzipcode__zipcode--groupby" v-model="value" :id="id">
    <optgroup v-for="(zipcodes, county) in data" :label="county">
        <option v-for="zipcode in zipcodes" :value="zipcode.value">{{ zipcode.text }}</option>
    </optgroup>
</select>

</template>

<script>
import twzipcode from 'twzipcode-data'
import { groupBy } from 'lodash'

export default {
    props: {
        textTemplate: {
            type: String,
            default: ':city'
        },
        valueTemplate: {
            type: String,
            default: ':id'
        },
        selected: {
            type: String,
        },
        id: {
            type: String,
            default: 'twzipcode__zipcode--groupby'
        },
        valueLocale: {
            type: String,
            defaults: 'zh-tw'
        },
        textLocale: {
            type: String,
            default: 'zh-tw'
        }
    },
    data () {

        let ids = twzipcode().zipcodes.map(zipcode => zipcode.id)
        let valueDict = twzipcode(this.valueLocale).computed.keyByZipcode
        let textDict = twzipcode(this.textLocale).computed.keyByZipcode
        let zipcodes = this.toOptions(ids, valueDict, textDict)
        zipcodes = zipcodes.map(zipcode => {
                          zipcode.county = textDict[zipcode.id].county
                          return zipcode
                        })
        let data = groupBy(zipcodes, 'county')

        return {
            data,
            value: this.selected || zipcodes[0].value
        }
    },
    methods: {
        optionText ({county, city, id}) {

            let text = this.textTemplate
            text = text.replace(':county', county)
            text = text.replace(':city', city)
            text = text.replace(':id', id)

            return text
        },
        optionValue ({county, city, id}) {

            let text = this.valueTemplate
            text = text.replace(':county', county)
            text = text.replace(':city', city)
            text = text.replace(':id', id)

            return text
        },
        toOption: function(id, value, text) {
            return {
                id,
                value: this.optionValue(value),
                text: this.optionText(text)
            }
        },
        toOptions: function(ids, valueDict, textDict) {
            return ids.map(id => this.toOption(id, valueDict[id], textDict[id]))
        }
    }
}

</script>

<style>
</style>