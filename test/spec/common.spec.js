import 'should'
import { mount } from 'avoriaz'

let getComponent = (component, propsData = {}) =>
  mount(component, {
    propsData
  })

exports.getComponent = getComponent

/**
 * 初始化的參數們
 */
exports.testInitProps = ({
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
    c.element.id.should.eql(id)
  })

  it(`should has name ${name}`, () => {
    c.element.name.should.eql(name)
  })

  it(`should has option length ${length}`, () => {
    let options = c.element.getElementsByTagName('option')
    options.length.should.eql(length)
  })

  it(`should has first option text ${firstText}`, () => {
    let option = c.element.getElementsByTagName('option')[0]
    option.textContent.should.eql(firstText)
  })

  it(`should has first option value ${firstValue}`, () => {
    let option = c.element.getElementsByTagName('option')[0]
    option.value.should.eql(firstValue)
  })

  it(`should has class ${classes}`, () => {
    classes.forEach(clazz => {
      c.element.classList.contains(clazz)
    })
  })
}

/**
 * value與text格式修改
 */
exports.testTemplate = ({
  component,
  textTemplate,
  firstText,
  valueTemplate,
  firstValue
}) => {
  const propsData = {
    textTemplate,
    valueTemplate
  }

  const c = getComponent(component, propsData)

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
exports.testLocale = ({
  component,
  textLocale = 'zh-tw',
  firstText,
  valueLocale = 'zh-tw',
  firstValue
}) => {
  const propsData = {
    textLocale,
    valueLocale
  }

  const c = getComponent(component, propsData)

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
exports.testDiffLocale = ({
  component,
  textLocale = 'zh-tw',
  textTemplate,
  firstText,
  valueLocale = 'zh-tw',
  valueTemplate,
  firstValue
}) => {
  const propsData = {
    textLocale,
    valueLocale,
    textTemplate,
    valueTemplate
  }

  const c = getComponent(component, propsData)

  it(`should have value ${firstValue} and text ${firstText}`, () => {
    let option = c.element.getElementsByTagName('option')[0]
    option.textContent.should.eql(firstText)
    option.value.should.eql(firstValue)
  })
}

exports.testSelected = ({
  component,
  selected
}) => {
  const propsData = {
    selected
  }
  const c = getComponent(component, propsData)

  it(`should select ${selected}`, () => {
    c.element.value.should.eql(selected)
  })
}
