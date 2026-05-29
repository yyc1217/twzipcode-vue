<template>

    <select class="twzipcode twzipcode__zipcode twzipcode__zipcode--groupby"
            :value="modelValue"
            :id="id"
            :name="name"
            @change="$emit('update:modelValue', $event.target.value)">

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
    emits: ['update:modelValue'],
    props: {
        textTemplate: {
            type: String,
            default: ':city'
        },
        valueTemplate: {
            type: String,
            default: ':zipcode'
        },
        id: {
            type: String,
            default: 'twzipcode__zipcode--groupby'
        },
        name: {
            type: String,
            default: 'zipcode'
        },
        modelValue: {
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