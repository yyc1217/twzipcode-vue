<template>

<select class="twzipcode twzipcode__zipcode twzipcode__zipcode--groupby" v-model="value" :id="id" :name="name">
    <optgroup v-for="(zipcodes, county) in data"
              :key="'optgroup-' + county"
              :label="county">
        <option v-for="(zipcode, i) in zipcodes"
                :key="'option-' + i"
                :value="zipcode.value">{{ zipcode.text }}</option>
    </optgroup>
</select>

</template>

<script>
import mixin from './mixin'
import { groupBy } from 'lodash'

export default {
    mixins: [mixin],
    props: {
        textTemplate: {
            type: String,
            default: ':city'
        },
        valueTemplate: {
            type: String,
            default: ':id'
        },
        id: {
            type: String,
            default: 'twzipcode__zipcode--groupby'
        },
        name: {
            type: String,
            default: 'zipcode'
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
        let data = groupBy(zipcodes, 'county')

        return {
            data,
            value: this.selected || zipcodes[0].value
        }
    }
}

</script>