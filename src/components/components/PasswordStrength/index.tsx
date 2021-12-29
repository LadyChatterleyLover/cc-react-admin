import { Input } from 'antd'
import { useState, ChangeEvent, useMemo } from 'react'
import { zxcvbn, ZxcvbnResult } from '@zxcvbn-ts/core'
import './index.scss'


export interface CcPasswordStrengthProps {
  onChange?: () => void,
  onScoreChange?: (score: number) => void
}

const CcPasswordStrength = (props: CcPasswordStrengthProps) => {
  const { onChange, onScoreChange } = props
  const [value, setValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange && onChange()
  }

  const passwordStrength = useMemo(() => {
    const score = value ? (zxcvbn(value) as ZxcvbnResult).score : -1
    onScoreChange && onScoreChange(score)
    return score
  }, [value])
  return (
    <div>
      <Input.Password
        allowClear
        value={value}
        placeholder='请输入密码'
        onChange={(e) => handleChange(e)}
      />
      <div className="cc-password-strength-bar">
        <div
          className="cc-password-strength-bar-fill"
          data-score={passwordStrength}></div>
      </div>
    </div>
  )
}

export default CcPasswordStrength
