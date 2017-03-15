<template>

<select class="twzipcode__all">
    <option v-for="zipcode in zipcodes" :value="zipcode.zipcode">{{ optionText(zipcode) }}</option>
</select>

</template>

<script>
import data from 'twzipcode-data'

export default {
    props: {
        optionTemplate: {
            type: String,
            default: ':zipcode :county :city'
        }
    },
    data () {
        return {
            zipcodes: data('zh-tw').zipcodes
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