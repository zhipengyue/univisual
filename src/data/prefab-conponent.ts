import type { BaseComponentClassify } from '@/types/component'
import type { Element } from '@/types/element'
export const prefabComponents: BaseComponentClassify[] = [
  {
    name: 'web',
    children: [
      {
        name: '区块',
        children: [
          {
            name: 'div',
            label: '<div></div>',
            category: 'html5',
            path: '@/src/components/web/div.vue'
          },
          {
            name: 'nav',
            label: '<nav></nav>',
            category: 'html5'
          },
          {
            name: 'main',
            label: '<main></main>',
            category: 'html5'
          },
          {
            name: 'article',
            label: '<article></article>',
            category: 'html5'
          },
          {
            name: 'section',
            label: '<section></section>',
            category: 'html5'
          },
          {
            name: 'aside',
            label: '<aside></aside>',
            category: 'html5'
          },
          {
            name: 'footer',
            label: '<footer></footer>',
            category: 'html5'
          }
        ]
      },
      {
        name: '文本',
        children: [
          {
            name: 'p',
            label: '<p></p>',
            category: 'html5'
          },
          {
            name: 'h1',
            label: '<h1></h1>',
            category: 'html5'
          },
          {
            name: 'h2',
            label: '<h2></h2>',
            category: 'html5'
          },
          {
            name: 'h3',
            label: '<h3></h3>',
            category: 'html5'
          },
          {
            name: 'h4',
            label: '<h4></h4>',
            category: 'html5'
          },
          {
            name: 'h5',
            label: '<h5></h5>',
            category: 'html5'
          },
          {
            name: 'h6',
            label: '<h6></h6>',
            category: 'html5'
          },
          {
            name: 'br',
            label: '<br>',
            category: 'html5'
          },
          {
            name: 'hr',
            label: '<hr>',
            category: 'html5'
          },
          {
            name: 'span',
            label: '<span></span>',
            category: 'html5'
          },
          {
            name: 'b',
            label: '<b></b>',
            category: 'html5'
          },
          {
            name: 'i',
            label: '<i></i>',
            category: 'html5'
          }
        ]
      },
      {
        name: '连接',
        children: [
          {
            name: 'a',
            label: '<a></a>',
            category: 'html5'
          }
        ]
      },
      {
        name: '表单',
        children: [
          {
            name: 'form',
            label: '<form></form>',
            category: 'html5'
          },
          {
            name: 'input',
            label: '<input>',
            category: 'html5'
          },
          {
            name: 'textarea',
            label: '<textarea>',
            category: 'html5'
          },
          {
            name: 'select',
            label: '<select>',
            category: 'html5'
          },
          {
            name: 'option',
            label: '<option>',
            category: 'html5'
          },
          {
            name: 'button',
            label: '<button>',
            category: 'html5'
          },
          {
            name: 'label',
            label: '<label>',
            category: 'html5'
          },
          {
            name: 'fieldset',
            label: '<fieldset>',
            category: 'html5'
          },
          {
            name: 'legend',
            label: '<legend>',
            category: 'html5'
          }
        ]
      },
      {
        name: '列表类',
        children: [
          {
            name: 'ul',
            label: '<ul></ul>',
            category: 'html5'
          },
          {
            name: 'ol',
            label: '<ol></ol>',
            category: 'html5'
          },
          {
            name: 'li',
            label: '<li></li>',
            category: 'html5'
          }
        ]
      },
      {
        name: '表格类',
        children: [
          {
            name: 'table',
            label: '<table></table>',
            category: 'html5'
          },
          {
            name: 'tr',
            label: '<tr></tr>',
            category: 'html5'
          },
          {
            name: 'td',
            label: '<td></td>',
            category: 'html5'
          },
          {
            name: 'th',
            label: '<th></th>',
            category: 'html5'
          }
        ]
      },
      {
        name: '多媒体类',
        children: [
          {
            name: 'img',
            label: '<img>',
            category: 'html5'
          },
          {
            name: 'audio',
            label: '<audio></audio>',
            category: 'html5'
          },
          {
            name: 'video',
            label: '<video></video>',
            category: 'html5'
          }
        ]
      }
    ]
  },
  {
    name: 'vue3',
    children: [
      {
        name: '基础组件',
        children: [
          {
            name: 'el-button',
            label: '<el-button></el-button>',
            category: 'element-plus',
            description: '按钮'
          },
          {
            name: 'el-button-group',
            label: '<el-button-group></el-button-group>',
            category: 'element-plus',
            description: '按钮组'
          }
        ]
      }
    ]
  }
]

export const element: Element = {
  name: 'body',
  className: 'main',
  children: [
    {
      name: 'div',
      className: 'container',
      children: [
        {
          name: 'h1',
          className: 'title',
          children: [
            {
              name: 'span',
              className: 'title-text',
              children: []
            }
          ]
        },
        {
          name: 'div',
          className: 'layer1',
          children: [
            {
              name: 'div',
              className: 'layer2',
              children: [
                {
                  name: 'div',
                  className: 'layer3',
                  children: [
                    {
                      name: 'div',
                      className: 'layer4',
                      children: [
                        {
                          name: 'div',
                          className: 'layer5',
                          children: [
                            {
                              name: 'div',
                              className: 'layer6',
                              children: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'container',
      children: [
        {
          name: 'h1',
          className: 'title',
          children: [
            {
              name: 'span',
              className: 'title-text',
              children: []
            }
          ]
        },
        {
          name: 'div',
          className: 'layer1',
          children: [
            {
              name: 'div',
              className: 'layer2',
              children: [
                {
                  name: 'div',
                  className: 'layer3',
                  children: [
                    {
                      name: 'div',
                      className: 'layer4',
                      children: [
                        {
                          name: 'div',
                          className: 'layer5',
                          children: [
                            {
                              name: 'div',
                              className: 'layer6',
                              children: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'div',
      className: 'second'
    },
    {
      name: 'div',
      className: 'second'
    }
  ]
}
