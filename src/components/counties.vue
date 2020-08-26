<template>

    <select class="twzipcode twzipcode__county"
            :value="value"
            :id="id"
            :name="name"
            @input="$emit('input', $event.target.value)">
        <option v-for="(county, i) in counties"
                :key="'option-' + i"
                :value="county.value">{{ county.text }}</option>
    </select>

</template>

<script>
import mixin from './mixin'

const DATA_NAME = 'counties'

export default {
    mixins: [mixin],
    props: {
        textTemplate: {
            type: String,
            default: ':name'
        },
        valueTemplate: {
            type: String,
            default: ':id'
        },
        id: {
            type: String,
            default: 'twzipcode__county'
        },
        name: {
            type: String,
            default: 'county'
        },
        value: {
            type: String,
            default: '臺北市'
        }
    },

    data () {
        return {}
    },

    computed: {
        counties () {
            return this.getData({
                dataName: DATA_NAME
            })
        }
    }
}

</script>