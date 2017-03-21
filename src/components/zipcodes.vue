<template>

<select class="twzipcode__zipcode" v-model="value" :id="id">
    <option v-for="option in filterByCountyOptions" :value="option.value">{{ option.text }}</option>
</select>

</template>

<script>
import mixin from './mixin'

export default {
    mixins: [mixin],
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
            default: 'twzipcode__zipcode'
        },
        listenToCounty: {
            type: String,
            default: 'twzipcode__county'
        },
        filterByCounty: {
            type: String
        }
    },
    data () {

        let dataName = 'zipcodes'
        let transform = (option, valueDict, textDict) => {
            option.county = textDict[option.id].county
            return option
        }
        let zipcodes = this.getData({
            dataName,
            transform
        })

        return {
            zipcodes: zipcodes,
            county: this.filterByCounty,
            value: this.selected || zipcodes[0].value,
        }
    },
    computed: {
        filterByCountyOptions () {

            if (!this.$data.county) {
                return this.zipcodes
            }

            let filteredList = this.zipcodes.filter(zipcode => zipcode.county === this.$data.county)

            let inList = filteredList.filter(option => option.value === this.$data.value).length > 0
            if (!inList) {
                this.$data.value = filteredList[0].value
            }

            return filteredList
        }
    },
    mounted () {
        if (this.$root.bus) {
            let countyId = this.$props.listenToCounty
            this.$root.bus.$on(`${countyId}:change`, event => {
                this.$data.county = event.value;
            })
        }
    }
}
</script>