<template>

<select class="twzipcode__zipcode" v-model="value" :id="id">
    <option v-for="zipcode in filterByCounty" :value="optionValue(zipcode)">{{ optionText(zipcode) }}</option>
</select>

</template>

<script>
import twzipcode from 'twzipcode-data'

export default {
    props: {
        optionTextTemplate: {
            type: String,
            default: ':zipcode :county :city'
        },
        optionValueTemplate: {
            type: String,
            default: ':zipcode'
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
        },
        selected: {
            type: String,
        },
        locale: {
            type: String,
            default: 'zh-tw'
        }
    },
    data () {
        return {
            zipcodes: twzipcode(this.locale).zipcodes,
            county: this.initCounty,
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
    },
    computed: {
        filterByCounty () {

            if (!this.$data.county) {
                return this.zipcodes
            }

            let list = this.zipcodes.filter(zipcode => zipcode.county === this.$data.county)

            let inList = list.filter(zipcode => this.optionValue(zipcode) === this.$data.value).length > 0
            if (!inList) {
                this.$data.value = this.optionValue(list[0])
            }

            return list
        }
    },
    mounted () {

        if (this.$root.bus) {
            let countyId = this.$props.countyId
            this.$root.bus.$on(`${countyId}:change:county`, event => {
                this.$data.county = event.county;
            })
        }
    }
}
</script>

<style>
</style>