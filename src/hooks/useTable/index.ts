import { useEffect, useState } from 'react'

interface Result {
  total: number,
  list: any[]
}

type Request = ({ current, pageSize }: { current: number, pageSize: number }) => Promise<Result>

export const useTable = (request: Request) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [err, setErr] = useState<any>(null)
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const [list, setList] = useState<any[]>([])

  const req = ({current, pageSize}: {current: number, pageSize: number}) => {
    setLoading(true)
    request({ current: current, pageSize: pageSize }).then((res: any) => {
      setLoading(false)
      setList(res.list)
      setTotal(res.total)
    }).catch((error: any) => {
      setLoading(false)
      setErr(error)
    })
  }

  useEffect(() => {
    req({current, pageSize})
  }, [])

  const onChange = (page: number, size: number) => {
    setCurrent(page)
    setPageSize(size)
    req({current: page, pageSize: size})
  }

  const onShowSizeChange = (page: number, size: number) => {
    setCurrent(page)
    setPageSize(size)
    req({current: page, pageSize: size})
  }
  const refresh = () => {
    req({current, pageSize})
  }

  return {
    err: err,
    refresh,
    tableProps: {
      loading: loading,
      dataSource: list,
      pagination: {
        current: current,
        pageSize: pageSize,
        total: total,
        onChange,
        onShowSizeChange
      }
    }
  }
}

