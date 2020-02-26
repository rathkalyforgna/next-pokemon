import React from 'react'
import useSWR, { useSWRPages } from 'swr'
import fetcher from '../lib/fetcher'
import PokemonShort from '../components/pokemon-short'
import useOnScreen from '../hooks/use-on-screen'

export default function PokemonList() {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    'pokemon-list',
    ({ offset, withSWR }) => {
      const url = offset || 'https://pokeapi.co/api/v2/pokemon'
      const { data } = withSWR(useSWR(url, fetcher, { suspense: true }))

      if (!data) return null

      const { results } = data
      return results.map(result => (
        <PokemonShort key={result.name} name={result.name} />
      ))
    },
    SWR => SWR.data.next,
    []
  )

  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = React.useState(
    false
  )
  const $loadMoreButton = React.useRef(null)
  const infiniteScrollCount = React.useRef(0)
  const isOnScreen = useOnScreen($loadMoreButton, '200px')

  React.useEffect(() => {
    if (!infiniteScrollEnabled || !isOnScreen) return

    loadMore()

    const count = infiniteScrollCount.current

    if (count + 1 === 3) {
      setInfiniteScrollEnabled(false)
      infiniteScrollCount.current = 0
    } else {
      infiniteScrollCount.current = count + 1
    }
  }, [infiniteScrollEnabled, isOnScreen])

  return (
    <>
      <div className="-mx-2 flex flex-wrap">{pages}</div>
      <div className="mx-auto mt-10 mb-20 w-1/3">
        {!isReachingEnd && (
          <button
            ref={$loadMoreButton}
            className="bg-red-600 border-solid border-2 hover:bg-white border-red-600 text-white hover:text-red-600 font-bold py-2 px-4 rounded-full w-full"
            disabled={isLoadingMore}
            onClick={() => {
              loadMore()
              setInfiniteScrollEnabled(true)
            }}
          >
            Load More Pokémon
          </button>
        )}
      </div>
    </>
  )
}

export function Fallback({ children }) {
  return <div className="-mx-2 flex flex-wrap">{children}</div>
}
