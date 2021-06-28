import React, { ReactNode, CSSProperties } from 'react'
import { Button } from 'antd'

interface ControlConfig {
  label: string
  onClick: () => any
}

export interface ControlProps {
  children?: ReactNode
  configs?: ControlConfig[]
  style?: CSSProperties
}

export const Control: React.FC<ControlProps> = (props) => {
  const { configs = [], children, style } = props

  function renderByConfigs (configs: ControlConfig[]) {
    return (
      <div
        style={{
          textAlign: 'right',
          backgroundColor: '#fff',
          padding: 16,
          ...style
        }}
      >
        {configs.map(({ label, onClick }) => {
          return (
            <Button onClick={onClick} key={label} style={{ marginLeft: 10 }}>
              {label}
            </Button>
          )
        })}
      </div>
    )
  }

  function renderByChildren () {
    return (
      <div
        style={{
          textAlign: 'right',
          backgroundColor: '#fff',
          padding: 16,
          ...style
        }}
      >
        {children}
      </div>
    )
  }

  return configs.length > 0 ? renderByConfigs(configs) : renderByChildren()
}
