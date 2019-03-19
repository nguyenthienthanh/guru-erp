import React from 'react'

type ButtonProps = {
  /**
   * Some description
   * @default 'hehe'
   */
  text: 'hihi' | 'hehe' | 'haha'
}

const TicTacToeCell = (props: ButtonProps) => {
  return <div>{props.text || 'hehe'}</div>
}

export default TicTacToeCell
