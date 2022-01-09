import { Component } from 'react'
import avatar from './images/cat.gif'
import moment from 'moment'

class App extends Component {
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot',
      },
      {
        id: 2,
        name: '时间',
        type: 'time',
      },
      {
        id: 3,
        name: '点赞',
        type: 'good',
      },
    ],
    active: 'time',
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1,
        hotCount: 789,
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 15:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0,
        hotCount: 456,
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1,
        hotCount: 234,
      },
    ],
  }
  // 发表评论
  addComment = () => {
    // const ipt = e.target.value
    console.log(this.state.content)
    // console.log('生而为人,我很抱歉')
    const obj = {
      id: Date.now(),
      author: '刘德华',
      comment: this.state.content,
      time: new Date(),
      attitude: 0,
      hotCount: 0,
    }
    // 2. 修改list的值
    this.setState({
      list: [obj, ...this.state.list],
      content: '',
    })
  }
  // 获取表单的值
  handleInput = e => {
    this.setState({ content: e.target.value })
  }
  // 删除
  delList(id) {
    console.log(id)
    this.setState({
      list: this.state.list.filter(v => v.id !== id),
    })
  }
  // 点赞
  changeLike(id, attitude) {
    this.setState({
      list: this.state.list.map(v => {
        if (v.id === id) {
          if (attitude === 1) {
            return {
              ...v,
              attitude: attitude,
              hotCount: v.hotCount + 1,
            }
          } else {
            return {
              ...v,
              attitude: attitude,
              hotCount: v.hotCount - 1,
            }
          }
        } else {
          return v
        }
      }),
    })
  }
  // 踩
  changeHate(id, attitude) {
    this.setState({
      list: this.state.list.map(v => {
        if (v.id === id) {
          if (v.attitude === 1) {
            return { ...v, attitude: attitude, hotCount: v.hotCount - 1 }
          } else {
            return { ...v, attitude: attitude }
          }
        } else {
          return v
        }
      }),
    })
  }
  // 切换表头
  handleTitle = type => {
    console.log(type)
    this.setState({
      active: type,
    })
  }
  render() {
    const state = this.state
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>{state.list.length} 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {state.tabs.map(item => (
                <li
                  key={item.id}
                  className={item.type === state.active ? 'on' : ''}
                  onClick={() => this.handleTitle(item.type)}
                >
                  按{item.name}排序
                </li>
              ))}
            </ul>
          </div>

          {/* 添加评论 */}
          {/* <img src={avatar} alt="" /> */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.content}
                onChange={this.handleInput}
              />
              <button className="comment-submit" onClick={this.addComment}>
                发表评论
              </button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {state.list.map(item => (
              <div className="list-item" key={item.id}>
                <div className="user-face">
                  <img className="user-head" src={avatar} alt="" />
                </div>
                <div className="comment">
                  <div className="user">{item.author}</div>
                  <p className="text">{item.comment}</p>
                  <div className="info">
                    <span className="time">
                      {moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                    {/* 点赞 */}
                    <span
                      className={[
                        'like',
                        item.attitude === 1 ? 'liked' : '',
                      ].join(' ')}
                      onClick={() =>
                        this.changeLike(
                          item.id,
                          item.attitude === 1 ? 0 : 1
                          // item.hotCount === item.hotCount
                          //   ? item.hotCount
                          //   : item.hotCount + 1
                        )
                      }
                    >
                      <i className="icon" />
                      {item.hotCount}
                    </span>
                    {/* 踩 */}
                    <span
                      className={`hate ${item.attitude === -1 ? 'hated' : ''}`}
                      onClick={() =>
                        this.changeHate(item.id, item.attitude === -1 ? 0 : -1)
                      }
                    >
                      <i className="icon" />
                    </span>
                    <span
                      className="reply btn-hover"
                      onClick={() => this.delList(item.id)}
                    >
                      删除
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default App
