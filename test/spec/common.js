import 'should'
import { shallowMount } from '@vue/test-utils'

const getComponent = (component, props = {}) =>
  shallowMount(component, {
    props
  })

/**
 * 初始化的參數們
 */
const testInitProps = ({
  component,
  length,
  firstText,
  firstValue,
  id,
  name,
  classes = []
}) => {
  const c = getComponent(component)

  it(`should has id ${id}`, () => {
    c.attributes().id.should.eql(id)
  })

  it(`should has name ${name}`, () => {
    c.attributes().name.should.eql(name)
  })

  it(`should has default value ${firstValue}`, () => {
    const select = c.find('select')
    select.element.value.should.eql(firstValue)
  })

  it(`should has option length ${length}`, () => {
    const options = c.findAll('option')
    options.length.should.eql(length)
  })

  it(`should has first option text ${firstText}`, () => {
    const options = c.findAll('option')
    options[0].text().should.eql(firstText)
  })

  it(`should has first option value ${firstValue}`, () => {
    const options = c.findAll('option')
    options[0].element.value.should.eql(firstValue)
  })

  it(`should has class ${classes}`, () => {
    classes.forEach(clazz => {
      c.classes().should.containEql(clazz)
    })
  })
}

/**
 * value與text格式修改
 */
const testTemplate = ({
  component,
  textTemplate,
  firstText,
  valueTemplate,
  firstValue
}) => {
  const props = {
    textTemplate,
    valueTemplate
  }

  const c = getComponent(component, props)

  it(`text should be ${firstText} rendered by ${textTemplate}`, () => {
    let option = c.element.getElementsByTagName('option')[0]
    option.textContent.should.eql(firstText)
  })

  it(`value should be ${firstValue} rendered by ${valueTemplate}`, () => {
    let option = c.element.getElementsByTagName('option')[0]
    option.value.should.eql(firstValue)
  })
}

/**
 * i18n
 */
const testLocale = ({
  component,
  textLocale = 'zh-tw',
  firstText,
  valueLocale = 'zh-tw',
  firstValue
}) => {
  const props = {
    textLocale,
    valueLocale
  }

  const c = getComponent(component, props)

  it(`text should be ${firstText} in locale ${textLocale}`, () => {
    let option = c.element.getElementsByTagName('option')[0]
    option.textContent.should.eql(firstText)
  })

  it(`value should be ${firstValue} in locale ${valueLocale}`, () => {
    let option = c.element.getElementsByTagName('option')[0]
    option.value.should.eql(firstValue)
  })
}

/**
 * value和text可以有不同的locale
 */
const testDiffLocale = ({
  component,
  textLocale = 'zh-tw',
  textTemplate,
  firstText,
  valueLocale = 'zh-tw',
  valueTemplate,
  firstValue
}) => {
  const props = {
    textLocale,
    valueLocale,
    textTemplate,
    valueTemplate
  }

  const c = getComponent(component, props)

  it(`should have value ${firstValue} and text ${firstText}`, () => {
    let option = c.element.getElementsByTagName('option')[0]
    option.textContent.should.eql(firstText)
    option.value.should.eql(firstValue)
  })
}

const testSelected = ({
  component,
  value
}) => {
  const props = {
    modelValue: value
  }
  const c = getComponent(component, props)

  it(`should select ${value}`, () => {
    c.element.value.should.eql(value)
  })
}

export {
  getComponent,
  testInitProps,
  testTemplate,
  testLocale,
  testDiffLocale,
  testSelected
}
