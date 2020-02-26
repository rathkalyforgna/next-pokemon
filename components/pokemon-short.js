import fetcher from '../lib/fetcher'
import useSWR from 'swr'

export default function PokemonShort({ name }) {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/${name}`, fetcher)

  return (
    <div className="my-5 p-2 w-1/3">
      <article className="shadow p-5 relative">
        <h2 className="font-bold text-xl capitalize">{name}</h2>
        {data ? (
          <>
            <div className="absolute top-0 right-0">
              <img src={data.sprites.front_default} />
            </div>
            <ul>
              <li>
                <strong>Weight</strong>: {data.weight}
              </li>
              <li>
                <strong>Height</strong>: {data.height}
              </li>
            </ul>
            <br />
            <h3 className="font-bold text-lg">Stats</h3>
            <ul className="flex justify-start items-baseline flex-wrap">
              {data.stats.map(stat => (
                <li key={stat.stat.name} className="w-3/6">
                  <strong className="capitalize">{stat.stat.name}</strong>:{' '}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="font-bold text-l capitalize">Loading {name}...</p>
        )}
      </article>
    </div>
  )
}

function GrayBar() {
  return <div className="w-3/5 h-5 bg-gray-300" />
}

export function Fallback() {
  return (
    <div className="my-5 p-2 w-1/3">
      <article className="shadow p-5 relative">
        <h2 className="font-bold text-xl capitalize">
          <GrayBar />
        </h2>
        <div className="absolute top-0 right-0 select-none">
          <div
            style={{ width: '96px', height: '96px' }}
            className="bg-gray-300"
          />
        </div>
        <ul>
          <li>
            <strong>Weight</strong>: <GrayBar />
          </li>
          <li>
            <strong>Height</strong>: <GrayBar />
          </li>
        </ul>
        <br />
        <h3 className="font-bold text-lg">Stats</h3>
        <ul className="flex justify-start items-baseline flex-wrap">
          <li className="w-3/6">
            <strong className="capitalize">speed</strong> <GrayBar />
          </li>
          <li className="w-3/6">
            <strong className="capitalize">special-defense</strong> <GrayBar />
          </li>
          <li className="w-3/6">
            <strong className="capitalize">special-attack</strong> <GrayBar />
          </li>
          <li className="w-3/6">
            <strong className="capitalize">defense</strong> <GrayBar />
          </li>
          <li className="w-3/6">
            <strong className="capitalize">attack</strong> <GrayBar />
          </li>
          <li className="w-3/6">
            <strong className="capitalize">hp</strong> <GrayBar />
          </li>
        </ul>
      </article>
    </div>
  )
}
