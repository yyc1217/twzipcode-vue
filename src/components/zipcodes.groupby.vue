<template>

<select class="twzipcode__zipcode">
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
        }
    },
    data () {
        return {
            data: data('zh-tw').computed.groupByCounty
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