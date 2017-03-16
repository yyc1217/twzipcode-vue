<template>

<select class="twzipcode__zipcode" :id="id">
    <option v-for="zipcode in filterByCounty" :value="'zipcode'">{{ optionText(zipcode) }}</option>
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
        id: {
            type: String,
            default: 'twzipcode__county'
        },
        countyId: {
            type: String,
            default: 'twzipcode__county'
        },
        initCounty: {
            type: String
        }
    },
    data () {
        return {
            zipcodes: data('zh-tw').zipcodes,
            county: this.initCounty
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
    computed: {
        filterByCounty () {

            if (!this.$data.county) {
                return this.zipcodes
            }

            return this.zipcodes.filter(zipcode => zipcode.county === this.$data.county)
        }
    },
    mounted () {

        if (this.$root.bus) {
            let countyId = this.$props.countyId
            console.log('listen', `${countyId}:change:county`)
            this.$root.bus.$on(`${countyId}:change:county`, event => {
                console.log('received', event.county)
                this.$data.county = event.county;
            })
        }
    }
}
</script>

<style>
</style>