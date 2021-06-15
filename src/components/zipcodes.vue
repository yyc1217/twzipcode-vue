<template>

    <select class="twzipcode twzipcode__zipcode"
            :value="value"
            :id="id"
            :name="name"
            @change="$emit('input', $event.target.value)">
        <option v-for="(option, i) in filterByCountyOptions"
                :key="'option-' + i"
                :value="option.value">{{ option.text }}</option>
    </select>

</template>

<script>
import mixin from './mixin'

const DATA_NAME = 'zipcodes'

export default {
    mixins: [mixin],
    props: {
        textTemplate: {
            type: String,
            default: ':zipcode :county :city'
        },
        valueTemplate: {
            type: String,
            default: ':zipcode'
        },
        id: {
            type: String,
            default: 'twzipcode__zipcode'
        },
        name: {
            type: String,
            default: 'zipcode'
        },
        value: {
            type: String,
            default: '100'
        },
        filterByCounty: {
            type: String,
            required: false
        }
    },

    data () {
        return {}
    },
    
    computed: {

        zipcodes () {

            const transform = (option, valueDict, textDict) => {
                option.county = textDict[option.id].county
                return option
            }

            return this.getData({
                dataName: DATA_NAME,
                transform
            })
        },

        filterByCountyOptions () {

            if (!this.filterByCounty) {
                return this.zipcodes
            }

            const filteredList = this.zipcodes.filter(zipcode => zipcode.county === this.filterByCounty)

            const inList = filteredList.filter(option => option.value === this.value).length > 0
            if (!inList) {
                this.$emit('input', filteredList[0].value)
            }

            return filteredList
        }
    }
}
</script>