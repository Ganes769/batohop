import { useEffect, useState } from 'react'
import { api } from './client'

export function useCatalog() {
  const [state, setState] = useState({
    destinations: [],
    hops: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let active = true
    Promise.all([api.destinations(), api.hops()])
      .then(([destinations, hops]) => {
        if (active) setState({ destinations, hops, loading: false, error: null })
      })
      .catch((error) => {
        if (active) {
          setState({
            destinations: [],
            hops: [],
            loading: false,
            error,
          })
        }
      })
    return () => {
      active = false
    }
  }, [])

  return state
}
