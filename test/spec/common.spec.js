import 'should'
import { mount } from 'avoriaz'

exports.testInitProps = ({
  component,
  length,
  firstText,
  firstValue,
  id,
  classes = []
}) => {
  const c = mount(require(`../../src/components/${component}.vue`))

  it(`should has init id ${id}`, () => {
    c.is(`#${id}`).should.be.true()
  })

  it(`should has option length ${length}`, () => {
    let options = c.find('option')
    options.length.should.eql(length)
  })

  it(`should has first option text ${firstText}`, () => {
    let option = c.find('option')[0]
    option.text().should.eql(firstText)
  })

  it(`should has first option value ${firstValue}`, () => {
    let option = c.find('option')[0]
    option.hasAttribute('value', firstValue).should.be.true()
  })

  it(`should has class ${classes}`, () => {
    classes.forEach(clazz => {
      c.hasClass(clazz).should.be.true()
    })
  })
}

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
  const c = mount(require(`../../src/components/${component}.vue`), {
    propsData
  })

  it(`text should be ${firstText} rendered by ${textTemplate}`, () => {
    let option = c.find('option')[0]
    option.text().should.eql(firstText)
  })

  it(`value should be ${firstValue} rendered by ${valueTemplate}`, () => {
    let option = c.find('option')[0]
    option.hasAttribute('value', firstValue).should.be.true()
  })
}
