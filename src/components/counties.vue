<template>

<select class="twzipcode twzipcode__county" v-model="value" :id="id" :name="name">
    <option v-for="(county, i) in counties"
            :key="'option-' + i"
            :value="county.value">{{ county.text }}</option>
</select>

</template>

<script>
import mixin from './mixin'

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
        }
    },
    data () {

        let dataName = 'counties'
        let counties = this.getData({
            dataName
        })

        return {
            counties: counties,
            value: this.selected || counties[0].value
        }
    }
}

</script>