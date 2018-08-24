---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The simplest usage.

````jsx
import { Affix, Button } from 'antd';

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top: 10,
      bottom: 10,
    }
  }
  // state = {
    
  // }

  render() {
    return (
      <div>
        <Affix offsetTop={this.state.top}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                top: this.state.top + 10,
              });
            }}
          >
            Affix top
          </Button>
        </Affix>
        <br />
        <Affix offsetBottom={this.state.bottom}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                bottom: this.state.bottom + 10,
              });
            }}
          >
            Affix bottom
          </Button>
        </Affix>
      </div>
    );
  }
}
// ReactDOM.render(<Demo />, mountNode);
````

| 参数 | 参数类型 | 参数说明 |
| --- | --- | --- |
| imgurl | string,必填 | 要素的样式图片地址 |
| imgrealwidth | number,可选 | 图片真实的宽度, 如果与imgtargetwidth宽度相同或者不设置该参数, 则图片1:1显示 |
| imgtargetwidth | number,可选 | 想要的图片宽度, 如果与imgrealwidth宽度相同或者不设置该参数, 则图片1:1显示 |
