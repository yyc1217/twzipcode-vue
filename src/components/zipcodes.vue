<template>

<select class="twzipcode__zipcode">
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
        },
        countyId: {
            type: String,
            default: 'twzipcode__county'
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
    },
    mounted () {

        if (this.$root.bus) {
            let countyId = this.$props.countyId
            console.log(`listen to ${countyId}:change:county`)

            this.$root.bus.$on(`${countyId}:change:county`, event => {
                console.log(event, countyId)
            })
        }
    }
}
</script>

<style>
</style>