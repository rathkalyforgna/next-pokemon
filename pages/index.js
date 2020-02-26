import React from 'react'
import Head from 'next/head'
import PokemonList, {
  Fallback as PokemonListFallback
} from '../components/pokemon-list'
import { Fallback as PokemonShortFallback } from '../components/pokemon-short'

const isServer = typeof window === 'undefined'

const fallback = (
  <PokemonListFallback>
    {Array.from({ length: 9 }, (_, index) => (
      <PokemonShortFallback key={index} />
    ))}
  </PokemonListFallback>
)

const HomePage = () => {
  return (
    <>
      <section className="container mx-auto">
        {!isServer ? (
          <React.Suspense fallback={fallback}>
            <PokemonList />
          </React.Suspense>
        ) : (
          fallback
        )}
      </section>
    </>
  )
}

export default HomePage
