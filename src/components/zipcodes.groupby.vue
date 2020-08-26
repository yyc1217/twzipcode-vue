<template>

    <select class="twzipcode twzipcode__zipcode twzipcode__zipcode--groupby"
            :value="value"
            :id="id"
            :name="name"
            @input="$emit('input', $event.target.value)">

        <optgroup v-for="(zipcodes, county) in dataList"
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

const DATA_NAME = 'zipcodes'

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
        },
        value: {
            type: String,
            default: '100'
        },
    },
    data () {
        return {}
    },

    computed: {

        myZipcodes () {
            const transform = (option, valueDict, textDict) => {
                option.county = textDict[option.id].county
                return option
            }

            return this.getData({
                dataName: DATA_NAME,
                transform
            })
        },

        dataList () {
            return groupBy(this.myZipcodes, 'county')
        }
    }
}

</script>