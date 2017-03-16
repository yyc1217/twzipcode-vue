<template>

<select class="twzipcode__zipcode--groupby" v-model="value" :id="id">
    <optgroup v-for="(zipcodes, county) in data" :label="county">
        <option v-for="zipcode in zipcodes" :value="zipcode.zipcode">{{ optionText(zipcode) }}</option>
    </optgroup>
</select>

</template>

<script>
import data from 'twzipcode-data'

export default {
    props: {
        optionTemplate: {
            type: String,
            default: ':city'
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
            data: data(this.locale).computed.groupByCounty,
            value: this.selected || data(this.locale).zipcodes[0].zipcode
        }
    },
    methods: {
        optionText ({county, city, zipcode}) {

            let text = this.optionTemplate
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