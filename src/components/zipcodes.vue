<template>

<select class="twzipcode__zipcode" v-model="value" :id="id">
    <option v-for="option in filterByCounty" :value="option.value">{{ option.text }}</option>
</select>

</template>

<script>
import twzipcode from 'twzipcode-data'

export default {
    props: {
        textTemplate: {
            type: String,
            default: ':id :county :city'
        },
        valueTemplate: {
            type: String,
            default: ':id'
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
        valueLocale: {
            type: String,
            default: 'zh-tw'
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
                           .map(zipcode => {
                               zipcode.county = valueDict[zipcode.id].county
                               return zipcode
                            })

        return {
            zipcodes: zipcodes,
            county: this.initCounty,
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
    },
    computed: {
        filterByCounty () {

            if (!this.$data.county) {
                return this.zipcodes
            }

            let list = this.zipcodes
                .filter(zipcode => zipcode.county === this.$data.county)

            let inList = list.filter(option => option.value === this.$data.value).length > 0
            if (!inList) {
                this.$data.value = list[0].value
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