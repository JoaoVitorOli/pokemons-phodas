import Feature from '@/components/Feature'
import { graphql } from '@/graphql/generated/gql';
import { AllPokemonsQuery,  } from '@/graphql/generated/graphql';
import { client } from '@/lib/urql';
import { GetStaticProps } from 'next';

interface HomeProps {
  data: AllPokemonsQuery;
}

const PokemonsQuery = graphql(`query allPokemons {
  pokemon_v2_pokemon(limit: 5) {
    name
    id
    pokemon_v2_pokemonsprites {
      id
      sprites
    }
  }
}`);

export default function Home({ data }: HomeProps) {
  return (
    <main>
      {/* {JSON.stringify(response.json())} */}

      <Feature pokemons={data} />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query(PokemonsQuery, {}).toPromise();

  return {
    props: {
      data,
    },
    revalidate: 60
  } 
}
