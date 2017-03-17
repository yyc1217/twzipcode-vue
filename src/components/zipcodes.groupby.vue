<template>

<select class="twzipcode__zipcode--groupby" v-model="value" :id="id">
    <optgroup v-for="(zipcodes, county) in data" :label="county">
        <option v-for="zipcode in zipcodes" :value="optionValue(zipcode)">{{ optionText(zipcode) }}</option>
    </optgroup>
</select>

</template>

<script>
import twzipcode from 'twzipcode-data'

export default {
    props: {
        optionTextTemplate: {
            type: String,
            default: ':city'
        },
        optionValueTemplate: {
            type: String,
            default: ':zipcode'
        },
        selected: {
            type: String,
        },
        id: {
            type: String,
            default: 'twzipcode__zipcode--groupby'
        },
        locale: {
            type: String,
            default: 'zh-tw'
        }
    },
    data () {
        return {
            data: twzipcode(this.locale).computed.groupByCounty,
            value: this.selected || this.optionValue(twzipcode(this.locale).zipcodes[0])
        }
    },
    methods: {
        optionText ({county, city, zipcode}) {

            let text = this.optionTextTemplate
            text = text.replace(':county', county)
            text = text.replace(':city', city)
            text = text.replace(':zipcode', zipcode)

            return text
        },
        optionValue ({county, city, zipcode}) {

            let text = this.optionValueTemplate
            text = text.replace(':county', county)
            text = text.replace(':city', city)
            text = text.replace(':zipcode', zipcode)

            return text
        }
    }
}

</script>

<style>
</style>