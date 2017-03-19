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
        }
    }
}

</script>

<style>
</style>