<template>

    <select class="twzipcode twzipcode__zipcode"
            :value="modelValue"
            :id="id"
            :name="name"
            @change="$emit('update:modelValue', $event.target.value)">
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
    emits: ['update:modelValue'],
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
        modelValue: {
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

            return this.zipcodes.filter(zipcode => zipcode.county === this.filterByCounty)
        }
    },

    watch: {
        filterByCountyOptions: {
            immediate: true,
            handler (options) {
                if (!this.filterByCounty || options.length === 0) {
                    return
                }

                const inList = options.some(option => option.value === this.modelValue)
                if (!inList) {
                    this.$emit('update:modelValue', options[0].value)
                }
            }
        }
    }
}
</script>
